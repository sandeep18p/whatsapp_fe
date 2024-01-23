 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
  status: "",
  error: "",
  user: {
    id: "",
    name: "sandeep",
    email: "",
    picture: "",
    status: "",
    token: "",
  },
};

// Create Async Thunk should be created using createAsyncThunk, not createAsynckThunk
export const registerUser = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, {
      ...values,
    });
    return data;
  } catch (error) {
    // Corrected the rejectWithValue argument
    return rejectWithValue(error.response.data.error.message);
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${AUTH_ENDPOINT}/login`, {
        ...values,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "";
      state.error = "";
      state.user = {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
      };
    },
    changeStatus:(state,action)=>{
      state.status=action.payload;
    }
  },
  extraReducers(builder) {
    //for register user
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        // Corrected the error assignment
        state.error = action.payload;
      })
      //for login user
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;
