import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import { useAppDispatch } from "../../../State/Store";
import { createOrder } from "../../../State/customer/OrderSlice";

const AddressFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),

  mobile: Yup.string()
    .matches(/^(07|01)\d{8}$/, "Enter a valid Kenyan mobile number")
    .required("Mobile number is required"),

  pinCode: Yup.string()
    .matches(/^[0-9]{6}$/, "Pin code must be 6 digits")
    .required("Pin code is required"),

  address: Yup.string()
    .trim()
    .min(5, "Address is too short")
    .required("Address is required"),

  locality: Yup.string().trim().required("Locality is required"),

  city: Yup.string().trim().required("City is required"),

  state: Yup.string().trim().required("State is required"),
});

const AddressForm = ({ paymentGateway }: any) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      pinCode: "",

      address: "",
      city: "",
      state: "",
      locality: "",
    },
    validationSchema: AddressFormSchema,
    onSubmit: (values) => {
      //submit form

      console.log(values);
      dispatch(
        createOrder({
          address: values,
          jwt: localStorage.getItem("jwt") || "",
          paymentGateway: paymentGateway,
        }),
      );
    },
  });
  return (
    <Box sx={{ max: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">Contact Details</p>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pinCode"
              label="Pin Code"
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="locality"
              label="Locality"
              value={formik.values.locality}
              onChange={formik.handleChange}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ py: "14px" }}
            >
              Add Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default AddressForm;
