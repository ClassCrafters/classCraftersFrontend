import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchStudentsById } from "../../../store/slices/studentSlice";
import { selectSelectedStudent } from "../../../store/selectors/studentSelectors";

import { getFeeStructures } from "../../../store/slices/feeStructureSlice";
import { selectFeeStructures } from "../../../store/selectors/feeStructureSelectors";

import { createFeeAssignment } from "@/store/slices/paymentSlice";

// shadcn ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ManageAssign = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const student = useSelector(selectSelectedStudent);
  const feeStructures = useSelector(selectFeeStructures);

  const [feeStructureId, setFeeStructureId] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assigning, setAssigning] = useState(false);

  // 🔹 Fetch student + fee structures
  useEffect(() => {
    if (id) {
      dispatch(fetchStudentsById(id));
      dispatch(getFeeStructures());
    }
  }, [dispatch, id]);

  if (!student) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading student details...
      </div>
    );
  }

  // 🔹 Assign fees handler
  const handleAssignFees = async () => {
    if (!feeStructureId) {
      alert("Please select a fee structure");
      return;
    }

    setAssigning(true);

    const payload = {
      fee_structure_id: Number(feeStructureId),
      student_ids: [student.id],
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    };

    try {
      await dispatch(createFeeAssignment(payload)).unwrap();
      alert("Fees assigned successfully");
      setFeeStructureId("");
      setDueDate("");
    } catch (err) {
      alert(err?.message || "Failed to assign fees");
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">
        Manage Assigned Fees
      </h1>

      {/* ================= STUDENT DETAILS ================= */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Detail
              label="Name"
              value={`${student.firstName} ${student.lastName}`}
            />
            <Detail label="Email" value={student.email} />
            <Detail label="Roll Number" value={student.rollNumber} />
            <Detail label="Status" value={student.status} />
            <Detail label="Institution" value={student.institution?.name} />
            <Detail label="Phase" value={student.phase?.name} />
            <Detail label="Subgroup" value={student.subgroup?.name} />
            <Detail
              label="Created On"
              value={new Date(student.created_at).toLocaleDateString()}
            />
          </div>
        </CardContent>
      </Card>

      {/* ================= ASSIGN FEES ================= */}
      <Card className="max-w-3xl">
        <CardHeader>
          <CardTitle>Assign Fees</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee Structure */}
            <div className="space-y-1">
              <Label>Fee Structure</Label>
              <Select
                value={feeStructureId}
                onValueChange={setFeeStructureId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select fee structure" />
                </SelectTrigger>
                <SelectContent>
                  {feeStructures.map((fs) => (
                    <SelectItem key={fs.id} value={String(fs.id)}>
                      {fs.name} — ₹{fs.total_amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date */}
            <div className="space-y-1">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleAssignFees}
              disabled={assigning}
              className="w-fit"
            >
              {assigning ? "Assigning..." : "Assign Fees"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

export default ManageAssign;
