// import React from "react";

// const CategoryGrid = () => {
//   return (
//     <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px] px-5 lg:px-20">
//       {/* LEFT BIG IMAGE */}
//       <div className="col-span-3 row-span-12">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/v/p/3/free-prathna-om-vastra-fab-unstitched-original-imaghmwuprfjubfn.jpeg?q=70"
//           alt="Left banner"
//         />
//       </div>
//       {/* MIDDLE TOP SMALL (2 col / 6 row) */}
//       <div className="col-span-2 row-span-6">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/74/2455523/1.jpg?8931"
//           alt="Middle top small"
//         />
//       </div>

//       {/* MIDDLE TOP BIG (4 col / 6 row) */}
//       <div className="col-span-4 row-span-6">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://rukminim1.flixcart.com/image/612/612/xif0q/kurta/g/6/k/m-sksh-dt1105-pcbl-fubar-original-imafux247zhqym2z-bb.jpeg?q=70"
//           alt="Middle top big"
//         />
//       </div>

//       {/* RIGHT BIG IMAGE */}
//       <div className="col-span-3 row-span-12">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/92/9376523/1.jpg?3963"
//           alt="Right banner"
//         />
//       </div>

//       {/* MIDDLE BOTTOM BIG (4 col / 6 row) */}
//       <div className="col-span-4 row-span-6">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://ke.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/96/7803513/1.jpg?3225"
//           alt="Middle bottom big"
//         />
//       </div>

//       {/* MIDDLE BOTTOM SMALL (2 col / 6 row) */}
//       <div className="col-span-2 row-span-6">
//         <img
//           className="w-full h-full object-cover rounded-md"
//           src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/5/z/k/free-banarasi-saree-kalapushpi-unstitched-original-imagm5vz25z6fmuj.jpeg?q=70"
//           alt="Middle bottom small"
//         />
//       </div>
//     </div>
//   );
// };

// export default CategoryGrid;

import React from "react";
import { useAppSelector } from "../../../../State/Store";

const CategoryGrid = () => {
  const { customer } = useAppSelector((store) => store);
  const grid = customer.homePageData?.grid || [];

  return (
    <div className="grid grid-cols-12 grid-rows-12 gap-4 h-[600px] px-5 lg:px-20">
      {/* LEFT BIG IMAGE */}
      <div className="col-span-3 row-span-12">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[0]?.image}
          alt={grid[0]?.title || "Left banner"}
        />
      </div>

      {/* MIDDLE TOP SMALL */}
      <div className="col-span-2 row-span-6">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[1]?.image}
          alt={grid[1]?.title || "Grid image"}
        />
      </div>

      {/* MIDDLE TOP BIG */}
      <div className="col-span-4 row-span-6">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[2]?.image}
          alt={grid[2]?.title || "Grid image"}
        />
      </div>

      {/* RIGHT BIG IMAGE */}
      <div className="col-span-3 row-span-12">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[3]?.image}
          alt={grid[3]?.title || "Right banner"}
        />
      </div>

      {/* MIDDLE BOTTOM BIG */}
      <div className="col-span-4 row-span-6">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[4]?.image}
          alt={grid[4]?.title || "Grid image"}
        />
      </div>

      {/* MIDDLE BOTTOM SMALL */}
      <div className="col-span-2 row-span-6">
        <img
          className="w-full h-full object-cover rounded-md"
          src={grid[5]?.image}
          alt={grid[5]?.title || "Grid image"}
        />
      </div>
    </div>
  );
};

export default CategoryGrid;
