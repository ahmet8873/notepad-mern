import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://notepad-backend-r9il.onrender.com";
const initialState = {
  notes: [],
};

// create new note
export const createNote = createAsyncThunk(
  "notes/create",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(`${url}/api/notes`, text, config);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${url}/api/notes`, config);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete Note
export const deleteNote = createAsyncThunk(
  "notes/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `${url}/api/notes/${id}`,

        config
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })

      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })

      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.id
        );
      });
  },
});

export const { reset } = noteSlice.actions;

export default noteSlice.reducer;
