import Avatar from "@mui/material/Avatar";
import React from "react";
import ElectricBolt from "@mui/icons-material/ElectricBolt";
import { teal } from "@mui/material/colors";
import type { Order, OrderItem } from "../../../types/orderType";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({ item, order }: { item: OrderItem; order: Order }) => {
  const navigate = useNavigate();

  // fallback values
  const product = item?.product;
  const imageUrl = product?.images?.[0] || "/placeholder.png"; // placeholder if no image
  const sellerName =
    product?.seller?.businessDetails?.businessName || "Unknown Seller";
  const title = product?.title || "No title available";
  //item.product.images[0]
  return (
    <div
      onClick={() => {
        console.log("Navigating to:", `/account/order/${order.id}/${item.id}`);
        navigate(`/account/order/${order.id}/${item.id}`);
      }}
      className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer"
    >
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[500] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-[#00927c]">PENDING</h1>
          <p>Arriving by {order.deliverDate}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img className="w-[70px]" src={imageUrl} alt="" />
        </div>
        <div className="w-full space-y-2">
          <h1 className="font-bold">{sellerName}</h1>
          <p>{title}</p>
          <p>
            <strong>size :</strong> FREE
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderItemCard;
