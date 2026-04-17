import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderState, OrderStatus } from "../../types/orderType";
import { api } from "../../config/Api";


export const fetchSellerOrders =createAsyncThunk<Order[], string>('sellerOrders/fetchSellerOrders',
    async(jwt, {rejectWithValue}) =>{
        try{
            const response = await api.get('/api/seller/orders',{
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log("fetch seller orders ", response.data)
            return response.data;
        } catch(error : any){
            console.log("Error ", error.response)
            return rejectWithValue(error.response.data);
        }
    }
)

export const updateOrderStatus =createAsyncThunk<Order, 
{jwt : string, orderId: number,
    orderStatus: OrderStatus
}>('sellerOrders/updateOderStatus',
    async({jwt, orderId, orderStatus}, {rejectWithValue}) =>{
        try{
            const response = await api.patch(`/api/seller/orders/${orderId}/status/${orderStatus}`,
                null,{
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log("order status updated ", response.data)
            return response.data;
        } catch(error : any){
            console.log("Error ", error.response)
            return rejectWithValue(error.response.data);
        }
    }
)
export const deleteOrder =createAsyncThunk<any, 
{jwt : string, orderId: number,
}>('sellerOrders/deleteOrder',
    async({jwt, orderId}, {rejectWithValue}) =>{
        try{
            const response = await api.delete(`/api/seller/orders/${orderId}/delete}`,
                {
                headers: {Authorization: `Bearer ${jwt}`},
            });
            console.log("delete done ")
            return response.data;
        } catch(error : any){
            console.log("Error ", error.response)
            return rejectWithValue(error.response.data);
        }
    }
)

interface SellerOrderState{
    orders: Order[];
    loading:boolean;
    error: string | null;
}

const initialState : SellerOrderState = {
    orders: [],
    loading: false,
    error: null,
}
const SellerOrderSlice = createSlice({
    name: 'sellerOrders',
    initialState,
    reducers: {},
    extraReducers: (builder: any) =>{
        builder
        .addCase(fetchSellerOrders.pending, (state: any)=>{
            state.loading= true;
            state.error= null;
        })
        .addCase(fetchSellerOrders.fulfilled, (state: any, action: PayloadAction<Order[]>)=>{
            state.loading= false;
            state.orders= action.payload;
        })
        .addCase(fetchSellerOrders.rejected, (state: any, action: any)=>{
            state.loading= false;
            state.error= action.payload as string;
        })
        .addCase(updateOrderStatus.pending, (state: any)=>{
            state.loading= true;
            state.error= null;
        })
        .addCase(updateOrderStatus.fulfilled, (state: OrderState, action: PayloadAction<Order>)=>{
            state.loading= false;
            const index = state.orders.findIndex(order  =>order.id === action.payload.id);
            if(index !== -1){
                state.orders[index] = action.payload;
            }
            
        })
        .addCase(updateOrderStatus.rejected, (state: any, action: any)=>{
            state.loading= false;
            state.error= action.payload as string;
        })
        .addCase(deleteOrder.pending, (state: any)=>{
            state.loading= true;
            state.error= null;
        })
        // .addCase(deleteOrder.fulfilled, (state: OrderState, action: PayloadAction<any>)=>{
        //     state.loading= false;
        //     state.orders= action.orders.filter(order => order.id !== action.meta.arg.orderId);
        // })
         .addCase(deleteOrder.fulfilled, (state: OrderState, action:any) => {
    state.loading = false;
    state.orders = state.orders.filter(
        order => order.id !== action.meta.arg.orderId
        );})
        .addCase(deleteOrder.rejected, (state: any, action: any)=>{
            state.loading= false;
            state.error= action.payload as string;
        })

    }
})

export default SellerOrderSlice.reducer;