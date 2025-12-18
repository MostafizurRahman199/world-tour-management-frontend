"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import Button from "@/components/ui/CustomUI/Button";
import { useUpdateTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { toast } from "sonner";

interface EditTourModalProps {
  open: boolean;
  onClose: () => void;
  tourId: string | null;
  initialName: string;
}

const EditTourModal: React.FC<EditTourModalProps> = ({ open, onClose, tourId, initialName }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const [updateTourType, { isLoading }] = useUpdateTourTypeMutation();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Tour type name is required");
      return;
    }

    if (!tourId) return;

    try {
      await updateTourType({
        id: tourId,
        data: { name },
      }).unwrap();

      toast.success("Tour type updated successfully");

      onClose();
      setError("");
    } catch (error: any) {
      toast.error("Failed to update tour type", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[#8F87F1]">Edit Tour Type</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <FormInput label="Tour Type Name" value={name} onChange={(e) => setName(e.target.value)} error={error} />
        </div>

        <DialogFooter>
          <Button variant="animated" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="animated" onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTourModal;
