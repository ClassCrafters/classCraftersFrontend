import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExamResult,
  getExamResults,
  getExams,
} from "@/store/slices/examSlice";

import {
  selectExamResults,
  selectExamResultsLoading,
  selectExamResultsError,
  selectExamGroups,
} from "@/store/selectors/examSelectors";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ExamResult = () => {
  const dispatch = useDispatch();

  const results = useSelector(selectExamResults);
  const loading = useSelector(selectExamResultsLoading);
  const error = useSelector(selectExamResultsError);
  const exams = useSelector(selectExamGroups);

  const [examId, setExamId] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    marksObtained: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    dispatch(getExams());
  }, [dispatch]);

  useEffect(() => {
    if (examId) {
      dispatch(getExamResults(Number(examId)));
    }
  }, [dispatch, examId]);

  const handleCreateResult = async (e) => {
    e.preventDefault();

    await dispatch(
      createExamResult({
        examId: Number(examId),
        resultData: {
          studentId: Number(formData.studentId),
          subjectId: Number(formData.subjectId),
          marksObtained: Number(formData.marksObtained),
        },
      })
    );

    setFormData({
      studentId: "",
      subjectId: "",
      marksObtained: "",
    });

    dispatch(getExamResults(Number(examId)));
  };

  const handleFetchResults = () => {
    if (!examId) return;
    dispatch(getExamResults(Number(examId)));
  };

  return (
    <div className="p-10 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">
        Exam Results
      </h1>

      {/* Create Result Card */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Add Exam Result</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleCreateResult}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Exam Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Select Exam
              </label>
              <select
                className="w-full h-10 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
                required
              >
                <option value="">-- Choose Exam --</option>
                {exams?.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Student ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Student ID
              </label>
              <Input
                type="number"
                placeholder="Enter Student ID"
                value={formData.studentId}
                onChange={(e) =>
                  handleChange("studentId", e.target.value)
                }
              />
            </div>

            {/* Subject ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Subject ID
              </label>
              <Input
                type="number"
                placeholder="Enter Subject ID"
                value={formData.subjectId}
                onChange={(e) =>
                  handleChange("subjectId", e.target.value)
                }
              />
            </div>

            {/* Marks */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Marks Obtained
              </label>
              <Input
                type="number"
                placeholder="Enter Marks"
                value={formData.marksObtained}
                onChange={(e) =>
                  handleChange("marksObtained", e.target.value)
                }
              />
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex justify-end gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleFetchResults}
                className="min-w-[150px]"
              >
                Fetch Results
              </Button>

              <Button
                type="submit"
                className="min-w-[150px]"
              >
                Add Result
              </Button>
            </div>
          </form>

          {error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Results List</CardTitle>
        </CardHeader>

        <CardContent>
          {loading && (
            <p className="text-sm text-muted-foreground">
              Loading results...
            </p>
          )}

          {!loading && results?.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No results found.
            </p>
          )}

          {!loading && results?.length > 0 && (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">
                      Student ID
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Subject ID
                    </th>
                    <th className="px-4 py-3 text-left font-medium">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.id}
                      className="border-t hover:bg-muted/50 transition"
                    >
                      <td className="px-4 py-3">
                        {result.studentId}
                      </td>
                      <td className="px-4 py-3">
                        {result.subjectId}
                      </td>
                      <td className="px-4 py-3 font-semibold">
                        {result.marksObtained}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamResult;