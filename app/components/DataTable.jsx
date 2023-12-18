"use client";
// import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

function createData(id, name, calories, fat, carbs, protein) {
  return {
    id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData(1, "Cupcake", 305, 3.7, 67, 4.3),
  createData(2, "Donut", 452, 25.0, 51, 4.9),
  createData(3, "Eclair", 262, 16.0, 24, 6.0),
  createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
  createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
  createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
  createData(9, "KitKat", 518, 26.0, 65, 7.0),
  createData(10, "Lollipop", 392, 0.2, 98, 0.0),
  createData(11, "Marshmallow", 318, 0, 81, 2.0),
  createData(12, "Nougat", 360, 19.0, 9, 37.0),
  createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Fat (g)",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Carbs (g)",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function EnhancedTableHead(props) {
    const {
      order,
      orderBy,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              className={`p-4 font-bold ${
                headCell.numeric ? "text-center" : "text-left"
              } `}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
  };

export default function DataTable({ items, type, isvisitor }) {
  // const pages = Math.ceil(items.length / 10);
  // return (
  //   <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
  //     <div className="flex w-full flex-1 flex-col space-y-4 overflow-auto py-4">
  //       <table className="table table-zebra table-pin-rows w-full text-center">
  //         <thead>
  //           <tr className="border border-gray-200 bg-gray-200 font-bold text-black shadow-md 2xl:text-lg">
  //             <th></th>
  //             <td>Name</td>
  //             <td>Last Updata</td>
  //             <td>Likes</td>
  //             <td>Downloads</td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {/* TODO: Modify the datasets */}
  //           {items.slice(0, 10).map((item) => (
  //             <tr key={item.id}>
  //               <th>{item.id}</th>
  //               <td>
  //                 <Link
  //                   href={
  //                     isvisitor
  //                       ? `/${type}/details/visitor/${item.name}`
  //                       : `/${type}/details/${item.name}`
  //                   }
  //                   className="btn btn-outline btn-primary "
  //                 >
  //                   <div className="max-w-[6rem] truncate">{item.name}</div>
  //                 </Link>
  //               </td>
  //               <td>{item.last_updata}</td>
  //               <td>{item.likes}</td>
  //               <td>{item.downloads}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>

  //       <div className="join flex items-center justify-center">
  //         <input
  //           key="1"
  //           className="btn btn-square join-item"
  //           type="radio"
  //           name="options"
  //           aria-label="1"
  //           defaultChecked
  //         />
  //         {Array.from({ length: pages - 1 }, (_, i) => i + 2).map((item) => (
  //           <input
  //             key={item}
  //             className="btn btn-square join-item"
  //             type="radio"
  //             name="options"
  //             aria-label={item}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );

const [order, setOrder] = useState("asc");
const [orderBy, setOrderBy] = useState("calories");
const [page, setPage] = useState(0);
const [dense, setDense] = useState(false);
const [rowsPerPage, setRowsPerPage] = useState(5);

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === "asc";
  setOrder(isAsc ? "desc" : "asc");
  setOrderBy(property);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

const handleChangeDense = (event) => {
  setDense(event.target.checked);
};

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

const visibleRows = useMemo(
  () =>
    stableSort(rows, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
  [order, orderBy, page, rowsPerPage],
);

const [datasets, setDatasets] = useState(null);

useEffect(() => {
  const fetchDatasets = async () => {
    try {
      const response = await axios.get("/api/datasets");
      setDatasets(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchDatasets();
  console.log(datasets);
}, []);


return (
  <div className="shadow-lgw-full flex h-full w-full flex-col overflow-x-auto rounded-2xl border border-gray-200 bg-white p-6">
    <Box className="w-full">
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    className="hover:bg-gray-200"
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-center" align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  </div>
);
}
