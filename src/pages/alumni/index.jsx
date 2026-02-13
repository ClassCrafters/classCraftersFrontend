import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  createAlumni,
  getAllAlumnis,
  deleteAlumni,
} from "../../store/slices/alumniSlice";

import { selectAlumnis, selectAlumniLoading } from "../../store/selectors/alumniSelectors";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Alumni = () => {
  const dispatch = useDispatch();
  const alumnis = useSelector(selectAlumnis);
  const loading = useSelector(selectAlumniLoading);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    staffId: "",
    institutionId: "",
    alumniType: "",
    passOutYear: "",
    lastClass: "",
    currentStatus: "",
    currentOrg: "",
  });

  useEffect(() => {
    dispatch(getAllAlumnis());
  }, [dispatch]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    const numberFields = [
      "studentId",
      "staffId",
      "institutionId",
      "passOutYear",
    ];

    setFormData({
      ...formData,
      [name]: numberFields.includes(name)
        ? value === ""
          ? ""
          : Number(value)
        : value,
    });
  };

  // ================= HANDLE CREATE =================
  const handleCreate = () => {
    const payload = {
      ...formData,
      studentId:
        formData.alumniType === "STUDENT"
          ? Number(formData.studentId)
          : null,
      staffId:
        formData.alumniType === "STAFF"
          ? Number(formData.staffId)
          : null,
      institutionId: Number(formData.institutionId),
      passOutYear: Number(formData.passOutYear),
    };

    dispatch(createAlumni(payload));

    setOpen(false);

    setFormData({
      studentId: "",
      staffId: "",
      institutionId: "",
      alumniType: "",
      passOutYear: "",
      lastClass: "",
      currentStatus: "",
      currentOrg: "",
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteAlumni(id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Alumni Management
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Alumni</Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Alumni</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Alumni Type */}
              <Select
                value={formData.alumniType}
                onValueChange={(value) =>
                  setFormData({ ...formData, alumniType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Alumni Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="STAFF">Staff</SelectItem>
                </SelectContent>
              </Select>

              {/* Conditional Student */}
              {formData.alumniType === "STUDENT" && (
                <Input
                  type="number"
                  name="studentId"
                  placeholder="Student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                />
              )}

              {/* Conditional Staff */}
              {formData.alumniType === "STAFF" && (
                <Input
                  type="number"
                  name="staffId"
                  placeholder="Staff ID"
                  value={formData.staffId}
                  onChange={handleChange}
                />
              )}

              <Input
                type="number"
                name="institutionId"
                placeholder="Institution ID"
                value={formData.institutionId}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="passOutYear"
                placeholder="Pass Out Year"
                value={formData.passOutYear}
                onChange={handleChange}
              />

              <Input
                name="lastClass"
                placeholder="Last Class"
                value={formData.lastClass}
                onChange={handleChange}
              />

              <Input
                name="currentStatus"
                placeholder="Current Status"
                value={formData.currentStatus}
                onChange={handleChange}
              />

              <Input
                name="currentOrg"
                placeholder="Current Organization"
                value={formData.currentOrg}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleCreate}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* ================= TABLE ================= */}
      <Card>
        <CardHeader>
          <CardTitle>Alumni List</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="rounded-xl border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Pass Out</TableHead>
                    <TableHead>Last Class</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead className="text-right">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {alumnis?.map((alumni) => (
                    <TableRow key={alumni.id}>
                      <TableCell>{alumni.id}</TableCell>
                      <TableCell>{alumni.alumniType}</TableCell>
                      <TableCell>{alumni.passOutYear}</TableCell>
                      <TableCell>{alumni.lastClass}</TableCell>
                      <TableCell>{alumni.currentStatus}</TableCell>
                      <TableCell>{alumni.currentOrg}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(alumni.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {alumnis?.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center text-muted-foreground"
                      >
                        No alumni found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alumni;
