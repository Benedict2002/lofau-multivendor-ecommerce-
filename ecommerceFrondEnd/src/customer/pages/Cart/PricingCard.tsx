import Divider from "@mui/material/Divider";
import React from "react";

const PricingCart = () => {
  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span> Ksh 799</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span> Ksh 300</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span> Ksh 69</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Platform fee</span>
          <span> Free </span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center p-5 text-[#00927c]">
        <span>Total</span>
        <span>Ksh 799 </span>
      </div>
    </>
  );
};
export default PricingCart;
