import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { HomeCategory } from "../../types/HomeCategoryTypes";
import { api } from "../../config/Api";

const API_URL='/admin';

export const updateHomeCategory = createAsyncThunk
<HomeCategory, {id: number; data:HomeCategory}>(
    'homeCategory/updateHomeCategory',
    async ({id, data}, {rejectWithValue}) =>{
        try{
            const response = await api.patch(`${API_URL}/home-category/${id}`, data);
            console.log(" created updated ", response.data);
            return response.data;
        }catch(error: any){
            console.log("error ", error);
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            } else{
                return rejectWithValue('An error occurred while updating the category.');
            }
        }
    }
)


export const fetchHomeCategories = createAsyncThunk
<HomeCategory[]>(
    'homeCategory/fetchHomeCategories',
    async (_, {rejectWithValue}) =>{
        try{
            const response = await api.get(`${API_URL}/home-category`);
            console.log(" categories fetched ", response.data);
            return response.data;
        }catch(error: any){
            console.log("error ", error);
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            } else{
                return rejectWithValue('Failed to fetch category.');
            }
        }
    }
)

interface HomeCategoryState{
    categories: HomeCategory[];
    loading: boolean;
    error: string | null;
    categoryUpdated: boolean;
}

const initialState: HomeCategoryState ={
    categories: [],
    loading: false,
    error: null,
    categoryUpdated: false,
};

const adminSlice = createSlice({
    name: 'homeCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(updateHomeCategory.pending , (state: any) =>{
            state.loading = true;
            state.error = null;
            state.categoryUpdated = false;
        })

        .addCase(updateHomeCategory.fulfilled, (state: any, action: any) => {
    state.loading = false;
    state.categoryUpdated = true;

    const index = state.categories.findIndex(
        (category: any) => category.id === action.payload.id
    );

    if (index !== -1) {
        state.categories[index] = action.payload;
    } else {
        state.categories.push(action.payload);
    }
})


.addCase(updateHomeCategory.rejected, (state: any, action: any)=>{
    state.loading = false;
    state.error = action.payload as string;
})

.addCase(fetchHomeCategories.pending, (state: any) =>{
    state.loading = true;
    state.error = null;
    state.categories = false;
})

.addCase(fetchHomeCategories.fulfilled, (state: any, action: any) =>{
    state.loading = false;
    
    state.categoryUpdate = action.payload;
})
.addCase(fetchHomeCategories.rejected, (state: any, action: any) =>{
    state.loading = false;
    state.error = action.payload as string;
    
})

    }
})

export default adminSlice.reducer;