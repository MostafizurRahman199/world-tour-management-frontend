
// src/components/modules/Admin/Division/EditDivisionModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import { FileUpload } from "@/components/ui/FileUpload";
import Button from "@/components/ui/CustomUI/Button";
import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";

interface EditDivisionModalProps {
  open: boolean;
  onClose: () => void;
  divisionId: string | null;
  initialData: {
    name: string;
    description?: string;
    thumbnail?: string;
  };
}

const EditDivisionModal: React.FC<EditDivisionModalProps> = ({ 
  open, 
  onClose, 
  divisionId, 
  initialData 
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [updateDivision, { isLoading }] = useUpdateDivisionMutation();
  const [preview, setPreview] = useState<string | null>(null);

  // Initialize form with initial data
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      // Set preview to existing thumbnail if available
      if (initialData.thumbnail) {
        setPreview(initialData.thumbnail);
      } else {
        setPreview(null);
      }
    }
  }, [initialData]);

  // Reset file & preview when modal closes
  useEffect(() => {
    if (!open) {
      setFile(null);
      setError("");
    }
  }, [open]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Division name is required");
      return;
    }

    if (!divisionId) return;

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          name,
          description: description || "",
        })
      );

      // Only append file if a new one is selected
      if (file) {
        formData.append("file", file);
      }

      await updateDivision({ id: divisionId, formData }).unwrap();
      toast.success("Division updated successfully");
      onClose();
      setError("");
      setFile(null);
      setPreview(null);
    } catch (error: any) {
      toast.error("Failed to update division", { 
        description: error?.data?.message || "Something went wrong" 
      });
    }
  };

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    if (selectedFile) {
      // Create preview for new file
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    } else {
      // If file is removed, revert to existing thumbnail
      if (initialData.thumbnail) {
        setPreview(initialData.thumbnail);
      } else {
        setPreview(null);
      }
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white w-[95%] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-[#8F87F1] text-base sm:text-lg md:text-xl text-left">
            Edit Division
          </DialogTitle>
        </DialogHeader>

        <div className="py-3 sm:py-4 flex flex-col gap-4">
          <FormInput
            label="Name"
            placeholder="Enter division name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            error={error}
          />

          <FormInput
            label="Description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <FileUpload
            file={file}
            preview={preview}
            setPreview={setPreview}
            onFileChange={handleFileChange}
            onRemove={removeImage}
            label="Thumbnail"
            accept="image/*"
            maxSize={5}
            existingImageUrl={initialData.thumbnail}
          />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
          <Button 
            variant="animated" 
            onClick={onClose} 
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            variant="animated"
            onClick={handleUpdate}
            className="w-full sm:w-auto order-1 sm:order-2"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDivisionModal;