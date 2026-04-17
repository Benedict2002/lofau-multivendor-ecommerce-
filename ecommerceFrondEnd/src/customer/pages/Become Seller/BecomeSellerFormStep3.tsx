import TextField from "@mui/material/TextField";
import React from "react";

interface BecomeSellerFormStep2Props {
  formik: any;
}

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep2Props> = ({
  formik,
}: any) => {
  return (
    <div className="space-y-5">
      <TextField
        fullWidth
        name="bankDetails.accountnumber"
        label="Account Number"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountNumber &&
          Boolean(formik.errors.bankDetails?.accountnumber)
        }
        helperText={
          formik.touched.bankDetails?.accountNumber &&
          formik.errors.bankDetails?.accountnumber
        }
      />
      <TextField
        fullWidth
        name="bankDetails.ifscCode"
        label="IFSC Code"
        value={formik.values.bankDetails.ifscCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.ifscCode &&
          Boolean(formik.errors.bankDetails?.ifscCode)
        }
        helperText={
          formik.touched.bankDetails?.ifscCode &&
          formik.errors.bankDetails?.ifscCode
        }
      />
      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Account Holder Name"
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.bankDetails?.accountHolderName &&
          Boolean(formik.errors.bankDetails?.accountHolderName)
        }
        helperText={
          formik.touched.bankDetails?.accountHolderName &&
          formik.errors.bankDetails?.accountHolderName
        }
      />
    </div>
  );
};
export default BecomeSellerFormStep3;
