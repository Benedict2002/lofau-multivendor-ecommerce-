import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import type { HomeCategory } from "../../types/HomeCategoryTypes";

interface CategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  updated: boolean;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
  updated: false,
};

// ✅ UPDATE CATEGORY
// export const updateCategory = createAsyncThunk<
//   HomeCategory,
//   { id: number; data: any }
// >("category/updateCategory", async ({ id, data }, { rejectWithValue }) => {
//   try {
//     const response = await api.patch(
//       `/admin/home-category/${id}`,
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       }
//     );

//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(
//       error.response?.data?.message || "Failed to update category"
//     );
//   }
// });

export const updateCategory = createAsyncThunk<
  HomeCategory,
  { id: number; data: any }
>(
  "category/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("📤 Sending update:", { id, data }); // ✅ LOG HERE

      const response = await api.patch(
        `/admin/home-category/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("✅ Response from backend:", response.data); // ✅ LOG HERE

      return response.data;
    } catch (error: any) {
      console.log("❌ Update error:", error.response); // ✅ LOG ERROR

      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });

    builder.addCase(
      updateCategory.fulfilled,
      (state, action: PayloadAction<HomeCategory>) => {
        state.loading = false;
        state.updated = true;

        const index = state.categories.findIndex(
          (c) => c.id === action.payload.id
        );

        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      }
    );

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer;