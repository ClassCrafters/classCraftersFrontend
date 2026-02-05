import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, EllipsisVertical, ChartNoAxesCombined } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  createClassroom,
  getClassroom,
  updateClassroom,
  deleteClassroom,
} from "@/store/slices/classRoomSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClassroomPage() {
  const dispatch = useDispatch();
  const { classrooms, loading, error } = useSelector((state) => state.classroom);
  const [open, setOpen] = useState(false); // create modal
  const [editOpen, setEditOpen] = useState(false); // edit modal
  const [selectedClass, setSelectedClass] = useState(null);
  console.log("selectedClass:", selectedClass);

  const [classes, setClasses] = useState({
    name: "",
    description: "",
    teacherId: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      const resultAction = await dispatch(getClassroom());
      console.log("Redux getClassroom result:", resultAction);
    };
    fetchClasses();
  }, [dispatch]);

  // Create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createClassroom(classes)).unwrap();
      console.log("Selected Class:", selectedClass);
      setClasses({ name: "", subject: "", description: "", teacherId: 1 });
      setOpen(false);
      toast.success("🎉 Classroom successfully added!");
      dispatch(getClassroom());
    } catch {
      toast.error("❌ Failed to add classroom. Try again!");
    }
  };

  // Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateClassroom(selectedClass)).unwrap();
      setEditOpen(false);
      toast.success("✏️ Classroom updated!");
      dispatch(getClassroom());
    } catch {
      toast.error("❌ Failed to update classroom.");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteClassroom(id)).unwrap();
      toast.success("🗑️ Classroom deleted!");
      dispatch(getClassroom());
    } catch {
      toast.error("❌ Failed to delete classroom.");
    }
  };

  return (
    <div className="container p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header Card */}
      <Card className="shadow-xl rounded-2xl border border-gray-200">
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/classroom.png"
              alt="Classroom"
              className="w-12 h-12 object-cover rounded-lg"
            />
            <CardTitle className="text-xl font-bold">Classroom</CardTitle>
          </div>

          {/* Add Classroom Button */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <img src="/mdi-light_plus.png" alt="Add" className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Enter the details of the class you want to create.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-4">
                <Input
                  placeholder="Class Name"
                  value={classes.name}
                  onChange={(e) =>
                    setClasses({ ...classes, name: e.target.value })
                  }
                />
          
                <Input
                  placeholder="Description"
                  value={classes.description}
                  onChange={(e) =>
                    setClasses({ ...classes, description: e.target.value })
                  }
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Adding..." : "Add Class"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
      </Card>

      {/* Green Promo Card */}
      <div className="mt-6">
        <Card className="shadow-xl rounded-2xl border border-gray-200 h-50 w-full bg-[#65A972]">
          <CardHeader className="flex justify-end">
            <CardTitle className="text-xl font-bold text-white">
              <Button
                variant="outline"
                className="bg-transparent hover:translate-x-1 transition-transform"
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h2 className="text-2xl font-afacad text-white mb-2">
                  Transforming Learning into Lifelong Impact
                </h2>
                <h3 className="text-white font-allison">- class crafters</h3>
              </div>
              <div className="flex items-center">
                <img src="/pattern1.png" alt="Pattern" className="w-60 h-30" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Class Cards */}
      <div className="flex flex-wrap gap-6 mt-6">
        {classrooms && classrooms.map((cls) => (
          <Card
            key={cls.id}
            className="shadow-xl rounded-2xl border border-gray-200 h-70 w-69 bg-[#EDEDED]"
          >
            <CardHeader>
              <img
                src="/backgroundCardSection.png"
                alt="Classroom"
                className="w-full h-full object-cover rounded-tl-2xl rounded-tr-2xl"
              />
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-bold">{cls.name}</h3>
              <p className="text-sm text-gray-600">{cls.subject}</p>
              <hr className="my-4 border-gray-300" />
              <div className="flex justify-end items-end space-x-2">
                <Button
                  variant="outline"
                  className="bg-transparent hover:translate-x-1 transition-transform"
                  onClick={() => navigate(`/manage-classrooms/${cls.id}`)}
                >
                  <ChartNoAxesCombined className="w-6 h-6 text-gray-500" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-transparent hover:translate-x-1 transition-transform"
                    >
                      <EllipsisVertical className="w-6 h-6 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedClass(cls);
                        setEditOpen(true);
                      }}
                    >
                      ✏️ Edit Class
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => handleDelete(cls.id)}>
                      🗑️ Delete Class
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Class Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
          </DialogHeader>
          {selectedClass && (
            <form onSubmit={handleUpdate} className="space-y-4 mt-4">
              <Input
                placeholder="Class Name"
                value={selectedClass.name}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, name: e.target.value })
                }
              />
              <Input
                placeholder="Subject"
                value={selectedClass.subject}
                onChange={(e) =>
                  setSelectedClass({ ...selectedClass, subject: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={selectedClass.description}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    description: e.target.value,
                  })
                }
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Class"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
