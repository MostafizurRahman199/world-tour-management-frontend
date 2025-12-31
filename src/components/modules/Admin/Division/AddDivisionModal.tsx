// src/components/modules/Admin/Division/AddDivisionModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import { FileUpload } from "@/components/ui/FileUpload";
import Button from "@/components/ui/CustomUI/Button";
import { useAddDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";

interface AddDivisionModalProps {
  open: boolean;
  onClose: () => void;
}

const AddDivisionModal: React.FC<AddDivisionModalProps> = ({ open, onClose }) => {
 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [addDivision, { isLoading }] = useAddDivisionMutation();
  const [preview, setPreview] = useState<string | null>(null);

  // Reset file & preview when modal opens
  useEffect(() => {
    if (!open) {
      setFile(null);
      setPreview(null);
      setName("");
      setDescription("");
      setError("");
    }
  }, [open]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Division name is required");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        name,
        description: description || "",
      })
    );

    if (file) formData.append("file", file);

    try {
      await addDivision(formData).unwrap();
      toast.success("Division added successfully");
      onClose();
      setName("");
      setDescription("");
      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };


  

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white w-[95%] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-[#8F87F1] text-base sm:text-lg md:text-xl text-left">Add Division</DialogTitle>
        </DialogHeader>

        <div className="py-3 sm:py-4 flex flex-col gap-4">
          <FormInput
            label="Name"
            placeholder="Enter division name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onFileChange={setFile}
            label="Thumbnail"
            accept="image/*"
            maxSize={5}
          />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
          <Button variant="animated" onClick={onClose} className="w-full sm:w-auto order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            variant="animated"
            onClick={handleSubmit}
            className="w-full sm:w-auto order-1 sm:order-2"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDivisionModal;

