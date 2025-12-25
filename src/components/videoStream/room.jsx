import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../../context/SocketProvider.jsx";
import PeerService from "../../services/peer.js";
import { set } from "date-fns";


const RoomPage = () => {
    const socket = useSocket();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);


    console.log("Sending offer to:", remoteSocketId);


    const handleUserJoined = useCallback(({ email, socketId }) => {
        console.log(`${email} joined`, socketId);
        setRemoteSocketId(socketId);
    }, []);

    const handleOnClickVideo = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setMyStream(stream);
        const offer = await PeerService.getOffer();
        socket.emit("userCall", { to: remoteSocketId, offer });

    }, [remoteSocketId, socket]);

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        console.log("Incoming call from:", from, offer);
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setMyStream(stream);
        const answerCall = await PeerService.getAnswer(offer);
        socket.emit("callAccepted", { to: from, answer: answerCall });
    }, []);

    const sendStream = () =>{
            for (const track of myStream.getTracks()) {
            PeerService.peer.addTrack(track, myStream);
        }
    }
    const handleCallAccepted = useCallback(async ({ from, answer }) => {
        await PeerService.setRemoteDescription(answer);
        // console.log("Call accepted from:", from, answer);
    }, [myStream]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await PeerService.getOffer();
        socket.emit("peernegotiationneeded", { offer, to: remoteSocketId })
    }, [remoteSocketId, socket])


    const handleNegoNeedIncoming = useCallback((from, offer) => {
        const ans = PeerService.getAnswer(offer);
        socket.emit('peernegotiationdone', { to: from, ans })
    }, [socket])

    const handleNegoNeedFinal = useCallback(async ({ answer }) => {
        await PeerService.setLocalDesription(answer)
    }, [])

    useEffect(() => {
        PeerService.peer.addEventListener('negotiationneeded', handleNegoNeeded);
        return () => {
            PeerService.peer.removeEventListener('negotiationneeded',handleNegoNeeded)
        }
    }, [handleNegoNeeded]);

    useEffect(() => {
        PeerService.peer.addEventListener('track', async (ev) => {
            const remoteStream = ev.streams[0];
            setRemoteStream(remoteStream);
        });
    }, []);

    useEffect(() => {
        socket.on("userJoined", handleUserJoined);
        socket.on("incomingCall", handleIncomingCall);
        socket.on("callAccepted", handleCallAccepted);
        socket.on("peernegotiationneeded", handleNegoNeedIncoming)
        socket.on("peernegotiationfinal", handleNegoNeedFinal)



        return () => {
            socket.off("userJoined", handleUserJoined);
            socket.off("incomingCall", handleIncomingCall);
            socket.off("callAccepted", handleCallAccepted);
            socket.off("peernegotiationneeded", handleNegoNeedIncoming);
            socket.off("peernegotiationfinal", handleNegoNeedFinal)

        }
    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoNeeded, handleNegoNeedFinal]);

    return (
        <div>
            <h1>Video Stream Room</h1>
            <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
            {myStream && <button onClick={sendStream}></button>}
            {remoteSocketId && (
                <button onClick={handleOnClickVideo}>Start Video Call</button>
            )}

            {myStream && (
                <video
                    ref={(video) => video && (video.srcObject = myStream)}
                    autoPlay
                    muted
                    playsInline
                    width="400"
                    height="300"
                />
            )}

            {remoteStream && (
                <video
                    ref={(video) => video && (video.srcObject = remoteStream)}
                    autoPlay
                    muted
                    playsInline
                    width="400"
                    height="300"
                    url={remoteStream}
                />
            )}
        </div>
    );
};

export default RoomPage;
