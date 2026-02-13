import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as libraryService from "../services/libraryService";

// Create Book
export const createBook = createAsyncThunk(
    "library/createBook",
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await libraryService.createBook(bookData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get All Books
export const getBooks = createAsyncThunk(
    "library/getBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await libraryService.getBooks();
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete Book
export const deleteBook = createAsyncThunk(
    "library/deleteBook",
    async (id, { rejectWithValue }) => {
        try {
            await libraryService.deleteBook(id);
            return id; // ✅ return the deleted book id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Issue Book
export const issueBook = createAsyncThunk(
    "library/issueBook",
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await libraryService.issueBook(bookData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Return Book
export const returnBook = createAsyncThunk(
    "library/returnBook",
    async (bookData, { rejectWithValue }) => {
        try {
            const response = await libraryService.returnBook(bookData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const librarySlice = createSlice({
    name: "library",
    initialState: {
        books: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.books = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload);
            })
            .addCase(createBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = Array.isArray(action.payload.books)
                    ? action.payload.books
                    : [];
            })

            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.filter(
                    (book) => book.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Issue
        builder
            .addCase(issueBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(issueBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.map((book) =>
                    book.id === action.payload.bookId ? action.payload : book
                );
            })
            .addCase(issueBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Return
        builder
            .addCase(returnBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(returnBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books = state.books.map((book) =>
                    book.id === action.payload.bookId ? action.payload : book
                );
            })
            .addCase(returnBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = librarySlice.actions;
export default librarySlice.reducer;