import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExamSchedule, getExamSchedule, getExams } from "@/store/slices/examSlice";
import { selectExamSchedule, selectExamScheduleLoading, selectExamScheduleError, selectExamGroups, selectExamGroupsLoading, selectExamGroupsError } from "@/store/selectors/examSelectors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ExamSchedule = () => {
  const dispatch = useDispatch();

  const exams = useSelector(selectExamGroups);
//   const examsStatus = useSelector(selectExamGroupsStatus);
  const schedule = useSelector(selectExamSchedule);
  const loadingSchedule = useSelector(selectExamScheduleLoading);
  const scheduleError = useSelector(selectExamScheduleError);

  const [examId, setExamId] = useState("");
  const [formData, setFormData] = useState({
    subjectId: "",
    maxMarks: "",
    internalMarks: "",
    externalMarks: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // fetch schedule when examId selection changes
  useEffect(() => {
    if (examId) {
      dispatch(getExamSchedule(Number(examId)));
    }
  }, [dispatch, examId]);

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  useEffect(() => {
    if (exams && exams.length === 1) {
      setExamId(exams[0].id);
    }
  }, [exams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(
      createExamSchedule({
        examId: Number(examId),
        scheduleData: {
          subjectId: Number(formData.subjectId),
          maxMarks: Number(formData.maxMarks),
          internalMarks: Number(formData.internalMarks),
          externalMarks: Number(formData.externalMarks),
        },
      })
    );

    // Reset
    setFormData({
      subjectId: "",
      maxMarks: "",
      internalMarks: "",
      externalMarks: "",
    });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exam Schedule</h1>

      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Create Exam Schedule</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Select Exam</label>
              <select
                className="w-full border rounded px-2 py-1"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                required
              >
                <option value="">-- choose exam --</option>
                {exams.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              type="number"
              placeholder="Subject ID"
              value={formData.subjectId}
              onChange={(e) =>
                handleChange("subjectId", e.target.value)
              }
            />

            <Input
              type="number"
              placeholder="Max Marks"
              value={formData.maxMarks}
              onChange={(e) =>
                handleChange("maxMarks", e.target.value)
              }
            />

            <Input
              type="number"
              placeholder="Internal Marks"
              value={formData.internalMarks}
              onChange={(e) =>
                handleChange("internalMarks", e.target.value)
              }
            />

            <Input
              type="number"
              placeholder="External Marks"
              value={formData.externalMarks}
              onChange={(e) =>
                handleChange("externalMarks", e.target.value)
              }
            />

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Create Schedule
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* existing schedules for exam */}
      {loadingSchedule && <p className="mt-4">Loading schedule...</p>}
      {scheduleError && <p className="mt-4 text-red-500">{scheduleError}</p>}
      {schedule && schedule.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {schedule.map((item) => (
                <li key={item.id} className="border p-3 rounded">
                  Subject: {item.subjectId}, Max: {item.maxMarks}, Internal: {item.internalMarks}, External: {item.externalMarks}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExamSchedule;