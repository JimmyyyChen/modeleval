"use client"

import { useState } from 'react';

const IndexPage = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('csvFile', file);

        try {
            const response = await fetch('/api/datasets/upload', {
                method: 'POST',
                body: formData,
            });

            if (response) {
                console.log('CSV file uploaded successfully!');
            } else {
                console.error('Failed to upload CSV file.');
            }
        } catch (error) {
            console.error('Error uploading CSV file:', error);
        }
    };

    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    );
};

export default IndexPage;

