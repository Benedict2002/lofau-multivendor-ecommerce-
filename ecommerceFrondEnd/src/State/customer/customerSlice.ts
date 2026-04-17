// import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import { api } from "../../config/Api";
// import type { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";


// export const fetchHomePageData = createAsyncThunk
// <HomeData>(
//     'home/fetchHomePageData',
//     async (_, {rejectWithValue}) =>{
//         try{
//             const response = await api.get('/home-page');
//             console.log(" home page ", response.data);
//             return response.data;
//         }catch(error: any){
//             console.log("error ", error);
            
//                 const errorMessage = error.response?.data?.message || error.message || 'Failded to load home page'
//                 return rejectWithValue(errorMessage);
            
//         }
//     }
// )

// export const createHomeCategories = createAsyncThunk
// <HomeData, HomeCategory[]>(
//     'home/createHomeCategories',
//     async (homeCategories, {rejectWithValue}) =>{
//         try{
//             const response = await api.post('/home/categories', homeCategories);
//             console.log(" home categories created --", response.data);
            
//             return response.data;
//         }catch(error: any){
//             console.log("error ", error);
            
//                 const errorMessage = error.response?.data?.message || error.message || 'Failded to load home categories'
//                 return rejectWithValue(errorMessage);
            
//         }
//     }
// )
// interface HomeState{
//      homePageData: HomeData | null ;
//      shopByCategories: HomeCategory[];
//      loading: boolean;
//      error: string | null;
// }
// const initialState: HomeState={
//     homePageData: null,
//     shopByCategories: [],
//     loading: false,
//     error: null,
// };

// const customerSlice = createSlice({
//     name: 'home',
//     initialState,
//     reducers:{},
//     extraReducers: (builder: any) =>{
//         builder
//         .addCase(fetchHomePageData.pending, (state: any)=>{
//             state.loading = true;
//             state.error = null;
//         })
//         // .addCase(fetchHomePageData.fulfilled, (state: any, action: PayloadAction<HomeData>)=>{
//         //     state.loading = false;
//         //     state.homePageData = action.payload;
//         // })
//         builder.addCase(fetchHomePageData.fulfilled, (state: any, action: any) => {
//   state.homePageData = {
//     electricCategories: action.payload,
//   };
// })
//         .addCase(fetchHomePageData.rejected, (state: any, action: any)=>{
//             state.loading = false;
//             state.error = action.error.message || 'Falied to load page data';
//         })
//         .addCase(createHomeCategories.pending, (state: any)=>{
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(createHomeCategories.fulfilled, (state: any, action: any)=>{
//             state.loading = false;
//             state.homePageData = action.payload;
//         })
//         .addCase(createHomeCategories.rejected, (state: any, action: any)=>{
//             state.loading = false;
//             state.error = action.error.message || 'Failed to create home categories';
//         })
//     }
// })
// export default customerSlice.reducer;


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import type { HomeCategory, HomeData } from "../../types/HomeCategoryTypes";


// ✅ FETCH FROM BACKEND (CORRECT ENDPOINT)
export const fetchHomePageData = createAsyncThunk(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/home-category"); // ✅ FIXED

      console.log("✅ FETCHED FROM DB:", response.data);

      return response.data;
    } catch (error: any) {
      console.log("❌ FETCH ERROR:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch data"
      );
    }
  }
);


// ❌ REMOVE THIS IF NOT NEEDED (IMPORTANT)
// If you leave it, make sure it's NOT called automatically
export const createHomeCategories = createAsyncThunk(
  "home/createHomeCategories",
  async (homeCategories: HomeCategory[], { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("✅ CREATED:", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create categories"
      );
    }
  }
);


// ✅ STATE
interface HomeState {
  homePageData: HomeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  loading: false,
  error: null,
};


// ✅ SLICE
const customerSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // 🔥 FETCH
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.loading = false;

      const all = action.payload;

      // ✅ SPLIT DATA FROM BACKEND
      state.homePageData = {
        electricCategories: all.filter(
          (c: HomeCategory) => c.section === "ELECTRIC_CATEGORY"
        ),
        shopByCategories: all.filter(
          (c: HomeCategory) => c.section === "SHOP_BY_CATEGORIES"
        ),
        grid: [],
        dealCategories: [],
        deals: [],
      };

      console.log("✅ STORED IN REDUX:", state.homePageData);
    });

    builder.addCase(fetchHomePageData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });


    // ⚠️ OPTIONAL CREATE (ONLY IF YOU USE IT MANUALLY)
    builder.addCase(createHomeCategories.fulfilled, (state, action) => {
      state.homePageData = action.payload;
    });

  },
});

export default customerSlice.reducer;