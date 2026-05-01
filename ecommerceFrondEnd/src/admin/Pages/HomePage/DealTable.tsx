// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import Edit from "@mui/icons-material/Edit";
// import IconButton from "@mui/material/IconButton";
// import Delete from "@mui/icons-material/Delete";
// import { useAppDispatch, useAppSelector } from "../../../State/Store";
// import { getAllDeals } from "../../../State/admin/DealSlice";
// import React from "react";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

// export default function DealTable() {
//   const dispatch = useAppDispatch();
//   const { deal } = useAppSelector((store) => store);
//   React.useEffect(() => {
//     dispatch(getAllDeals());
//   }, []);

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>No</StyledTableCell>
//             <StyledTableCell>Image</StyledTableCell>
//             <StyledTableCell>Category </StyledTableCell>
//             <StyledTableCell align="right">Discount</StyledTableCell>
//             <StyledTableCell align="right">Update</StyledTableCell>
//             <StyledTableCell align="right">Delete</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {deal.deals.map((item, index) => (
//             <StyledTableRow key={item.id}>
//               <StyledTableCell component="th" scope="row">
//                 {index + 1}
//               </StyledTableCell>
//               <StyledTableCell>
//                 <img
//                   className="w-20 rounded-md"
//                   src={item.category.image}
//                   alt=""
//                 />
//               </StyledTableCell>
//               <StyledTableCell>{item.category.categoryId}</StyledTableCell>
//               <StyledTableCell align="right">{item.discount}</StyledTableCell>
//               <StyledTableCell align="right">
//                 <Button>
//                   <Edit />
//                 </Button>
//               </StyledTableCell>
//               <StyledTableCell align="right">
//                 <IconButton>
//                   <Delete sx={{ color: "red" }} />
//                 </IconButton>
//               </StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

import React from "react";

import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  getAllDeals,
  deleteDeal,
  updateDeal,
} from "../../../State/admin/DealSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DealTable() {
  const dispatch = useAppDispatch();
  const { deal } = useAppSelector((store) => store);

  const [open, setOpen] = React.useState(false);
  const [selectedDeal, setSelectedDeal] = React.useState<any>(null);

  const [image, setImage] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [discount, setDiscount] = React.useState("");

  React.useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  const handleEditOpen = (item: any) => {
    setSelectedDeal(item);
    setImage(item.category.image);
    setCategoryId(item.category.categoryId);
    setDiscount(String(item.discount));
    setOpen(true);
  };

  const handleUpdate = () => {
    dispatch(
      updateDeal({
        id: selectedDeal.id,
        data: {
          discount: Number(discount),
          category: {
            image,
            categoryId,
          },
        },
      }),
    );

    setOpen(false);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Delete this deal?");
    if (confirmDelete) {
      dispatch(deleteDeal(id));
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
              <StyledTableCell align="right">Delete</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {deal.deals.map((item: any, index: number) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>

                <StyledTableCell>
                  <img
                    src={item.category.image}
                    alt=""
                    className="w-20 rounded-md"
                  />
                </StyledTableCell>

                <StyledTableCell>{item.category.categoryId}</StyledTableCell>

                <StyledTableCell align="right">{item.discount}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button onClick={() => handleEditOpen(item)}>
                    <Edit />
                  </Button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <IconButton onClick={() => handleDelete(item.id)}>
                    <Delete sx={{ color: "red" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Update Deal</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
