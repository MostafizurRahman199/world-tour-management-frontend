
// src/pages/Admin/AddTour.tsx
"use client";

import React, { useState } from "react";
import Button from "@/components/ui/CustomUI/Button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTourMutation, useGetAllToursQuery } from "@/redux/features/Tour/tour.api";

import ConfirmDialog from "@/components/ui/confirm-dialog";
import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal"; // Correct path
import EditTourModal from "@/components/modules/Admin/Tour/EditTourModal"; // Keep this

interface EditTourData {
  title: string;
  description?: string;
  location?: string;
  costFrom?: string | number;
  startDate?: string;
  endDate?: string;
  departureLocation?: string;
  arrivalLocation?: string;
  maxGuest?: string | number;
  minAge?: string | number;
  included?: string[];
  excluded?: string[];
  amenities?: string[];
  tourPlan?: string[];
  division?: string;
  tourType?: string;
  images?: string[];
  duration?: string;
  price?: number;
  maxGroupSize?: number;
  thumbnail?: string;
}

const AddTour = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<EditTourData>({
    title: "",
    description: "",
    location: "",
    duration: "",
    price: 0,
    maxGroupSize: 0,
    thumbnail: "",
  });


  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllToursQuery(undefined);
  const [deleteTour, { isLoading: isDeleting }] = useDeleteTourMutation();

  const tours = data?.data?.tours?.data || [];
  console.log("---->", tours?.tours?.data);

  
  const handleEdit = (id: string, tour: any) => {
  setEditId(id);
  setEditData({
    title: tour.title,
    description: tour.description,
    location: tour.location,
    costFrom: tour.costFrom || tour.price,
    startDate: tour.startDate,
    endDate: tour.endDate,
    departureLocation: tour.departureLocation,
    arrivalLocation: tour.arrivalLocation,
    maxGuest: tour.maxGuest || tour.maxGroupSize,
    minAge: tour.minAge,
    included: tour.included || [],
    excluded: tour.excluded || [],
    amenities: tour.amenities || [],
    tourPlan: tour.tourPlan || [],
    division: tour.division?._id || tour.division,
    tourType: tour.tourType?._id || tour.tourType,
    images: tour.images || (tour.thumbnail ? [tour.thumbnail] : []),
    // Keep old fields for backward compatibility
    duration: tour.duration,
    price: tour.price,
    maxGroupSize: tour.maxGroupSize,
    thumbnail: tour.thumbnail,
  });
  setOpenEditModal(true);
};

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteTour(selectedId).unwrap();
      toast.success("Tour deleted successfully");
      setOpenConfirm(false);
      setSelectedId(null);
    } catch (error: any) {
      toast.error("Failed to delete tour", { description: error?.data?.message || "Something went wrong" });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center py-4">
        <h2 className="text-xl font-semibold mb-4 text-[#8F87F1]">Tours</h2>
        <Button className="w-fit" variant="animated" onClick={() => setOpenAddModal(true)}>
          Add Tour
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#8F87F1] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Max Group</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {tours.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No tours found
                </td>
              </tr>
            )}

            {tours?.map((item: any, index: number) => (
              <tr key={item._id} className="border-b last:border-none hover:bg-[#C68EFD]/10 transition">
                <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.title}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.location || "N/A"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.duration || "N/A"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">${item.price || 0}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.maxGroupSize || "N/A"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{new Date(item.createdAt).toLocaleDateString()}</td>
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

      <AddTourModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
      <EditTourModal
        open={openEditModal}
        tourId={editId}
        initialData={editData}
        onClose={() => {
          setOpenEditModal(false);
          setEditData({
            title: "",
            description: "",
            location: "",
            duration: "",
            price: 0,
            maxGroupSize: 0,
            thumbnail: "",
          });
        }}
      />
      <ConfirmDialog
        open={openConfirm}
        title="Delete Tour"
        description="This action cannot be undone. Are you sure?"
        confirmText="Delete"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirm(false)}
      />
    </div>
  );
};

export default AddTour;
