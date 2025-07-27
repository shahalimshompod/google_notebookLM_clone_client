import axios from "axios";
import PDFUploadBox from "./Components/PDFUploadBox";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import AIInterfaceWithViewer from "./Pages/AIInterfaceWithViewer";

function App() {
  const [res, setRes] = useState(null);
  const [resData, setResData] = useState({})
  const [isUploading, setIsUploading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleFile = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);

    setIsUploading(true);
    setPdfFile(file);

    try {
      const response = await axios.post("https://google-notebook-lm-clone-server.vercel.app/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.success) {
        setResData(response?.data)
        setRes(true);
      } else {
        setRes(false);
      }
    } catch (err) {
      console.error("Failed to upload PDF:", err);
      setRes(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {res === true && pdfFile ? (
        <div className="w-full">
          <AIInterfaceWithViewer resData={resData} pdfFile={pdfFile} />
        </div>
      ) : isUploading ? (
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="animate-spin text-purple-600" size={40} />
          <p className="text-purple-600 font-medium">Processing your PDF...</p>
        </div>
      ) : (
        <PDFUploadBox onFileSelect={handleFile} />
      )}
    </div>
  );
}

export default App;
