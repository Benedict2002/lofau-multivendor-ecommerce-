import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "../../types/cartTypes";
import { api } from "../../config/Api";
import type { CouponState } from "../../types/CouponType";

const API_URL = "/api/coupons";

export const applyCoupon = createAsyncThunk<
Cart,
{
    apply: string;
    code:string;
    orderValue: number;
    jwt: string;
},
{rejectValue: string}
>(
    "coupon/applyCoupon",
   async({apply, code, orderValue, jwt}, {rejectWithValue})=>{
    try{
        const response = await api.post(`${API_URL}/apply`, null,{
            params:{apply,code, orderValue},
            headers:{Authorization: `Beare ${jwt}`},
        });
        console.log("Apply coupon", response.data);
        return response.data;
    }catch(error : any){
        console.log ("Error ---",error )
        return rejectWithValue(error.response?.data.error || "Failed to apply coupon");
    }
   } 
)

const initialState: CouponState = {
    coupons:[],
    cart: null,
    loading: false,
    error: null,
    couponCreated: false,
    couponApplied: false,
}

const couponSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:  (builder:any) =>{
        builder
          .addCase(applyCoupon.pending,(state:any)=>{
            state.loading= true;
            state.error = null;
            state.couponApplied= false;
          })
          .addCase(applyCoupon.fulfilled,(state:any, action: any)=>{
            state.loading= false;
            state.cart =action.payload;

            if(action.meta.arg.apply == "true")
            {
                state.couponApplied = true
            }
          })
          .addCase(applyCoupon.rejected,(state:any,
            action: PayloadAction<string | undefined>
          )=>{
            state.loading= false;
            state.error = action.payload || "Failed to apply coupon";
            state.couponApplied= false;
          })
    }
})

export default couponSlice.reducer;