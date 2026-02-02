import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectClassrooms,selectClassroomById
} from "../../../store/selectors/classRoomSelectors";

import { getClassroom } from "../../../store/slices/classRoomSlice";
import { getClassroomById } from "../../../store/slices/classRoomSlice";
import { useNavigate } from "react-router-dom";


const AssignFees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classrooms = useSelector(selectClassrooms);
  const students = useSelector(selectClassroomById);

  const [classroomId, setClassroomId] = useState("");

  // 🔹 Load classrooms on mount
  useEffect(() => {
    dispatch(getClassroom());
  }, [dispatch]);

  // 🔹 Load students when classroom changes
  useEffect(() => {
    if (classroomId) {
      dispatch(getClassroomById(classroomId));
    }
  }, [classroomId, dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Assign Fees</h1>

      {/* 🔹 Classroom Select */}
      <div className="max-w-md">
        <label className="block text-sm font-medium mb-1">
          Select Classroom
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={classroomId}
          onChange={(e) => setClassroomId(e.target.value)}
        >
          <option value="">-- Select Classroom --</option>
          {classrooms.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Students Table */}
      {students?.classroom?.student.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Student Name</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Roll No</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {students?.classroom?.student.map((student, index) => (
                <tr key={student.id} className="text-center">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">
                    {student.student?.firstName} {student.student?.lastName}
                  </td>
                  <td className="p-2 border">{student.student?.gender}</td> 
                  <td className="p-2 border">{student.student?.email}</td>
                  <td className="p-2 border">{student.rollNumber}</td>
                  <td className="p-2 border">
                    <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
                        onClick={() => navigate(`/payment/assign-fees/${student.student?.id}`)}
                    >
                        Assign Fee
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Empty State */}
      {classroomId && students?.classroom?.student.length === 0 && (
        <p className="text-sm text-gray-500">
          No students found for this classroom.
        </p>
      )}
    </div>
  );
};

export default AssignFees;
