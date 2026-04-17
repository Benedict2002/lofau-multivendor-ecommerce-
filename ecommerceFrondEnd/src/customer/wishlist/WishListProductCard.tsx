import React from "react";
import type { Product } from "../../types/ProductType";
import Button from "@mui/material/Button";
import Close from "@mui/icons-material/Close";
import { useAppDispatch } from "../../State/Store";
import { addProductToWishList } from "../../State/customer/wishlistslice";
import { teal } from "@mui/material/colors";


const WishlistProductCard = ({ item }: { item: Product }) => {
    const dispatch = useAppDispatch()
     const handleWishlist = () => {
       
        item.id && dispatch(addProductToWishList({ productId: item.id }));
      };
  return (
    <div className="w-60 relative">
      <div className="w-full">
        <img src={item.images[0]} className="object-top w-full" alt="" />
      </div>
      <div className="pt-3 space-y-1">
        <p>{item.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">
            Ksh {item.sellingPrice}
          </span>
          <span className="thin-line-through text-gray-400">
            Ksh {item.mrpPrice}
          </span>
          <span className="text-[#00927c] font-semibold">
            {item.discountPercent}%
          </span>
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <Button onClick={handleWishlist}>
            <Close className=" cursor-pointer bg-white rounded-full p-1" sx={{color:teal[500], fontSize:"2rem"}}/>
        </Button>

      </div>
    </div>
  );
};

export default WishlistProductCard;
