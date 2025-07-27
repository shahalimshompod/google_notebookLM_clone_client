import React, { useRef } from "react";
import { Upload } from "lucide-react";

export default function PDFUploadBox({ onFileSelect }) {
  const fileInputRef = useRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="bg-white rounded-2xl shadow-md p-8 cursor-pointer transition hover:shadow-xl flex flex-col items-center justify-center border border-dashed border-purple-400 w-96 text-center"
      >
        <div className="bg-purple-100 rounded-full p-3 mb-4">
          <Upload className="text-purple-600 w-6 h-6" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          Upload PDF to start chatting
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Click or drag and drop your file here
        </p>
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
