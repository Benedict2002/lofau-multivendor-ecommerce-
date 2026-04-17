import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Navbar from "./customer/components/Navbar/Navbar";
import { ThemeProvider } from "@mui/material/styles";
import customeTheme from "./Theme/customeTheme";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Product/Product";
import ProductDetails from "./customer/pages/Page Details/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import { Route, Routes, useNavigate } from "react-router-dom";
import BecomeSeller from "./customer/pages/Become Seller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/Pages/Dashboard/AdminDashboard";
import { fetchProducts } from "./State/fetchProduct";
import store, { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSuccess from "./customer/pages/PaymentSucces";
import Wishlist from "./customer/wishlist/wishlist";
import { createHomeCategories } from "./State/customer/customerSlice";
import { homeCategories } from "./data/HomeCategories";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     dispatch(fetchSellerProfile(localStorage.getItem("jwt") || ""));
  //   }
  // }, []);
  useEffect(() => {
    dispatch(createHomeCategories(homeCategories));
  }, [dispatch]);

  // useEffect(() => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     dispatch(fetchSellerProfile(jwt));
  //   }
  //   dispatch(createHomeCategories(homeCategories));
  // }, []); // ✅ ADD THIS
  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    if (!token) return;

    // Only fetch seller profile if user is a SELLER
    if (auth.user?.role === "ROLE_SELLER") {
      dispatch(fetchSellerProfile(token));
    }
  }, [auth.jwt, auth.user?.role, dispatch]);

  useEffect(() => {
    if (seller.profile) {
      navigate("/seller");
    }
  }, [seller.profile]);

  useEffect(() => {
    const token = auth.jwt || localStorage.getItem("jwt");
    if (!token) return;

    dispatch(fetchUserProfile(token));
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={customeTheme}>
      <div>
        {/*<Home />*/}
        {/*<Product />*/}
        {/*<ProductDetails />*/}
        {/*<Review />*/}
        {/*<Cart />*/}
        {/* <Checkout />*/}
        {/* <Account /> */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/payment-success/:orderId"
            element={<PaymentSuccess />}
          />
          <Route path="/account/*" element={<Account />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
