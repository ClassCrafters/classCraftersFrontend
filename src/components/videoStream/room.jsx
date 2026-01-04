import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSocket } from "../../context/SocketProvider.jsx";
import PeerService from "../../services/peer.js";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const RoomPage = () => {
  const socket = useSocket();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const cameraVideoRef = useRef(null);
  const screenVideoRef = useRef(null);
  const videoSenderRef = useRef(null);
  const tracksAddedRef = useRef(false);

  /* ================= USER JOINED ================= */
  const handleUserJoined = useCallback(({ socketId }) => {
    setRemoteSocketId(socketId);
  }, []);

  /* ================= START CAMERA ================= */
  const startCamera = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setMyStream(stream);
    cameraVideoRef.current.srcObject = stream;

    if (!tracksAddedRef.current) {
      stream.getTracks().forEach(track => {
        const sender = PeerService.peer.addTrack(track, stream);
        if (track.kind === "video") videoSenderRef.current = sender;
      });
      tracksAddedRef.current = true;
    }

    const offer = await PeerService.getOffer();
    socket.emit("userCall", { to: remoteSocketId, offer });
  }, [remoteSocketId, socket]);

  /* ================= INCOMING CALL ================= */
  const handleIncomingCall = useCallback(async ({ from, offer }) => {
    setRemoteSocketId(from);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setMyStream(stream);
    cameraVideoRef.current.srcObject = stream;

    if (!tracksAddedRef.current) {
      stream.getTracks().forEach(track => {
        const sender = PeerService.peer.addTrack(track, stream);
        if (track.kind === "video") videoSenderRef.current = sender;
      });
      tracksAddedRef.current = true;
    }

    const answer = await PeerService.getAnswer(offer);
    socket.emit("callAccepted", { to: from, answer });
  }, [socket]);

  /* ================= CALL ACCEPTED ================= */
  const handleCallAccepted = useCallback(async ({ answer }) => {
    await PeerService.setRemoteDescription(answer);
  }, []);

  /* ================= REMOTE STREAM ================= */
  useEffect(() => {
    PeerService.peer.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };
  }, []);

  /* ================= SCREEN SHARE ================= */
  const startScreenShare = useCallback(async () => {
    if (!videoSenderRef.current || !myStream) return;

    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    const screenTrack = screenStream.getVideoTracks()[0];
    setIsScreenSharing(true);
    await videoSenderRef.current.replaceTrack(screenTrack);
    screenVideoRef.current.srcObject = screenStream;

    screenTrack.onended = async () => {
      const cameraTrack = myStream.getVideoTracks()[0];
      await videoSenderRef.current.replaceTrack(cameraTrack);
      screenVideoRef.current.srcObject = null;
      setIsScreenSharing(false);
    };
  }, [myStream]);

  /* ================= MIC / CAMERA ================= */
  const toggleMic = () => {
    const track = myStream.getAudioTracks()[0];
    track.enabled = !track.enabled;
    setIsMicOn(track.enabled);
  };

  const toggleCamera = () => {
    const track = myStream.getVideoTracks()[0];
    track.enabled = !track.enabled;
    setIsCameraOn(track.enabled);
  };

  /* ================= SOCKET EVENTS ================= */
  useEffect(() => {
    socket.on("userJoined", handleUserJoined);
    socket.on("incomingCall", handleIncomingCall);
    socket.on("callAccepted", handleCallAccepted);

    return () => {
      socket.off("userJoined", handleUserJoined);
      socket.off("incomingCall", handleIncomingCall);
      socket.off("callAccepted", handleCallAccepted);
    };
  }, []);

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-grey-300 text-white p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl text-black font-semibold">🎥 Live Video Room</h2>
        <Badge variant={remoteSocketId ? "success" : "secondary"}>
          {remoteSocketId ? "Connected" : "Waiting"}
        </Badge>
      </div>

      {/* START CAMERA */}
      {remoteSocketId && !myStream && (
        <Button onClick={startCamera} className="mb-4">
          Start Camera
        </Button>
      )}

      {/* VIDEO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LOCAL CAMERA */}
        <Card>
          <CardHeader>
            <CardTitle>My Camera</CardTitle>
          </CardHeader>
          <CardContent>
            <video
              ref={cameraVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-lg bg-black"
            />
          </CardContent>
        </Card>

        {/* REMOTE CAMERA */}
        <Card>
          <CardHeader>
            <CardTitle>Remote User</CardTitle>
          </CardHeader>
          <CardContent>
            {remoteStream ? (
              <video
                autoPlay
                playsInline
                className="w-full rounded-lg bg-black"
                ref={(v) => {
                  if (v && v.srcObject !== remoteStream) {
                    v.srcObject = remoteStream;
                    v.play().catch(() => {});
                  }
                }}
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                Waiting for remote stream…
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SCREEN SHARE */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>🖥 Screen Share</CardTitle>
        </CardHeader>
        <CardContent>
          {isScreenSharing ? (
            <video
              ref={screenVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full rounded-lg bg-black"
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No screen being shared
            </p>
          )}
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* CONTROLS */}
      {myStream && (
        <div className="flex gap-3 justify-center">
          <Button variant={isMicOn ? "default" : "destructive"} onClick={toggleMic}>
            {isMicOn ? "Mute Mic" : "Unmute Mic"}
          </Button>

          <Button
            variant={isCameraOn ? "default" : "destructive"}
            onClick={toggleCamera}
          >
            {isCameraOn ? "Camera Off" : "Camera On"}
          </Button>

          <Button onClick={startScreenShare}>
            Share Screen
          </Button>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
