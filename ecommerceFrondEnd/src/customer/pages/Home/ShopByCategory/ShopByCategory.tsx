import React from "react";
import ShopByCateoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../State/Store";

const ShopByCateory = () => {
  const { customer } = useAppSelector((store) => store);
  return (
    <div className="flex flex-wrap justify-between lg:px-20 gap-7">
      {customer.homePageData?.shopByCategories.map((item) => (
        <ShopByCateoryCard item={item} />
      ))}
    </div>
  );
};
export default ShopByCateory;
