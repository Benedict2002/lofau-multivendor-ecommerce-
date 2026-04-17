// import React from "react";
// import HomeCategoryTable from "./HomeCategoryTable";
// import { useAppSelector } from "../../../State/Store";

// const ElectronicTable = () => {
//   const { customer } = useAppSelector((store) => store);
//   return (
//     <div>
//       <HomeCategoryTable
//         data={customer.homePageData?.electricCategories || []}
//       />
//     </div>
//   );
// };

// export default ElectronicTable;

import React, { useEffect } from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchHomePageData } from "../../../State/customer/customerSlice";

const ElectronicTable = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchHomePageData());
  }, [dispatch]);

  return (
    <div>
      <HomeCategoryTable
        data={customer.homePageData?.electricCategories || []}
      />
    </div>
  );
};

export default ElectronicTable;
