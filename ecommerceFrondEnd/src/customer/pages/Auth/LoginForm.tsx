import React from "react";
import store, { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { sendLoginSignUpOtp, signin } from "../../../State/AuthSlice";
import CircularProgress from "@mui/material/CircularProgress";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    /* onSubmit: (values) => {
          console.log("form data", values);
          //values.otp=Number(values.otp)
          dispatch(sellerLogin({ email: values.email, otp: values.otp }));
        }, */
    onSubmit: async (values) => {
      console.log("form data", values);

      try {
        const res = await dispatch(signin(values));

        console.log("LOGIN SUCCESS:", res);
      } catch (err) {
        console.error("LOGIN ERROR:", err);
      }
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignUpOtp({ email: formik.values.email }));
  };
  return (
    <div>
      <h1 className="text-center font-bold text-x1 text-[#00927c] pb-8">
        Login
      </h1>
      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {auth.otpSent && (
          <div
            className="space-y-2
              "
          >
            <p
              className="font-medium text-sm opacity-60
            "
            >
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
            />
          </div>
        )}

        {auth.otpSent ? (
          <Button
            onClick={() => formik.handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.loading ? <CircularProgress /> : "Sent OTP"}
          </Button>
        )}
      </div>
    </div>
  );
};
export default LoginForm;
