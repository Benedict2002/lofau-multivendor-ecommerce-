/* import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../config/Api"

export const sellerLognin = createAsyncThunk<any,any>("/sellerAuth/sellerLognin", 
    async(loginRequest, {rejectWithValue})=>{
    try{
        const response = await api.post("/sellers/login", loginRequest
        )
        console.log("login otp ", response.data)

    }catch(error){
        console.log("error ---", error)
    }
}) */



    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";


export const sellerLogin = createAsyncThunk<
  any,                // response type
  any,       // request payload
  { rejectValue: string }
>(
  "seller/login",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/sellers/login",
        loginRequest
      );

      

      const jwt = response.data.jwt;
      console.log("jwt sellerlogin -- ", jwt)
      localStorage.setItem("jwt", jwt)
      return response.data;

    } catch (error: any) {
      console.log("LOGIN ERROR ---", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Login failed";

      return rejectWithValue(message);
    }
  }
);


interface SellerAuthState {
  loading: boolean;
  user: any | null;
  error: string | null;
}

const initialState: SellerAuthState = {
  loading: false,
  user: null,
  error: null,
};

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      });
  },
});

export default sellerAuthSlice.reducer;
