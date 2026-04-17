import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type { CartItem } from "../../../types/cartTypes";
import { useAppDispatch } from "../../../State/Store";
import { updateCartItem } from "../../../State/customer/cartSlice";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();

  // const handleUpdateQuantity = () => {
  //   dispatch(updateCartItem{jwt:localStorage.getItem("jwt"), cartItemId:item.id,
  //     cartItem:{quantity: 1}
  //   })
  // };

  const handleUpdateQuantity = (value: number) => () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    dispatch(
      updateCartItem({
        jwt,
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      }),
    );
  };

  return (
    <div className="border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            src={item.product.images[0]}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-sembold text-lg">
            {" "}
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-600 font-medium text-sm">
            {" "}
            {item.product.title}
          </p>
          <p className="text-gray-400 text-xs">
            <strong>Sold by:</strong> Natural LifeStyle Product Private
            Limited{" "}
          </p>
          <p className="text-sm">7 days replacement available</p>
          <p className="text-sm text-gray-500">
            <strong>quantity :</strong> {item.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <div className="px-5 py-2 flex justify-between items-center">
          <div className="flex itmes-center gap-2 w-[140px] justify-between">
            <Button disabled={true} onClick={handleUpdateQuantity(1)}>
              <RemoveIcon />
            </Button>
            <span>{item.quantity}</span>
            <Button onClick={handleUpdateQuantity(1)}>
              <AddIcon />
            </Button>
          </div>
        </div>
        <div className="pr-5">
          <p className="text-gray-700 font-medium"> Ksh {item.sellingPrice}</p>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton color="primary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default CartItem;
