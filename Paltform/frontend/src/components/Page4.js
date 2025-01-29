import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Page4() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const containerStyle = {
        fontFamily: "'Abdoline', sans-serif",
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#f7f7f7', // Soft light gray background
        direction: 'rtl',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const headerStyle = {
        backgroundColor: 'rgba(100, 80, 60, 0.9)',
        padding: '20px',
        borderRadius: '12px',
        width: '80%',
        height: '95px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '25px',
    };

    const logoStyle = {
        width: '280px',
        height: 'auto',
        marginTop: '15px',
    };

    const uploadContainerStyle = {
        border: '2px dashed #d4b79e', // Soft beige dashed border
        padding: '20px',
        borderRadius: '12px',
        width: '50%',
        textAlign: 'center',
        backgroundColor: '#fff',
    };

    const buttonStyle = {
        fontSize: '1rem',
        padding: '15px 25px', // Larger padding for easier clicking
        color: 'white',
        background: 'linear-gradient(to right, #a67c52, #d4b79e)', // Warm gradient for buttons
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '30px',
        boxShadow: '0 4px rgba(0, 0, 0, 0.2)',
    };

    const subHeaderStyle = {
        backgroundColor: '#a67c52',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 'fit-content',
        margin: '20px auto',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    };

    const tableStyle = {
        margin: '10px auto',
        borderCollapse: 'collapse',
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const tableHeaderStyle = {
        backgroundColor: '#a67c52',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold',
    };

    const tableRowStyle = {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        textAlign: 'center',
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage(''); // Clear any previous message
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/poetry/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true, // Ensure cross-origin cookies work
            });
            setMessage(response.data || 'File uploaded successfully!');
            fetchUploadedFiles(); // Refresh the uploaded files list
        } catch (error) {
            console.error('Error uploading file:', error.response || error.message);
            setMessage(error.response?.data || 'Error uploading file. Please check server logs.');
        }
    };

    const fetchUploadedFiles = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/poetry/list-files', {}, {
                withCredentials: true,
            });
            setUploadedFiles(response.data || []);
        } catch (error) {
            console.error('Error fetching uploaded files:', error.response || error.message);
        }
    };

    useEffect(() => {
        fetchUploadedFiles();
    }, []);

    return (
        <div className="page4-container" style={containerStyle}>
            <header style={headerStyle}>
                <img
                    src={`${process.env.PUBLIC_URL}/logos/Arood.png`}
                    alt="Arabic Poetry Logo"
                    style={logoStyle}
                />
            </header>
            <div style={uploadContainerStyle}>
                <input type="file" accept=".keras" onChange={handleFileChange}/>
                <button style={buttonStyle} onClick={handleUpload}>
                    Upload
                </button>
                {message && <p>{message}</p>}
            </div>
            <div style={subHeaderStyle}>Uploaded Models</div>
            <div style={{marginTop: '20px', textAlign: 'center', width: '90%'}}>
                <table style={tableStyle}>
                    <thead>
                    <tr>
                        <th style={tableHeaderStyle}>#</th>
                        <th style={tableHeaderStyle}>File Name</th>
                        <th style={tableHeaderStyle}>Last Modified</th>
                    </tr>
                    </thead>
                    <tbody>
                    {uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => (
                            <tr key={index} style={tableRowStyle}>
                                <td>{index + 1}</td>
                                <td>{file}</td>
                                <td>{new Date().toLocaleDateString()}</td>
                                {/* Replace with actual modification time */}
                            </tr>
                        ))
                    ) : (
                        <tr style={tableRowStyle}>
                            <td colSpan="3">No files uploaded yet.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <button style={buttonStyle} onClick={() => (window.location.href = '/')}>
                العودة إلى الصفحة الرئيسة
            </button>
        </div>
    );
}

export default Page4;
