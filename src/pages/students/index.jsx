"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchStudents,
    addStudent,
    updateStudent,
} from "../../store/slices/studentSlice"; // adjust path
import { fetchAllUser } from "../../store/slices/userSlice";
import { fetchInstitutions } from "../../store/slices/institutionSlice";
import { fetchPhases } from "../../store/slices/phaseSlice";
import { fetchSubGroups } from "../../store/slices/subGroupSlice";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { selectStudents } from "../../store/selectors/studentSelectors";
import { selectUser } from "../../store/selectors/userSelectors";
import { selectPhases } from "../../store/selectors/phaseSelectors";
import { selectInstitutions } from "../../store/selectors/institutionSelectors";
import { selectSubGroups } from "../../store/selectors/subGroupSelectors";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";


export default function StudentRegistration() {
    const dispatch = useDispatch();
    const students = useSelector(selectStudents);
    const users = useSelector(selectUser);
    const institutions = useSelector(selectInstitutions); // Add this line to select institutions from the store
    const phases = useSelector(selectPhases);
    const subGroups = useSelector(selectSubGroups);
    console.log("subGroups:", subGroups);
    const [form, setForm] = useState({
        name: "",
        email: "",
        user_id: "",
        institution_id: "",
        phase_id: "",
        subgroup_id: "",
    });

    useEffect(() => {
        dispatch(fetchStudents());
        dispatch(fetchAllUser());
        dispatch(fetchInstitutions());
        dispatch(fetchPhases());
        dispatch(fetchSubGroups());
    }, [dispatch]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Only convert number fields
        if (["user_id", "institution_id", "phase_id", "subgroup_id"].includes(name)) {
            setForm({
                ...form,
                [name]: value === "" ? "" : Number(value),
            });
        } else {
            // name, email → remain string
            setForm({
                ...form,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(addStudent(form)).unwrap();
            alert("Student added successfully!");
            setForm({
                name: "",
                email: "",
                user_id: "",
                institution_id: "",
                phase_id: "",
                subgroup_id: "",
            });
        } catch {
            alert("Failed to add student.");
        }
    };

    const handleUpdate = async (id, field, value) => {
        try {
            await dispatch(updateStudent({ id, data: { [field]: value } })).unwrap();
            alert("Student updated!");
        } catch {
            alert("Update failed.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Add Student Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Student</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

                        <div className="space-y-2 col-span-1">
                            <label className="text-sm font-medium">Name</label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={form.name}
                                onChange={handleChange}

                            />
                        </div>

                        <div className="space-y-2 col-span-1">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={form.email}
                                onChange={handleChange}

                            />
                        </div>



                        {/* USER DROPDOWN */}
                        <Select
                            value={form.user_id ? String(form.user_id) : ""}
                            onValueChange={(value) =>
                                setForm({ ...form, user_id: Number(value) })
                            }
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select User" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Users</SelectLabel>

                                    {users?.data?.users?.map((u) => (
                                        <SelectItem key={u.id} value={String(u.id)}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>



                        {/* INSTITUTION DROPDOWN */}

                        <Select
                            value={form.institution_id ? String(form.institution_id) : ""}
                            onValueChange={(value) =>
                                setForm({ ...form, institution_id: Number(value) })
                            }
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select Institution" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Institutions</SelectLabel>

                                    {institutions.map((u) => (
                                        <SelectItem key={u.id} value={String(u.id)}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>


                        {/* PHASE DROPDOWN */}
                        <Select
                            value={form.phase_id ? String(form.phase_id) : ""}
                            onValueChange={(value) =>
                                setForm({ ...form, phase_id: Number(value) })
                            }
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select Phase" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Phases</SelectLabel>

                                    {phases.map((u) => (
                                        <SelectItem key={u.id} value={String(u.id)}>
                                            {u.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* SUBGROUP DROPDOWN */}
                        <Select
                            value={form.subgroup_id ? String(form.subgroup_id) : ""}
                            onValueChange={(value) =>
                                setForm({ ...form, subgroup_id: Number(value) })
                            }
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select SubGroup" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>SubGroups</SelectLabel>
                                    {subGroups.map((sg) => (
                                        <SelectItem key={sg.id} value={String(sg.id)}>
                                            {sg.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="col-span-2">
                            Add Student
                        </Button>
                    </form>

                </CardContent>
            </Card>

            {/* Students List */}
            <Card>
                <CardHeader>
                    <CardTitle>Students List</CardTitle>
                </CardHeader>

                <CardContent>
                    {/* Scrollable container */}
                    <div className="max-h-80 overflow-y-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Institution</TableHead>
                                    <TableHead>Phase</TableHead>
                                    <TableHead>SubGroup</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {students.map((s) => (
                                    <TableRow key={s.id}>
                                        <TableCell>{s.user?.name || "-"}</TableCell>
                                        <TableCell>{s.institution?.name || "-"}</TableCell>
                                        <TableCell>{s.phase?.name || "-"}</TableCell>
                                        <TableCell>{s.subgroup?.name || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
