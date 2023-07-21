
export type RTCSessionDescriptionInit = {
   sdp?: undefined | string,
   type: "offer" | "pranswer" | "answer" | "rollback"
}


export interface ServerToClientEvents {
    // room events, specific for one sockt
    "created": () => void,
    "joined": () => void,
    "full": () => void,
    // webRTC events
    "offer": (socketId: string, offer: RTCSessionDescriptionInit) => void,
    "answer": (socketId: string, answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (socketId: string, candidate: any) => void,
    "ready": () => void,
    "leave": () => void
}

export interface ClientToServerEvents {
    offer: (offer: RTCSessionDescriptionInit) => void,
    answer: (answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (candidate: any ) => void,
    ready: () => void,
}

export interface InterServerEvents {

}

export interface SocketData  {

}
