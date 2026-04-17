import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import React from "react";
import TransactionTable from "./Transaction";

const Payment = () => {
  return (
    <div className=" space-y-6">
      <Card className="rounded-md space-y-4 p-5">
        <h1 className="text-gray-600 font-medium">Total Earning</h1>
        <h1 className="font-bold text-xl pb-1">Ksh 17,980</h1>
        <Divider />
        <p className="text-gray-600 font-medium pt-1">
          Last Payment: <strong>Ksh 0</strong>
        </p>
      </Card>
      <div className="pt-10  ">
        <Button className="mb-6" variant="contained">
          Transaction
        </Button>
        <div className="mt-8">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Payment;
