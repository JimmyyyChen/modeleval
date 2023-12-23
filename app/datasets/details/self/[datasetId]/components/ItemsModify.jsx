import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";

export function ResponsiveDialog(props) {
  const { questionType, item } = props;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        More
      </Button>
      {questionType === undefined ? (
        <div>Loading...</div>
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Detail</DialogTitle>
          <DialogContent>
            <div className="flex min-h-full w-96 flex-col space-y-2 pl-4">
              <div className="flex w-full flex-col">
                <div className="font-bold">
                  Question:
                </div>
                <div className="pl-4">
                  <DialogContentText>{item.question}</DialogContentText>
                </div>
              </div>
              {!questionType && (
                <div className="flex w-full flex-col">
                  <div className="font-bold">
                    Choices:
                  </div>
                  <div className="flex w-full flex-col pl-4">
                    {item.choices.map((choice, index) => (
                      <div className="flex w-full flex-row" key={`choice-${choice.id}`}>
                        <div className="w-full truncate text-left">
                          <DialogContentText>
                            {index}: {choice.content}
                          </DialogContentText>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col">
                <div className="font-bold">
                    {questionType ? "SampleAnswer" : "CorrectAnswer"}:{" "}
                </div>
                <div className="pl-4">
                  <DialogContentText>
                    {questionType ? item.sampleAnswer : item.correctAnswer}
                  </DialogContentText>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

ResponsiveDialog.propTypes = {
  questionType: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
};

function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount, tableTitle } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell key="id" align="left" padding="normal">
          ID
        </TableCell>
        <TableCell key="title" align="left" padding="normal">
          {tableTitle}
        </TableCell>
        <TableCell key="details" align="center" padding="normal">
          Details
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  tableTitle: PropTypes.string.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, datasetName, handleDeleteSelectedItems, handleEditSelectedItem, handleAddItem } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {datasetName}
        </Typography>
      )}

      {numSelected > 0 ? (
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteSelectedItems}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={handleEditSelectedItem}> 
            <EditIcon />
          </IconButton>
        </Tooltip>
        </>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={handleAddItem}>
            <AddCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  datasetName: PropTypes.string.isRequired,
  handleDeleteSelectedItems: PropTypes.func.isRequired,
  handleEditSelectedItem: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default function ItemsModify({ datasetInfo }) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState([]);
  const [tableTitle, setTableTitle] = useState("");

  useEffect(() => {
    const { questionType, ChoiceQuestions, ShortAnswerQuestions } = datasetInfo;
    setItems(questionType == 0 ? ChoiceQuestions : ShortAnswerQuestions);
    setTableTitle(questionType == 0 ? "Question" : "Prompt");
  }, [datasetInfo]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = items.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = useMemo(() => {
    if (!items) return [];
    return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [items, page, rowsPerPage]);

  const handleDeleteSelectedItems = () => {
    for (const id of selected) {
      // TODO: Delete the item from the database
      fetch(`/api/datasets/update/${datasetInfo.id}/questions/${id}`, {
        method: "DELETE",
      });
    }
  };

  const handleEditSelectedItem = () => {
    if (selected.length !== 1) {
      alert("Please select one item to edit!");
      return;
    }


  }

  const handleAddItem = () => {
    alert("Add item");
  }

  const handleDeleteDataset = async () => {
    const response = await axios.delete(`/api/datasets/delete/${datasetInfo.id}`);
    if (response.status === 200) {
      alert("Dataset deleted successfully!");
      window.location.href = "/profile/self";
    } else if (response.status === 403) {
      alert("You are not authorized to delete this dataset!");
    } else if (response.status === 404) {
      alert("Dataset not found!");
    } else {
      alert("Something went wrong!");
      console.error(response);
    }
  }

  return (
    <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            datasetName={datasetInfo.datasetName}
            handleDeleteSelectedItems={handleDeleteSelectedItems}
            handleEditSelectedItem={handleEditSelectedItem}
            handleAddItem={handleAddItem}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                rowCount={items.length}
                tableTitle={tableTitle}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={`tablerow-${row.id}`}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          onClick={(event) => handleClick(event, row.id)}
                        />
                      </TableCell>
                      <TableCell align="left">{index}</TableCell>
                      <TableCell align="left">{row.question}</TableCell>
                      <TableCell align="center">
                        <ResponsiveDialog
                          questionType={datasetInfo.questionType}
                          item={row}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={items.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <button
        className="btn btn-primary w-full text-white"
        onClick={handleDeleteDataset}
      >
        删除数据集
      </button>
    </div>
  );
}
