import react, { useCallback, useState,useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSocket } from '../../context/SocketProvider.jsx';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
    const [email, setEmail] = useState('');
    const [roomID, setRoomID] = useState('');
    const navigate = useNavigate();

    const socket = useSocket();
    // console.log("Socket in LobbyPage:", socket);
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        socket.emit('joinRoom', { email, roomID });
    }, [email, roomID, socket]);

    const handleJoinRoom = useCallback((data) => {
        const { email, roomID } = data;
        navigate(`/video-stream/room/${roomID}`);
    }, []);

    useEffect(()=>{
        socket.on('joinRoom', handleJoinRoom);
        return ()=>socket.off('joinRoom',handleJoinRoom);
    },[socket,handleJoinRoom])

    return (
        <div>
            <h1>Video Stream Lobby</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required 
                    onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label htmlFor="room">Room ID:</label>
                <input
                    type="text"
                    id="room"
                    name="room"
                    required 
                    onChange={(e) => setRoomID(e.target.value)} />
                <br />
                <button type="submit">Join Room</button>
            </form>
        </div>
    )
};

export default LobbyPage;