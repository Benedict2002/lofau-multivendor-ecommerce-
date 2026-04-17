import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import React from "react";
import Delete from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";

const ReviewCard = () => {
  return (
    <div className="flex justify-between ">
      <Grid container spacing={9}>
        <Grid size={{ xs: 1 }}>
          <Box>
            <Avatar
              className="text-white "
              sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
            >
              L
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text:lg">Ben</p>
              <p className="opacity-70"> 2024-09-27T23:16.478333</p>
            </div>
          </div>
          <Rating readOnly value={4} precision={1} />
          <p>value for your money, great product</p>
          <div>
            <img
              className="w-24 h-24 object-cover"
              src="https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/49/4475523/1.jpg?7158"
              alt=""
            />
          </div>
        </Grid>
      </Grid>
      <div>
        <IconButton>
          <Delete sx={{ color: red[700] }} />
        </IconButton>
      </div>
    </div>
  );
};
export default ReviewCard;
