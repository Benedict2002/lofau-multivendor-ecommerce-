import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";
import type { HomeCategory } from "../../../types/HomeCategoryTypes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../State/Store";
import { updateCategory } from "../../../State/admin/HomecategorySlice";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function HomeCategoryTable({ data }: { data: HomeCategory[] }) {
  const dispatch = useAppDispatch();

  const [localData, setLocalData] = useState<HomeCategory[]>([]);
  useEffect(() => {
    if (localData.length === 0 && data.length > 0) {
      setLocalData(data);
    }
  }, [data]);

  const [editId, setEditId] = useState<number | null>(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");

  // const [newImage, setNewImage] = useState("");

  // const [editId, setEditId] = useState<number | null>(null);
  // const [newName, setNewName] = useState("");

  const handleEdit = async (category: HomeCategory) => {
    if (editId === category.id) {
      await dispatch(
        updateCategory({
          id: category.id!,
          data: {
            categoryId: newName,
            image: newImage,
          },
        }),
      );

      // ✅ update UI safely
      const res = await dispatch(
        updateCategory({
          id: category.id!,
          data: {
            categoryId: newName,
            image: newImage,
          },
        }),
      ).unwrap();

      // update UI using backend response
      const updated = localData.map((item) =>
        item.id === res.id ? res : item,
      );

      setLocalData(updated);
      setEditId(null);
    } else {
      setEditId(category.id!);
      setNewName(category.categoryId);
      setNewImage(category.image);
    }
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Image </StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localData.map((category, index) => (
            <StyledTableRow key={category.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{category.id}</StyledTableCell>
              <StyledTableCell>
                {editId === category.id ? (
                  <input
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <img
                    className="w-20 rounded-md"
                    src={category.image}
                    alt=""
                  />
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editId === category.id ? (
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  category.categoryId
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => handleEdit(category)}>
                  {editId === category.id ? "Save" : <Edit />}
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
