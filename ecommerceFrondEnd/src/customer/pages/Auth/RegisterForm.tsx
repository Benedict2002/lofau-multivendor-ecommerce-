import React from "react";
import { useAppDispatch } from "../../../State/Store";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { sendLoginSignUpOtp } from "../../../State/AuthSlice";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    /* onSubmit: (values) => {
              console.log("form data", values);
              //values.otp=Number(values.otp)
              dispatch(sellerLogin({ email: values.email, otp: values.otp }));
            }, */
    onSubmit: async (values) => {
      console.log("form data", values);

      //   try {
      //     // const res = await dispatch(
      //     //   sellerLogin({
      //     //     email: values.email,
      //     //     otp: values.otp,
      //     //   })
      //     // ).unwrap();

      //     console.log("LOGIN SUCCESS:", res);
      //   } catch (err) {
      //     console.error("LOGIN ERROR:", err);
      //   }
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignUpOtp({ email: formik.values.email }));
  };
  return (
    <div>
      {" "}
      <h1 className="text-center font-bold text-x1 text-[#00927c] pb-8">
        Signup
      </h1>
      <div className="space-y-3">
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
        {true && (
          <div
            className="space-y-3
              "
          >
            <div className="space-y-5">
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
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </div>
        )}

        {false && (
          <Button
            onClick={handleSendOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            SENT OTP
          </Button>
        )}
        <Button
          onClick={() => formik.handleSubmit()}
          fullWidth
          variant="contained"
          sx={{ py: "11px" }}
        >
          SIGNUP
        </Button>
      </div>
    </div>
  );
};
export default RegisterForm;
