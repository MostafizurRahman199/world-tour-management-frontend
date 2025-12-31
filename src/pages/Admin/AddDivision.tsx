// src/pages/Admin/AddDivision.tsx
"use client";

import React, { useState } from "react";
import Button from "@/components/ui/CustomUI/Button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useGetAllDivisionsQuery, useDeleteDivisionMutation } from "@/redux/features/division/division.api";
import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import EditDivisionModal from "@/components/modules/Admin/Division/EditDivisionModal";

const AddDivision = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    name: string;
    description?: string;
    thumbnail?: string;
  }>({
    name: "",
    description: "",
    thumbnail: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllDivisionsQuery(undefined);
  const [deleteDivision, { isLoading: isDeleting }] = useDeleteDivisionMutation();

  const divisions = data?.data?.data || [];

  const handleEdit = (id: string, division: any) => {
    setEditId(id);
    setEditData({
      name: division.name,
      description: division.description || "",
      thumbnail: division.thumbnail || "",
    });
    setOpenEditModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteDivision(selectedId).unwrap();
      toast.success("Division deleted successfully");
      setOpenConfirm(false);
      setSelectedId(null);
    } catch (error: any) {
      toast.error("Failed to delete division", { description: error?.data?.message || "Something went wrong" });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center py-4">
        <h2 className="text-xl font-semibold mb-4 text-[#8F87F1]">Divisions</h2>
        <Button className="w-fit" variant="animated" onClick={() => setOpenAddModal(true)}>
          Add Division
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#8F87F1] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Updated At</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {divisions.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No divisions found
                </td>
              </tr>
            )}

            {divisions?.map((item: any, index: number) => (
              <tr key={item._id} className="border-b last:border-none hover:bg-[#C68EFD]/10 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.updatedAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleEdit(item._id, item)}
                      className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedId(item._id);
                        setOpenConfirm(true);
                      }}
                      className="p-2 rounded-md text-red-500 hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddDivisionModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
      <EditDivisionModal
        open={openEditModal}
        divisionId={editId}
        initialData={editData}
        onClose={() => {
          setOpenEditModal(false);
          setEditData({
            name: "",
            description: "",
            thumbnail: "",
          });
        }}
      />
      <ConfirmDialog
        open={openConfirm}
        title="Delete Division"
        description="This action cannot be undone. Are you sure?"
        confirmText="Delete"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default AddDivision;
