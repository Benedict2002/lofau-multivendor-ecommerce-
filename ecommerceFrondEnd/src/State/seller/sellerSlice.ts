import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";


// =======================
// FETCH ALL SELLERS (ADMIN TABLE)
// =======================
export const fetchSellers = createAsyncThunk(
  "seller/fetchSellers",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("JWT token is missing");
      }

      const response = await api.get("/sellers", {
        headers: {
          Authorization: `Bearer ${jwt}`,
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
// FETCH SELLER PROFILE
// =======================
export const fetchSellerProfile = createAsyncThunk(
  "seller/fetchSellerProfile",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("JWT token is missing");
      }

      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller profile"
      );
    }
  }
);


// =======================
// FETCH SELLER REPORT
// =======================
export const fetchSellerReport = createAsyncThunk(
  "seller/fetchSellerReport",
  async (_, { rejectWithValue }) => {
    try {
      const jwt = localStorage.getItem("jwt");

      if (!jwt) {
        return rejectWithValue("JWT token is missing");
      }

      const response = await api.get("/sellers/report", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch seller report"
      );
    }
  }
);


// =======================
// STATE TYPE
// =======================
interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};


// =======================
// SLICE
// =======================
const sellerSlice = createSlice({
  name: "sellers",
  initialState,

  reducers: {
    setSelectedSeller: (state, action) => {
      state.selectedSeller = action.payload;
    },

    clearSellerState: (state) => {
      state.profile = null;
      state.report = null;
      state.selectedSeller = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= ALL SELLERS =================
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

      // ================= PROFILE =================
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REPORT =================
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSeller, clearSellerState } = sellerSlice.actions;

export default sellerSlice.reducer;