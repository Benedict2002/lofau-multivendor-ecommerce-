import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import type { Product } from "../../types/ProductType";
import { act } from "react";

const API_URL="/products";

export const  fetchProductById = createAsyncThunk<any,any>("products/fetchProductById",
async(productId,{rejectWithValue}) =>{
    try{
        const response = await api.get(`${API_URL}/${productId}`)
        
        const data =  response.data
        console.log(" data", data)
        return data;

    }catch(error:any){
        console.log("error : ", error)
        rejectWithValue(error.message)
    }
}


)

export const  searchProduct = createAsyncThunk("products/searchProduct",
async(query,{rejectWithValue}) =>{
    try{
        const response = await api.get(`${API_URL}/search`,{
            params:{
              query,  
            },
        });
        
        const data =  response.data
        console.log("Search product data", data)
        return data;

    }catch(error:any){
        console.log("error : ", error)
        rejectWithValue(error.message)
    }
}


)

export const  fetchAllproducts = createAsyncThunk<any,any>("products/fetchAllproducts",
async(params,{rejectWithValue}) =>{
    try{
        const response = await api.get(`/products`,{
            params:{
              ...params, 
              pageNumber: params.pageNumber ||0 
            },
        });
        
        const data =  response.data
        console.log("All product data", data)
        return data;

    }catch(error:any){
        console.log("error : ", error)
        rejectWithValue(error.message)
    }
}


)



interface ProductState{
    product: Product| null;
    products: Product[];
    totalPages:number;
    loading: boolean;
    error:String | null | undefined  | any;
    seachProduct: Product[];
}

const initialState : ProductState  = {
    product: null,
    products: [],
    totalPages:1,
    loading: false,
    error:null ,
    seachProduct: []

}


const productSlice = createSlice({
    name: "products",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(fetchProductById.pending, (state) =>{
            state.loading= true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) =>{
            state.loading= false;
            state.product  =action.payload
        });
        builder.addCase(fetchProductById.rejected, (state, action) =>{
            state.loading= false;
            state.error= action.payload;
        });
         builder.addCase(fetchAllproducts.pending, (state) =>{
            state.loading= true;
        });
        builder.addCase(fetchAllproducts.fulfilled, (state, action) =>{
            state.loading= false;
            state.products  =action.payload.content;
        });
        builder.addCase(fetchAllproducts.rejected, (state, action) =>{
            state.loading= false;
            state.error= action.payload;
        });

         builder.addCase(searchProduct.pending, (state) =>{
            state.loading= true;
        });
        builder.addCase(searchProduct.fulfilled, (state, action) =>{
            state.loading= false;
            state.seachProduct  =action.payload
        });
        builder.addCase(searchProduct.rejected, (state, action) =>{
            state.loading= false;
            state.error= action.payload;
        });
    }


})

export default productSlice.reducer;
