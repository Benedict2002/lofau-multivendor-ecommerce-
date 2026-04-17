import React from "react";
import ReviewCard from "./ReviewCard";

const Review = () => {
  return (
    <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
      <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
        <img
          src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/49/4475523/1.jpg?7158"
          alt=""
        />
        <div>
          <div>
            <p className="font-bold text-xl">Alorin Clothing</p>
            <p className="text-lg text-gray-6--">Men's White Shirt</p>
          </div>
          <div>
            <div className="price flex items-center gap-3 mt-5 text-2xl">
              <span className="font-sans text-gray-800">Ksh 400</span>
              <span className="line-through text-gray-400">Ksh 999</span>
              <span className="text-[#00927c] font-semibold">60%</span>
            </div>
          </div>
        </div>
      </section>
      <section className="space-y-5 w-full">
        {[1, 1, 1, 1].map((item) => (
          <div className="space-y-3">
            <ReviewCard />
          </div>
        ))}
      </section>
    </div>
  );
};
export default Review;
