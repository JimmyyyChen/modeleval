"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

import DatasetOption from "./components/DatasetOption";
import ModelOption from "./components/ModelOption";

export default function NewTaskPage() {
  const router = useRouter();
  const { userId } = useAuth();

  const [datasets, setDatasets] = useState([]);
  const [models, setModels] = useState([]);

  const [selectedDataset, setSelectedDataset] = useState(null);
  const [selectedTaskMethod, setSelectedTaskMethod] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);

  const canAddTask =
    selectedDataset && selectedTaskMethod && selectedModels.length > 0;

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const res = await axios.get("/api/datasets");
        setDatasets(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatasets();

    const fetchModels = async () => {
      try {
        const res = await axios.get("/api/models");
        setModels(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchModels();
  }, []);

  const addTask = async () => {
    if (!canAddTask) {
      return;
    }

    let taskId;

    try {
      const response = await axios.post("/api/tasks/operations/addTask", {
        userId: userId,
        taskName: `${selectedDataset.datasetName} ${selectedTaskMethod}`,
        startTime: new Date(), // current time
        questionType: selectedDataset.questionType, // 0: 客观测试, 1: 主观测试, 2: 对抗测试
        modelIds: selectedModels.map((model) => model.modelid),
        datasetId: selectedDataset.id,
      });

      taskId = response.data.id;
    } catch (error) {
      console.log(error);
    }

    try {
      // start the task
      await axios.post(`/api/tasks/operations/startTask/${taskId}`);
    } catch (error) {
      console.log(error);
    }

    router.refresh();
  };

  return (
    <div className="flex w-full flex-col  space-y-5 rounded-2xl bg-white p-8 shadow-lg sm:p-20">
      <h1 className="text-3xl font-bold ">创建新测试</h1>
      <div className="flex items-center space-x-3">
        <h2 className="text-xl font-bold ">选择数据集</h2>
        <p>或</p>
        {/* TODO: create new dataset */}
        <Link className="link-primary link" href="/upload_dataset_demo">
          上传数据集
        </Link>
      </div>

      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          onClick={() => setSelectedDataset(dataset)}
          className="cursor-pointer"
        >
          <DatasetOption
            dataset={dataset}
            isSelected={selectedDataset && selectedDataset.id === dataset.id}
          />
        </div>
      ))}

      <h2 className="text-xl font-bold ">选择测试方式</h2>
      {/* 客观测试 主观测试 对抗测试 三选一 */}
      <div className="flex justify-between">
        <label className="label space-x-3">
          <input
            type="radio"
            name="method"
            className="radio-primary radio"
            disabled={
              (selectedDataset && selectedDataset.questionType === 1) ||
              !selectedDataset
            }
            onChange={() => setSelectedTaskMethod("客观测试")}
          />
          <span className="label-text font-bold">客观测试</span>
        </label>
        <label className="label space-x-3">
          <input
            type="radio"
            name="method"
            className="radio-primary radio"
            disabled={
              (selectedDataset && selectedDataset.questionType === 0) ||
              !selectedDataset
            }
            onChange={() => setSelectedTaskMethod("主观测试")}
          />
          <span className="label-text font-bold">主观测试</span>
        </label>
        <label className="label space-x-3">
          <input
            type="radio"
            name="method"
            className="radio-primary radio"
            disabled={
              (selectedDataset && selectedDataset.questionType === 0) ||
              !selectedDataset
            }
            onChange={() => setSelectedTaskMethod("对抗测试")}
          />
          <span className="label-text font-bold">对抗测试</span>
        </label>
      </div>
      <h2 className="text-xl font-bold">选择模型</h2>
      <div className="form-control w-max px-6 ">
        <label className="label cursor-pointer space-x-3">
          <input
            type="checkbox"
            className="checkbox-primary checkbox"
            readOnly={true}
            checked={selectedModels.length === models.length}
            onClick={
              selectedModels.length === models.length
                ? () => setSelectedModels([])
                : () => setSelectedModels(models)
            }
          />
          <span className="label-text font-bold">全选</span>
        </label>
      </div>

      {models.map((model) => (
        <div
          key={model.modelid}
          onClick={() => {
            const isModelSelected = selectedModels.some(
              (selectedModel) => selectedModel.modelid === model.modelid,
            );

            setSelectedModels((prevSelectedModels) => {
              if (isModelSelected) {
                // Remove the model from the selected models
                return prevSelectedModels.filter(
                  (selectedModel) => selectedModel.modelid !== model.modelid,
                );
              } else {
                // Add the model to the selected models
                return [...prevSelectedModels, model];
              }
            });
          }}
          className="cursor-pointer"
        >
          <ModelOption
            model={model}
            isSelected={selectedModels.some(
              (selectedModel) => selectedModel.modelid === model.modelid,
            )}
          />
        </div>
      ))}
      <div className="flex justify-end space-x-3">
        <Link href="/tasks">
          <button className="btn btn-secondary w-max">取消</button>
        </Link>
        {canAddTask ? (
          <Link href="/tasks">
            <button className="btn btn-primary w-max" onClick={addTask}>
              创建新测试
            </button>
          </Link>
        ) : (
          <button className="btn btn-primary w-max" disabled>
            创建新测试
          </button>
        )}
      </div>
    </div>
  );
}
