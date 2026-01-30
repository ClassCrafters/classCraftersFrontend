"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import { fetchStudentsById } from "../../store/slices/studentSlice";
import { selectStudentsByid } from "../../store/selectors/studentSelectors";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StudentDetails() {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registration = useSelector(selectStudentsByid);

  useEffect(() => {
    dispatch(fetchStudentsById(studentId));
  }, [dispatch, studentId]);

  if (!registration) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        No student data found
      </div>
    );
  }

  const {
    id: registrationId,
    student_id,
    rollNumber,
    academic_sessionId,
    classroom_id,
    section_id,
    institution_id,
    phase_id,
    subgroup_id,
    user_id,
    status,
    created_at,
    custom_data,
    institution,
    phase,
    subgroup,
    user,
  } = registration;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Student Details</h1>
          <p className="text-sm text-muted-foreground">
            Student ID: {student_id}
          </p>
        </div>

        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      {/* STUDENT BASIC INFO (FUTURE READY) */}
      <Card>
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
          <CardDescription>Personal & contact details</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="Student Name" value={`${registration.student?.firstName}${registration.student?.lastName}`} />
            <InfoItem label="Admission Number" value={registration.student?.admissionNo} />
            <InfoItem label="Phone" value={registration.student?.phone} />
            <InfoItem label="Email" value={registration.student?.email} />
            <InfoItem label="Address" value={registration.student?.address} />
          </div>
        </CardContent>
      </Card>

      {/* REGISTRATION INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Details</CardTitle>
          <CardDescription>Academic & system information</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="Registration ID" value={registrationId} />
            <InfoItem label="Roll Number" value={rollNumber} />
            <InfoItem label="Academic Session ID" value={academic_sessionId} />
            <InfoItem label="Classroom ID" value={classroom_id} />
            <InfoItem label="Section ID" value={section_id} />
            <InfoItem label="Registered On" value={new Date(created_at).toLocaleString()} />

            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge className="mt-1">{status}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* INSTITUTION INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Institution Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="Institution Name" value={institution?.name} />
            <InfoItem label="Institution ID" value={institution_id} />
            <InfoItem label="Institution Created At" value={institution?.created_at} />
          </div>
        </CardContent>
      </Card>

      {/* ACADEMIC INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Structure</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem label="Phase" value={phase?.name} />
            <InfoItem label="Phase Description" value={phase?.description} />
            <InfoItem label="Subgroup" value={subgroup?.name} />
          </div>
        </CardContent>
      </Card>

      {/* ADMIN INFO */}
      <Card>
        <CardHeader>
          <CardTitle>Processed By</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem label="Admin Name" value={user?.name} />
            <InfoItem label="Admin Email" value={user?.email} />
            <InfoItem label="Admin ID" value={user_id} />
          </div>
        </CardContent>
      </Card>

      {/* ADDITIONAL INFO */}
      {custom_data && (
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>

          <CardContent>
            <InfoItem
              label="Previous School"
              value={custom_data?.previous_school}
            />
          </CardContent>
        </Card>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reject</Button>
        <Button>Approve</Button>
      </div>
    </div>
  );
}

/* Reusable info component */
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium break-words">{value ?? "-"}</p>
    </div>
  );
}
