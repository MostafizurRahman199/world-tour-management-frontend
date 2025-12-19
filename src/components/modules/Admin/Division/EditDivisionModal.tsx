// src/components/modules/Admin/Division/EditDivisionModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import Button from "@/components/ui/CustomUI/Button";
import { useUpdateDivisionMutation } from "@/redux/features/division/division.api";
import { toast } from "sonner";

interface EditDivisionModalProps {
  open: boolean;
  onClose: () => void;
  divisionId: string | null;
  initialName: string;
}

const EditDivisionModal: React.FC<EditDivisionModalProps> = ({ open, onClose, divisionId, initialName }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [updateDivision, { isLoading }] = useUpdateDivisionMutation();

  useEffect(() => setName(initialName), [initialName]);

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Division name is required");
      return;
    }

    if (!divisionId) return;

    try {
      const formData = new FormData();
      formData.append("name", name);

      await updateDivision({ id: divisionId, formData }).unwrap();
      toast.success("Division updated successfully");
      onClose();
      setError("");
    } catch (error: any) {
      toast.error("Failed to update division", { description: error?.data?.message || "Something went wrong" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-[#8F87F1]">Edit Division</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <FormInput label="Name" value={name} onChange={(e) => setName(e.target.value)} error={error} />
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

export default EditDivisionModal;
