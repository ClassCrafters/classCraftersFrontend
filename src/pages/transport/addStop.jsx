import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStop, getRoutes } from "@/store/slices/transportSlice";
import { selectRoutes } from "../../store/selectors/transportSelectors";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect } from "react";
import { useSelector } from "react-redux";


const AddStop = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const routes = useSelector(selectRoutes);

    const [formData, setFormData] = useState({
        stopName: "",
        arrivalTime: "",
        routeId: ""
    });

    useEffect(() => {
        dispatch(getRoutes());
    },
        [dispatch]
    );

    // ✅ Submit with Try Catch + Toast
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const payload = {
                ...formData,
                routeId: Number(formData.routeId)
            };

            await dispatch(addStop(payload)).unwrap();

            toast({
                title: "Success",
                description: "Stop added successfully 📍",
            });

            setOpen(false);

            setFormData({
                stopName: "",
                arrivalTime: "",
                routeId: ""
            });

        } catch (error) {

            toast({
                title: "Error",
                description: error?.message || "Failed to add stop",
                variant: "destructive",
            });

        }
    };

    return (
        <div className="p-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">
                    Stop Management
                </h1>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => setOpen(true)}>
                            Add Stop
                        </Button>
                    </DialogTrigger>

                    {/* Modal */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Stop</DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            <div>
                                <label className="text-sm font-medium">
                                    Stop Name
                                </label>
                                <Input
                                    value={formData.stopName}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            stopName: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Arrival Time
                                </label>
                                <Input
                                    placeholder="07:45 AM"
                                    value={formData.arrivalTime}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            arrivalTime: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">
                                    Route ID
                                </label>
                                <Select
                                    value={formData.routeId}
                                    onValueChange={(value) =>
                                        setFormData({
                                            ...formData,
                                            routeId: value
                                        })
                                    }
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Route" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {routes?.map((route) => (
                                            <SelectItem key={route.id} value={String(route.id)}>
                                                {route.routeName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" className="w-full">
                                Submit
                            </Button>

                        </form>
                    </DialogContent>
                </Dialog>
            </div>

        </div>
    );
};

export default AddStop;
