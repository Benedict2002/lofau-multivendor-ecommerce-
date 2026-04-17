// import React from "react";
// import HomeCategoryTable from "./HomeCategoryTable";
// import { useAppSelector } from "../../../State/Store";

// const ShopByCategory = () => {
//   const { customer } = useAppSelector((store) => store);
//   return (
//     <div>
//       <HomeCategoryTable data={customer.homePageData?.shopByCategories || []} />
//     </div>
//   );
// };

// export default ShopByCategory;

import React, { useEffect } from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchHomePageData } from "../../../State/customer/customerSlice";

const ShopByCategory = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  return (
    <div>
      <HomeCategoryTable data={customer.homePageData?.shopByCategories || []} />
    </div>
  );
};

export default ShopByCategory;
