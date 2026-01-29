import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import {
  getAttendanceDataByDate,
  postAttendanceDataStudents,
  staffPunchIn,
  staffPunchOut,
  getMyStaffAttendanceID,
} from "@/store/slices/attendanceSlice";

import {
  selectAttendanceData,
  selectAttendanceLoading,
  selectAttendanceError,
  selectStaffAttendanceID,
} from "@/store/selectors/attendanceSelectors";

import { getClassroom, getClassroomById } from "@/store/slices/classRoomSlice";
import {
  selectClassrooms,
  selectClassroomById,
} from "@/store/selectors/classRoomSelectors";
import { fetchTeacher } from "../../../../store/slices/userSlice";
import { selectTeacher } from "../../../../store/selectors/userSelectors";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClassroomSelect = ({ classrooms, value, onChange }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select Classroom" />
      </SelectTrigger>

      <SelectContent>
        {classrooms?.length ? (
          classrooms.map((cls) => (
            <SelectItem key={cls.id} value={String(cls.id)}>
              {cls.name} — {cls.subject}
            </SelectItem>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-gray-500">
            No classrooms found
          </div>
        )}
      </SelectContent>
    </Select>
  );
};

/* =============================
   STATUS COLOR MAP
============================= */
const statusColor = {
  PRESENT: "text-green-600 bg-green-50",
  ABSENT: "text-red-600 bg-red-50",
  LEAVE: "text-yellow-600 bg-yellow-50",
};

/* =============================
   GET ATTENDANCE TABLE
============================= */
const GetAttendanceTable = ({ attendance }) => {
  const rows = attendance?.data?.studentAttendance || [];

  console.log("Attendance rows:", rows);

  if (!rows.length) {
    return (
      <div className="text-sm text-gray-500 text-center py-6">
        No attendance data found.
      </div>
    );
  }

  return (
    <div className="border rounded-xl overflow-hidden mt-3">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Student Reg ID</th>
            <th className="p-3 text-left">Class</th>
            <th className="p-3 text-left">Subject</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Marked By</th>
            <th className="p-3 text-left">Remarks</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((item) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{item.studentRegId}</td>
              <td className="p-3">{item.classroom?.name || "-"}</td>
              <td className="p-3">{item.classroom?.subject || "-"}</td>
              <td className="p-3 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColor[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-3">
                {format(new Date(item.date), "dd MMM yyyy")}
              </td>
              <td className="p-3">{item.markedBy?.name || "-"}</td>
              <td className="p-3">{item.remarks || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* =============================
   REPORT COMPONENTS
============================= */
const StudentReport = ({ date, attendance, loading, error }) => {
  if (loading) {
    return <div className="text-sm text-gray-500">Loading attendance...</div>;
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load attendance data.
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-xl text-sm text-gray-600">
      📊 Student Attendance Report
      <div className="text-xs text-gray-500 mt-1">
        Date: <b>{format(date, "PPP")}</b>
      </div>
      <GetAttendanceTable attendance={attendance} />
    </div>
  );
};

const EmployeeReport = ({ date }) => (
  <div className="p-4 border rounded-xl text-sm text-gray-600">
    📊 Employee Attendance Report
    <div className="mt-2 text-xs text-gray-500">
      Showing report for <b>{format(date, "PPP")}</b>
    </div>
  </div>
);

const LeaveManagement = ({ date }) => (
  <div className="p-4 border rounded-xl text-sm text-gray-600">
    📝 Leave Management
    <div className="mt-2 text-xs text-gray-500">
      Date context: <b>{format(date, "PPP")}</b>
    </div>
  </div>
);

/* =============================
   TAKE ATTENDANCE TABLE
============================= */

const TakeAttendanceTable = ({ type, date, data, onTakeAttendance }) => {
  const students = data?.students || [];
  // console.log("Students for attendance:", data.classroom);
  const takeStudentAttendance = (status, studentId, classroomId) => {
    console.log("Child clicked:", {
      status,
      studentId,
      classroomId,
    });

    onTakeAttendance?.({
      status,
      studentId,
      classroomId,
    });
  };
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Present</th>
            <th className="p-3 text-center">Absent</th>
            <th className="p-3 text-center">Leave</th>
          </tr>
        </thead>
        <tbody>
          {/* </tbody> */}
          {data?.classroom?.students?.length > 0 &&
            data.classroom.students.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">
                  {item.student?.name?.length ? item.student.name : "-"}
                </td>

                <td
                  className="text-center cursor-pointer"
                  onClick={() =>
                    takeStudentAttendance(
                      "PRESENT",
                      item.student.id,
                      item.classroomId,
                    )
                  }
                >
                  ✅
                </td>

                <td
                  className="text-center cursor-pointer"
                  onClick={() =>
                    takeStudentAttendance(
                      "ABSENT",
                      item.student.id,
                      item.classroomId,
                    )
                  }
                >
                  ❌
                </td>

                <td
                  className="text-center cursor-pointer"
                  onClick={() =>
                    takeStudentAttendance(
                      "LEAVE",
                      item.student.id,
                      item.classroomId,
                    )
                  }
                >
                  🟡
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="p-3 text-xs text-gray-500 bg-gray-50">
        Taking attendance for <b>{type}</b> on <b>{format(date, "PPP")}</b>
      </div>
    </div>
  );
};

/* =============================
   MAIN PAGE
============================= */
const ManageAttendancePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [kanbanMode, setKanbanMode] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");

  // Employee report states
  const [staffList, setStaffList] = useState([]);
  const [attendanceRows, setAttendanceRows] = useState([]);
  const [employeeTableData, setEmployeeTableData] = useState([]);
  const [employeePunchStatus, setEmployeePunchStatus] = useState({});

  const dispatch = useDispatch();
  const { attendanceId, isPunchedIn } = useSelector(
    (state) => state.attendance,
  );
  const attendance = useSelector(selectAttendanceData);
  const loading = useSelector(selectAttendanceLoading);

  const error = useSelector(selectAttendanceError);

  const classrooms = useSelector(selectClassrooms);
  const classroom = useSelector(selectClassroomById);
  const teachers = useSelector(selectTeacher);
  const staffAttendaceID = useSelector(selectStaffAttendanceID);

  const handleTakeAttendance = ({ status, studentId, classroomId }) => {
    console.log("Received in AttendancePage:", {
      status,
      studentId,
      classroomId,
      date: selectedDate,
    });

    const attendanceData = {
      date: selectedDate,
      studentRegId: studentId,
      classroomId,
      status,
      remarks: "good",
    };
    // dispatch(fetchTeacher());
    dispatch(postAttendanceDataStudents(attendanceData));
  };
  useEffect(() => {
    dispatch(getAttendanceDataByDate(selectedDate));
    dispatch(getClassroom());
    dispatch(getClassroomById(selectedClassId));
    dispatch(fetchTeacher());
    dispatch(getMyStaffAttendanceID());
  }, [dispatch, selectedDate, selectedClassId]);

  // =====================
  // EMPLOYEE REPORT LOGIC
  // =====================

  useEffect(() => {
    if (selectedClassId && selectedDate) {
      fetchStaffList();
      fetchEmployeeAttendance();
    }
  }, [selectedClassId, selectedDate]);

  useEffect(() => {
    if (staffList.length > 0) {
      mergeEmployeeAttendance();
    }
  }, [staffList, attendanceRows]);

  //  ---NEW PUNCH HANDLERS---
  const handlePunchIn = async () => {
    try {
      await dispatch(
        staffPunchIn({
          staffRegId: teachers?.data?.staffRegId, // or from logged user
          institutionId: 1,
          remarks: "start",
        }),
      ).unwrap();

      dispatch(getMyStaffAttendanceID());
    } catch {
      alert("Already punched in");
    }
  };
  const handlePunchOut = async () => {
    try {
      await dispatch(
        staffPunchOut({
          staffAttendance_id: staffAttendaceID.id,
          remarks: "end",
        }),
      ).unwrap();

      dispatch(getMyStaffAttendanceID());
    } catch {
      alert("Punch Out Failed");
    }
  };

  const fetchStaffList = async () => {
    try {
      // teachers already coming from redux
      setStaffList(teachers || []);
    } catch (error) {
      console.error("Error setting staff list", error);
    }
  };

  const fetchEmployeeAttendance = async () => {
    try {
      // attendance already coming from redux
      setAttendanceRows(attendance || []);
    } catch (error) {
      console.error("Error setting attendance rows", error);
    }
  };

  const mergeEmployeeAttendance = () => {
    const formattedDate = new Date(selectedDate).toLocaleDateString("en-IN");

    const merged = teachers?.data.map((staff) => {
      console.log("attendance", attendance);
      const att = attendance.find((a) => a.studentRegId === staff._id);

      return {
        name: staff.name,
        email: staff.email,
        punchIn: att?.punchIn || "-",
        punchOut: att?.punchOut || "-",
        date: formattedDate,
        className: classroom?.name || "—",
        status: att ? "Present" : "Absent",
      };
    });

    setEmployeeTableData(merged);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md rounded-2xl border border-gray-200 p-6 mt-6">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold">Attendance Dashboard</h1>

          <div className="flex items-center gap-4">
            {/* CLASSROOM DROPDOWN */}
            <ClassroomSelect
              classrooms={classrooms}
              value={selectedClassId}
              onChange={(value) => setSelectedClassId(value)}
            />

            {/* DATE PICKER */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[190px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* TOGGLE */}
            <div className="flex items-center gap-2">
              <Label htmlFor="kanban-mode" className="text-sm">
                Take Attendance
              </Label>
              <Switch
                id="kanban-mode"
                checked={kanbanMode}
                onCheckedChange={setKanbanMode}
              />
            </div>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="students">
          <TabsList className="grid grid-cols-3 bg-gray-100 p-1 rounded-xl mb-4">
            <TabsTrigger value="students">Student Report</TabsTrigger>
            <TabsTrigger value="employees">Employee Report</TabsTrigger>
            <TabsTrigger value="leave">Leave Management</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            {kanbanMode ? (
              <TakeAttendanceTable
                type="Student"
                date={selectedDate}
                data={classroom}
                onTakeAttendance={handleTakeAttendance}
              />
            ) : (
              <StudentReport
                date={selectedDate}
                attendance={attendance}
                loading={loading}
                error={error}
              />
            )}
          </TabsContent>

          <TabsContent value="employees">
            {
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Employee Attendance Report
                </h3>

                <table className="w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border px-3 py-2">Name</th>
                      <th className="border px-3 py-2">Email</th>
                      <th className="border px-3 py-2">Punch In</th>
                      <th className="border px-3 py-2">Punch Out</th>
                      <th className="border px-3 py-2">Date</th>
                      <th className="border px-3 py-2">Class</th>
                      <th className="border px-3 py-2">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teachers?.data?.teachers?.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-4 text-gray-500"
                        >
                          No staff found
                        </td>
                      </tr>
                    ) : (
                      teachers?.data?.teachers?.map((row) => (
                        <tr key={row._id} className="hover:bg-gray-50">
                          {/* Name */}
                          <td className="border px-3 py-2">{row.name}</td>

                          {/* Email */}
                          <td className="border px-3 py-2">{row.email}</td>

                          {/* ----NEW PUNCHIN , PUNCHOUT BUTTONS---- */}
                          <td className="border px-3 py-2 text-center">
                            <button
                              onClick={handlePunchIn}
                              disabled={isPunchedIn}
                              className={`px-3 py-1 rounded text-white text-xs
      ${isPunchedIn ? "bg-green-600" : "bg-green-500 hover:bg-green-600"}
    `}
                            >
                              {isPunchedIn ? "Punched In" : "Punch In"}
                            </button>
                          </td>

                          <td className="border px-3 py-2 text-center">
                            <button
                              onClick={handlePunchOut}
                              // disabled={!isPunchedIn}
                              className={`px-3 py-1 rounded text-white text-xs
      ${!isPunchedIn ? "bg-red-400" : "bg-red-500 hover:bg-red-600"}
    `}
                            >
                              Punch Out
                            </button>
                          </td>

                          {/* Date */}
                          <td className="border px-3 py-2">
                            {format(selectedDate, "dd MMM yyyy")}
                          </td>

                          {/* Class */}
                          <td className="border px-3 py-2">
                            {classroom?.name || "-"}
                          </td>

                          {/* Status */}
                          <td className="border px-3 py-2 font-semibold text-center">
                            {employeePunchStatus[row._id] === "IN" && (
                              <span className="text-green-600">Punched In</span>
                            )}

                            {employeePunchStatus[row._id] === "OUT" && (
                              <span className="text-red-600">Punched Out</span>
                            )}

                            {!employeePunchStatus[row._id] && (
                              <span className="text-gray-500">
                                Not Punched In
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            }
          </TabsContent>

          <TabsContent value="leave">
            <LeaveManagement date={selectedDate} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ManageAttendancePage;
