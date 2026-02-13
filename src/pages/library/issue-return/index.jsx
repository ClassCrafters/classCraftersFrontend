"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchStudents,
  fetchStudentsFilter,
} from "../../../store/slices/studentSlice";

import { fetchInstitutions } from "../../../store/slices/institutionSlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { selectStudents, selectStudentsLoading } from "../../../store/selectors/studentSelectors";
import { selectInstitutions } from "../../../store/selectors/institutionSelectors";
import { selectClassrooms } from "../../../store/selectors/classRoomSelectors";
import { getClassroom } from "../../../store/slices/classRoomSlice";
import { Loader2 } from "lucide-react";


export default function IssueReturn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(selectStudents);
  // console.log("Students:", students);
  const institutions = useSelector(selectInstitutions);
  const classrooms = useSelector(selectClassrooms);
  const loading = useSelector(selectStudentsLoading);

  const [filters, setFilters] = useState({
    institution_id: "",
    classroom_id: "",
  });

  useEffect(() => {
    dispatch(getClassroom());
    dispatch(fetchStudents());
    dispatch(fetchInstitutions());
  }, [dispatch]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    dispatch(
      fetchStudentsFilter({
        institution_id: filters.institution_id || undefined,
        classroom_id: filters.classroom_id || undefined,
      })
    );
  };

  const resetFilters = () => {
    setFilters({
      institution_id: "",
      classroom_id: "",
    });
    dispatch(fetchStudents());
  };

  const viewStudent = (studentId) => {
    navigate(`/library/issue-return/manage/${studentId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      {/* FILTERS */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Students</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

            {/* Institution */}
            <div className="space-y-1">
              <Label>Institution</Label>
              <Select
                value={filters.institution_id}
                onValueChange={(value) =>
                  handleFilterChange("institution_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select institution" />
                </SelectTrigger>
                <SelectContent>
                  {institutions.map((inst) => (
                    <SelectItem key={inst.id} value={String(inst.id)}>
                      {inst.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class */}
            <div className="space-y-1">
              <Label>Class</Label>
              <Select
                value={filters.classroom_id}
                onValueChange={(value) =>
                  handleFilterChange("classroom_id", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom.id} value={String(classroom.id)}>
                      {classroom.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={applyFilters} className="w-full">
              Apply
            </Button>

            <Button variant="outline" onClick={resetFilters} className="w-full">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* STUDENTS LIST */}
      <Card>
        <CardHeader>
          <CardTitle>Student Registrations</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="max-h-[420px] overflow-y-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center"
                    >
                      <div className="flex justify-center items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading students...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : students.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-10"
                    >
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell>{reg.student_id}</TableCell>
                      <TableCell>{reg.institution?.name ?? "-"}</TableCell>
                      <TableCell>{reg.rollNumber}</TableCell>
                      <TableCell>
                        {reg.student?.firstName} {reg.student?.lastName}
                      </TableCell>
                      <TableCell>{reg.student?.gender ?? "-"}</TableCell>
                      <TableCell>
                        {reg.student?.dob?.slice(0, 10) ?? "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => viewStudent(reg.student_id)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>

            </Table>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
