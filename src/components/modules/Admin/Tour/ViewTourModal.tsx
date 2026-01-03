// src/pages/Admin/AddTour.tsx
"use client";

import React from "react";

import { Calendar, Users, MapPin, DollarSign, Check, X } from "lucide-react";

import { format } from "date-fns";


// View Details Modal Component
const ViewTourModal: React.FC<{
  open: boolean;
  onClose: () => void;
  tour: any;
}> = ({ open, onClose, tour }) => {
  if (!tour) return null;

  const calculateDuration = () => {
    if (!tour.startDate || !tour.endDate) return "N/A";
    const start = new Date(tour.startDate);
    const end = new Date(tour.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? "" : "hidden"}`}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-[#8F87F1]">{tour.title}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{tour.location || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <DollarSign className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Cost From</p>
                <p className="font-medium">${tour.costFrom?.toLocaleString() || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Max Guests</p>
                <p className="font-medium">{tour.maxGuest || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{calculateDuration()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">
                  {tour.startDate ? format(new Date(tour.startDate), "MMM dd, yyyy") : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-[#8F87F1]" />
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">{tour.endDate ? format(new Date(tour.endDate), "MMM dd, yyyy") : "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {tour.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">{tour.description}</p>
            </div>
          )}

          {/* Images */}
          {tour.images && tour.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tour.images.map((img: string, index: number) => (
                  <div key={index} className="rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`Tour image ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Included & Excluded */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {tour.included && tour.included.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {tour.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tour.excluded && tour.excluded.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <X className="h-5 w-5 text-red-500" />
                  What's Excluded
                </h3>
                <ul className="space-y-2">
                  {tour.excluded.map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <X className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tour Plan */}
          {tour.tourPlan && tour.tourPlan.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tour Plan</h3>
              <div className="space-y-3">
                {tour.tourPlan.map((plan: string, index: number) => (
                  <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#8F87F1] text-white rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-600">{plan}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {tour.amenities && tour.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {tour.amenities.map((amenity: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-[#8F87F1]/10 text-[#8F87F1] rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tour.departureLocation && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Departure Location</h4>
                <p className="text-gray-700">{tour.departureLocation}</p>
              </div>
            )}

            {tour.arrivalLocation && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Arrival Location</h4>
                <p className="text-gray-700">{tour.arrivalLocation}</p>
              </div>
            )}

            {tour.minAge && (
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Minimum Age</h4>
                <p className="text-gray-700">{tour.minAge} years</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Created At</h4>
              <p className="text-gray-700">{format(new Date(tour.createdAt), "MMM dd, yyyy hh:mm a")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ViewTourModal;