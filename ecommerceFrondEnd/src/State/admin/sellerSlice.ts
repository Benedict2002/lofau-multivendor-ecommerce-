import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Seller } from "../../types/SellerType";
import { api } from "../../config/Api";



// =======================
// STATE TYPE
// =======================
interface SellerState {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
}

const initialState: SellerState = {
  sellers: [],
  loading: false,
  error: null,
};


// =======================
// FETCH SELLERS
// =======================
export const fetchSellers = createAsyncThunk(
  "sellers/fetchSellers",
  async (_, { rejectWithValue }) => {
    try {
      
      const response = await api.get("/sellers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sellers"
      );
    }
  }
);


// =======================
// UPDATE SELLER STATUS
// =======================
export const updateSellerStatus = createAsyncThunk(
  "sellers/updateSellerStatus",
  async (
    { sellerId, status }: { sellerId: number; status: string },
    { rejectWithValue }
  ) => {
    try {
    
      const response = await api.put(
        `/sellers/${sellerId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update seller status"
      );
    }
  }
);


// =======================
// SLICE
// =======================
const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload;
      })
      .addCase(fetchSellers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE STATUS
      .addCase(updateSellerStatus.fulfilled, (state, action) => {
        const updated = action.payload;

        state.sellers = state.sellers.map((seller) =>
          seller.id === updated.id ? updated : seller
        );
      });
  },
});

export default sellerSlice.reducer;