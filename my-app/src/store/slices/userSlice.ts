import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { iUser } from "../../types";

export interface UsersState {
  users: iUser[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<iUser[]>) => {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    addUser: (state, action: PayloadAction<iUser>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<iUser>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    deleteUsers: (state, action: PayloadAction<number[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.id)
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  deleteUsers,
  setLoading,
  setError,
} = userSlice.actions;
export default userSlice.reducer;
