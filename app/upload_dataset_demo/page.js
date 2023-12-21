"use client"
import axios from 'axios';
import { useState } from 'react';
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { redirect } from 'next/dist/server/api-utils';
export default function IndexPagePage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        let selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('csvFile', file);

        try {
            const response = await axios.post('/api/datasets/upload', formData);
            //TODO
            console.log(response);
            if (response.status == 200) {
                alert('文件上传成功!共成功上传了' + response.data["total_number"] + '条数据');
                window.location.href = '/profile/self';
            }
            if (response.status == 206) {
                alert('文件部分上传成功,共上传了' + response.data["total_number"] + '条数据，但是其中有' + response.data["wrong_number"] + '条数据格式错误');
            }
            if (response.status == 500) {
                alert('文件上传失败，请检查文件格式是否正确，文件大小是否超过10MB，文件名是否含有中文');
            }
        } catch (error) {
            console.error('Error uploading CSV file:', error);
        }
    };
    return (
        <div className="relative w-full h-full">
            <div className="h-96 w-3/4 absolute left-1/2 top-12 border-2 border-gray-200 transform -translate-x-1/2 font-mono text-sm text-gray-500">
                <div className="absolute pl-20 pt-4 text-xs">
                    上传说明:
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;1. 上传的文件必须是.csv格式，目前支持上传主观题集与客观题集两种数据集格式。
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;2. 客观数据集的表头（第一行）应该是question，choices，answer，分别表示题目，选项，答案。题目和答案的格式是一个字符串，选项的格式应该
                    是一个以[]包裹的列表，满足每一项之间用空格隔开，每一项是单独的字符串，例如​[ "AAA", "BBB", "CCC", "DDD" ]
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;3. 主观数据集的表头（第一行）应该是prompt，answer，分别表示题目，答案。题
                    目和答案的格式是一个字符串。
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;4. 上传文件中请保证名称不含中文,也请不要在一个表项中包含换行符，文件大小也不要超过10MB，否则很有可能导致上传失败。
                </div>
                <input
                    id="fileInput"
                    className="hidden"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="text-center rounded-xl border-dashed border-2 border-orange-400 w-5/6 h-1/2 bg-orange-100 absolute left-1/2 top-12 transform -translate-x-1/2 translate-y-1/2 cursor-pointer hover:bg-orange-300 hover:border-orange-500">
                    <ArrowUpOnSquareIcon className="absolute h-12 w-12 text-primary left-1/2 top-1/3 transform -translate-x-1/2" />
                    <label className="absolute top-2/3 transform -translate-x-1/2">
                        选择要上传的文件
                    </label>
                    {file && (
                        <div className="absolute bottom-2 left-1/2 text-center transform -translate-x-1/2 text-xs">
                            <p>上传文件: {file.name}</p>
                            <p>文件大小: {file.size} bytes</p>
                        </div>
                    )}
                </label>
                <button
                    className="font-mono text-base text-gray-100 text-center w-12 h-8 bg-orange-500 rounded-md absolute left-1/2 transform -translate-x-1/2 bottom-2 hover:bg-orange-600"
                    onClick={handleUpload}
                >
                    上传
                </button>
            </div>
        </div>
    );
};