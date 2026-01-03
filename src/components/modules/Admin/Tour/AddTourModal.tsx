// src/components/modules/Admin/Tour/AddTourModal.tsx
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FormInput } from "@/components/ui/Form/form-input";
import Button from "@/components/ui/CustomUI/Button";
import { Plus, X, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAddTourMutation, useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { useGetAllDivisionsQuery } from "@/redux/features/division/division.api";
import { CustomSelect } from "@/components/ui/custom-select";
import { DatePickerString } from "@/components/ui/DatePickerString";
import { FormTextArea } from "@/components/ui/Form/Form-textarea";


interface AddTourModalProps {
  open: boolean;
  onClose: () => void;
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

// Move ArrayInputSection OUTSIDE of AddTourModal component
const ArrayInputSection = React.memo(
  ({
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
  }) => {
    const handleAddItem = useCallback(() => {
      if (inputValue.trim()) {
        setItems((prev) => [...prev, inputValue.trim()]);
        setInputValue("");
      }
    }, [inputValue, setItems, setInputValue]);

    const handleKeyPress = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleAddItem();
        }
      },
      [handleAddItem]
    );

    const handleRemoveItem = useCallback(
      (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
      },
      [setItems]
    );

    return (
      <div className="space-y-2 ">
        <h4 className="text-sm font-medium text-gray-700">{title}</h4>
        <div className="flex gap-2">
          <FormInput
            wrapperClassName="flex-1" // Use wrapperClassName instead of className
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors flex-shrink-0"
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
                  onClick={() => handleRemoveItem(index)}
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
  }
);

ArrayInputSection.displayName = "ArrayInputSection";

const AddTourModal: React.FC<AddTourModalProps> = ({ open, onClose, onSuccess }) => {
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
  const [addTour, { isLoading }] = useAddTourMutation();
  const [previews, setPreviews] = useState<string[]>([]);

  // Fetch divisions and tour types
  const { data: divisionsData, isLoading: divisionsLoading } = useGetAllDivisionsQuery(undefined, {
    skip: !open,
  });
  const { data: tourTypesData, isLoading: tourTypesLoading } = useGetTourTypeQuery(undefined, {
    skip: !open,
  });

  // Handle different possible response structures
  const divisions = divisionsData?.data?.data || divisionsData?.data || [];
  const tourTypes = tourTypesData?.data?.data || tourTypesData?.data || [];

  // Debug log to see the actual response structure
  useEffect(() => {
    if (open && tourTypesData) {
      console.log("Tour Types Response:", tourTypesData);
      console.log("Parsed Tour Types:", tourTypes);
    }
  }, [open, tourTypesData]);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setFormData({
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
    setIncluded([]);
    setExcluded([]);
    setAmenities([]);
    setTourPlan([]);
    setDivision("");
    setTourType("");
    setFiles([]);
    setPreviews([]);
    setIncludedInput("");
    setExcludedInput("");
    setAmenitiesInput("");
    setTourPlanInput("");
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const handleRemoveImage = (index: number) => {
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
    if (files.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
    };

    formDataToSend.append("data", JSON.stringify(tourData));

    // Append files (name must be "files" to match backend)
    files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      await addTour(formDataToSend).unwrap();
      toast.success("Tour added successfully");

      if (onSuccess) onSuccess();
      onClose();
      resetForm();
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-[#8F87F1] text-xl">Add New Tour</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
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

            {/* <FormInput
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
            /> */}

            <DatePickerString
              label="Start Date"
              value={formData.startDate}
              onChange={(value) => setFormData((prev) => ({ ...prev, startDate: value }))}
              placeholder="Select start date"
              error={errors.startDate}
            />

            <DatePickerString
              label="End Date"
              value={formData.endDate}
              onChange={(value) => setFormData((prev) => ({ ...prev, endDate: value }))}
              placeholder="Select end date"
              minDate={formData.startDate} // Prevent selecting end date before start date
              error={errors.endDate}
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
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Division *</label>
              <select
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                disabled={divisionsLoading}
                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-white ${
                  errors.division ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">{divisionsLoading ? "Loading..." : "Select Division"}</option>
                {divisions.map((div: any) => (
                  <option key={div._id} value={div._id}>
                    {div.name}
                  </option>
                ))}
              </select>
              {errors.division && <p className="text-sm text-red-600">{errors.division}</p>}
              {!divisionsLoading && divisions.length === 0 && (
                <p className="text-sm text-amber-600">No divisions available. Please add one first.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tour Type *</label>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                disabled={tourTypesLoading}
                className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent bg-white ${
                  errors.tourType ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">{tourTypesLoading ? "Loading..." : "Select Tour Type"}</option>
                {tourTypes.map((type: any) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errors.tourType && <p className="text-sm text-red-600">{errors.tourType}</p>}
              {!tourTypesLoading && tourTypes.length === 0 && (
                <p className="text-sm text-amber-600">No tour types available. Please add one first.</p>
              )}
            </div>
          </div> */}

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
            {/* <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
              placeholder="Enter tour description"
            /> */}
            <FormTextArea
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Enter tour description"
              // Optional: Add an icon
              // icon={<MessageSquare className="h-4 w-4" />}
              // Optional: Add error message
              // error="Description is required"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images *</label>

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
                id="tour-images-input"
              />

              <label htmlFor="tour-images-input" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
                </div>
              </label>
            </div>

            {errors.images && <p className="text-sm text-red-600 mt-1">{errors.images}</p>}

            {previews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected images ({previews.length}):</p>
                <div className="grid grid-cols-4 gap-2">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
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
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
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
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Adding..." : "Add Tour"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddTourModal;
