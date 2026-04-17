import React from "react";

const SimilarProductCard = () => {
  return (
    <div className="group px-4 relative">
      <div className="card">
        <img
          className="card-media object-top"
          src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/05/2455523/1.jpg?8992"
          alt=""
        />
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>Nike</h1>
          <p>White Short</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">Ksh 400</span>
          <span className="thin-line-through text-gray-400">Ksh 999</span>
          <span className="text-[#00927c] font-semibold">60%</span>
        </div>
      </div>
    </div>
  );
};
export default SimilarProductCard;
