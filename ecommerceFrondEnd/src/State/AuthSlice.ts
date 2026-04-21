import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";




export const sendLoginSignUpOtp = createAsyncThunk(
  "auth/sendLoginSignUpOtp",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/sent/login-signup-otp", { email });
      console.log("OTP sent:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("OTP send error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to send OTP");
    }
  }
);




// Async thunk for signing in
export const signin = createAsyncThunk(
  "auth/signin",
  async (loginRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", loginRequest);

      console.log("login  response:", response.data);
      localStorage.setItem("jwt", response.data.jwt)
      return response.data.jwt
      
    } catch (error: any) {
      console.error("Signin error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
export const signup = createAsyncThunk<any,any>(
  "auth/signup",
  async (signupRequest, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);

      console.log("login  response:", response.data);
      localStorage.setItem("jwt", response.data.jwt)
      return response.data.jwt
      
    } catch (error: any) {
      console.error("Signin error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);
export const fetchUserProfile = createAsyncThunk<
  any,
  any
>(
  "auth/fetchUserProfile",
  async ( jwt , { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("user profile:", response.data);
      return response.data; // ✅ User object
    } catch (error: any) {
      console.error("Fetch User profile error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);






export const logout = createAsyncThunk<any,any>("/auth/logout",

async(navigate, {rejectWithValue})=>{
  try{
    localStorage.clear()
    console.log("logout succes")
    navigate("/")

  }catch (error){
    console.log("error --", error)
  }
}

)

interface AuthState {
  jwt:null | null
  isLoggedIn: boolean;
  user: any | null;
  otpSent: boolean;
  loading: boolean;

}

const initialState: AuthState = {
 jwt:null,
  user: null,
  otpSent: false,
  isLoggedIn:false,
  loading:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    
    // Send OTP

    builder.addCase(sendLoginSignUpOtp.pending, (state) => {
      state.loading = true;
      
      state.otpSent = false;
    });
    builder.addCase(sendLoginSignUpOtp.fulfilled, (state) => {
      state.loading = false;
      state.otpSent = true;
    });
    builder.addCase(sendLoginSignUpOtp.rejected, (state) => {
      state.loading = false;
     
      
    });

    // Signin
    // builder.addCase(signin.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // });
    builder.addCase(signin.fulfilled, (state, action) => {
       state.jwt = action.payload;
      state.isLoggedIn = true;

     
    });
    // builder.addCase(signin.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
    //sigup
    builder.addCase(signup.fulfilled, (state, action) => {
       state.jwt = action.payload;
      state.isLoggedIn = true;
     
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
       state.user = action.payload;
      state.isLoggedIn = true;
     
    });
    builder.addCase(logout.fulfilled, (state, action) => {
       state.jwt = null;
      state.isLoggedIn = false;
      state.user=null;

     
    });
  },
});

export default authSlice.reducer;
