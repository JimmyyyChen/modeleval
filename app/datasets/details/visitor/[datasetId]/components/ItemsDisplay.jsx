import PropTypes from "prop-types";
import { useState, useEffect, useMemo } from "react";
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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
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
        <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <span className="loading loading-spinner loading-md flex justify-center"></span>
        </div>
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
                <div className="font-bold">Question:</div>
                <div className="pl-4">
                  <DialogContentText>{item.question}</DialogContentText>
                </div>
              </div>
              {!questionType && (
                <div className="flex w-full flex-col">
                  <div className="font-bold">Choices:</div>
                  <div className="flex w-full flex-col pl-4">
                    {item.choices.map((choice, index) => (
                      <div
                        className="flex w-full flex-row"
                        key={`choice-${choice.id}`}
                      >
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

function EnhancedTableToolbar(props) {
  const { datasetName } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {datasetName}
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  datasetName: PropTypes.string.isRequired,
};

export default function ItemsDisplay({ datasetInfo }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const { questionType, ChoiceQuestions, ShortAnswerQuestions } = datasetInfo;
    setItems(questionType == 0 ? ChoiceQuestions : ShortAnswerQuestions);
  }, [datasetInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  const visibleRows = useMemo(() => {
    if (!items) return [];
    return items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [items, page, rowsPerPage]);

  return (
    <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar datasetName={datasetInfo.datasetName} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  <TableCell key="id" align="left" padding="normal">
                    ID
                  </TableCell>
                  <TableCell key="title" align="left" padding="normal">
                    Question
                  </TableCell>
                  <TableCell key="details" align="center" padding="normal">
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleRows.map((row, index) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={`tablerow-${row.id}`}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell align="left">{index}</TableCell>
                      <TableCell align="left">{row.question}</TableCell>
                      <TableCell align="center">
                        <ResponsiveDialog
                          questionType={datasetInfo.questionType}
                          item={row}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
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
    </div>
  );
}
