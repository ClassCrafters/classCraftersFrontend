import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExam, getExams } from "@/store/slices/examSlice";
import {
  selectExamGroups,
  selectExamGroupsLoading,
  selectExamGroupsError,
} from "@/store/selectors/examSelectors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

const ExamGroup = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const exams = useSelector(selectExamGroups);
  console.log("Exam Groups:", exams);
  const loading = useSelector(selectExamGroupsLoading);
  const error = useSelector(selectExamGroupsError);

  const [formData, setFormData] = useState({
    name: "",
    examType: "",
    boardId: "",
    academicYearId: "",
    createdById: 1,
  });

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      createExam({
        ...formData,
        boardId: Number(formData.boardId),
        academicYearId: Number(formData.academicYearId),
        createdById: Number(formData.createdById),
      })
    );

    if (result.payload?.success || result.payload?.exam) {
      setFormData({
        name: "",
        examType: "",
        boardId: "",
        academicYearId: "",
        createdById: 1,
      });
      setOpen(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Exam Groups</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="">Add Exam Group</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[600px] rounded-2xl">
            <DialogHeader>
              <DialogTitle>Create New Exam Group</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new exam group.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Exam Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Exam Name</Label>
                <Input
                  id="name"
                  placeholder="Final Board Examination 2026"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              {/* Exam Type */}
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select
                  value={formData.examType}
                  onValueChange={(value) => handleChange("examType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UNIT_TEST">Unit Test</SelectItem>
                    <SelectItem value="MIDTERM">Mid Term</SelectItem>
                    <SelectItem value="FINAL">Final</SelectItem>
                    <SelectItem value="BOARD">Board</SelectItem>
                    <SelectItem value="PRACTICAL">Practical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Board ID */}
              <div className="space-y-2">
                <Label htmlFor="boardId">Board ID</Label>
                <Input
                  id="boardId"
                  type="number"
                  placeholder="e.g., 1"
                  value={formData.boardId}
                  onChange={(e) => handleChange("boardId", e.target.value)}
                  required
                />
              </div>

              {/* Academic Year ID */}
              <div className="space-y-2">
                <Label htmlFor="academicYearId">Academic Year ID</Label>
                <Input
                  id="academicYearId"
                  type="number"
                  placeholder="e.g., 1"
                  value={formData.academicYearId}
                  onChange={(e) =>
                    handleChange("academicYearId", e.target.value)
                  }
                  required
                />
              </div>

              {/* Created By ID */}
              <div className="space-y-2">
                <Label htmlFor="createdById">Created By ID</Label>
                <Input
                  id="createdById"
                  type="number"
                  placeholder="e.g., 1"
                  value={formData.createdById}
                  onChange={(e) =>
                    handleChange("createdById", e.target.value)
                  }
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Exam"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Exam List */}
      <Card>
        <CardHeader>
          <CardTitle>All Exam Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-center py-8">Loading...</p>}

          {exams && exams.length > 0 ? (
            <div className="space-y-3">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-base">{exam.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Type: <span className="font-medium">{exam.examType}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Board ID: {exam.boardId} | Academic Year ID:{" "}
                      {exam.academicYearId}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No exam groups created yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamGroup;