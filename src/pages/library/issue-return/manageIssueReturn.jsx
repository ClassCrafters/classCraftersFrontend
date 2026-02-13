import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { issueBook, returnBook, getBooksByStudent } from "@/store/slices/librarySlice";
import { useParams } from "react-router-dom";

import { selectBooksByStudent } from "@/store/selectors/librarySelectors";
import { selectLibrary } from "@/store/selectors/librarySelectors";
import { getBooks } from "../../../store/slices/librarySlice";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ManageIssueReturn = () => {
    const dispatch = useDispatch();
    const { studentId } = useParams();

    const issuedData = useSelector(selectBooksByStudent);
    const allBooks = useSelector(selectLibrary);
    console.log("all Books:", allBooks);


    const student = issuedData?.[0]?.student || null;
    const issuedBooks = issuedData || [];

    const [loading, setLoading] = useState(false);

    const [issueForm, setIssueForm] = useState({
        bookId: "",
        dueDate: ""
    });

    // Determine effective studentId: prefer route param, fallback to fetched student id
    const effectiveStudentId = studentId || (issuedData && issuedData[0] && (issuedData[0].student?.id || issuedData[0].student_id));

    /* ================= FETCH BOOKS ================= */
    useEffect(() => {
        if (studentId) {
            dispatch(getBooksByStudent(studentId));
        }
        dispatch(getBooks());
    }, [dispatch, studentId]);

    /* ================= ISSUE ================= */
    const handleIssueChange = (e) => {
        setIssueForm({
            ...issueForm,
            [e.target.name]: e.target.value
        });
    };

    const handleIssueSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const issueForm2 = {
            ...issueForm,
            dueDate: new Date(issueForm.dueDate).toISOString()
        };
        // Ensure studentId and numeric bookId are sent at top-level
        const payload = {
            studentId: Number(effectiveStudentId),
            bookId: Number(issueForm2.bookId),
            dueDate: issueForm2.dueDate
        };
        // console.log('Issuing payload', payload);
        await dispatch(issueBook(payload));

        dispatch(getBooksByStudent(studentId));

        setIssueForm({
            bookId: "",
            dueDate: ""
        });

        setLoading(false);
    };

    /* ================= RETURN ================= */
    const handleReturn = async (issueId) => {
        await dispatch(returnBook(issueId));
        dispatch(getBooksByStudent(studentId));
    };

    return (
        <div className="p-6 space-y-6">

            {/* ================= STUDENT DETAILS ================= */}
            {student && (
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle>🎓 Student Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                        <div><strong>Name:</strong> {student.name}</div>
                        <div><strong>Email:</strong> {student.email}</div>
                        <div><strong>Roll No:</strong> {student.rollNumber}</div>
                    </CardContent>
                </Card>
            )}

            {/* ================= ISSUE BOOK CARD ================= */}
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle>📖 Issue Book</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleIssueSubmit} className="grid md:grid-cols-3 gap-4 items-end">

                        <div className="space-y-2">
                            <Label>Book ID</Label>
                            <Select
                                value={issueForm.bookId}
                                onValueChange={(value) =>
                                    setIssueForm((prev) => ({
                                        ...prev,
                                        bookId: value
                                    }))
                                }

                                name="bookId"
                                required

                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Book" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allBooks.map((book) => (
                                        <SelectItem key={book.id} value={book.id.toString()}>
                                            {book.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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

                        <Button type="submit" className="rounded-2xl">
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                    Issuing...
                                </>
                            ) : (
                                "Issue"
                            )}
                        </Button>

                    </form>
                </CardContent>
            </Card>

            {/* ================= ISSUED BOOK TABLE ================= */}
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle>📚 Issued Books</CardTitle>
                </CardHeader>

                <CardContent>

                    {issuedBooks.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                            No books issued.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Book</TableHead>
                                    <TableHead>Author</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {issuedBooks.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.book.title}</TableCell>
                                        <TableCell>{item.book.author}</TableCell>
                                        <TableCell>
                                            {new Date(item.issueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(item.dueDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            {item.returnDate ? (
                                                <span className="text-green-600">Returned</span>
                                            ) : (
                                                <span className="text-red-500">Issued</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {!item.returnDate && (
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => handleReturn(item.id)}
                                                >
                                                    Return
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}

                </CardContent>
            </Card>

        </div>
    );
};

export default ManageIssueReturn;
