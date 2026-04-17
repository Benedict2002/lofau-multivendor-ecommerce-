import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CartItem } from "../../types/cartTypes";
import { api } from "../../config/Api";
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from "../../Util/sumCartItemMrpPrice";
import { applyCoupon } from "./CouponSlice";


interface CartState{
    cart: Cart | null;
    loading: boolean;
    error: string| null;
}

const initialState: CartState ={
    cart: null,
    loading: false,
    error: null,
}

const API_URL = "/api/cart";

export const fetchUserCart = createAsyncThunk<Cart, string>(
    "cart/fetchUserCart",
    async(jwt: string, {rejectWithValue})=>{
        try{
            const response = await api.get(API_URL,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("Cart fetched", response.data)
            return response.data;
        }catch(error: any){
            console.log("error ", error.response)
            return rejectWithValue(" Failed to fetch user cart");
        }
    }

);


interface AddItemRequest{
    productId: number | undefined;
    size: string;
    quantity: number;
}

export const addItemToCart = createAsyncThunk
<CartItem, {jwt : string | null; request: AddItemRequest}>("cart/addItemToCart", 
    async ({jwt, request}, {rejectWithValue}) =>{
        try{
            const response = await api.put(`${API_URL}/add`, 
                request, {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
            console.log(" Cart added ", response.data);
            return response.data;
        }catch(error : any){
            console.log(" error ", error.response);
            return rejectWithValue("Failed to add item to cart");

        }
    }
);

export const deleteCartItem = createAsyncThunk
<any, {jwt : string; cartItemId: number}>("cart/deleteCartItem", 
    async ({jwt, cartItemId}, {rejectWithValue}) =>{
        try{
            const response = await api.delete(`${API_URL}/item/${cartItemId}`, 
                 {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
            
            return response.data;
        }catch(error : any){
            
            return rejectWithValue(error.response.data.message || "Failed to delete cart item");

        }
    }
);

export const updateCartItem = createAsyncThunk
<any, {jwt : string | null; cartItemId: number; cartItem: any}>("cart/updateCartItem", 
    async ({jwt, cartItemId, cartItem}, {rejectWithValue}) =>{
        try{
            const response = await api.put(`${API_URL}/item/${cartItemId}`, cartItem,
                 {
                    headers:{
                        Authorization: `Bearer ${jwt}`,
                    }
                }
            );
            console.log(" Updated successfully --", response.data)
            
            return response.data;
        }catch(error : any){
            
            return rejectWithValue(error.response.data.message || "Failed to delete cart item");

        }
    }
);

const  cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:{
        resetCartState: (state : any) =>{
            state.cart = null;
            state.loading = false;
            state.error= null;
        },
    },
    extraReducers:(builder: any)=>{
        builder.addCase(fetchUserCart.pending, (state: any) =>{
            state.loading =true;
            state.error= null;
        });
        builder.addCase(fetchUserCart.fulfilled, (state: any, action:PayloadAction<Cart>) =>{
            state.cart =action.payload;
            state.loading= true;
        });
        builder.addCase(fetchUserCart.rejected, (state: any, action:any) =>{
            state.loading = false;
            state.error= action.payload as string;
        });

        builder.addCase(addItemToCart.pending, (state: any) =>{
            state.loading =true;
            state.error= null;
        });
         builder.addCase(addItemToCart.fulfilled, (state: any,action:PayloadAction<CartItem>) =>{
            if(state.cart){
                state.cart.cartItems.push(action.payload);

            }
            
            state.loading =false;
            
        });
         builder.addCase(addItemToCart.rejected, (state: any, action: any) =>{
            state.loading =false;
            state.error= action.payload as string;
        });

         builder.addCase(deleteCartItem.pending, (state: any) =>{
            state.loading =true;
            state.error= null;
        });
         builder.addCase(deleteCartItem.fulfilled, (state: any,action:any) =>{
            if(state.cart){
                state.cart.cartItems= state.cart.cartItems.filter(
                    (item:CartItem) => item.id !== action.meta.arg.cartItem
                );
                const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [])
                const sellingPrice = sumCartItemSellingPrice(state.cart?.cartItemId || [])
                state.cart.totalSellingPrice = sellingPrice;
                state.cart.totalMrpPrice = mrpPrice;
            }

            
            
            state.loading =false;
            
        });

        // builder.addCase(deleteCartItem.pending, (state: any) =>{
        //     state.loading =true;
        //     state.error= null;
        // });
        builder.addCase(updateCartItem.fulfilled, (state: any, action:any) =>{
           if(state.cart){
            const index = state.cart.cartItems.findIndex(
                (item:CartItem) => item.id === action.meta.arg.cartItemId
            );
            if(index !== -1){
                state.cart.cartItems[index] ={
                    ...state.cart.cartItems[index],
                    ...action.payload,
                }
            }
            const mrpPrice = sumCartItemMrpPrice(state.cart?.cartItems || [] )
            const sellingPrice =sumCartItemSellingPrice(state.cart?.cartItems || [])
            state.cart.totalSellingPrice = sellingPrice;
            state.cart.totalMrpPrice = mrpPrice;
           }
            state.loading =false;
            
        });

        builder.addCase(updateCartItem.rejected, (state: any, action:any) =>{
            state.loading =false;
            state.error= action.payload as string;
        });
        



         builder.addCase(applyCoupon.fulfilled, (state: any, action: any) =>{
            state.loading =false;
            state.cart= action.payload;
        });
    }
})

export default cartSlice.reducer;
export const { resetCartState} = cartSlice.actions;

// export const selectCart  = ( state: RootState)=> state.cart.cart;
// export const selectCartLoading  = ( state: RootState)=> state.cart.loading;
// export const selectCartError  = ( state: RootState)=> state.cart.cart.error;

