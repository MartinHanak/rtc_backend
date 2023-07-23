
export type RTCSessionDescriptionInit = {
   sdp?: undefined | string,
   type: "offer" | "pranswer" | "answer" | "rollback"
}


export interface ServerToClientEvents {
    // room events, specific for one socket
    "created": () => void,
    "joined": () => void,
    "full": () => void,
    // webRTC events
    "offer": (fromSocketId: string, offer: RTCSessionDescriptionInit) => void,
    "answer": (fromSocketId: string, answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (fromSocketId: string, candidate: any) => void,
    "ready": (fromSocketId: string, username?:string) => void,
    "leave": () => void
}

export interface ClientToServerEvents {
    "offer": (fromSocketId: string, offer: RTCSessionDescriptionInit) => void,
    "answer": (fromSocketId: string, answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (fromSocketId: string, candidate: any ) => void,
    "ready": (fromSocketId: string, username?:string ) => void,
}

export interface InterServerEvents {

}

export interface SocketData  {

}
