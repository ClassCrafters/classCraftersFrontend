import { useState } from "react";
import { useDispatch } from "react-redux";
import { issueBook, returnBook } from "@/store/slices/librarySlice";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const IssueReturn = () => {
  const dispatch = useDispatch();

  const [issueLoading, setIssueLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);

  const [issueForm, setIssueForm] = useState({
    studentId: "",
    bookId: "",
    dueDate: ""
  });

  const [returnForm, setReturnForm] = useState({
    issueId: ""
  });

  /* ================= ISSUE HANDLER ================= */
  const handleIssueChange = (e) => {
    setIssueForm({
      ...issueForm,
      [e.target.name]: e.target.value
    });
  };

  const handleIssueSubmit = async (e) => {
    e.preventDefault();
    setIssueLoading(true);

    await dispatch(issueBook({
      studentId: Number(issueForm.studentId),
      bookId: Number(issueForm.bookId),
      dueDate: new Date(issueForm.dueDate).toISOString()
    }));

    setIssueLoading(false);

    setIssueForm({
      studentId: "",
      bookId: "",
      dueDate: ""
    });
  };

  /* ================= RETURN HANDLER ================= */
  const handleReturnChange = (e) => {
    setReturnForm({
      ...returnForm,
      [e.target.name]: e.target.value
    });
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    setReturnLoading(true);

    await dispatch(returnBook({
      issueId: Number(returnForm.issueId)
    }));

    setReturnLoading(false);

    setReturnForm({
      issueId: ""
    });
  };

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">

      {/* ================= ISSUE BOOK CARD ================= */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            📖 Issue Book
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleIssueSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Student ID</Label>
              <Input
                type="number"
                name="studentId"
                value={issueForm.studentId}
                onChange={handleIssueChange}
                placeholder="Enter student ID"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Book ID</Label>
              <Input
                type="number"
                name="bookId"
                value={issueForm.bookId}
                onChange={handleIssueChange}
                placeholder="Enter book ID"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                name="dueDate"
                value={issueForm.dueDate}
                onChange={handleIssueChange}
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-2xl">
              {issueLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Issuing...
                </>
              ) : (
                "Issue Book"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>

      {/* ================= RETURN BOOK CARD ================= */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            🔄 Return Book
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleReturnSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Issue ID</Label>
              <Input
                type="number"
                name="issueId"
                value={returnForm.issueId}
                onChange={handleReturnChange}
                placeholder="Enter issue ID"
                required
              />
            </div>

            <Button
              type="submit"
              variant="secondary"
              className="w-full rounded-2xl"
            >
              {returnLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Returning...
                </>
              ) : (
                "Return Book"
              )}
            </Button>

          </form>
        </CardContent>
      </Card>

    </div>
  );
};

export default IssueReturn;
