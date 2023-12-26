"use client";
import axios from "axios";
import { useState } from "react";
export default function IndexPagePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    let selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await axios.post("/api/datasets/upload", formData);
      if (response.status == 200) {
        alert(
          "文件上传成功!共成功上传了" +
            response.data["total_number"] +
            "条数据",
        );
        window.location.href = "/profile/self";
      }
      if (response.status == 206) {
        alert(
          "文件部分上传成功,共上传了" +
            response.data["total_number"] +
            "条数据，但是其中有" +
            response.data["wrong_number"] +
            "条数据格式错误",
        );
        window.location.href = "/profile/self";
      }
      if (response.status == 400) {
        alert("文件部分上传失败!格式错误");
      }
      if (response.status == 500) {
        alert(
          "文件上传失败，请检查文件格式是否正确，文件大小是否超过10MB，文件名是否含有中文",
        );
      }
    } catch (error) {
      console.error("Error uploading CSV file:", error);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // 阻止默认行为
  };

  const handleDrop = (event) => {
    event.preventDefault(); // 阻止默认行为
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]); // 设置拖放的文件为当前文件
      event.dataTransfer.clearData(); // 清除拖放数据
    }
  };

  return (
    <div className="flex w-full flex-col space-y-4">
      <article class="prose prose-sm">
        <h1>文件上传指南</h1>
        <p>了解如何正确上传.csv格式的数据集，包括主观题集和客观题集。</p>

        <h2>支持的数据集格式</h2>
        <p>
          目前仅支持.csv格式的文件上传。您可以上传包含主观题和客观题的数据集。
        </p>

        <h2>客观题数据集格式</h2>
        <p>
          请确保客观题数据集的表头（第一行）为<code>question</code>，
          <code>choices</code>，和<code>answer</code>
          。这分别代表题目，选项，和答案。题目和答案应以字符串形式呈现，选项应为数组形式，例如：
          <code>["AAA", "BBB", "CCC", "DDD"]</code>。
        </p>

        <h2>主观题数据集格式</h2>
        <p>
          主观题数据集的表头（第一行）应为<code>prompt</code>和
          <code>answer</code>，分别代表题目和答案。两者都应以字符串形式呈现。
        </p>

        <h2>上传须知</h2>
        <p>
          上传文件时，请确保文件名不含中文字符。同时，避免在表项中包含换行符，并确保文件大小不超过10MB。不符合这些条件可能导致上传失败。
        </p>
      </article>

      <div class="flex w-full items-center justify-center">
        <label
          for="dropzone-file"
          class="hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div class="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              class="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>

            <p class="mb-2 text-gray-500 dark:text-gray-400">
              <span class="font-semibold">点击此处上传</span>{" "}
              或者将文件拖拽到此处
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            class="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {file && (
        <div className="flex items-center space-x-4 rounded-2xl bg-white p-5 shadow">
          <h2 className="text-xl font-semibold text-gray-800 ">{file.name}</h2>
          <p className="text-gray-500">文件大小: {file.size} bytes</p>
        </div>
      )}
      <button
        className="btn btn-accent"
        onClick={handleUpload}
        disabled={!file}
      >
        上传
      </button>
    </div>
  );
}
