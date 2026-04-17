import Button from "@mui/material/Button";
import React from "react";
import AddressCard from "./AddressCard";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import PricingCart from "../Cart/PricingCard";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "MPESA",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuQcqiVnTWptAydNGDksBgi7yikOLL76dDOA&s",
    label: "",
  },

  {
    value: "STRIPE",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    label: "",
  },
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = React.useState("MPESA");

  const handlePaymentChange = (event: any) => {
    setPaymentGateway(event.target.value);
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold "> Select Address</h1>
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Addresses</p>
              <div className="space-y-3">
                {[1, 1, 1].map((item) => (
                  <AddressCard />
                ))}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
          </div>
          <div>
            <div>
              <div className="space-y-3 border p-5 rounded-md ">
                <h1 className="text-[#00927c] font-medium pb-2 text-center">
                  Choose Payment Gateway
                </h1>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="flex justify-between pr-0"
                  onChange={handlePaymentChange}
                  value={paymentGateway}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      className="border w-[45%] pr-2 rounded-md flex justify-center"
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          className={`${item.value == "stripe" ? "w-14" : ""} object-cover`}
                          src={item.image}
                          alt={item.label}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="border rounded-md">
              <PricingCart />
              <div className="p-5">
                <Button fullWidth variant="contained" sx={{ py: "11px" }}>
                  CheckOut
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};
export default Checkout;
