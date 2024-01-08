import { createSlice } from "@reduxjs/toolkit";


const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`

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

//function that will talk to backend 
export const registerUser = createAsynckThunk('auth/register', async(values, {rejectWithValue})=>{
   try{
     const {data}=await axios.post(`${AUTH_ENDPOINT}/register`, {
      ...values,
     });
     return data;
   }catch(error){
return rejectWithValue(error.response,data.error.message);
   }
}


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
  },
  extraReducers(builder){
    builder.addCase(registerUser.pending, (state,action)=>{
      state.status = "loading";
    })
    .addCase(registerUser.fulfilled,(state,action)=>{

    })
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
