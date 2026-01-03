


// "use client";

// import React, { useState } from "react";
// import Button from "@/components/ui/CustomUI/Button";
// import { Pencil, Trash2, Eye } from "lucide-react";
// import { toast } from "sonner";

// import { useGetAllDivisionsQuery, useDeleteDivisionMutation } from "@/redux/features/division/division.api";
// import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
// import ConfirmDialog from "@/components/ui/confirm-dialog";
// import EditDivisionModal from "@/components/modules/Admin/Division/EditDivisionModal";
// import ViewDivisionModal from "@/components/modules/Admin/Division/ViewDivisionModal";

// const AddDivision = () => {
//   const [openAddModal, setOpenAddModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [openViewModal, setOpenViewModal] = useState(false);
//   const [editId, setEditId] = useState<string | null>(null);
//   const [viewId, setViewId] = useState<string | null>(null);
//   const [editData, setEditData] = useState<{
//     name: string;
//     description?: string;
//     thumbnail?: string;
//   }>({
//     name: "",
//     description: "",
//     thumbnail: "",
//   });
//   const [viewData, setViewData] = useState<{
//     name: string;
//     description?: string;
//     thumbnail?: string;
//     slug?: string;
//     createdAt?: string;
//     updatedAt?: string;
//   }>({
//     name: "",
//     description: "",
//     thumbnail: "",
//     slug: "",
//     createdAt: "",
//     updatedAt: "",
//   });
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | null>(null);

//   const { data, isLoading, refetch } = useGetAllDivisionsQuery(undefined);
//   const [deleteDivision, { isLoading: isDeleting }] = useDeleteDivisionMutation();

//   const divisions = data?.data?.data || [];

//   const handleEdit = (id: string, division: any) => {
//     setEditId(id);
//     setEditData({
//       name: division.name,
//       description: division.description || "",
//       thumbnail: division.thumbnail || "",
//     });
//     setOpenEditModal(true);
//   };

//   const handleView = (id: string, division: any) => {
//     setViewId(id);
//     setViewData({
//       name: division.name,
//       description: division.description || "",
//       thumbnail: division.thumbnail || "",
//       slug: division.slug || "",
//       createdAt: division.createdAt,
//       updatedAt: division.updatedAt,
//     });
//     setOpenViewModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedId) return;
//     try {
//       await deleteDivision(selectedId).unwrap();
//       toast.success("Division deleted successfully");
//       setOpenConfirm(false);
//       setSelectedId(null);
//       refetch();
//     } catch (error: any) {
//       toast.error("Failed to delete division", { description: error?.data?.message || "Something went wrong" });
//     }
//   };

//   if (isLoading) return <div className="text-center py-10">Loading...</div>;

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md">
//       <div className="flex flex-col justify-start md:flex-row md:justify-between md:items-center py-4">
//         <h2 className="text-xl font-semibold mb-4 text-[#8F87F1]">Divisions</h2>
//         <Button className="w-fit" variant="animated" onClick={() => setOpenAddModal(true)}>
//           Add Division
//         </Button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
//           <thead className="bg-[#8F87F1] text-white">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium">SL</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Created At</th>
//               <th className="px-4 py-3 text-left text-sm font-medium">Updated At</th>
//               <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
//             </tr>
//           </thead>

//           <tbody className="bg-white">
//             {divisions.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="text-center py-6 text-gray-500">
//                   No divisions found
//                 </td>
//               </tr>
//             )}

//             {divisions?.map((item: any, index: number) => (
//               <tr key={item._id} className="border-b last:border-none hover:bg-[#C68EFD]/10 transition">
//                 <td className="px-4 py-3 text-sm text-gray-700">{index + 1}</td>
//                 <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   {new Date(item.createdAt).toLocaleDateString("en-GB")}
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-600">
//                   {new Date(item.updatedAt).toLocaleDateString("en-GB")}
//                 </td>
//                 <td className="px-4 py-3">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       onClick={() => handleView(item._id, item)}
//                       className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
//                       title="View"
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

//       <AddDivisionModal open={openAddModal} onClose={() => setOpenAddModal(false)} />
//       <EditDivisionModal
//         open={openEditModal}
//         divisionId={editId}
//         initialData={editData}
//         onClose={() => {
//           setOpenEditModal(false);
//           setEditData({
//             name: "",
//             description: "",
//             thumbnail: "",
//           });
//         }}
//       />
//       <ViewDivisionModal
//         open={openViewModal}
//         divisionId={viewId}
//         divisionData={viewData}
//         onClose={() => {
//           setOpenViewModal(false);
//           setViewData({
//             name: "",
//             description: "",
//             thumbnail: "",
//             slug: "",
//             createdAt: "",
//             updatedAt: "",
//           });
//         }}
//       />
//       <ConfirmDialog
//         open={openConfirm}
//         title="Delete Division"
//         description="This action cannot be undone. Are you sure?"
//         confirmText="Delete"
//         loading={isDeleting}
//         onConfirm={handleConfirmDelete}
//         onCancel={() => setOpenConfirm(false)}
//       />
//     </div>
//   );
// };

// export default AddDivision;


"use client";

import React, { useState } from "react";
import Button from "@/components/ui/CustomUI/Button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

import { useGetAllDivisionsQuery, useDeleteDivisionMutation } from "@/redux/features/division/division.api";
import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";
import ConfirmDialog from "@/components/ui/confirm-dialog";
import EditDivisionModal from "@/components/modules/Admin/Division/EditDivisionModal";
import ViewDivisionModal from "@/components/modules/Admin/Division/ViewDivisionModal";

const AddDivision = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    name: string;
    description?: string;
    thumbnail?: string;
  }>({
    name: "",
    description: "",
    thumbnail: "",
  });
  const [viewData, setViewData] = useState<{
    name: string;
    description?: string;
    thumbnail?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
  }>({
    name: "",
    description: "",
    thumbnail: "",
    slug: "",
    createdAt: "",
    updatedAt: "",
  });
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data, isLoading, refetch } = useGetAllDivisionsQuery(undefined);
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

  const handleView = (id: string, division: any) => {
    setViewId(id);
    setViewData({
      name: division.name,
      description: division.description || "",
      thumbnail: division.thumbnail || "",
      slug: division.slug || "",
      createdAt: division.createdAt,
      updatedAt: division.updatedAt,
    });
    setOpenViewModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteDivision(selectedId).unwrap();
      toast.success("Division deleted successfully");
      setOpenConfirm(false);
      setSelectedId(null);
      refetch();
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

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {divisions.length === 0 && <div className="text-center py-6 text-gray-500">No divisions found</div>}

        {divisions?.map((item: any, index: number) => (
          <div key={item._id} className="border border-gray-200 rounded-lg p-4 hover:bg-[#C68EFD]/10 transition">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1">#{index + 1}</div>
                <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(item._id, item)}
                  className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                  title="View"
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
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span className="text-gray-700">{new Date(item.createdAt).toLocaleDateString("en-GB")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Updated:</span>
                <span className="text-gray-700">{new Date(item.updatedAt).toLocaleDateString("en-GB")}</span>
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
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(item.createdAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(item.updatedAt).toLocaleDateString("en-GB")}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleView(item._id, item)}
                      className="p-2 rounded-md text-[#8F87F1] hover:bg-[#8F87F1]/10 transition"
                      title="View"
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
      <ViewDivisionModal
        open={openViewModal}
        divisionId={viewId}
        divisionData={viewData}
        onClose={() => {
          setOpenViewModal(false);
          setViewData({
            name: "",
            description: "",
            thumbnail: "",
            slug: "",
            createdAt: "",
            updatedAt: "",
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