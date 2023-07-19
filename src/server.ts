import express, { Application } from "express";
import cors from "cors";
require('express-async-errors');
import { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import { FRONTEND_URL } from "./util/config";


export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize() {
        this.app = express();
        this.app.use(cors());

        this.httpServer = createServer(this.app);
        
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: `http://${FRONTEND_URL}`
            }
        })
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.send(`<h1>Hello World</h1>`); 
        });
    }

    private handleSocketConnection(): void {
        this.io.on("connection", async (socket) => {
            let room = socket.handshake.headers.room;

            if (typeof room === 'string' || room instanceof String) {
                socket.join(room);
                console.log(`Socket connected to room ${room}.`);

                let sockets = await this.io.in(room).fetchSockets()
                let users = sockets.map((socket) => socket.id)

                this.io.to(room).emit("update-user-list", {users: users})
            } else {
                console.log(`room ${room} is not a string`);
            }
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }

}