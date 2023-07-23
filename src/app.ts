import express from "express";
import cors from "cors";
require('express-async-errors');
import { createServer, Server as HTTPServer } from 'http';
import { FRONTEND_URL } from "./util/config";
import { Server as SocketIOServer} from "socket.io"
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData, RTCSessionDescriptionInit } from "./types";

const usersPerRoom = 3;

export const app = express();

app.use(cors())

app.get("/", (req, res) => {
    res.send(`<h1>Hello World</h1>`); 
});


export const httpServer = createServer(app);
export const io  = new SocketIOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
        origin: `http://${FRONTEND_URL}`
    }
});

io.on("connection", async (socket) => {
    let room = socket.handshake.headers.room as string;
    let id = socket.id;

    if(!(room && typeof room === 'string' && !Array.isArray(room))) {
        // Socket.io makes socket join rooms identified by socket.id by default
        // good fallback value
        room = id;
    }

    const rooms = io.of("/").adapter.rooms;
    if(!rooms.has(room)) {
        // new room created
        socket.join(room);
        socket.emit("created")
    } else {
        let existingRoom = rooms.get(room);

        if( existingRoom && existingRoom.size <= usersPerRoom ) {
            // join existing room
            socket.join(room);
            socket.emit("joined")
        } else {
            // room full
            socket.emit("full")
        }
    }

    socket.on("ready", (fromSocketId) => {
        console.log(`Socket ${fromSocketId} is ready.`)
        socket.broadcast.to(room).emit("ready", fromSocketId);
    });

    socket.on("ice-candidate", (fromSocketId, candidate) => {
        console.log(`ICE candidate:`);
        console.log(candidate)
        socket.broadcast.to(room).emit("ice-candidate", fromSocketId, candidate);
    })

    socket.on("offer", (fromSocketId, offer: RTCSessionDescriptionInit) => {
        console.log(`Offer received`);
        socket.broadcast.to(room).emit("offer", fromSocketId, offer);
    })

    socket.on("answer", (fromSocketId, answer: RTCSessionDescriptionInit) => {
        console.log(`Answer received`);
        socket.broadcast.to(room).emit("answer", fromSocketId, answer);
    })

    socket.on("disconnect", (reason) => {
        // socket is automatically removed from room on disconnect
        console.log(`Socket disconnected`)
        socket.broadcast.to(room).emit("leave");
    })

})

// room events provided by Socket.io
io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
});

io.of("/").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was deleted`);
});

io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
});

io.of("/").adapter.on("leave-room", (room, id) => {
    console.log(`socket ${id} has left the room ${room}`);
});
