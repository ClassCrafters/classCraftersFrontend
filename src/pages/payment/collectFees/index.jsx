import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectClassrooms,
  selectClassroomById,
} from "../../../store/selectors/classRoomSelectors";

import {
  getClassroom,
  getClassroomById,
} from "../../../store/slices/classRoomSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom"; 



const CollectFees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classrooms = useSelector(selectClassrooms);
  const selectedClassroom = useSelector(selectClassroomById);

  const [classroomId, setClassroomId] = useState("");

  // Fetch all classrooms
  useEffect(() => {
    dispatch(getClassroom());
  }, [dispatch]);

  // Fetch classroom by ID
  useEffect(() => {
    if (classroomId) {
      dispatch(getClassroomById(classroomId));
    }
  }, [classroomId, dispatch]);

  const students = selectedClassroom?.classroom?.student || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Collect Fees</h1>

      {/* Classroom Filter */}
      <div className="max-w-md">
        <label className="block text-sm font-medium mb-2">
          Select Classroom
        </label>

        <Select value={classroomId} onValueChange={setClassroomId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose classroom" />
          </SelectTrigger>
          <SelectContent>
            {classrooms?.map((room) => (
              <SelectItem key={room.id} value={String(room.id)}>
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Single Students Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll No</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-sm text-muted-foreground"
                >
                  Select a classroom to view students
                </TableCell>
              </TableRow>
            ) : (
              students.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.rollNumber}
                  </TableCell>

                  <TableCell>
                    {item.student.firstName} {item.student.lastName}
                  </TableCell>

                  <TableCell>{item.student.gender}</TableCell>

                  <TableCell>{item.student.email}</TableCell>

                  <TableCell>
                    {new Date(item.student.dob).toLocaleDateString()}
                  </TableCell>

                  <TableCell>{item.student.bloodGroup}</TableCell>

                  <TableCell>
                    <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                    onClick={() => navigate(`/payment/collect-fees/${item.student.id}`)}
                    >
                      Collect Fee
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CollectFees;
