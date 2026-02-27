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
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Exam Results</h1>

      {/* Create Result */}
      <Card>
        <CardHeader>
          <CardTitle>Add Exam Result</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreateResult}
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
              placeholder="Student ID"
              value={formData.studentId}
              onChange={(e) =>
                handleChange("studentId", e.target.value)
              }
            />

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
              placeholder="Marks Obtained"
              value={formData.marksObtained}
              onChange={(e) =>
                handleChange("marksObtained", e.target.value)
              }
            />

            <div className="md:col-span-2 flex gap-4">
              <Button type="submit" className="w-full">
                Add Result
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleFetchResults}
                className="w-full"
              >
                Fetch Results
              </Button>
            </div>
          </form>

          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Results List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}

          {!loading && results?.length === 0 && (
            <p>No results found.</p>
          )}

          {!loading && results?.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border rounded-xl">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-3 text-left">Student</th>
                    <th className="p-3 text-left">Subject</th>
                    <th className="p-3 text-left">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr
                      key={result.id}
                      className="border-t hover:bg-muted/50"
                    >
                      <td className="p-3">
                        {result.studentId}
                      </td>
                      <td className="p-3">
                        {result.subjectId}
                      </td>
                      <td className="p-3 font-semibold">
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