// src/components/modules/Admin/Division/ViewDivisionModal.tsx
import React from "react";
import { X, MapPin, Calendar, Hash, FileText, Globe, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";

interface ViewDivisionModalProps {
  open: boolean;
  divisionId: string | null;
  divisionData: {
    name: string;
    description?: string;
    thumbnail?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  onClose: () => void;
}

const ViewDivisionModal: React.FC<ViewDivisionModalProps> = ({ open, divisionId, divisionData, onClose }) => {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? "" : "hidden"}`}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#8F87F1]">{divisionData.name}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          {/* Thumbnail */}
          {divisionData.thumbnail && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="h-5 w-5 text-[#8F87F1]" />
                <h3 className="text-lg font-semibold text-gray-800">Thumbnail</h3>
              </div>
              <div className="flex justify-center">
                <img
                  src={divisionData.thumbnail}
                  alt={divisionData.name}
                  className="w-full max-w-md h-64 object-cover rounded-lg border shadow-sm"
                />
              </div>
            </div>
          )}

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Name */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Division Name</p>
                <p className="font-medium">{divisionData.name}</p>
              </div>
            </div>

            {/* Slug */}
            {divisionData.slug && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Globe className="h-5 w-5 text-[#8F87F1]" />
                <div>
                  <p className="text-sm text-gray-500">Slug</p>
                  <p className="font-medium">{divisionData.slug}</p>
                </div>
              </div>
            )}

            {/* Division ID */}
            {divisionId && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Hash className="h-5 w-5 text-[#8F87F1]" />
                <div>
                  <p className="text-sm text-gray-500">Division ID</p>
                  <p className="font-medium text-sm font-mono truncate">{divisionId}</p>
                </div>
              </div>
            )}

            {/* Created At */}
            {divisionData.createdAt && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-[#8F87F1]" />
                <div>
                  <p className="text-sm text-gray-500">Created At</p>
                  <p className="font-medium">{format(new Date(divisionData.createdAt), "MMM dd, yyyy hh:mm a")}</p>
                </div>
              </div>
            )}

            {/* Updated At */}
            {divisionData.updatedAt && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-[#8F87F1]" />
                <div>
                  <p className="text-sm text-gray-500">Updated At</p>
                  <p className="font-medium">{format(new Date(divisionData.updatedAt), "MMM dd, yyyy hh:mm a")}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {divisionData.description && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-[#8F87F1]" />
                <h3 className="text-lg font-semibold text-gray-800">Description</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{divisionData.description}</p>
              </div>
            </div>
          )}

          {/* Thumbnail URL (if exists) */}
          {divisionData.thumbnail && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Thumbnail URL</h3>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm break-all font-mono">{divisionData.thumbnail}</p>
              </div>
            </div>
          )}

          {/* Additional Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dates Summary */}
            {divisionData.createdAt && divisionData.updatedAt && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Time Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">{format(new Date(divisionData.createdAt), "MMM dd, yyyy")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">{format(new Date(divisionData.updatedAt), "MMM dd, yyyy")}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Status */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="font-medium text-gray-700">Active</span>
              </div>
            </div>
          </div>

          {/* Full ID Display */}
          {divisionId && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Full Division ID</h4>
              <p className="text-gray-700 text-sm font-mono break-all">{divisionId}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDivisionModal;
