import Button from "@mui/material/Button";
import { teal } from "@mui/material/colors";
import Divider, { dividerClasses } from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import React, { useState } from "react";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  {
    /*const handleExpendedBrand = () => {
    setExpendBrand(!expendBrand);
  };*/
  }

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    console.log("clearAllFilters", searchParams);
    searchParams.forEach((value: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  const handleColorTogle = () => {
    setExpendColor(!expendColor);
  };
  const [expendColor, setExpendColor] = useState(false);
  return (
    <div className="z-50 space-y-5 bg-white">
      <div className="flex items-center justify-between h-[40px] px-9 lg:border-r">
        <p className="text-lg font-semibold">Filters</p>
        <Button
          onClick={clearAllFilters}
          size="small"
          className="text-teal-600 cursor-pointer font-semibold "
        >
          clear all
        </Button>
      </div>
      <Divider />
      <div className="px-9 space-y-6">
        <section>
          <FormControl>
            <FormLabel
              className="text-2xl font-semibold"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: teal[500],
                pb: "16px",
              }}
              id="color"
            >
              Color
            </FormLabel>
            <RadioGroup
              aria-labelledby="color"
              defaultValue=""
              name="color"
              onChange={updateFilterParams}
            >
              {/*<FormControlLabel value="colors" control={<Radio />} label="color" />*/}
              {colors.slice(0, expendColor ? colors.length : 5).map((item) => (
                <FormControlLabel
                  value={item.name}
                  control={<Radio />}
                  label={
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                      <p
                        style={{ backgroundColor: item.hex }}
                        className={`h-5 w-5 rounded-full ${item.name === "White" ? "border" : ""}`}
                      ></p>
                    </div>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>

          <div>
            <button
              onClick={handleColorTogle}
              className="text-[#00927c] cursor-pointer hover:text-teal-900 flex items-center"
            >
              {expendColor ? "hide" : `${colors.length - 5} more`}
            </button>
          </div>
        </section>
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="price"
            >
              Price
            </FormLabel>
            <RadioGroup
              name="price"
              onChange={updateFilterParams}
              aria-labelledby="price"
              defaultValue=""
            >
              {price.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
        <Divider />
        <section>
          <FormControl>
            <FormLabel
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                pb: "14px",
                color: teal[600],
              }}
              className="text-2xl font-semibold"
              id="brand"
            >
              Discount
            </FormLabel>
            <RadioGroup
              name="discount"
              onChange={updateFilterParams}
              aria-labelledby="brand"
              defaultValue=""
            >
              {discount.map((item, index) => (
                <FormControlLabel
                  key={item.name}
                  value={item.value}
                  control={<Radio size="small" />}
                  label={item.name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </section>
      </div>
    </div>
  );
};
export default FilterSection;
