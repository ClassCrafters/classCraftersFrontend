import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchStudentsById } from "../../../store/slices/studentSlice";
import { selectStudentsByid } from "../../../store/selectors/studentSelectors";

import {
  getFeeAssignments,
  getFeeAssignmentById,
  collectFees,
} from "../../../store/slices/paymentSlice";
import { selectAssignPayments } from "../../../store/selectors/paymentSelectors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageCollect = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const studentResponse = useSelector(selectStudentsByid);
  const feeAssignment = useSelector(selectAssignPayments);
  console.log("Student Response:", feeAssignment);

  const student =
    studentResponse?.data?.registrations?.[0] || null;

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    amount: "",
    payment_mode: "",
    payment_date: "",
    note: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchStudentsById(id));
      dispatch(getFeeAssignments(id));
    }
  }, [id, dispatch]);

  const handleCollectFees = () => {
    const payload = {
      fee_assignment_id: feeAssignment?.data?.[0]?.id,
      amount: Number(form.amount),
      payment_mode: form.payment_mode,
      payment_date: form.payment_date,
      note: form.note,
    };

    dispatch(collectFees(payload));
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Manage Collect Fees</h1>

      {/* ================= STUDENT CARD ================= */}
      {student && (
        <Card>
          <CardHeader>
            <CardTitle>Student Details</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Roll Number</p>
              <p className="font-medium">{student.rollNumber}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant="outline">{student.status}</Badge>
            </div>

            <div>
              <p className="text-muted-foreground">Institution</p>
              <p className="font-medium">{student.institution?.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Phase</p>
              <p className="font-medium">{student.phase?.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Subgroup</p>
              <p className="font-medium">{student.subgroup?.name}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Previous School</p>
              <p className="font-medium">
                {student.custom_data?.previous_school || "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= FEE TABLE ================= */}
      {Array.isArray(feeAssignment?.data) && feeAssignment?.data.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Fee Assignment Details</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Total</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Outstanding</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {feeAssignment?.data?.map((fee) => (
                    <TableRow key={fee.id}>
                      <TableCell>{fee.total_amount ?? "—"}</TableCell>
                      <TableCell>{fee.due_amount ?? "—"}</TableCell>
                      <TableCell>{fee.outstanding_amount ?? "—"}</TableCell>

                      <TableCell>
                        <Badge variant="secondary">
                          {fee.status ?? "—"}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          onClick={() => setOpen(true)}
                        >
                          Collect Fees
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}


      {/* ================= COLLECT FEES MODAL ================= */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Collect Fees</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <Select
              value={form.payment_mode}
              onValueChange={(value) =>
                setForm({ ...form, payment_mode: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Payment Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="BANK">Net Banking</SelectItem>
                <SelectItem value="ONLINE">ONLINE</SelectItem>
                <SelectItem value="CHEQUE">Cheque</SelectItem>
                <SelectItem value="UPI">UPI</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={form.payment_date}
              onChange={(e) =>
                setForm({ ...form, payment_date: e.target.value })
              }
            />

            <Textarea
              placeholder="Note"
              value={form.note}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCollectFees}>
              Submit Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCollect;
