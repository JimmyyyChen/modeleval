"use client"
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
export default function IndexPagePage() {
    const [download_filename, setdownload_Filename] = useState('');
    const downloadLink = async (event) => {
        event.preventDefault(); // 阻止默认行为
        const response = await axios.get('/api/datasets/download/12');   //假设你要请求第12号数据集
        if (response.status == 200) {
            setdownload_Filename("/" + response.data["filename"]);
        }
    }
    useEffect(() => {
        if (download_filename) {
            const link = document.createElement('a');
            link.href = download_filename;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }, [download_filename]);
    return (
        <div className="relative w-full h-full">
            <a href={download_filename} download onClick={downloadLink}>Download</a>
        </div >
    );
};