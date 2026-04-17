import React, { useState } from "react";
import SellerLoginForm from "./SellerLoginForm";
import SellerAccountForm from "./SellerAccountForm";
import Button from "@mui/material/Button";

const BecomeSeller = () => {
  const [islogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!islogin);
  };
  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section
        className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg 
    rounded-b-md"
      >
        {!islogin ? <SellerAccountForm /> : <SellerLoginForm />}
        <div className="mt-10 space-y-2">
          <h1 className="text-center text-sm font-medium">have account</h1>
          <Button onClick={handleShowPage} fullWidth sx={{ py: "11px" }}>
            {islogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:col-span-1 lg:col-span-2 md:flex justify-center items-center pt-10">
        <div className="lg:w-[70%] px-5 space-y-10">
          <div className="space-y-2 font-bold text-center">
            <p className="text-2xl"> Join the Marketplace Revolution</p>
            <p className="text-lg text-[#00927c]">Boost your sales today</p>
          </div>
          <img
            src="https://thumbs.dreamstime.com/b/salesman-advertising-new-stock-clothing-store-d-gray-cartoon-figure-holding-sign-reading-front-rack-84299883.jpg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};
export default BecomeSeller;
