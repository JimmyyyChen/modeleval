import { DataGrid } from "@mui/x-data-grid";
import { EyeIcon, CheckIcon } from "@heroicons/react/24/solid";

import Link from "next/link";

const columnsOptions = [
  // autoEvalCol
  [
    { field: "isCorrect", headerName: "是否正确", width: 70 },
    { field: "question", headerName: "问题", width: 300 },
    { field: "generatedAnswer", headerName: "生成答案", width: 120 },
    { field: "correctAnswer", headerName: "正确答案", width: 120 },
    { field: "optionA", headerName: "选项 A", width: 100 },
    { field: "optionB", headerName: "选项 B", width: 100 },
    { field: "optionC", headerName: "选项 C", width: 100 },
    { field: "optionD", headerName: "选项 D", width: 100 },
  ],
  // humanEvalCol
  [
    { field: "isCorrect", headerName: "主观评测", minWidth: 80 },
    { field: "question", headerName: "问题", minWidth: 300 },
    { field: "generatedAnswer", headerName: "生成答案", minWidth: 300 },
  ],
];

// const comparativeEvalCol = [
//   { field: "id", headerName: "ID", minWidth: 50, flex: 0.1 },
//   { field: "score", headerName: "分数", minWidth: 80, flex: 0.1 },
//   { field: "type", headerName: "类型", minWidth: 150, flex: 0.15 },
//   { field: "question", headerName: "问题", minWidth: 300, flex: 1 },
//   { field: "generatedAnswer", headerName: "生成答案", minWidth: 300, flex: 1 },
// ];

export default function ResultTable({
  score,
  evalRef,
  modelName,
  questionType,
  answers,
}) {
  // questionType: 0: 客观评测, 1: 主观评测, 2: 对抗评测
  const columns = columnsOptions[questionType];

  let resultStatus;
  let evalButton = null;
  if (score === undefined) {
    if (questionType === 0) {
      resultStatus = "正在自动客观评测";
    } else if (questionType === 1) {
      resultStatus = "等待人工主观评测";

      evalButton = (
        <Link
          className="group btn btn-accent w-max rounded-3xl transition-all duration-300"
          href={evalRef}
        >
          <EyeIcon className="h-5 w-5" />
          <p className="w-0 break-keep opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100">
            进行主观评测
          </p>
        </Link>
      );
    }
  } else {
    resultStatus = `已完成评测, 获得 ${(score * 100).toFixed(2)} 分`;
    // evalButton is show its score
    if (questionType === 0) {
      evalButton = (
        <button className="btn btn-success w-max rounded-3xl text-white">
          <CheckIcon className="h-5 w-5" />
          <p className="break-keep ">{(score * 100).toFixed(2)}</p>
        </button>
      );
    } else if (questionType === 1) {
      evalButton = (
        <Link
          href={evalRef}
          className="group btn btn-success w-max rounded-3xl text-white transition-all duration-300 hover:btn-accent"
        >
          <CheckIcon className="h-5 w-5 group-hover:w-0" />
          <EyeIcon className="h-5 w-0 group-hover:w-5" />
          <p className="w-0 break-keep opacity-0 transition-all duration-300 group-hover:w-24 group-hover:opacity-100">
            修改主观评测
          </p>
          <p className="break-keep  group-hover:w-0 group-hover:opacity-0">
            {(score * 100).toFixed(2)}
          </p>
        </Link>
      );
    }
  }

  let rows;

  if (questionType === 0) {
    rows = answers.map((answer, index) => {
      return {
        id: index,
        isCorrect: answer.isCorrect ? "✅" : "❌",
        question: answer.question,
        generatedAnswer: answer.generatedAnswer,
        correctAnswer: answer.correctAnswer,
        optionA: answer.optionA,
        optionB: answer.optionB,
        optionC: answer.optionC,
        optionD: answer.optionD,
      };
    });
  } else if (questionType === 1) {
    rows = answers.map((answer, index) => {
      let isCorrectIndicator;
      if (answer.isCorrect === undefined) {
        isCorrectIndicator = "未评测";
      } else if (answer.isCorrect) {
        isCorrectIndicator = "✅";
      } else {
        isCorrectIndicator = "❌";
      }

      return {
        id: index,
        isCorrect: isCorrectIndicator,
        question: answer.question,
        generatedAnswer: answer.generatedAnswer,
      };
    });
  }

  return (
    <div className="flex space-x-3">
      <div className="collapse collapse-arrow border bg-white">
        <input type="checkbox" />
        <div className="collapse-title flex items-center space-x-3 ">
          <div className="font-mono text-xl font-bold">{modelName}</div>
          {/* show it when score exists */}
          <div className="font-bold text-primary">{resultStatus}</div>
        </div>
        <div className="collapse-content overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </div>
      {evalButton}
    </div>
  );
}
