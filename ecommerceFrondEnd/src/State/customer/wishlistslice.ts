import { createAsyncThunk, createSlice, isRejectedWithValue, type PayloadAction } from "@reduxjs/toolkit";
import type { Wishlist, WishlistState } from "../../types/WishlistTypes";
import { api } from "../../config/Api";

const initialState: WishlistState={
    wishlist: null,
    loading: false,
    error: null,
};

export const getWishlistByUserid = createAsyncThunk(
    "wishlist/getWishlistByUserid",
    async(_, {rejectWithValue}) =>{
        try{
            const response = await api.get(`/api/wishlist`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            })
            console.log("wishlist fetch ", response.data);
            return response.data;
        }catch(error : any){
            console.log("error ", error)
            return rejectWithValue(
                error.response?.data.message || "Failed to fetch wishlist"
            )
            
        }
    }
)

// export const addProductToWishList = createAsyncThunk(
//     "wishlist/addProductToWishList",
//     async({productId}:{productId: number}, {rejectWithValue}) =>{
//         try{
//             const response = await api.post(`/api/wishlist/add-product/${productId}`,{
//                 headers:{
//                     Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//                 },
//             })
//             console.log("add product ", response.data);
//             return response.data;
//         }catch(error : any){
//             console.log("error from add product  ", error)
//             return rejectWithValue(
//                 error.response?.data.message || "Failed to add product towishlist"
//             )
            
//         }
//     }
// )
export const addProductToWishList = createAsyncThunk(
  "wishlist/addProductToWishList",
  async ({ productId }: { productId: number }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/wishlist/add-product/${productId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log("add product ", response.data);

      return response.data;
    } catch (error: any) {
        console.log("error from add product  ", error)
      return rejectWithValue(
        
        error.response?.data?.message || "Failed to add product to wishlist"
      );
    }
  }
);


const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers: {
        resetWishlistState: (state: any) =>{
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder: any) =>{
        builder
        .addCase(getWishlistByUserid.pending, (state: any)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(getWishlistByUserid.fulfilled, (state: any, action: PayloadAction<Wishlist>)=>{
            state.wishlist = action.payload;
            state.loading = false;
        })
        .addCase(getWishlistByUserid.rejected, (state: any, action: PayloadAction<any>)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(addProductToWishList.pending, (state: any, )=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(addProductToWishList.fulfilled, (state: any, action: PayloadAction<Wishlist>)=>{
            state.wishlist = action.payload;
            state.loading = false;
        })
        .addCase(addProductToWishList.rejected, (state: any, action: PayloadAction<any>)=>{
           state.loading = false;
            state.error = action.payload;
        })
    }
})
export const {resetWishlistState } = wishlistSlice.actions;
export default wishlistSlice.reducer;