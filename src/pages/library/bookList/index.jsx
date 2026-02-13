import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, deleteBook, createBook } from "@/store/slices/librarySlice";

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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Loader2, Trash2 } from "lucide-react";

import {
  selectLibrary,
  selectLibraryLoading,
  selectLibraryError
} from "@/store/selectors/librarySelectors";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectLibrary);
  const loading = useSelector(selectLibraryLoading);
  const error = useSelector(selectLibraryError);

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    totalCopies: ""
  });

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createBook({
      ...formData,
      totalCopies: Number(formData.totalCopies)
    }));

    dispatch(getBooks()); // refresh list

    setFormData({
      title: "",
      author: "",
      category: "",
      totalCopies: ""
    });

    setOpen(false);
  };

  return (
    <div className="p-6 space-y-6">

      <Card className="rounded-2xl shadow-md">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-2xl font-semibold">
            📚 Library Books
          </CardTitle>

          {/* Create Book Modal */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-2xl">
                ➕ Add Book
              </Button>
            </DialogTrigger>

            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Create New Book</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Total Copies</Label>
                  <Input
                    type="number"
                    name="totalCopies"
                    value={formData.totalCopies}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full rounded-2xl">
                  Create Book
                </Button>

              </form>
            </DialogContent>
          </Dialog>

        </CardHeader>

        <CardContent>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="animate-spin h-6 w-6 mr-2" />
              Loading books...
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-red-500 text-center py-4">
              {error}
            </div>
          )}

          {/* Table */}
          {!loading && books?.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">
                      {book.title}
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.totalCopies}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          book.available > 0
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {book.available}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(book.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* Empty State */}
          {!loading && books?.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No books available.
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default BookList;
