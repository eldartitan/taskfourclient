import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://colossal-wool-production.up.railway.app/api";
// const API_URL = "http://localhost:3001/api";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/users`, { withCredentials: true })
        .then((res) => res);
      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postLogin = createAsyncThunk(
  "user/postLogin",
  async function (data, { rejectWithValue }) {
    console.log("START LOGIN");
    try {
      const response = await axios
        .post(`${API_URL}/auth/login`, data, {
          withCredentials: true,
        })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
      console.log(response);

      if (![200, 201].includes(response.status)) {
        throw new Error(response.message || "Server error");
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postLogout = createAsyncThunk(
  "user/postLogout",
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios
        .get(`${API_URL}/auth/logout`, {
          withCredentials: true,
        })
        .then((res) => res);
      console.log(response.statusText);

      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postRegister = createAsyncThunk(
  "user/postRegister",
  async function (data, { rejectWithValue }) {
    try {
      const response = await axios
        .post(`${API_URL}/auth/register`, data, {
          withCredentials: true,
        })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
      console.log(response);

      if (![200, 201].includes(response.status)) {
        throw new Error(response.message || "Server error");
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postBlock = createAsyncThunk(
  "user/postBlock",
  async function (data, { rejectWithValue }) {
    console.log("BLOCK");
    try {
      const response = await axios
        .post(`${API_URL}/users/block`, data, { withCredentials: true })
        .then((res) => res)
        .catch((err) => {
          console.log(err);
          return err.response.data;
        });
      console.log(response);

      if (![200, 201].includes(response.status)) {
        throw new Error(response.message || "Server error");
      }
      return { data: response.data, block: data.block };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRemove = createAsyncThunk(
  "user/deleteRemove",
  async function (data, { rejectWithValue }) {
    console.log("REMOVE");
    try {
      const response = await axios
        .post(`${API_URL}/users/remove`, data, { withCredentials: true })
        .then((res) => res);
      console.log(response.statusText);
      console.log(response);

      if (![200, 201].includes(response.status)) {
        throw new Error("Server Error!");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  loading: null,
  error: null,
  status: false,
  logId: null,
  check: [],
};

function isError(action) {
  return action.type.endsWith("rejected");
}

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCheck: (state, action) => {
      state.check = action.payload;
    },
    setError: (state, action) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(postRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = "reg";
      })
      .addCase(postLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.status = "log";
        console.log(action.payload)
        state.logId = action.payload.data;
      })
      .addCase(postLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.status = false;
        state.users = null;
        state.logId = null;
      })
      .addCase(postBlock.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postBlock.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(state.check);
        state.users = state.users?.map((f) => {
          if (state.check.includes(f._id)) f.blocked = action.payload.block;
          return f;
        });
        state.check = [];
      })
      .addCase(deleteRemove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRemove.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // if (state.check.includes(state?.logId)) state.status = null
        state.check.forEach((el) => {
          state.users = state.users?.filter((f) => f._id !== el);
        });
        state.check = [];
      })
      .addMatcher(isError, (state, action) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setCheck, setError } = userSlice.actions;

export default userSlice.reducer;