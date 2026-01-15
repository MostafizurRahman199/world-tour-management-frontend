import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  CreditCard,
  Check,
  Plus,
  Minus,
  Sparkles,
  Gift,
  ShieldCheck,
  TrendingUp,
  Award,
  Zap,
  Mail,
  User,
  Smartphone,
  Lock,
  ChevronDown,
  ChevronUp,
  Loader2,
  CreditCard as Card,
  ShoppingBag,
  Heart,
  Share2,
  Package,
  Navigation,
  Phone,
  Headphones,
  Wind,
  Hotel,
  Car,
  Coffee,
  Wifi,
  MapPinned,
} from "lucide-react";
import { useGetSingleTourQuery } from "@/redux/features/Tour/tour.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProfileUpdateModal from "@/components/modules/User/ProfileUpdateModal";

const Booking = () => {
  const { id: slug } = useParams();
  const navigate = useNavigate();
  const { data: tourResponse, isLoading, error } = useGetSingleTourQuery(slug as string);
  const { data: user, isLoading: isUserLoading } = useUserInfoQuery(undefined);

  const userData = user?.data; 
  const actualUser = userData?.data || userData; 

  const tourData = tourResponse?.data;

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(tourData?.costFrom || 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showBookingSummary, setShowBookingSummary] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  const duration = tourData
    ? Math.ceil((new Date(tourData.endDate).getTime() - new Date(tourData.startDate).getTime()) / (1000 * 3600 * 24))
    : 0;

  // Sync user data to form
  useEffect(() => {
    if (actualUser) {
      setFormData({
        fullName: actualUser.name || "",
        email: actualUser.email || "",
        phone: actualUser.phone || "",
        address: actualUser.address || "",
      });
    }
  }, [actualUser]);

  const isProfileComplete = actualUser?.name && actualUser?.phone && actualUser?.address;
  const isLoggedIn = !!actualUser;

  // Amenities icons mapping
  const amenityIcons = [
    { icon: Hotel, color: "from-emerald-500 to-teal-500" },
    { icon: Wind, color: "from-blue-500 to-cyan-500" },
    { icon: Coffee, color: "from-amber-500 to-orange-500" },
    { icon: Car, color: "from-purple-500 to-pink-500" },
    { icon: Shield, color: "from-green-500 to-emerald-500" },
  ];

  // Calculate total price based on number of guests
  useEffect(() => {
    if (tourData?.costFrom) {
      setIsAnimating(true);
      const newTotal = tourData.costFrom * numberOfGuests;
      setTotalPrice(parseFloat(newTotal.toFixed(2)));

      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [numberOfGuests, tourData?.costFrom]);

  const handleGuestChange = (increment: boolean) => {
    const newCount = increment ? numberOfGuests + 1 : numberOfGuests - 1;
    if (newCount >= 1 && newCount <= (tourData?.maxGuest || 10)) {
      setNumberOfGuests(newCount);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Read-only logic mainly
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
        navigate("/login");
        return;
    }

    if (!isProfileComplete) {
       toast.error("Please complete your profile to proceed.");
       setShowUpdateModal(true);
       return;
    }

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    const bookingData = {
      tourId: tourData?._id,
      tourSlug: tourData?.slug,
      tourTitle: tourData?.title,
      ...formData,
      numberOfGuests,
      totalPrice,
      bookingDate: new Date().toISOString(),
    };

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      navigate(`/booking/confirmation/${tourData?._id}`, {
        state: {
          bookingDetails: bookingData,
          tour: tourData,
        },
      });
    }, 2000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10 rounded-3xl mb-8 shadow-xl">
            <Loader2 className="w-12 h-12 text-[#8F87F1] animate-spin" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent mb-4">
            Preparing Your Booking
          </h2>
          <p className="text-gray-600 text-lg">Loading tour details...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error || !tourData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl mb-8 shadow-xl">
            <span className="text-4xl">😔</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-500 bg-clip-text text-transparent mb-4">
            Tour Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">We couldn't find the tour you're looking for.</p>
          <button
            onClick={() => navigate("/tours")}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            <Navigation className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Browse All Tours
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white">
      {/* Profile Update Modal */}
      <ProfileUpdateModal open={showUpdateModal} onOpenChange={setShowUpdateModal} user={actualUser} />

      {/* Floating Action Buttons */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 space-y-3 hidden lg:block">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(`/tours/${tourData.slug}`)}
          className="p-4 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600 group-hover:-translate-x-1 transition-transform" />
        </motion.button>
      </div>

      {/* Header */}
      <div className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#8F87F1]/10 to-[#C68EFD]/10 rounded-full mb-6 shadow-lg">
              <Sparkles className="w-5 h-5 text-[#8F87F1]" />
              <span className="font-semibold text-[#8F87F1]">Secure Booking • Instant Confirmation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">Complete Your Booking</h1>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              You're booking: <span className="font-semibold text-[#8F87F1]">{tourData.title}</span>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 xl:px-0 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Amenities */}
          <div className="space-y-8">
            {/* Amenities Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl  p-4 md:p-8 border border-gray-100"
            >
              <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#8F87F1]" />
                Included Amenities
              </h4>
              <div className="space-y-4">
                {tourData.amenities.map((amenity: string, index: number) => {
                  const Icon = amenityIcons[index % amenityIcons.length]?.icon || Check;
                  const color = amenityIcons[index % amenityIcons.length]?.color || "from-[#8F87F1] to-[#C68EFD]";

                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Tour Highlights Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10 rounded-3xl p-8 border border-[#8F87F1]/20"
            >
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-[#8F87F1]" />
                Tour Highlights
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#8F87F1]" />
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">{duration} Days</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#8F87F1]" />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold text-gray-900">{tourData.location}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#8F87F1]" />
                  <div>
                    <div className="text-sm text-gray-600">Group Size</div>
                    <div className="font-semibold text-gray-900">Up to {tourData.maxGuest} guests</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Support Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl  p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Need Help?</h4>
                  <p className="text-gray-600 text-sm">We're here to help</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#8F87F1]" />
                  <div>
                    <div className="text-sm text-gray-600">Call us at</div>
                    <div className="font-semibold text-gray-900">+1 (234) 567-890</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Column - Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl  p-4 md:p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <User className="w-7 h-7 text-[#8F87F1]" />
                  Your Information
                </h3>

                {!isLoggedIn && !isUserLoading ? (
                  <Button
                    onClick={() => navigate("/login")}
                    className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white hover:opacity-90 transition-all hover:scale-105"
                  >
                    Please Login to Book
                  </Button>
                ) : isLoggedIn && !isProfileComplete ? (
                  <Button
                    onClick={() => setShowUpdateModal(true)}
                    variant="outline"
                    className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 animate-pulse"
                  >
                    Incomplete Profile - Update Now
                  </Button>
                ) : null}
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        readOnly={true}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
                        placeholder={!isLoggedIn ? "Please login first" : ""}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly={true}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
                        placeholder={!isLoggedIn ? "Please login first" : ""}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        readOnly={true}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
                        placeholder={
                          !isLoggedIn ? "Please login first" : !isProfileComplete ? "Update profile to add phone" : ""
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Address</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        readOnly={true}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
                        placeholder={
                          !isLoggedIn ? "Please login first" : !isProfileComplete ? "Update profile to add address" : ""
                        }
                      />
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Right Column - Booking Summary (Now as a card in center column) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl  p-4 md:p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Booking Summary</h3>
                <button
                  type="button"
                  onClick={() => setShowBookingSummary(!showBookingSummary)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  {showBookingSummary ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {showBookingSummary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-8"
                  >
                    {/* Guest Selection */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Select Number of Guests</h4>
                          <p className="text-gray-600 text-sm">Choose how many people are traveling</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-500">Price per person</div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                            ${tourData.costFrom}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-3">Select between 1 to {tourData.maxGuest} guests</div>

                        <div className="flex items-center justify-center gap-6">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGuestChange(false)}
                            disabled={numberOfGuests <= 1}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              numberOfGuests <= 1
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-br from-red-50 to-pink-50 text-red-600 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <Minus className="w-5 h-5" />
                          </motion.button>

                          <motion.div
                            key={numberOfGuests}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className="relative"
                          >
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10 flex flex-col items-center justify-center">
                              <div className="text-3xl font-bold text-gray-900">{numberOfGuests}</div>
                              <div className="text-sm text-gray-500">Travelers</div>
                            </div>
                          </motion.div>

                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleGuestChange(true)}
                            disabled={numberOfGuests >= tourData.maxGuest}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              numberOfGuests >= tourData.maxGuest
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-br from-green-50 to-emerald-50 text-green-600 hover:shadow-lg hover:scale-105"
                            }`}
                          >
                            <Plus className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Tour Price ({numberOfGuests} person{numberOfGuests > 1 ? "s" : ""})
                        </span>
                        <span className="font-semibold">${(tourData.costFrom * numberOfGuests).toFixed(2)}</span>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-semibold text-gray-900">Total Amount</span>
                          <motion.span
                            key={totalPrice}
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            className={`text-3xl font-bold ${
                              isAnimating
                                ? "text-[#C68EFD]"
                                : "bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent"
                            }`}
                          >
                            ${totalPrice}
                          </motion.span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2 text-right">All taxes & fees included</div>
                      </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isProcessing || !isLoggedIn || (isLoggedIn && !isProfileComplete)}
                      className={`group w-full py-4 rounded-2xl font-bold text-white transition-all duration-300 relative overflow-hidden ${
                        isProcessing || !isLoggedIn || (isLoggedIn && !isProfileComplete)
                          ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] hover:shadow-2xl hover:scale-[1.02] shadow-lg"
                      }`}
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </div>
                      ) : !isLoggedIn ? (
                        <span className="relative z-10">Login to Book</span>
                      ) : !isProfileComplete ? (
                        <span className="relative z-10">Complete Profile to Book</span>
                      ) : (
                        <>
                          <span className="relative z-10">Confirm Booking</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </button>

                    {/* Security Badge */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Lock className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Secure & Encrypted Booking</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
