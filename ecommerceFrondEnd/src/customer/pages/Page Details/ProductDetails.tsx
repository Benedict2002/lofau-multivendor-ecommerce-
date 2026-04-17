import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { teal } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import { colors } from "../../../data/Filter/color";
import ShieldIcon from "@mui/icons-material/Shield";
import WalletIcon from "@mui/icons-material/Wallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import SimilarProduct from "./SimilarProduct";
import ReviewCard from "../Review/ReviewCard";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../State/customer/ProductSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = React.useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { product } = useAppSelector((store) => store);
  const [activeImage, setActiveImage] = useState(0);

  const handleActiveImage = (value: number) => () => {
    setActiveImage(value);
  };

  useEffect(() => {
    dispatch(fetchProductById(Number(productId)));
  }, [productId]);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product.product?.images.map((item, index) => (
              <img
                onClick={handleActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-md"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full rounded-md"
              src={product.product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-[#00927c]">
            {" "}
            {product.product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">
            {product.product?.title}
          </p>
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <StarIcon
                sx={{
                  color: teal[500],
                  fontSize: "17px",
                }}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <span> 234 ratings</span>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">
                Ksh {product.product?.sellingPrice}
              </span>
              <span className="line-through text-gray-400">
                Ksh {product.product?.mrpPrice}
              </span>
              <span className="text-[#00927c] font-semibold">
                {product.product?.discountPercent}%
              </span>
            </div>
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above Ksh 15, 000
            </p>
          </div>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <ShieldIcon sx={{ color: teal[500] }} />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <WorkspacePremiumIcon sx={{ color: teal[500] }} />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShippingIcon sx={{ color: teal[500] }} />
              <p>Free Shipping &Returns</p>
            </div>
            <div className="flex items-center gap-4">
              <WalletIcon sx={{ color: teal[500] }} />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <RemoveIcon />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <AddIcon />
              </Button>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCartIcon />}
              sx={{ py: "1rem" }}
            >
              Add To Bag
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              wishlist
            </Button>
          </div>
          <div className="mt-5">
            <p>{product.product?.description}</p>
          </div>
          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
