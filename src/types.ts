
export type RTCSessionDescriptionInit = {
   sdp?: undefined | string,
   type: "offer" | "pranswer" | "answer" | "rollback"
}


export interface ServerToClientEvents {
    "created": () => void,
    "joined": () => void,
    "full": () => void,
    "offer": (offer: RTCSessionDescriptionInit) => void,
    "answer": (answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (candidate: any) => void,
    "ready": () => void,
    "leave": () => void
}

export interface ClientToServerEvents {
    join: () => void,
    offer: (offer: RTCSessionDescriptionInit) => void,
    answer: (answer: RTCSessionDescriptionInit) => void,
    "ice-candidate": (candidate: any ) => void,
    ready: () => void,
}

export interface InterServerEvents {

}

export interface SocketData  {

}
