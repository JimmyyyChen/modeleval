import { DataGrid } from "@mui/x-data-grid";

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
  modelName,
  questionType,
  answers,
}) {
  // questionType: 0: 客观评测, 1: 主观评测, 2: 对抗评测
  const columns = columnsOptions[questionType];

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
    <div className="collapse collapse-arrow border bg-white">
      <input type="checkbox" />
      <div className="collapse-title flex items-center space-x-3 ">
        <div className="font-mono text-xl font-bold">{modelName}</div>
        {/* show it when score exists */}
        {score && <div className="font-bold text-primary">{score} 分</div>}
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
  );
}
