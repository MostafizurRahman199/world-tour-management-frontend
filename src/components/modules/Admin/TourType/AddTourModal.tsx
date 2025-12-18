// src/components/modules/Admin/TourType/AddTourModal.tsx
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import Button from "@/components/ui/CustomUI/Button";
import { useAddTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { toast } from "sonner";

interface AddTourModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTourModal: React.FC<AddTourModalProps> = ({ open, onClose }) => {
  const [tourName, setTourName] = useState("");
  const [error, setError] = useState("");
  const [addTourType, { isLoading }] = useAddTourTypeMutation();

  const handleSubmit = async() => {
    if (!tourName.trim()) {
      setError("Tour type name is required");
      return;
    }
    setError("");
    try {
      const result = await addTourType({ name: tourName }).unwrap();
      if(result?.success){
        onClose();
        setTourName("");
        toast.success("Tour type added successfully");
      }
    } catch (error) {
      console.error("Error adding tour type:", error);
    }   
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-[#8F87F1]">Add Tour Type</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <FormInput
            label="Tour Type Name"
            placeholder="Enter tour type name"
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            error={error}
          />
        </div>

        <DialogFooter>
          <Button variant="animated" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="animated" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourModal;
