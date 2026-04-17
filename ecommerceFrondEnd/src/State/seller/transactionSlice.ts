import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import type { Transaction } from "../../types/TransactionType";


interface TransactionState{
    transactions: Transaction[];
    transaction: Transaction | null;
    loading: boolean;
    error: string | null;
}

const initialState:  TransactionState ={
    transactions: [],
    transaction: null,
    loading: false,
    error: null,
}


export const fetchTransactionsBySeller = createAsyncThunk
<
Transaction[],
string,
{rejectValue: string}

>('transactions/fetchTransactionsBySeller', async(jwt, {rejectWithValue}) =>{
    try{
        const response = await api.get('/api/transactions/seller',
            {headers:{
                Authorization: `Bearer ${jwt}`,
            },}
        );

        console.log("fetchTransactionsBySeller", response.data)
        return response.data;
    }catch(error: any){
        if(error.response){
        return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Failed to fetch transactions');
    }
}

)


export const fetchAllTransactions = createAsyncThunk
<
Transaction[],
void,
{rejectValue: string}

>('transactions/fetchAllTransactions', async(_, {rejectWithValue}) =>{
    try{
        const response = await api.get('/api/transactions');

        console.log("fetchAllTransactions", response.data)
        return response.data;
    }catch(error: any){
        if(error.response){
        return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Failed to fetch all transactions');
    }
}

)
 const transactionSlice = createSlice({
    name:'transactions',
    initialState,
    reducers:{},
    extraReducers:(builder: any)=>{
        builder
        .addCase(fetchTransactionsBySeller.pending, (state: any)=>{
            state.loading =true;
            state.error = null;
        })
        .addCase(fetchTransactionsBySeller.fulfilled, (state: any, action: any)=>{
            state.loading =false;
            state.transactions = action.payloaad;
        })
        .addCase(fetchTransactionsBySeller.rejected, (state: any, action: any)=>{
            state.loading =false;
            state.error = action.payloaad as string;
        })
        .addCase(fetchAllTransactions.pending, (state: any)=>{
            state.loading =true;
            state.error=null;
        })
        .addCase(fetchAllTransactions.fulfilled, (state: any, action: any)=>{
            state.loading =false;
            state.transactions = action.payload;
        })
        .addCase(fetchAllTransactions.rejected, (state: any, action: any)=>{
            state.loading =false;
            state.error = action.payload as string;
        })
    }
 })



 export default  transactionSlice.reducer;

