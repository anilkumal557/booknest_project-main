// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const bookSlice = createSlice({
//     name: "book",
//     initialState: {
//         loading: false,
//         error: null,
//         message: null,
//         books: [],
//     },
//     reducers: {
//         fetchBooksRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         fetchBooksSuccess(state, action) {
//             state.loading = false;
//             state.books = action.payload;
//         },
//         fetchBooksFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;
//             state.message = null;
//         },
//         addBookRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         addBookSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload;
//         },
//         addBookFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         // NEW: Reducers for updating a book
//         updateBookRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         updateBookSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload;
//             // Optionally, update the book in the state if your backend returns the updated book
//             // Or, more commonly, trigger a re-fetch of all books after success in the component.
//         },
//         updateBookFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;
//             state.message = null;
//         },
//         // NEW: Reducers for deleting a book
//         deleteBookRequest(state) {
//             state.loading = true;
//             state.error = null;
//             state.message = null;
//         },
//         deleteBookSuccess(state, action) {
//             state.loading = false;
//             state.message = action.payload.message; // Assuming message comes from action.payload.message
//             // Remove the deleted book from the state
//             state.books = state.books.filter(book => book._id !== action.payload.bookId); // Assuming bookId is sent with payload
//         },
//         deleteBookFailed(state, action) {
//             state.loading = false;
//             state.error = action.payload;
//             state.message = null;
//         },

//         resetBookSlice(state) {
//             state.error = null;
//             state.message = null;
//             state.loading = false;
//         },
//     }
// }
// );

// export const fetchAllBooks = () => async (dispatch) => {
//     dispatch(bookSlice.actions.fetchBooksRequest());
//     await axios
//         .get("http://localhost:4000/api/v1/book/all", {
//             withCredentials: true,
//         })
//         .then((res) => {
//             dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books));
//         })
//         .catch((err) => {
//             dispatch(bookSlice.actions.fetchBooksFailed(err.response.data.message));
//         });
// };

// export const addBook = (data) => async (dispatch) => {
//     dispatch(bookSlice.actions.addBookRequest());
//     await axios
//         .post("http://localhost:4000/api/v1/book/admin/add", data, {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         .then((res) => {
//             dispatch(bookSlice.actions.addBookSuccess(res.data.message));
//         })
//         .catch((err) => {
//             dispatch(bookSlice.actions.addBookFailed(err.response.data.message));
//         });
// };

// // NEW: Action for updating a book
// export const updateBook = (id, bookData) => async (dispatch) => {
//     dispatch(bookSlice.actions.updateBookRequest());
//     try {
//         const { data } = await axios.put(`http://localhost:4000/api/v1/book/admin/update/${id}`, bookData, {
//             withCredentials: true,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         dispatch(bookSlice.actions.updateBookSuccess(data.message));
//     } catch (error) {
//         dispatch(bookSlice.actions.updateBookFailed(error.response.data.message));
//     }
// };

// export const deleteBook = (id) => async (dispatch) => {
//     dispatch(bookSlice.actions.deleteBookRequest());
//     try {
//         const { data } = await axios.delete(`http://localhost:4000/api/v1/book/delete/${id}`, {
//             withCredentials: true,
//         });

//         dispatch(bookSlice.actions.deleteBookSuccess({ message: data.message, bookId: id }));

//         return data.message; // ✅ Return message so React can show a toast
//     } catch (error) {
//         const errMsg = error?.response?.data?.message || "Failed to delete book";
//         dispatch(bookSlice.actions.deleteBookFailed(errMsg)); 
//         throw new Error(errMsg); // ✅ Throw so component can catch it
//     }
// };


// export const resetBookSlice = () => (dispatch) => {
//     dispatch(bookSlice.actions.resetBookSlice());
// };

// export default bookSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  message: null,
  books: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    // Fetch all books
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Add book
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update book
    updateBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Delete book
    deleteBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.books = state.books.filter(book => book._id !== action.payload.bookId);
    },
    deleteBookFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset state
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

// -----------------
// Async Actions
// -----------------

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/book/all", {
      withCredentials: true,
    });
    dispatch(bookSlice.actions.fetchBooksSuccess(data.books));
  } catch (err) {
    dispatch(bookSlice.actions.fetchBooksFailed(err.response?.data?.message || "Failed to fetch books"));
  }
};

export const addBook = (data) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const { res } = await axios.post("http://localhost:4000/api/v1/book/admin/add", data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(bookSlice.actions.addBookSuccess(res.data.message));
  } catch (err) {
    dispatch(bookSlice.actions.addBookFailed(err.response?.data?.message || "Failed to add book"));
  }
};

export const updateBook = (id, bookData) => async (dispatch) => {
  dispatch(bookSlice.actions.updateBookRequest());
  try {
    const { data } = await axios.put(`http://localhost:4000/api/v1/book/admin/update/${id}`, bookData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(bookSlice.actions.updateBookSuccess(data.message));
  } catch (error) {
    dispatch(bookSlice.actions.updateBookFailed(error.response?.data?.message || "Failed to update book"));
  }
};

export const deleteBook = (id) => async (dispatch) => {
  dispatch(bookSlice.actions.deleteBookRequest());
  try {
    const { data } = await axios.delete(`http://localhost:4000/api/v1/book/delete/${id}`, {
      withCredentials: true,
    });
    dispatch(bookSlice.actions.deleteBookSuccess({ message: data.message, bookId: id }));
    return data.message;
  } catch (error) {
    const errMsg = error?.response?.data?.message || "Failed to delete book";
    dispatch(bookSlice.actions.deleteBookFailed(errMsg));
    throw new Error(errMsg);
  }
};

// Reset state (call in components to clear messages/errors)
export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

// Export reducer
export default bookSlice.reducer;
