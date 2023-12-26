"use client";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { DataGrid } from "@mui/x-data-grid";

const scoring_criteria_content = (
  <article className="lg:prose-sm prose mx-auto p-5">
    <h2>客观题</h2>
    <p>我们规定：</p>
    <ol>
      <li>
        每个模型有一个全局变量<code>score_obj</code>
        ，存储该模型在迄今为止所有的客观测试上测试的得分。设模型
        <em>M</em>共进行了<em>N</em>
        轮测试任务，每次测试任务使用的数据集为
        <em>
          D<sub>i</sub>
        </em>
        ；数据集
        <em>
          D<sub>i</sub>
        </em>
        内共包含
        <em>
          A<sub>i</sub>
        </em>
        条数据，模型在数据集
        <em>
          D<sub>i</sub>
        </em>
        上共回答正确了
        <em>
          a<sub>i</sub>
        </em>
        道题目，则该模型的全局客观得分为：
        <code>ScoreObj_M = (1/N) * sum(a_i/A_i for i in range(1, N+1))</code>
      </li>
      <li>
        此外，我们也为每个<code>模型-数据集</code>
        存储一个单独的得分变量<code>score_obj_on_dataset</code>
        ，以便用户单独获取某个模型在某个数据集上的得分。其计算规则为:
        <code>ScoreObjOnDataset_i = a_i/A_i</code>
      </li>
    </ol>

    <h2>主观题</h2>
    <p>
      同客观题。<code>score_sub</code>
      用于存储模型在迄今为止所有的主观测试上测试的得分；
      <code>score_sub_on_dataset</code>
      用于存储模型在单个数据集上的得分。
    </p>

    <h2>对抗性评测</h2>
    <p>
      在对抗评测中，模型<em>M</em>的得分<em>S</em>
      这一变量由三个因素共同影响：模型<em>M</em>、被比较的模型
      <em>M'</em>、对抗性评测使用的数据集<em>D</em>。我们假设模型
      <em>M</em>和<em>j</em>个其他模型在<em>k</em>
      个数据集上进行过对抗性评测
      <code>
        ScoreAd(M, M_j, D_k) = (sum(S(M, j, k) for j, k in combinations) / Num)
      </code>
    </p>
    <p>
      - <code>S(M, j, k)</code>代表模型<em>M</em>在数据集
      <em>
        D<sub>k</sub>
      </em>
      上和模型
      <em>
        M<sub>j</sub>
      </em>
      进行对抗性评测的得分。在对抗性评测中，如果用户判定模型
      <em>
        M<sub>i</sub>
      </em>
      比
      <em>
        M<sub>j</sub>
      </em>
      的回答要更好，则
      <em>
        M<sub>i</sub>
      </em>
      得1分，
      <em>
        M<sub>j</sub>
      </em>
      得0分。设数据集
      <em>
        D<sub>k</sub>
      </em>
      中有<em>N</em>条数据，模型<em>M</em>在其中<em>n</em>
      条数据上比模型
      <em>
        M<sub>j</sub>
      </em>
      回答更好，则：
      <code>S(M, j, k) = n/N</code>
    </p>
    <p>
      - <code>Num = sum(1 for M, j, k in combinations if I(M, j, k))</code>。
      <code>I(M, j, k)</code>为示性函数，若模型<em>M</em>与
      <em>
        M<sub>j</sub>
      </em>
      在数据集
      <em>
        D<sub>j</sub>
      </em>
      上进行过对抗性研究，则<code>I(M, j, k)=1</code>，否则为
      <code>0</code>。
    </p>

    <p>
      以上所有计算结果最终均将转换为百分比，并去掉百分号作为模型得分（理论满分为100分）。
    </p>
  </article>
);
export default function HomePage() {
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [scores, setScores] = useState({});

  useEffect(() => {
    // Fetch models and datasets in parallel, then get scores.
    Promise.all([
      axios.get("/api/models").catch((err) => {
        console.error("Failed to fetch models", err);
      }),
      axios.get("/api/datasets").catch((err) => {
        console.error("Failed to fetch datasets", err);
      }),
    ]).then(([modelsRes, datasetsRes]) => {
      const newModels = modelsRes ? modelsRes.data : [];
      const newDatasets = datasetsRes ? datasetsRes.data : [];

      setModels(newModels);
      setDatasets(newDatasets);

      // Initialize an empty object to hold the new scores
      const newScores = {};

      // Function to fetch and set scores for a given model and dataset
      const fetchAndSetScores = (modelId, datasetId) => {
        axios
          .post("/api/tasks/scores/getHighestScore", { modelId, datasetId })
          .then((res) => {
            // Ensure the modelId entry exists
            newScores[modelId] = newScores[modelId] || {};
            // Set the score for the datasetId
            newScores[modelId][datasetId] = res.data;

            // Update the state with the new scores
            setScores((prevScores) => ({
              ...prevScores,
              [modelId]: {
                ...prevScores[modelId],
                [datasetId]: res.data,
              },
            }));
          })
          .catch((err) => {
            console.error(
              `Failed to fetch score for model ${modelId} and dataset ${datasetId}`,
              err,
            );
          });
      };

      // Iterate over models and datasets to fetch scores
      newModels.forEach((model) => {
        newDatasets.forEach((dataset) => {
          fetchAndSetScores(model.modelid, dataset.id);
        });
      });
    });
  }, []);

  let columns = [{ field: "model", headerName: "模型", minWidth: 150 }];
  let rows = [];

  // iterate over datasets to add columns
  datasets.forEach((dataset) => {
    const datasetName = dataset.datasetName;
    columns.push({
      field: datasetName,
      headerName: datasetName,
      minWidth: 150,
    });
  });

  // iterate over models to add rows
  models.forEach((model) => {
    const modelId = model.modelid; // what a bad naming
    const modelName = model.modelName;
    let row = { id: modelId, model: modelName };
    datasets.forEach((dataset) => {
      const datasetId = dataset.id;
      const score = scores[modelId] && scores[modelId][datasetId];
      row[dataset.datasetName] =
        score !== null ? (score * 100).toFixed(2) : "未评测";
      // TODO: sometimes backend return 0 while it should be null(未评测)
    });
    rows.push(row);
  });

  return (
    <div className="w-full space-y-3 text-left">
      <div className="flex flex-col items-center sm:flex-row">
        <Image src="/logo.png" alt="logo" width={100} height={100} priority />
        <h1 className="font-['Monaco'] text-4xl font-bold tracking-tight text-primary  sm:text-6xl">
          ModelEval
        </h1>
      </div>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        ModelEval旨在为用户提供一个全面评估和比较不同大模型能力的平台。它将提供一个开源免费的评测平台。开发者可以在这个平台上上传自己的数据集，并对不同模型在不同数据集上的性能进行包括客观评测、主观评测和对抗性评测在内的全面评估和比较。ModelEval将提供详细的模型能力评测榜单，帮助开发者了解各个模型的优势和限制。
      </p>
      {/* 当登出时显示注册登录按钮 */}
      <SignedOut>
        <div className="justify-left mt-10 flex items-center gap-x-3">
          <Link href="/sign-up" className="btn btn-accent">
            注册
          </Link>
          <Link href="/sign-in" className="btn btn-secondary">
            登录
          </Link>
        </div>
      </SignedOut>

      {/* 当登录时显示新建测试按钮 */}
      <SignedIn>
        <Link
          className="btn btn-accent w-max rounded-full shadow-md"
          href="/tasks/new-task"
        >
          <PlusIcon className="h-6 w-6" />
          新建测试
        </Link>
      </SignedIn>

      <div className="h-5"></div>

      <div className="space-y-5 rounded-3xl bg-stone-50 p-6 shadow-lg">
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold text-primary">
            客观与主观评测榜单
          </h2>

          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="link-primary link flex items-center"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <QuestionMarkCircleIcon className="h-5 w-5" />
            评分规则
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box no-scrollbar">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-circle btn-ghost btn-lg absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="text-2xl text-primary font-bold ">评分规则说明</h3>
              {scoring_criteria_content}
            </div>
          </dialog>
        </div>

        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={
              {
                // pagination: {
                //   paginationModel: { page: 0, pageSize: 5 },
                // },
                // pinnedColumns: { left: ["model"] }, only work on @mui/x-data-grid-pro T_T
              }
            }
            hideFooter
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              borderColor: "transparent",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
