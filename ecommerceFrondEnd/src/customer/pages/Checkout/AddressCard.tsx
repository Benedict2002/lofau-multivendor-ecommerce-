import Radio from "@mui/material/Radio";
import React from "react";

const AddressCard = () => {
  const handleChange = (event: any) => {
    console.log(event.target.checked);
  };
  return (
    <div className="p-5 border rounded-md flex">
      <div>
        <Radio
          onChange={handleChange}
          checked={true}
          value=""
          name="radio-button"
        />
      </div>
      <div className="space-y-3 pt-3">
        <h1>Ben</h1>
        <p className="w-[320pxpx]">
          Kasarani , Stima, Thika road , Juja - 00100
        </p>
        <p>
          <strong>Mobile :</strong> 0740291124
        </p>
      </div>
    </div>
  );
};
export default AddressCard;
