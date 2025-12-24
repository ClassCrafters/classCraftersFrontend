import React, { useEffect, useCallback, useState } from "react";
import { useSocket } from "../../context/SocketProvider.jsx";

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);

  const handleUserJoined = useCallback(({ email, socketId }) => {
    console.log(`${email} joined`);
    setRemoteSocketId(socketId);
  }, []);

  const handleOnClickVideo = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("userJoined", handleUserJoined);
    return () => socket.off("userJoined", handleUserJoined);
  }, [socket, handleUserJoined]);

  return (
    <div>
      <h1>Video Stream Room</h1>
      <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>

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
    </div>
  );
};

export default RoomPage;
