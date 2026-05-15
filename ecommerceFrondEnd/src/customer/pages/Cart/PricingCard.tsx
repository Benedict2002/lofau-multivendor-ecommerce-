// import Divider from "@mui/material/Divider";
// import React from "react";

// const PricingCart = () => {
//   return (
//     <>
//       <div className="space-y-3 p-5">
//         <div className="flex justify-between items-center">
//           <span>Subtotal</span>
//           <span> Ksh 799</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Discount</span>
//           <span> Ksh 300</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Shipping</span>
//           <span> Ksh 69</span>
//         </div>
//         <div className="flex justify-between items-center">
//           <span>Platform fee</span>
//           <span> Free </span>
//         </div>
//       </div>
//       <Divider />
//       <div className="flex justify-between items-center p-5 text-[#00927c]">
//         <span>Total</span>
//         <span>Ksh 799 </span>
//       </div>
//     </>
//   );
// };
// export default PricingCart;

import Divider from "@mui/material/Divider";
import React from "react";
import { useAppSelector } from "../../../State/Store";

const PricingCart = () => {
  const { cart } = useAppSelector((store) => store.cart);

  const cartItems = cart?.cartItems || [];

  // subtotal before discount
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.mrpPrice * item.quantity,
    0,
  );

  // total after discount
  const total = cartItems.reduce(
    (total, item) => total + item.product.sellingPrice * item.quantity,
    0,
  );

  // discount amount
  const discount = subtotal - total;

  const shipping = total > 15000 ? 0 : 50;

  const finalTotal = total + shipping;

  return (
    <>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>Ksh {subtotal}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span className="text-green-600">- Ksh {discount}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `Ksh ${shipping}`}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Platform fee</span>
          <span>Free</span>
        </div>
      </div>

      <Divider />

      <div className="flex justify-between items-center p-5 text-[#00927c] font-bold">
        <span>Total</span>
        <span>Ksh {finalTotal}</span>
      </div>
    </>
  );
};

export default PricingCart;
