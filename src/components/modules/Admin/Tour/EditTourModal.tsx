// src/components/modules/Admin/Tour/EditTourModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import Button from "@/components/ui/CustomUI/Button";
import { Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";

import { useGetAllDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypeQuery, useUpdateTourMutation } from "@/redux/features/Tour/tour.api";
import { CustomSelect } from "@/components/ui/custom-select";


interface EditTourModalProps {
  open: boolean;
  onClose: () => void;
  tourId: string | null;
  initialData: any;
  onSuccess?: () => void;
}

interface TourFormData {
  title: string;
  description: string;
  location: string;
  costFrom: string;
  startDate: string;
  endDate: string;
  departureLocation: string;
  arrivalLocation: string;
  maxGuest: string;
  minAge: string;
}

const EditTourModal: React.FC<EditTourModalProps> = ({ open, onClose, tourId, initialData, onSuccess }) => {
  const [formData, setFormData] = useState<TourFormData>({
    title: "",
    description: "",
    location: "",
    costFrom: "",
    startDate: "",
    endDate: "",
    departureLocation: "",
    arrivalLocation: "",
    maxGuest: "",
    minAge: "",
  });

  const [included, setIncluded] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [tourPlan, setTourPlan] = useState<string[]>([]);
  const [division, setDivision] = useState("");
  const [tourType, setTourType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [amenitiesInput, setAmenitiesInput] = useState("");
  const [tourPlanInput, setTourPlanInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [updateTour, { isLoading }] = useUpdateTourMutation();
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Fetch divisions and tour types
  const { data: divisionsData } = useGetAllDivisionsQuery(undefined, {
    skip: !open,
  });
  const { data: tourTypesData } = useGetTourTypeQuery(undefined, {
    skip: !open,
  });

  const divisions = divisionsData?.data?.data || [];
  const tourTypes = tourTypesData?.data?.data || tourTypesData?.data || [];



  // Update the useEffect that initializes form data
useEffect(() => {
  if (initialData && open) {
    console.log("Setting form data with:", initialData);

    setFormData({
      title: initialData.title || "",
      description: initialData.description || "",
      location: initialData.location || "",
      costFrom: initialData.costFrom?.toString() || initialData.price?.toString() || "",
      startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
      endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
      departureLocation: initialData.departureLocation || "",
      arrivalLocation: initialData.arrivalLocation || "",
      maxGuest: initialData.maxGuest?.toString() || initialData.maxGroupSize?.toString() || "",
      minAge: initialData.minAge?.toString() || "",
    });

    setIncluded(initialData.included || []);
    setExcluded(initialData.excluded || []);
    setAmenities(initialData.amenities || []);
    setTourPlan(initialData.tourPlan || []);

    // Debug division and tour type
    console.log("Setting division:", initialData.division?._id || initialData.division);
    console.log("Setting tourType:", initialData.tourType?._id || initialData.tourType);

    setDivision(initialData.division?._id || initialData.division || "");
    setTourType(initialData.tourType?._id || initialData.tourType || "");

    // Handle images
    if (initialData.images && Array.isArray(initialData.images)) {
      setExistingImages(initialData.images);
    } else if (initialData.thumbnail) {
      setExistingImages([initialData.thumbnail]);
    } else {
      setExistingImages([]);
    }
    setFiles([]);
    setPreviews([]);
  }
}, [initialData, open]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
      setPreviews([]);
      setErrors({});
    }
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddItem = (array: string[], setArray: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    if (value.trim()) {
      setArray([...array, value.trim()]);
    }
  };

  const handleRemoveItem = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const handleFileUpload = (selectedFiles: File[]) => {
    const newFiles = [...files, ...selectedFiles];
    const newPreviews = [...previews];

    selectedFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 5MB limit`);
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      newPreviews.push(objectUrl);
    });

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = "Tour title is required";
    if (!division) newErrors.division = "Division is required";
    if (!tourType) newErrors.tourType = "Tour type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;
    if (!tourId) return;

    try {
      const formDataToSend = new FormData();

      // Append basic data
      const tourData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        costFrom: formData.costFrom ? Number(formData.costFrom) : 0,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        departureLocation: formData.departureLocation,
        arrivalLocation: formData.arrivalLocation,
        maxGuest: formData.maxGuest ? Number(formData.maxGuest) : 1,
        minAge: formData.minAge ? Number(formData.minAge) : 0,
        included,
        excluded,
        amenities,
        tourPlan,
        division,
        tourType,
        images: existingImages, // Keep existing images
      };

      formDataToSend.append("data", JSON.stringify(tourData));

      // Append new files
      files.forEach((file) => {
        formDataToSend.append("files", file);
      });

      await updateTour({ id: tourId, formData: formDataToSend }).unwrap();
      toast.success("Tour updated successfully");

      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update tour");
    }
  };

  const ArrayInputSection = ({
    title,
    items,
    setItems,
    inputValue,
    setInputValue,
    placeholder,
  }: {
    title: string;
    items: string[];
    setItems: React.Dispatch<React.SetStateAction<string[]>>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddItem(items, setItems, inputValue);
              setInputValue("");
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            handleAddItem(items, setItems, inputValue);
            setInputValue("");
          }}
          className="px-3 py-2 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {items.length > 0 && (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded text-sm">
              <span className="text-gray-700 truncate">{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveItem(items, setItems, index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-[#8F87F1] text-xl">Edit Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter tour title"
              error={errors.title}
            />

            <FormInput
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
            />

            <FormInput
              label="Cost From ($)"
              name="costFrom"
              type="number"
              value={formData.costFrom}
              onChange={handleInputChange}
              placeholder="Enter starting cost"
              min="0"
            />

            <FormInput
              label="Max Guests"
              name="maxGuest"
              type="number"
              value={formData.maxGuest}
              onChange={handleInputChange}
              placeholder="Maximum guests"
              min="1"
            />

            <FormInput
              label="Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleInputChange}
            />

            <FormInput
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
            />

            <FormInput
              label="Departure Location"
              name="departureLocation"
              value={formData.departureLocation}
              onChange={handleInputChange}
              placeholder="Departure point"
            />

            <FormInput
              label="Arrival Location"
              name="arrivalLocation"
              value={formData.arrivalLocation}
              onChange={handleInputChange}
              placeholder="Arrival point"
            />

            <FormInput
              label="Minimum Age"
              name="minAge"
              type="number"
              value={formData.minAge}
              onChange={handleInputChange}
              placeholder="Minimum age required"
              min="0"
            />
          </div>

          {/* Category Selection */}
          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomSelect
              value={division}
              onChange={setDivision}
              options={divisions}
              label="Division"
              placeholder="Select Division"
              error={errors.division}
              required
            />

            <CustomSelect
              value={tourType}
              onChange={setTourType}
              options={tourTypes}
              label="Tour Type"
              placeholder="Select Tour Type"
              error={errors.tourType}
              loading={isLoading}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="Enter tour description"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>

            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Existing images:</p>
                <div className="grid grid-cols-4 gap-2">
                  {existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img src={image} alt={`Existing ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Images */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  handleFileUpload(selectedFiles);
                }}
                className="hidden"
                id="edit-tour-images-input"
              />

              <label htmlFor="edit-tour-images-input" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Add more images</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                </div>
              </label>
            </div>

            {/* New Images Preview */}
            {previews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">New images to add ({previews.length}):</p>
                <div className="grid grid-cols-4 gap-2">
                  {previews.map((preview, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img src={preview} alt={`New ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Array Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ArrayInputSection
              title="Included"
              items={included}
              setItems={setIncluded}
              inputValue={includedInput}
              setInputValue={setIncludedInput}
              placeholder="Add included item"
            />

            <ArrayInputSection
              title="Excluded"
              items={excluded}
              setItems={setExcluded}
              inputValue={excludedInput}
              setInputValue={setExcludedInput}
              placeholder="Add excluded item"
            />

            <ArrayInputSection
              title="Amenities"
              items={amenities}
              setItems={setAmenities}
              inputValue={amenitiesInput}
              setInputValue={setAmenitiesInput}
              placeholder="Add amenity"
            />

            <ArrayInputSection
              title="Tour Plan"
              items={tourPlan}
              setItems={setTourPlan}
              inputValue={tourPlanInput}
              setInputValue={setTourPlanInput}
              placeholder="Add tour plan step"
            />
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <Button type="button" variant="animated" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button
            type="button"
            variant="animated"
            onClick={handleUpdate}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTourModal;
