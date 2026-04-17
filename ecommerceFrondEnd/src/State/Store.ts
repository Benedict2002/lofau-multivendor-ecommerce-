import { combineReducers, configureStore, Tuple } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import {useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux" 
import authReducer from './AuthSlice';
import sellerAuthReducer from './seller/SellerAuthSlice';
import sellerSlice from './seller/sellerSlice';
import sellerProductSlice from './seller/sellerProductSlice';
import ProductSlice from './customer/ProductSlice';
import cartSlice from './customer/cartSlice';
import orderSlice from './customer/OrderSlice'
import wishlistSlice from './customer/wishlistslice'
import SellerOrderSlice from './seller/SellerOrderSlice';
import transactionSlice from './seller/transactionSlice';
import customerSlice from './customer/customerSlice';
import adminSlice from './admin/adminSlice';
import dealSlice from './admin/DealSlice';
import categorySlice from './admin/HomecategorySlice';






const rootReducer = combineReducers({
  sellerAuth: sellerAuthReducer,
  auth: authReducer,
  seller:sellerSlice,
  sellerproduct: sellerProductSlice,
  product: ProductSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  customer: customerSlice,
  //seller slice
  sellerOrder: SellerOrderSlice,
  transactions: transactionSlice,
  //admin
  admin: adminSlice,
  deal: dealSlice,
  category: categorySlice,
 

});

const store = configureStore({
    reducer: rootReducer,
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export type AppDispatch  = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;



export const useAppDispatch =()=>useDispatch<AppDispatch>();
export const  useAppSelector: TypedUseSelectorHook<RootState>=useSelector;


export default store;