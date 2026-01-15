import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "@/components/ui/CustomUI/Button";
import { FormInput } from "@/components/ui/Form/form-input";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/redux/features/user/profileUpdate.api";

interface ProfileUpdateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  open,
  onOpenChange,
  user,
}) => {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleProfileUpdateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handleProfileUpdate = async () => {
    if (
      (!user?.name && !profileForm.name) ||
      (!user?.phone && !profileForm.phone) ||
      (!user?.address && !profileForm.address)
    ) {
      toast.error("Please fill in all missing fields");
      return;
    }

    const updatePayload: any = {};
    if (!user?.name) updatePayload.name = profileForm.name;
    if (!user?.phone) updatePayload.phone = profileForm.phone;
    if (!user?.address) updatePayload.address = profileForm.address;

    try {
      await updateProfile({
        id: user._id,
        data: updatePayload,
      }).unwrap();
      

      toast.success("Profile updated successfully!");
      onOpenChange(false);
    } catch (err) {
      toast.error("Failed to update profile");
      console.error(err);
    }
  };

  const isProfileComplete = user?.name && user?.phone && user?.address;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white w-[95%] sm:w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle className="text-[#8F87F1] text-base sm:text-lg md:text-xl text-left">
            Complete Your Profile
          </DialogTitle>
           {/* DialogDescription is not present in AddDivisionModal design, so omitting specific style or keeping it minimal if needed. 
               The original had a description, but AddDivisionModal style relies on the title. 
               We can add a subtitle if we want, but for strict matching, simplest is usually best. 
               However, informing the user *why* they need to update is good UX. 
               I'll add a small text under the title manually if needed, or just let the form speak for itself.
               Let's keep it simple as per the request "design it like...", which usually implies visual structure.
           */}
           <p className="text-sm text-gray-500 text-left mt-1">
            We need your contact details to complete any booking.
          </p>
        </DialogHeader>
        
        <div className="py-3 sm:py-4 flex flex-col gap-4">
          {!user?.name && (
            <FormInput
                label="Full Name"
                value={profileForm.name}
                onChange={handleProfileUpdateChange}
                name="name"
                placeholder="Enter your full name"
            />
          )}
          {!user?.phone && (
             <FormInput
                label="Phone Number"
                value={profileForm.phone}
                onChange={handleProfileUpdateChange}
                name="phone"
                placeholder="Enter your phone number"
            />
          )}
          {!user?.address && (
             <FormInput
                label="Address"
                value={profileForm.address}
                onChange={handleProfileUpdateChange}
                name="address"
                placeholder="Enter your address"
            />
          )}
          {isProfileComplete ? (
            <div className="text-center text-green-600 font-medium p-4 bg-green-50 rounded-lg">
              Profile is complete!
            </div>
          ) : null}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-2">
            <Button 
                variant="animated" 
                onClick={() => onOpenChange(false)} 
                className="w-full sm:w-auto order-2 sm:order-1"
            >
            Cancel
          </Button>
          <Button 
            variant="animated" 
            onClick={handleProfileUpdate} 
            disabled={isUpdating}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileUpdateModal;
