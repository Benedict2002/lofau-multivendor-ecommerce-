import { useFormik } from "formik";
import React from "react";
import { discount } from "../../../data/Filter/discount";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createDeal } from "../../../State/admin/DealSlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store);
  console.log("Home page data:", customer.homePageData);
  const dealCategories = (customer.homePageData?.deals || []).map(
    (deal) => deal.category,
  );

  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log("submit", values);
      const reqData = {
        discount: values.discount,
        category: {
          id: values.category,
        },
      };
      dispatch(createDeal(reqData));
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="space-y-6 "
    >
      <div className="mt-4">
        <Typography variant="h4" className="text-center ">
          Create Deal
        </Typography>
      </div>
      <TextField
        fullWidth
        name="discount"
        label="City"
        value={formik.values.discount}
        onChange={formik.handleChange}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />

      <div className="mt-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            name="category"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.category}
            label="Category"
            onChange={formik.handleChange}
          >
            {(customer.homePageData?.deals || []).map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="mt-4">
        <Button
          type="submit"
          fullWidth
          sx={{ py: ".9rem" }}
          variant="contained"
        >
          {" "}
          Create Deal
        </Button>
      </div>
    </Box>
  );
};
export default CreateDealForm;
