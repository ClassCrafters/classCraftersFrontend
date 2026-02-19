import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignStudentTransport,
  getStudentTransport
} from "@/store/slices/transportSlice";
import { fetchStudents } from "../../store/slices/studentSlice";

import { selectStudentTransports } from "@/store/selectors/transportSelectors";
import { selectStudents } from "@/store/selectors/studentSelectors";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { getRoutes } from "../../store/slices/transportSlice";
import { selectRoutes } from "../../store/selectors/transportSelectors";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AssignStudents = () => {

  const dispatch = useDispatch();
  const studentTransport = useSelector(selectStudentTransports);
  const students = useSelector(selectStudents);
  const routes = useSelector(selectRoutes);
  const { loading, error } = useSelector((state) => state.transport);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    studentId: "",
    routeId: "",
    stopId: "",
    pickupPoint: "",
    dropPoint: ""
  });

  useEffect(() => {
    dispatch(getStudentTransport());
    dispatch(fetchStudents());
    dispatch(getRoutes());
  }, [dispatch]);

  // ✅ Submit with Try Catch + Toast
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        studentId: Number(formData.studentId),
        routeId: Number(formData.routeId),
        stopId: Number(formData.stopId),
        pickupPoint: formData.pickupPoint,
        dropPoint: formData.dropPoint
      };

      await dispatch(assignStudentTransport(payload)).unwrap();

      dispatch(getStudentTransport());

      toast({
        title: "Success",
        description: "Student assigned successfully 🧑‍🎓",
      });

      setOpen(false);

      setFormData({
        studentId: "",
        routeId: "",
        stopId: "",
        pickupPoint: "",
        dropPoint: ""
      });

    } catch (error) {

      toast({
        title: "Error",
        description: error?.message || "Failed to assign student",
        variant: "destructive",
      });

    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Assign Students to Transport
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              Assign Student
            </Button>
          </DialogTrigger>

          {/* Modal */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Student</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-3">

              <div>
                <label className="text-sm font-medium">
                  Student
                </label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Student" />
                    </SelectTrigger>
                    <SelectContent>
                        {students.map((student) => (
                            <SelectItem key={student.id} value={String(student.id)}>
                                {student.student.firstName} {student.student.lastName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                   
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Route
                </label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Route" />
                    </SelectTrigger>
                    <SelectContent>
                        {routes?.map((route) => (
                            <SelectItem key={route.id} value={String(route.id)}>
                                {route.routeName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    
                </Select>

              </div>


              <div>
                <label className="text-sm font-medium">
                  Stop ID
                </label>
                <Input
                  type="number"
                  value={formData.stopId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stopId: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Pickup Point
                </label>
                <Input
                  value={formData.pickupPoint}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pickupPoint: e.target.value
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium">
                  Drop Point
                </label>
                <Input
                  value={formData.dropPoint}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dropPoint: e.target.value
                    })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>

            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Route</TableHead>
              <TableHead>Stop</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Drop</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {studentTransport?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.studentId}</TableCell>
                <TableCell>{item.route.routeName}</TableCell>
                <TableCell>{item.stop.stopName}</TableCell>
                <TableCell>{item.pickupPoint}</TableCell>
                <TableCell>{item.dropPoint}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </div>
  );
};

export default AssignStudents;
