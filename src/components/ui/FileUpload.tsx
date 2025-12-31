

import React, { useRef, useState, useEffect } from "react";
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
  existingImageUrl?: string; // New prop for existing image URL
  onRemove?: () => void; // New prop for removing existing image
}

export const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onFileChange,
  accept = "image/*",
  label = "Upload Image",
  maxSize = 5,
  error,
  preview,
  setPreview,
  existingImageUrl,
  onRemove,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalPreview, setInternalPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Initialize preview from props or existing image URL
  useEffect(() => {
    if (preview) {
      setInternalPreview(preview);
    } else if (existingImageUrl && !file) {
      setInternalPreview(existingImageUrl);
    }
  }, [preview, existingImageUrl, file]);

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      onFileChange(null);
      if (setPreview) {
        setPreview(null);
      } else {
        setInternalPreview(null);
      }
      // If removing file but we have an existing image, show that
      if (existingImageUrl && !selectedFile) {
        setInternalPreview(existingImageUrl);
      }
      return;
    }

    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    onFileChange(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (setPreview) {
          setPreview(result);
        } else {
          setInternalPreview(result);
        }
      };
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
    // If we have an onRemove callback and there's an existing image
    if (onRemove && existingImageUrl && !file) {
      onRemove();
      setInternalPreview(null);
    }
  };

  const displayPreview = setPreview ? preview : internalPreview;

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
          ${file || existingImageUrl ? "bg-gray-50" : "bg-white"}
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

        {!file && !existingImageUrl ? (
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
              {displayPreview ? (
                <img
                  src={displayPreview}
                  alt={file ? "Preview" : "Existing"}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FileImage className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-sm" title={file?.name || "Existing Image"}>
                    {file ? (file.name.length > 15 ? `${file.name.substring(0, 15)}...` : file.name) : "Existing Image"}
                  </p>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  {file ? `${(file.size / 1024).toFixed(2)} KB` : "Click to change or remove"}
                </p>
              </div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              {/* Upload new button */}
              <label
                htmlFor="file-upload-input"
                className="p-1.5 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                aria-label="Upload new image"
              >
                <Upload className="w-4 h-4 text-gray-600" />
              </label>
              {/* Remove button */}
              <button
                type="button"
                onClick={removeFile}
                className="p-1.5 hover:bg-red-50 rounded transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-xs sm:text-sm text-red-600">{error}</p>}
    </div>
  );
};