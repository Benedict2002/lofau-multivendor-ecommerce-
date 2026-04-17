import Divider, { dividerClasses } from "@mui/material/Divider";
import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchAllproducts } from "../../../State/customer/ProductSlice";
import { useParams, useSearchParams } from "react-router-dom";

const Product = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (value: number) => {
    setPage(value);
  };
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [searchParam, setSearchparams] = useSearchParams();
  const { category } = useParams();
  const { product } = useAppSelector((store) => store);

  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [sort, setSort] = useState();

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };

  // useEffect(() => {
  //   const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
  //   const color = searchParam.get("color");
  //   const minDiscount = searchParam.get("discount")
  //     ? Number(searchParam.get("discount"))
  //     : undefined;
  //   const pageNumber = page - 1;
  //   const newFilter = {
  //     color: color || "",
  //     minPrice: minPrice ? Number(minPrice) : undefined,
  //     maxPrice: maxPrice ? Number(maxPrice) : undefined,
  //     minDiscount,
  //     pageNumber,
  //   };

  //   dispatch(fetchAllproducts(newFilter));
  // }, [category, searchParam]);

  useEffect(() => {
    const priceParam = searchParam.get("price");
    const discountParam = searchParam.get("discount");
    const colorParam = searchParam.get("color");

    let minPrice: number | undefined;
    let maxPrice: number | undefined;

    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      if (!isNaN(min)) minPrice = min;
      if (!isNaN(max)) maxPrice = max;
    }

    const minDiscount =
      discountParam && !isNaN(Number(discountParam))
        ? Number(discountParam)
        : undefined;

    const filter: any = {
      category,
      pageNumber: page - 1,
    };

    if (minPrice !== undefined) filter.minPrice = minPrice;
    if (maxPrice !== undefined) filter.maxPrice = maxPrice;
    if (minDiscount !== undefined) filter.minDiscount = minDiscount;
    if (sort) filter.sort = sort;
    if (colorParam) filter.color = colorParam;

    console.log("FINAL FILTER OBJECT:", filter);

    dispatch(fetchAllproducts(filter));
  }, [category, searchParam]);

  return (
    <div className="z-10 mt-10">
      <div>
        <h1 className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 uppercase space-x-2">
          Women serees
        </h1>
      </div>
      <div className="lg:flex">
        <section className="filter_section hidden lg:block w-[20%]">
          <FilterSection />
        </section>
        <div className="w-full lg:w-[80%] space-y-5">
          <div className="flex justify-between items-center px-9 h-[40px]">
            <div className=" relative w-[50%]">
              {!isLarge && (
                <IconButton>
                  <FilterAltIcon />
                </IconButton>
              )}

              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={handleSortChange}
              >
                <MenuItem value={"price_low"}>Price : Low - High</MenuItem>
                <MenuItem value={"price_high"}>Price : High - Low</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 px-5 justify-center">
            {product.products.map((item) => (
              <ProductCard item={item} />
            ))}
          </section>
          <div className="flex justify-center py-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Product;
