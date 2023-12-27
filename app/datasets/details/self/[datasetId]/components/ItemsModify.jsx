import PropTypes from "prop-types";
import axios from "axios";
import { useState, useEffect, useMemo, useRef } from "react";
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

import { datasetTypes } from "@/app/constants";

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
                  {questionType ? "SampleAnswer" : "CorrectAnswer"}:
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

function EnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

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
          Question
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
};

function EnhancedTableToolbar(props) {
  const { numSelected, datasetName, datasetId, selected, questionType, items } =
    props;

  const [editOpen, setEditOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState("");
  const [editSampleAnswer, setEditSampleAnswer] = useState("");
  const [editChoices, setEditChoices] = useState("");
  const [editCorrectAnswer, setEditCorrectAnswer] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [addQuestion, setAddQuestion] = useState("");
  const [addSampleAnswer, setAddSampleAnswer] = useState("");
  const [addChoices, setAddChoices] = useState("");
  const [addCorrectAnswer, setAddCorrectAnswer] = useState("");

  const regex =
    /^\[\s*(?:"([^"]*)"|'([^']*)')(?:\s*,\s*(?:"([^"]*)"|'([^']*)')?)(?:\s*,\s*(?:"([^"]*)"|'([^']*)')?)(?:\s*,\s*(?:"([^"]*)"|'([^']*)')?)\s*\]$/g;

  const handleDeleteSelectedItems = async () => {
    const request = await axios.post(
      `/api/datasets/update/${datasetId}/questions`,
      {
        items: selected,
      },
    );

    if (request.status === 200) {
      alert("条目删除成功！");

      location.reload();
    } else if (request.status === 403) {
      alert("你没有权限删除这些条目！");
    } else if (request.status === 404) {
      alert("条目不存在！");
    } else {
      alert("出现了一些错误！");
      console.error(request);
    }
  };

  const handleEditOpen = () => {
    if (selected.length !== 1) {
      alert("请选择一个条目进行编辑！");
      return;
    }

    setEditQuestion("");
    setEditSampleAnswer("");
    setEditChoices("");
    setEditCorrectAnswer("");

    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditQuestion("");
    setEditSampleAnswer("");
    setEditChoices("");
    setEditCorrectAnswer("");

    setEditOpen(false);
  };

  const handleEditSubmit = async () => {
    if (
      editQuestion === "" &&
      editSampleAnswer === "" &&
      editChoices === "" &&
      editCorrectAnswer === ""
    ) {
      alert("请至少输入一个需要修改的属性！");
      return;
    }

    var choices = [];

    if (editChoices && (choices = regex.exec(editChoices)) !== null) {
      choices = choices.slice(1).filter((item) => Boolean(item));
    } else if (editChoices) {
      alert("Choices 格式不正确！");
      return;
    }

    const request = await axios.post(
      `/api/datasets/update/${datasetId}/questions/${selected[0]}`,
      {
        question: editQuestion,
        sampleAnswer: editSampleAnswer,
        choices: choices,
        correctAnswer: editCorrectAnswer,
      },
    );

    if (request.status === 200) {
      alert("条目修改成功！");

      handleEditClose();
      location.reload();
    } else if (request.status === 403) {
      alert("你没有权限修改这个条目！");
    } else if (request.status === 404) {
      alert("条目不存在！");
    } else {
      alert("出现了一些错误！");
      console.error(request);
    }
  };

  const handleAddOpen = () => {
    setAddQuestion("");
    setAddSampleAnswer("");
    setAddChoices("");
    setAddCorrectAnswer("");

    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddQuestion("");
    setAddSampleAnswer("");
    setAddChoices("");
    setAddCorrectAnswer("");

    setAddOpen(false);
  };

  const handleAddSubmit = () => {
    if (
      (questionType && (addQuestion === "" || addSampleAnswer === "")) ||
      (!questionType &&
        (addQuestion === "" || addChoices === "" || addCorrectAnswer === ""))
    ) {
      alert("请填写所有属性！");
      return;
    }

    var choices = [];

    if (addChoices && (choices = regex.exec(addChoices)) !== null) {
      choices = choices.slice(1).filter((item) => Boolean(item));
    } else if (addChoices) {
      alert("Choices 格式不正确！");
      return;
    }

    axios
      .post(`/api/datasets/update/${datasetId}/questions/-1`, {
        question: addQuestion,
        sampleAnswer: addSampleAnswer,
        choices: choices,
        correctAnswer: addCorrectAnswer,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("条目添加成功！");

          handleAddClose();
          location.reload();
        } else if (response.status === 403) {
          alert("你没有权限添加这个条目！");
        } else if (response.status === 404) {
          alert("条目不存在！");
        } else {
          alert("出现了一些错误！");
          console.error(response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
            <IconButton onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Dialog open={editOpen} onClose={handleEditClose}>
            <DialogTitle>更改条目属性</DialogTitle>
            <DialogContent>
              <DialogContentText>
                请提交需要修改的属性，不需要修改的属性请留空。
                <br />
                请注意，如果进行修改，那么原有的选项或者答案将会被清空。Choices
                应为以中括号([])包裹，逗号(,)分隔的单/双引号(''/"")字符串数组，且
                Choices 长度必须为 4，如下：
                <br />
                ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
                <br />
                注：以上标点全部为英文标点。
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="question"
                label="Question"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setEditQuestion(event.target.value)}
              />
              {questionType ? (
                <TextField
                  margin="dense"
                  id="sample_answer"
                  label="SampleAnswer"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setEditSampleAnswer(event.target.value)}
                />
              ) : (
                <>
                  <TextField
                    margin="dense"
                    id="choices"
                    label="Choices"
                    type="text"
                    multiline
                    maxRows={4}
                    fullWidth
                    variant="standard"
                    onChange={(event) => setEditChoices(event.target.value)}
                  />
                  <TextField
                    margin="dense"
                    id="correct_answer"
                    label="CorrectAnswer"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) =>
                      setEditCorrectAnswer(event.target.value)
                    }
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>取消</Button>
              <Button onClick={handleEditSubmit}>提交</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Tooltip title="Add">
            <IconButton onClick={handleAddOpen}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Dialog open={addOpen} onClose={handleAddClose}>
            <DialogTitle>新增条目</DialogTitle>
            <DialogContent>
              <DialogContentText>
                请提交需要新增的条目，每个属性均需要填写。
                <br />
                请注意，Choices
                应为以中括号([])包裹，逗号(,)分隔的单/双引号(''/"")字符串数组，且
                Choices 长度必须为 4，如下：
                <br />
                ["Choice 1", "Choice 2", "Choice 3", "Choice 4"]
                <br />
                注：以上标点全部为英文标点。
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                id="question"
                label="Question"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setAddQuestion(event.target.value)}
              />
              {questionType ? (
                <TextField
                  required
                  margin="dense"
                  id="sample_answer"
                  label="SampleAnswer"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setAddSampleAnswer(event.target.value)}
                />
              ) : (
                <>
                  <TextField
                    required
                    margin="dense"
                    id="choices"
                    label="Choices"
                    type="text"
                    multiline
                    maxRows={4}
                    fullWidth
                    variant="standard"
                    onChange={(event) => setAddChoices(event.target.value)}
                  />
                  <TextField
                    required
                    margin="dense"
                    id="correct_answer"
                    label="CorrectAnswer"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) =>
                      setAddCorrectAnswer(event.target.value)
                    }
                  />
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAddClose}>取消</Button>
              <Button onClick={handleAddSubmit}>提交</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  datasetName: PropTypes.string.isRequired,
  datasetId: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  questionType: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default function ItemsModify({ datasetInfo }) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [items, setItems] = useState([]);

  const [modifyOpen, setModifyOpen] = useState(false);
  const [modifyDatasetName, setModifyDatasetName] = useState("");
  const [modifyDescription, setModifyDescription] = useState("");
  const [modifyNewLabels, setModifyNewLabels] = useState("");

  const regex =
    /^\[\s*(?:"([^"]*)"|'([^']*)')(?:\s*,\s*(?:"([^"]*)"|'([^']*)')?)*\s*\]$/g;

  useEffect(() => {
    const { questionType, ChoiceQuestions, ShortAnswerQuestions } = datasetInfo;
    setItems(questionType == 0 ? ChoiceQuestions : ShortAnswerQuestions);
  }, [datasetInfo]);

  const labelListRef = useRef();
  const uniqueLabelsRef = useRef();
  const disabledLabelsRef = useRef();

  if (datasetInfo && datasetInfo.label_list && !labelListRef.current) {
    labelListRef.current = datasetInfo.label_list.map((item) => item.labelName);
    disabledLabelsRef.current = datasetTypes[0]["value"]
      .map((item) => item.content)
      .concat(datasetTypes[1]["value"].map((item) => item.content));

    var labels = datasetTypes[2]["value"]
      .map((item) => item.content)
      .concat(labelListRef.current);
    uniqueLabelsRef.current = [...new Set(labels)];
  }

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

  const handleDeleteDataset = async () => {
    const response = await axios.delete(
      `/api/datasets/delete/${datasetInfo.id}`,
    );
    if (response.status === 200) {
      alert("数据集删除成功！");
      window.location.href = "/profile/self";
    } else if (response.status === 403) {
      alert("你没有权限删除这个数据集！");
    } else if (response.status === 404) {
      alert("数据集不存在！");
    } else {
      alert("出现了一些错误！");
      console.error(response);
    }
  };

  const handleModifyDatasetOpen = () => {
    setModifyDatasetName("");
    setModifyDescription("");
    setModifyNewLabels("");

    setModifyOpen(true);
  };

  const handleModifyDatasetClose = () => {
    setModifyDatasetName("");
    setModifyDescription("");
    setModifyNewLabels("");

    setModifyOpen(false);
  };

  const handleModifyDatasetSubmit = async () => {
    if (
      modifyDatasetName === "" &&
      modifyDescription === "" &&
      labelListRef.current.length === datasetInfo.label_list.length &&
      labelListRef.current.sort().toString() ===
        datasetInfo.label_list
          .map((item) => item.labelName)
          .sort()
          .toString() &&
      modifyNewLabels === ""
    ) {
      alert("请至少修改至少一个属性！");
      return;
    }

    var newLabels = [];

    if (modifyNewLabels && regex.exec(modifyNewLabels) !== null) {
      modifyNewLabels
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim())
        .filter((item) => Boolean(item))
        .forEach((item) => newLabels.push(item.slice(1, -1)));
    } else if (modifyNewLabels) {
      alert("New Labels 格式不正确！");
      return;
    }

    const response = await axios.post(
      `/api/datasets/update/${datasetInfo.id}`,
      {
        datasetName: modifyDatasetName,
        description: modifyDescription,
        label_list: [...new Set(labelListRef.current.concat(newLabels))],
      },
    );

    if (response.status === 200) {
      alert("数据集属性修改成功！");

      handleModifyDatasetClose();
      location.reload();
    } else if (response.status === 403) {
      alert("你没有权限修改这个数据集！");
    } else if (response.status === 404) {
      alert("数据集不存在！");
    } else {
      alert("出现了一些错误！");
      console.error(response);
    }
  };

  return (
    <div className="h-full w-full rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            datasetName={datasetInfo.datasetName}
            datasetId={datasetInfo.id}
            selected={selected}
            questionType={datasetInfo.questionType}
            items={items}
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
                      <TableCell align="left">
                        {items.indexOf(row) + 1}
                      </TableCell>
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

      <div className="flex h-full w-full flex-col space-y-4">
        <button
          className="btn btn-primary w-full text-white"
          onClick={handleDeleteDataset}
        >
          删除数据集
        </button>
        <button
          className="btn btn-primary w-full text-white"
          onClick={handleModifyDatasetOpen}
        >
          修改数据集属性
        </button>
        <Dialog open={modifyOpen} onClose={handleModifyDatasetClose}>
          <DialogTitle>修改数据集属性</DialogTitle>
          <DialogContent>
            <DialogContentText>
              请提交需要修改的属性，不需要修改的属性请留空。
              <br />
              请注意，数据集最终适配标签与当前选中一致。New Labels
              列可以自定义标签，对于每个数据集，自定义标签自动选中（可在后续取消），应为以中括号([])包裹，逗号(,)分隔的单/双引号(''/"")字符串数组，如下：
              <br />
              ["Label 1", "Label 2", "Label 3"]
              <br />
              注：以上标点全部为英文标点。
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Dataset Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(event) => setModifyDatasetName(event.target.value)}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              multiline
              maxRows={4}
              fullWidth
              variant="standard"
              onChange={(event) => setModifyDescription(event.target.value)}
            />
            <div className="flex flex-col pt-4">
              <div className="text-gray-600">Labels:</div>
              <div className="flex flex-wrap">
                {uniqueLabelsRef.current.map((label) => (
                  <div
                    key={`label-value-${label}`}
                    className="form-control m-1 rounded-3xl bg-white px-2 shadow"
                  >
                    <label className="label cursor-pointer space-x-2 p-2">
                      <input
                        type="checkbox"
                        className="checkbox-primary checkbox h-4 w-4"
                        disabled={disabledLabelsRef.current.includes(label)}
                        defaultChecked={labelListRef.current.includes(label)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            labelListRef.current.push(label);
                          } else {
                            labelListRef.current.splice(
                              labelListRef.current.indexOf(label),
                              1,
                            );
                          }
                        }}
                      />
                      <span className="label-text text-gray-600">{label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <TextField
              margin="dense"
              id="new_labels"
              label="New Labels"
              type="text"
              multiline
              maxRows={4}
              fullWidth
              variant="standard"
              onChange={(event) => setModifyNewLabels(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModifyDatasetClose}>取消</Button>
            <Button onClick={handleModifyDatasetSubmit}>提交</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
