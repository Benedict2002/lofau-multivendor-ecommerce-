import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponse, Deal, DealsState } from "../../types/DealType";
import { api } from "../../config/Api";

const initialState: DealsState={
    deals:[],
    loading: false,
    error:null,
    dealCreated:false,
    dealUpdated: false,
};
export const createDeal = createAsyncThunk(
    "deals/createDeal",
    async (deal: any,{rejectWithValue})=>{

        try{
            const response = await api.post("/admin/deals", deal,{
               headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`
               } ,
            });
            console.log("Created deal ", response.data);
            return response.data;
        }catch(error: any){
            console.log("error create deal ", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to create deal"
            );
        }
    }
)

export const getAllDeals = createAsyncThunk(
    "deals/getAllDeals",
    async (_,{rejectWithValue})=>{

        try{
            const response = await api.get("/admin/deals",{
               headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`
               } ,
            });
            console.log("Get all deals ", response.data);
            return response.data;
        }catch(error: any){
            console.log("error get all deal", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to get all deals"
            );
        }

    }
    
)


export const deleteDeal = createAsyncThunk<ApiResponse, number>(
    "deals/deleteDeal",
    async (id: number,{rejectWithValue})=>{

        try{
            const response = await api.delete(`/admin/deals/${id}`,{
               headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${localStorage.getItem("jwt")}`
               } ,
            });
            
           return { ...response.data, id }; 
        }catch(error: any){
            console.log("error del deal", error.response);
            return rejectWithValue(
                error.response?.data?.message || "Failed to delete deal"
            );
        }

    }
    
)
export const updateDeal = createAsyncThunk<Deal, { id: number; data: any }>(
  "deals/updateDeal",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Updated deal ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error update deal ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update deal"
      );
    }
  }
);

// const initialState: DealsState = {
//     deals: [],
//     loading: false,
//     error: null,
//     dealCreated: false,
//     dealUpdated: false,
// };

const dealSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {
        resetDealState: (state) => {
            state.dealCreated = false;
            state.dealUpdated = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // CREATE DEAL
        builder.addCase(createDeal.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.dealCreated = false;
        });

       builder.addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
    state.loading = false;
    state.dealCreated = true;

    console.log("🔥 CREATE DEAL RESPONSE (RAW):", action.payload);

    state.deals.push(action.payload);
});

        builder.addCase(createDeal.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.dealCreated = false;
        });

        // GET ALL DEALS
        builder.addCase(getAllDeals.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(getAllDeals.fulfilled, (state, action) => {
            state.loading = false;
            state.deals = action.payload;
        });

        builder.addCase(getAllDeals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
       // UPDATE DEAL
    builder.addCase(updateDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealUpdated = false;
    });
    builder.addCase(
      updateDeal.fulfilled,
      (state, action: PayloadAction<Deal>) => {
        state.loading = false;
        state.dealUpdated = true;

        const index = state.deals.findIndex(
          (deal) => deal.id === action.payload.id
        );

        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      }
    );
    builder.addCase(updateDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.dealUpdated = false;
    });

    // DELETE DEAL ( FIXED)
    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action: any) => {
      state.loading = false;
      state.deals = state.deals.filter(
        (deal) => deal.id !== action.meta.arg
      );
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    },
});
export const { resetDealState } = dealSlice.actions;
export default dealSlice.reducer;
