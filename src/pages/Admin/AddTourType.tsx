// src/pages/Admin/AddTourType.tsx
"use client";



import Button from "@/components/ui/CustomUI/Button";
import { useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import AddTourModal from "@/components/modules/Admin/TourType/AddTourModal";
import { useDeleteTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import EditTourModal from "@/components/modules/Admin/TourType/EditTourModal";



const AddTourType = () => {
  const [openAddModal, setOpenAddModal] = useState(false);

  const { data, isLoading } = useGetTourTypeQuery(undefined);
  const [deleteTourType, { isLoading: isDeleting }] = useDeleteTourTypeMutation();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);


  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const tourTypes = data?.data || [];

  const handleEdit = (id: string, name: string) => {
    setEditId(id);
    setEditName(name);
    setOpenEditModal(true);
  };


const handleConfirmDelete = async () => {
  if (!selectedId) return;

  try {
    await deleteTourType(selectedId).unwrap();
    toast.success("Tour type deleted successfully");
    setOpenConfirm(false);
    setSelectedId(null);
  } catch (error: any) {
    toast.error("Failed to delete tour type", {
      description: error?.data?.message || "Something went wrong",
    });
  }
};



  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center py-4">
        <h2 className="text-xl font-semibold mb-4 text-[#8F87F1]">Tour Types</h2>
        <Button className="w-fit" variant="animated" onClick={() => setOpenAddModal(true)}>
          Add Tour Type
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#8F87F1] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Tour Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Updated At</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {tourTypes.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  No tour types found
                </td>
              </tr>
            )}

            {tourTypes.map((item: any, index: number) => (
              <tr key={item._id} className="border-b last:border-none hover:bg-[#C68EFD]/10 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>

                <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>

                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>

                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.updatedAt).toLocaleDateString()}</td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(item._id, item.name)}
                      className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}
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
      <AddTourModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
      <ConfirmDialog
        open={openConfirm}
        title="Delete Tour Type"
        description="This action cannot be undone. Are you sure?"
        confirmText="Delete"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
      <EditTourModal
        open={openEditModal}
        tourId={editId}
        initialName={editName}
        onClose={() => setOpenEditModal(false)}
      />
    </div>
  );
};

export default AddTourType;
