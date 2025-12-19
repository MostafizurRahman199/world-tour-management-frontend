import React, { useRef, useState } from "react";
import { Upload, X, FileImage } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  accept?: string;
  label?: string;
  maxSize?: number;
  error?: string;
  preview?: string | null;
  setPreview?: (preview: string | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileChange,
  accept = "image/*",
  label = "Upload Image",
  maxSize = 5,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      onFileChange(null);
      setPreview(null);
      return;
    }

    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileChange(selectedFile);

    // if (selectedFile.type.startsWith("image/")) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setPreview(reader.result as string);
    //   };
    //   reader.readAsDataURL(selectedFile);
    // }
    if (selectedFile.type.startsWith("image/") && setPreview) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    handleFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-3 sm:p-4 transition-all overflow-hidden
          ${dragActive ? "border-purple-500 bg-purple-50" : "border-gray-300 hover:border-gray-400"}
          ${error ? "border-red-500" : ""}
          ${file ? "bg-gray-50" : "bg-white"}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload-input"
        />

        {!file ? (
          <label
            htmlFor="file-upload-input"
            className="flex flex-col items-center justify-center cursor-pointer py-2 sm:py-4"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center mb-2">
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <p className="text-xs sm:text-sm font-medium text-gray-700 text-center px-2">
              Click to upload or drag and drop
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center px-2">
              {accept.includes("image") ? "PNG, JPG, GIF" : "Any file"} up to {maxSize}MB
            </p>
          </label>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="truncate" title={file.name}>
                    {file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name}
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="p-1 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
              aria-label="Remove file"
            >
              <X className="w-4 h-4 text-red-500" />
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
    </div>
  );
};
