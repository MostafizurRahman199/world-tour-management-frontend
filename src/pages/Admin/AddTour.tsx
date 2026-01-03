

// // src/pages/Admin/AddTour.tsx
// "use client";

// import  { useState } from "react";
// import Button from "@/components/ui/CustomUI/Button";
// import { Pencil, Trash2, Eye, } from "lucide-react";
// import { toast } from "sonner";
// import { useDeleteTourMutation, useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
// import { format } from "date-fns";
// import ConfirmDialog from "@/components/ui/confirm-dialog";
// import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";
// import EditTourModal from "@/components/modules/Admin/Tour/EditTourModal";
// import ViewTourModal from "@/components/modules/Admin/Tour/ViewTourModal";



// interface EditTourData {
//   title: string;
//   description?: string;
//   location?: string;
//   costFrom?: string | number;
//   startDate?: string;
//   endDate?: string;
//   departureLocation?: string;
//   arrivalLocation?: string;
//   maxGuest?: string | number;
//   minAge?: string | number;
//   included?: string[];
//   excluded?: string[];
//   amenities?: string[];
//   tourPlan?: string[];
//   division?: string;
//   tourType?: string;
//   images?: string[];
// }

// const AddTour = () => {
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [openViewModal, setOpenViewModal] = useState(false);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [selectedTour, setSelectedTour] = useState<any>(null);
//   const [editData, setEditData] = useState<EditTourData>({
//     title: "",
//     description: "",
//     location: "",
//   });
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const { data, isLoading } = useGetAllToursQuery(undefined);
//   const [deleteTour, { isLoading: isDeleting }] = useDeleteTourMutation();

//   const tours = data?.data?.tours?.data || [];
  
//   const handleView = (tour: any) => {
//     setSelectedTour(tour);
//     setOpenViewModal(true);
//   };

//   const handleEdit = (id: string, tour: any) => {
//     setEditId(id);
//     setEditData({
//       title: tour.title,
//       description: tour.description,
//       location: tour.location,
//       costFrom: tour.costFrom,
//       startDate: tour.startDate,
//       endDate: tour.endDate,
//       departureLocation: tour.departureLocation,
//       arrivalLocation: tour.arrivalLocation,
//       maxGuest: tour.maxGuest,
//       minAge: tour.minAge,
//       included: tour.included || [],
//       excluded: tour.excluded || [],
//       amenities: tour.amenities || [],
//       tourPlan: tour.tourPlan || [],
//       division: tour.division?._id || tour.division,
//       tourType: tour.tourType?._id || tour.tourType,
//       images: tour.images || [],
//     });
//     setOpenEditModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedId) return;
//     try {
//       await deleteTour(selectedId).unwrap();
//       toast.success("Tour deleted successfully");
//       setOpenConfirm(false);
//       setSelectedId(null);
//     } catch (error: any) {
//       toast.error("Failed to delete tour", { 
//         description: error?.data?.message || "Something went wrong" 
//       });
//     }
//   };

//   const calculateDuration = (startDate: string, endDate: string) => {
//     if (!startDate || !endDate) return "N/A";
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center py-4">
//         <h2 className="text-xl font-semibold mb-4 text-[#8F87F1]">Tours</h2>
//         <Button className="w-fit" variant="animated" onClick={() => setOpenAddModal(true)}>
//           Add Tour
//         </Button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
//           <thead className="bg-[#8F87F1] text-white">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Cost From</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Max Guests</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
//               <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white">
//             {tours.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center py-6 text-gray-500">
//                   No tours found
//                 </td>
//               </tr>
//             )}

//             {tours?.map((item: any, index: number) => (
//               <tr key={item._id} className="border-b last:border-none hover:bg-[#C68EFD]/10 transition">
//                 <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
//                 <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.title}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{item.location || "N/A"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{calculateDuration(item.startDate, item.endDate)}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">${item.costFrom?.toLocaleString() || "0"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{item.maxGuest || "N/A"}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
//                 <td className="px-4 py-3">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => handleView(item)}
//                       className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
//                       title="View Details"
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(item._id, item)}
//                       className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
//                       title="Edit"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedId(item._id);
//                         setOpenConfirm(true);
//                       }}
//                       className="p-2 rounded-md text-red-500 hover:bg-red-100 transition"
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modals */}
//       <AddTourModal open={openAddModal} onClose={() => setOpenAddModal(false)} />

//       <EditTourModal
//         open={openEditModal}
//         tourId={editId}
//         initialData={editData}
//         onClose={() => {
//           setOpenEditModal(false);
//           setEditData({
//             title: "",
//             description: "",
//             location: "",
//           });
//         }}
//       />

//       <ViewTourModal
//         open={openViewModal}
//         onClose={() => {
//           setOpenViewModal(false);
//           setSelectedTour(null);
//         }}
//         tour={selectedTour}
//       />

//       <ConfirmDialog
//         open={openConfirm}
//         title="Delete Tour"
//         description="This action cannot be undone. Are you sure?"
//         confirmText="Delete"
//         loading={isDeleting}
//         onConfirm={handleConfirmDelete}
//         onCancel={() => setOpenConfirm(false)}
//       />
//     </div>
//   );
// };

// export default AddTour;





// src/pages/Admin/AddTour.tsx
"use client";

import  { useState } from "react";
import Button from "@/components/ui/CustomUI/Button";
import { Pencil, Trash2, Eye, } from "lucide-react";
import { toast } from "sonner";
import { useDeleteTourMutation, useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import { format } from "date-fns";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";
import EditTourModal from "@/components/modules/Admin/Tour/EditTourModal";
import ViewTourModal from "@/components/modules/Admin/Tour/ViewTourModal";



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
}

const AddTour = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [editData, setEditData] = useState<EditTourData>({
    title: "",
    description: "",
    location: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllToursQuery(undefined);
  const [deleteTour, { isLoading: isDeleting }] = useDeleteTourMutation();

  const tours = data?.data?.tours?.data || [];
  
  const handleView = (tour: any) => {
    setSelectedTour(tour);
    setOpenViewModal(true);
  };

  const handleEdit = (id: string, tour: any) => {
    setEditId(id);
    setEditData({
      title: tour.title,
      description: tour.description,
      location: tour.location,
      costFrom: tour.costFrom,
      startDate: tour.startDate,
      endDate: tour.endDate,
      departureLocation: tour.departureLocation,
      arrivalLocation: tour.arrivalLocation,
      maxGuest: tour.maxGuest,
      minAge: tour.minAge,
      included: tour.included || [],
      excluded: tour.excluded || [],
      amenities: tour.amenities || [],
      tourPlan: tour.tourPlan || [],
      division: tour.division?._id || tour.division,
      tourType: tour.tourType?._id || tour.tourType,
      images: tour.images || [],
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
      toast.error("Failed to delete tour", { 
        description: error?.data?.message || "Something went wrong" 
      });
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {tours.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No tours found
          </div>
        )}

        {tours?.map((item: any, index: number) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-[#C68EFD]/10 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">#{index + 1}</div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.location || "N/A"}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(item)}
                  className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                  title="View Details"
                >
                  <Eye size={18} />
                </button>
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
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Duration:</span>
                <div className="text-gray-700 font-medium">
                  {calculateDuration(item.startDate, item.endDate)}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Cost From:</span>
                <div className="text-gray-700 font-medium">
                  ${item.costFrom?.toLocaleString() || "0"}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Max Guests:</span>
                <div className="text-gray-700 font-medium">{item.maxGuest || "N/A"}</div>
              </div>
              <div>
                <span className="text-gray-500">Created:</span>
                <div className="text-gray-700 font-medium">
                  {format(new Date(item.createdAt), "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-[#8F87F1] text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Location</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Cost From</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Max Guests</th>
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
                <td className="px-4 py-3 text-sm text-gray-600">{calculateDuration(item.startDate, item.endDate)}</td>
                <td className="px-4 py-3 text-sm text-gray-600">${item.costFrom?.toLocaleString() || "0"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.maxGuest || "N/A"}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{format(new Date(item.createdAt), "dd/MM/yyyy")}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleView(item)}
                      className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
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

      {/* Modals */}
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
          });
        }}
      />

      <ViewTourModal
        open={openViewModal}
        onClose={() => {
          setOpenViewModal(false);
          setSelectedTour(null);
        }}
        tour={selectedTour}
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