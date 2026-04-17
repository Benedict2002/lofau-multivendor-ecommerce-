import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// export const fetchSellerProfile = createAsyncThunk("/sellers/fetchSellerProfile", 
//     async(jwt: string, {rejectWithValue})=>{
//     try{
//         const response = await api.get("sellers/profile",
//             {
//                 headers:{
//                     Authorization: `Bearer ${jwt}`
//                 }
//             }
//         )
//         console.log("fetch seller profile ", response.data)

//     }catch(error){
//         console.log("error ---", error)
//     }
// })

export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      // Get JWT from localStorage
      const jwt = localStorage.getItem("jwt");
      console.log(" My jwt --",jwt);


      if (!jwt) {
        // No token, reject immediately
        return rejectWithValue("JWT token is missing");
        console.log("JWT token is missing");
      }

      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      console.log("fetch seller profile:", response);
      return response.data;

    } catch (error: any) {
      console.log("PROFILE ERROR ---", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to fetch seller profile";

      return rejectWithValue(message);
    }
  }
);
interface SellerState{
  sellers: any[],
  selectedSeller: any,
  profile:any,
  report: any,
  loading:boolean,
  error:any,
}


const initialState: SellerState={
  sellers: [],
  selectedSeller:null,
  profile:null,
  report:null,
  loading:false,
  error:null,



}

const sellerSlice = createSlice({
  name:"sellers",
  initialState,
  reducers:{},
  extraReducers:(builder) =>{
    builder.addCase(fetchSellerProfile.pending,(state) =>{
      state.loading=true;


    })
    .addCase(fetchSellerProfile.fulfilled,(state,action)=>{
      state.loading=false;
      state.profile= action.payload
    })
    .addCase(fetchSellerProfile.rejected,(state,action)=>{
      state.loading=false;
      state.error= action.payload
    })
  }

})


export default sellerSlice.reducer;

