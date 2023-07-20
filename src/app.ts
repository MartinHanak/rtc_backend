import express from "express";
import cors from "cors";
require('express-async-errors');
import { createServer, Server as HTTPServer } from 'http';
import { FRONTEND_URL } from "./util/config";
import { Server as SocketIOServer} from "socket.io"


export const app = express();

app.use(cors())

app.get("/", (req, res) => {
    res.send(`<h1>Hello World</h1>`); 
});

export const httpServer = createServer(app);
export const io  = new SocketIOServer(httpServer, {
    cors: {
        origin: `http://${FRONTEND_URL}`
    }
});

io.on("connection", async (socket) => {
    let room = socket.handshake.headers.room;
    let id = socket.id;

    if(!(room && typeof room === 'string' && !Array.isArray(room))) {
        room = id;
    }

    socket.join(room);

    socket.on("join", () => {
    });

    socket.on("ready", () => {
    });

    socket.on("ice-candidate", (candidate) => {

    })

    socket.on("offer", (offer) => {

    })

    socket.on("answer", () => {

    })

    socket.on("disconnect", (reason) => {
        // socket is automatically removed from room on disconnect
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

io.of("/").adapter.on("leave-room", (room,id) => {
    console.log(`socket ${id} has left the room ${room}`);
});
