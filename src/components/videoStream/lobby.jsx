import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider.jsx";

// shadcn components
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const LobbyPage = () => {
  const [email, setEmail] = useState("");
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();
  const socket = useSocket();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("joinRoom", { email, roomID });
    },
    [email, roomID, socket]
  );

  const handleJoinRoom = useCallback(
    ({ roomID }) => {
      navigate(`/video-stream/room/${roomID}`);
    },
    [navigate]
  );

  // useEffect(() => {
  //   socket.on("joinRoom", handleJoinRoom);
  //   return () => socket.off("joinRoom", handleJoinRoom);
  // }, [socket, handleJoinRoom]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            Join Video Stream
          </CardTitle>
          <CardDescription>
            Enter your email and room ID to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Room ID */}
            <div className="space-y-2">
              <Label htmlFor="room">Room ID</Label>
              <Input
                id="room"
                type="text"
                placeholder="room-12345"
                required
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
            </div>

            {/* Button */}
            <Button type="submit" className="w-full text-base">
              Join Room
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LobbyPage;
