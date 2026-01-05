import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

import { getClassroomById } from "@/store/slices/classRoomSlice";
import { getAssignmentsByClassroomId, createAssignment } from "@/store/slices/assignmentSlice";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import LobbyPage from "@/components/videoStream/lobby.jsx";
import { Excalidraw } from "@excalidraw/excalidraw";
// Use the package export for the CSS so bundler        s (Vite) can resolve it via the package's "exports" field.
import "@excalidraw/excalidraw/index.css";

const ManageClassrooms = () => {
    const [joining, setJoining] = useState(false);
    const [zegoJoined, setZegoJoined] = useState(false);
    const zegoRef = useRef(null);
    const excalidrawRef = useRef(null);
    const dispatch = useDispatch();
    const { id } = useParams();

    // Redux state
    const { classrooms, loading: classroomLoading, error: classroomError } = useSelector(
        (state) => state.classroom
    );
    const { assignments, loading: assignmentLoading, error: assignmentError } = useSelector(
        (state) => state.assignment);
    // console.log("Assignments:", assignments);

    // Local state for modal
    const [open, setOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        description: "",
        dueDate: "",
        classroomId: id,
        createdBy: "John Smith"
    });

    // Fetch classroom & assignments on mount or id change
    useEffect(() => {
        if (id) {
            dispatch(getClassroomById(id));
            dispatch(getAssignmentsByClassroomId(id));
        }
    }, [dispatch, id]);

    const joinLiveClass = async () => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/classrooms/zego/token/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const data = await res.json();

            // ✅ DEFINE appID HERE
            const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);

            const userID = String(data.userID);
            const userName = String(data.userName).trim();
            const roomID = String(data.roomID);

            console.log({ appID, userID, userName, roomID });

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,      // ✅ now defined
                userID,
                userName,
                roomID
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);

            zp.joinRoom({
                container: document.getElementById("zego-container"),
                scenario: {
                    mode: ZegoUIKitPrebuilt.VideoConference,
                },
            });

        } catch (err) {
            console.error("❌ Join failed", err);
        }
    };





    // const joinLiveClass = async () => {

    //     const res = await fetch(
    //         `http://localhost:5000/api/classrooms/zego/token/${id}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             },
    //         }
    //     );

    //     if (!res.ok) {
    //         throw new Error("Failed to get ZEGO token");
    //     }
    //     const { token, roomID, userID, userName } = await res.json();

    //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
    //         Number(import.meta.env.VITE_ZEGO_APP_ID),
    //         token,
    //         roomID,
    //         userID,
    //         userName
    //     );

    //     const zp = ZegoUIKitPrebuilt.create(kitToken);

    //     zp.joinRoom({
    //         container: document.getElementById("zego-container"),
    //         scenario: {
    //             mode: ZegoUIKitPrebuilt.VideoConference,
    //         },
    //     });
    // };


    // Create Assignment
    const handleCreateAssignment = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createAssignment(newAssignment)).unwrap();
            toast.success("Assignment created successfully!");
            setOpen(false);
            setNewAssignment({ title: "", description: "", dueDate: "", classroomId: id });
            dispatch(getAssignmentsByClassroomId(id)); // refresh assignments
        } catch (err) {
            toast.error("Failed to create assignment. Try again!");
        }
    };

    // Whiteboard helpers (Excalidraw)
    const WHITEBOARD_KEY = `classroom_${id}_whiteboard`;

    const loadWhiteboard = async () => {
        if (!excalidrawRef.current) return;
        try {
            const raw = localStorage.getItem(WHITEBOARD_KEY);
            if (!raw) return;
            const parsed = JSON.parse(raw);
            // updateScene expects elements and optional appState
            await excalidrawRef.current.updateScene({ elements: parsed.elements || [] });
        } catch (err) {
            console.error("Failed to load whiteboard", err);
        }
    };

    const saveWhiteboard = async (showToast = true) => {
        if (!excalidrawRef.current) return;
        try {
            const elements = await excalidrawRef.current.getSceneElements();
            const appState = await excalidrawRef.current.getAppState();
            const payload = { elements, appState, updatedAt: Date.now() };
            localStorage.setItem(WHITEBOARD_KEY, JSON.stringify(payload));
            if (showToast) toast.success("Whiteboard saved", { autoClose: 1000 });
        } catch (err) {
            console.error("Save whiteboard failed", err);
            if (showToast) toast.error("Failed to save whiteboard");
        }
    };

    const downloadWhiteboard = async () => {
        try {
            await saveWhiteboard(false);
            const raw = localStorage.getItem(WHITEBOARD_KEY);
            if (!raw) return toast.error("Nothing to download");
            const blob = new Blob([raw], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${WHITEBOARD_KEY}.json`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            toast.error("Download failed");
        }
    };

    const clearWhiteboard = async () => {
        if (!excalidrawRef.current) return;
        try {
            await excalidrawRef.current.updateScene({ elements: [], commitToHistory: true });
            localStorage.removeItem(WHITEBOARD_KEY);
            toast.info("Whiteboard cleared");
        } catch (err) {
            console.error(err);
            toast.error("Failed to clear");
        }
    };

    // Autosave every 5 seconds when classroom id is present
    useEffect(() => {
        if (!id) return;
        const iv = setInterval(() => {
            // silent autosave
            saveWhiteboard(false);
        }, 5000);
        return () => clearInterval(iv);
    }, [id]);

    // Load saved whiteboard once when id (or ref) is ready
    useEffect(() => {
        if (!id) return;
        // slight delay to allow Excalidraw to mount
        const t = setTimeout(() => loadWhiteboard(), 300);
        return () => clearTimeout(t);
    }, [id]);

    // Handle loading & error states
    if (classroomLoading || assignmentLoading) return <p>Loading...</p>;
    if (classroomError) return <p>Error: {classroomError}</p>;
    if (!classrooms) return <p>No classroom found</p>;

    return (
        <div className="container mx-auto p-4 space-y-4">
            <ToastContainer position="top-right" autoClose={3000} />
            <h1 className="text-2xl font-bold">{classrooms.name}</h1>

            <Card className="shadow-xl rounded-2xl border border-gray-200">
                <Tabs defaultValue="stream" className="w-full">
                    <TabsList className="flex justify-start gap-4 border-b p-2">
                        <TabsTrigger value="stream">Stream</TabsTrigger>
                        <TabsTrigger value="classwork">Classwork</TabsTrigger>
                        <TabsTrigger value="people">People</TabsTrigger>
                        <TabsTrigger value="marks">Marks</TabsTrigger>
                        <TabsTrigger value="whiteboard">Whiteboard</TabsTrigger>

                    </TabsList>

                    {/* Stream Tab */}
                    <TabsContent value="stream" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Announcements & Updates</h2>
                        <p>This is the classroom stream where updates and announcements will appear.</p>


                        <div className="my-4">
                            <LobbyPage />
                            {/* <Button onClick={joinLiveClass} disabled={joining || zegoJoined}>
                                {joining ? "Joining Live Class..." : zegoJoined ? "Live Class Joined" : "Join Live Class"}
                            </Button> */}
                        </div>
                    </TabsContent>

                    {/* Classwork Tab */}
                    <TabsContent value="classwork" className="p-4 space-y-4">
                        <h2 className="text-lg font-semibold mb-2">Assignments</h2>

                        {/* Create Assignment Modal */}
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="mb-4 flex items-center">
                                    <Plus className="w-4 h-4 mr-2" /> Create Assignment
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>New Assignment</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details for the new assignment.
                                    </DialogDescription>
                                </DialogHeader>

                                <form className="flex flex-col space-y-4 mt-4" onSubmit={handleCreateAssignment}>
                                    <Input
                                        placeholder="Title"
                                        value={newAssignment.title}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, title: e.target.value })
                                        }
                                        required
                                    />
                                    <Textarea
                                        placeholder="Description"
                                        value={newAssignment.description}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, description: e.target.value })
                                        }
                                        required
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Due Date"
                                        value={newAssignment.dueDate}
                                        onChange={(e) =>
                                            setNewAssignment({ ...newAssignment, dueDate: e.target.value })
                                        }
                                        required
                                    />
                                    <Button type="submit">Create</Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                        {/* Existing Assignments */}
                        {assignments?.assignments && assignments?.assignments.length > 0 ? (
                            assignments?.assignments.map((a) => (
                                <Card key={a.id} className="mb-2 p-2">
                                    <CardTitle>{a.title}</CardTitle>
                                    <p>{a.description}</p>
                                    <p className="text-sm text-gray-500">
                                        Due: {new Date(a.dueDate).toLocaleDateString()}
                                    </p>
                                </Card>
                            ))
                        ) : (
                            <p>No assignments yet.</p>
                        )}
                    </TabsContent>

                    {/* People Tab */}
                    <TabsContent value="people" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Teacher</h2>
                        <p>
                            {classrooms.teacher?.name} ({classrooms.teacher?.email})
                        </p>

                        <h2 className="text-lg font-semibold mt-4">Students</h2>
                        {classrooms.students?.length > 0 ? (
                            classrooms.students.map((s) => <p key={s.id}>{s.name}</p>)
                        ) : (
                            <p>No students enrolled.</p>
                        )}
                    </TabsContent>

                    {/* Marks Tab */}
                    <TabsContent value="marks" className="p-4">
                        <h2 className="text-lg font-semibold mb-2">Grades & Marks</h2>
                        <p>Marks and grade reports will be shown here.</p>
                    </TabsContent>

                    {/* Whiteboard Tab */}
                    <TabsContent value="whiteboard" className="p-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Button onClick={() => saveWhiteboard()}>Save</Button>
                                <Button onClick={() => loadWhiteboard()}>Load</Button>
                                <Button onClick={() => downloadWhiteboard()}>Download</Button>
                                <Button variant="destructive" onClick={() => clearWhiteboard()}>Clear</Button>
                                <p className="text-sm text-gray-500 ml-2">Autosaves every 5s to your browser (localStorage).</p>
                            </div>

                            <div className="w-full" style={{ height: '70vh' }}>
                                <Excalidraw
                                    ref={excalidrawRef}
                                    viewModeEnabled={false}
                                    zenModeEnabled={false}
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        </div>
                    </TabsContent>

                </Tabs>
            </Card>
        </div>
    );
};

export default ManageClassrooms;
