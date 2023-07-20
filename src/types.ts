
export type RTCSessionDescriptionInit = {
   sdp?: undefined | string,
   type: "offer" | "pranswer" | "answer" | "rollback"
}


export interface ServerToClientEvents {

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
