import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  applyLeave,
  getAllLeaves,
  reviewLeave,
  cancelLeave,
} from "@/store/slices/leaveSlice";

import {
  selectLeaves,
  selectLeavesLoading,
  selectLeavesError,
} from "@/store/selectors/leaveSelectors";

export default function LeaveManagement() {
  const dispatch = useDispatch();

  const leaves = useSelector(selectLeaves);
  // console.log("Leaves:", leaves);
  const loading = useSelector(selectLeavesLoading);
  const error = useSelector(selectLeavesError);

  const [open, setOpen] = useState(false);

  /* ---------------- Form State ---------------- */
  const [formData, setFormData] = useState({
    leaveType: "",
    applyDate: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "PENDING",
    document: null,
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- Fetch Leaves ---------------- */
  useEffect(() => {
    dispatch(getAllLeaves());
  }, [dispatch]);

  /* ---------------- Apply Leave ---------------- */
  const handleSubmit = async () => {
    const { leaveType, applyDate, startDate, endDate } = formData;

    if (!leaveType || !applyDate || !startDate || !endDate) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await dispatch(applyLeave(formData)).unwrap();
      toast.success("Leave applied successfully");

      setFormData({
        leaveType: "",
        applyDate: "",
        startDate: "",
        endDate: "",
        reason: "",
        status: "PENDING",
        document: null,
      });

      setOpen(false);
      dispatch(getAllLeaves());
    } catch (err) {
      toast.error(err || "Failed to apply leave");
    }
  };

  /* ---------------- Approve / Reject ---------------- */
  const handleReview = async (id, status) => {
    try {
      await dispatch(reviewLeave({ id, status })).unwrap();
      toast.success(`Leave ${status.toLowerCase()} successfully`);
      dispatch(getAllLeaves());
    } catch (err) {
      toast.error(err || "Failed to update leave status");
    }
  };

  /* ---------------- Delete Leave ---------------- */
  const handleDelete = async (id) => {
    try {
      await dispatch(cancelLeave({ id })).unwrap();
      toast.success("Leave deleted successfully");
      dispatch(getAllLeaves());
    } catch (err) {
      toast.error(err || "Failed to delete leave");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= Header ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Leave Management</h1>

        {/* Add Leave Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Leave</Button>
          </DialogTrigger>

          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Add Leave</DialogTitle>
            </DialogHeader>

            <Card className="border-none shadow-none">
              <CardContent className="p-0 space-y-6">
                {/* Leave Type */}
                <div>
                  <Label>Leave Type *</Label>
                  <Select
                    value={formData.leaveType}
                    onValueChange={(v) =>
                      handleChange("leaveType", v)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SICK">Sick</SelectItem>
                      <SelectItem value="CASUAL">Casual</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="UNPAID">Unpaid</SelectItem>
                      <SelectItem value="EMERGENCY">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <Label>Apply Date *</Label>
                    <Input
                      type="date"
                      value={formData.applyDate}
                      onChange={(e) =>
                        handleChange("applyDate", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>From Date *</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        handleChange("startDate", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>To Date *</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        handleChange("endDate", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Reason */}
                <div>
                  <Label>Reason</Label>
                  <Textarea
                    value={formData.reason}
                    onChange={(e) =>
                      handleChange("reason", e.target.value)
                    }
                  />
                </div>

                {/* Status */}
                <div>
                  <Label>Status *</Label>
                  <RadioGroup
                    value={formData.status}
                    onValueChange={(v) =>
                      handleChange("status", v)
                    }
                    className="flex gap-6 mt-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="PENDING" />
                      <Label>Pending</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="APPROVED" />
                      <Label>Approved</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="REJECTED" />
                      <Label>Rejected</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </div>

      {/* ================= Leaves Table ================= */}
      <div className="border rounded overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Applied By</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Leave Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leaves?.data?.leaves?.length === 0 && (
              <TableRow>
                <TableCell colSpan="6" className="text-center py-6">
                  No leave records found
                </TableCell>
              </TableRow>
            )}

            {leaves?.data?.leaves?.map((leave, index) => (
              <TableRow key={leave.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{leave.applicant?.name ?? "-"}</TableCell>
                <TableCell>{leave.reviewedBy?.name ?? "-"}</TableCell>

                <TableCell>{leave.leaveType}</TableCell>

                <TableCell>{(leave.startDate).slice(0, 10)}</TableCell>
                <TableCell>{(leave.endDate).slice(0, 10)}</TableCell>
                {/* <TableCell>{leave.endDate}</TableCell> */}
                <TableCell>
                  <Badge
                    variant={
                      leave.status === "APPROVED"
                        ? "success"
                        : leave.status === "REJECTED"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {leave.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  {leave.status === "PENDING" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleReview(leave.id, "APPROVED")
                        }
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          handleReview(leave.id, "REJECTED")
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(leave.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
