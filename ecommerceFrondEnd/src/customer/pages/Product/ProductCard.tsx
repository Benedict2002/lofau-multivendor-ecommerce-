import { dividerClasses } from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

import Favorite from "@mui/icons-material/Favorite";
import type { Product } from "../../../types/ProductType";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { addProductToWishList } from "../../../State/customer/wishlistslice";
// const images = [
//   "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/49/4475523/1.jpg?7158",
//   "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/2455523/1.jpg?8992",
//   "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/74/7806792/1.jpg?5217",
// ];
const ProductCard = ({ item }: { item: Product }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
      interval = null;
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleWishlist = (event: any) => {
    event.stopPropagation();
    item.id && dispatch(addProductToWishList({ productId: item.id }));
  };

  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`,
          )
        }
        className="group px-4 relative"
      >
        <div
          className="card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {item.images.map((item, index) => (
            <img
              className="card-media object-top"
              src={item}
              alt=""
              style={{
                transform: `translateX(${(index - currentImage) * 100}%)`,
              }}
            />
          ))}

          {isHovered && (
            <div className="indicator flex flex-col items-center space-y-2">
              <div className="flex gap-3">
                <Button
                  onClick={handleWishlist}
                  variant="contained"
                  color="secondary"
                >
                  <Favorite sx={{ color: teal[500] }} />
                </Button>
                <Button variant="contained" color="secondary">
                  <ModeCommentIcon sx={{ color: teal[500] }} />
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
          <div className="name">
            <h1>{item.seller?.businessDetails.businessName}</h1>
            <p>{item.title}</p>
          </div>
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
      </div>
    </>
  );
};
export default ProductCard;
