import React,{createContext,useMemo, useContext} from "react";
import { io } from "socket.io-client";


const SocketContext = createContext();

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket;
}

export const SocketProvider = (props) => {

    const socket = useMemo(() => io(import.meta.env.VITE_SOCKET_SERVER_URL), []);
    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    )
}