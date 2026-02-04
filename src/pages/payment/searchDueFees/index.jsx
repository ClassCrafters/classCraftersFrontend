import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getClassroom, getClassroomById } from "../../../store/slices/classRoomSlice";
import {
  selectClassrooms,
  selectClassroomById,
} from "../../../store/selectors/classRoomSelectors";

import { getFeeAssignmentById } from "../../../store/slices/paymentSlice";
import { selectAssignPayments } from "../../../store/selectors/paymentSelectors";

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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchDueFees = () => {
  const dispatch = useDispatch();

  const classrooms = useSelector(selectClassrooms);
  const classroomData = useSelector(selectClassroomById);
  const feeAssignment = useSelector(selectAssignPayments);

  const [classroomId, setClassroomId] = useState("");
  const [checkedStudentId, setCheckedStudentId] = useState(null);
  const [search, setSearch] = useState("");

  /* Fetch all classrooms */
  useEffect(() => {
    dispatch(getClassroom());
  }, [dispatch]);

  /* Fetch students of selected classroom */
  useEffect(() => {
    if (classroomId) {
      dispatch(getClassroomById(classroomId));
      setSearch("");
      setCheckedStudentId(null);
    }
  }, [classroomId, dispatch]);

  /* Filter students by search */
  const students = (classroomData?.classroom?.student || []).filter(
    (item) => {
      const searchText = search.toLowerCase();

      return (
        item.rollNumber?.toString().includes(searchText) ||
        item.student.firstName?.toLowerCase().includes(searchText) ||
        item.student.lastName?.toLowerCase().includes(searchText)
      );
    }
  );

  const handleCheckFee = (studentRegistrationId) => {
    setCheckedStudentId(studentRegistrationId);
    dispatch(getFeeAssignmentById(studentRegistrationId));
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Search Due Fees</h1>

      {/* ================= CLASS FILTER ================= */}
      <div className="max-w-md">
        <label className="block text-sm font-medium mb-2">
          Select Classroom
        </label>

        <Select value={classroomId} onValueChange={setClassroomId}>
          <SelectTrigger>
            <SelectValue placeholder="Choose class" />
          </SelectTrigger>
          <SelectContent>
            {classrooms?.map((cls) => (
              <SelectItem key={cls.id} value={String(cls.id)}>
                {cls.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ================= SEARCH ================= */}
      {classroomId && (
        <div className="max-w-sm">
          <Input
            placeholder="Search by name or roll number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      {/* ================= STUDENTS TABLE ================= */}
      {classroomId && (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Fee Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.rollNumber}</TableCell>

                    <TableCell>
                      {item.student.firstName} {item.student.lastName}
                    </TableCell>

                    <TableCell>
                      {checkedStudentId === item.id ? (
                        feeAssignment?.data ? (
                          Number(feeAssignment.data.due_amount) > 0 ||
                          Number(feeAssignment.data.total_amount) > 0 ? (
                            <Badge variant="secondary">Assigned</Badge>
                          ) : (
                            <Badge variant="destructive">Not Assigned</Badge>
                          )
                        ) : (
                          <Badge variant="destructive">Not Assigned</Badge>
                        )
                      ) : (
                        <Badge variant="outline">Unknown</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCheckFee(item.id)}
                      >
                        Check Fee
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SearchDueFees;
