"use client";
import Link from "next/link";
import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.grey[50],
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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



export default function DataTable({ items, type, isvisitor }) {
  const headCells = [
    {
      id: type === "datasets" ? "datasetName" : "modelName",
      label: "Name",
    },
    {
      id: "lastUpdate",
      label: "Last Update ",
    },
    {
      id: "starCount",
      label: "Stars",
    },
    {
      id: "downloadCount",
      label: "Downloads",
    },
  ];
    function EnhancedTableHead(props) {
      const { order, orderBy, onRequestSort } = props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };

      return (
        <TableHead>
          <StyledTableRow>
            {headCells.map((headCell) => (
              <StyledTableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
                align="center"
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                  className="font-bold "
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
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
      );
    }

    EnhancedTableHead.propTypes = {
      onRequestSort: PropTypes.func.isRequired,
      order: PropTypes.oneOf(["asc", "desc"]).isRequired,
      orderBy: PropTypes.string.isRequired,
    };

const rows = useMemo(
  () => {
    if (!items) return [];
    return items.map((item) => ({
      name: type === "datasets" ? item.datasetName : item.modelName,
      lastUpdate: item.lastUpdate,
      starCount: item.starCount,
      downloadCount: item.downloadCount,
    })
  )},
  [items, type],
);

if (rows) {
  console.log(rows);
}

const [order, setOrder] = useState("asc");
const [orderBy, setOrderBy] = useState("calories");
const [page, setPage] = useState(0);
const [dense, setDense] = useState(false);
const [rowsPerPage, setRowsPerPage] = useState(10);

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
  [order, orderBy, page, rowsPerPage, rows],
);

if (!items) {
    return (
      <div className="shadow-lg flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 text-lg text-primary">
        Loading...
      </div>
    );
}


return (
  <div className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
    <Box className="w-full">
      <Paper className="mb-1 w-full">
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
              {visibleRows.map((row) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  className="hover:bg-gray-600"
                >
                  <StyledTableCell align="center">
                    <Link
                      href={
                        isvisitor
                          ? `/${type}/details/visitor/${row.name}`
                          : `/${type}/details/${row.name}`
                      }
                      className="btn btn-outline btn-primary "
                    >
                      <div className="max-w-[6rem] truncate">
                        {row.name}
                      </div>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastUpdate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.starCount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.downloadCount}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <StyledTableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <StyledTableCell colSpan={6} />
                </StyledTableRow>
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
