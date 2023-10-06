import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux-toolkit/authSlice";
import noteReducer from "../redux-toolkit/noteSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: noteReducer,
  },
});
