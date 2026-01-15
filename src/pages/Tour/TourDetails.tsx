

import { useGetSingleTourQuery, useGetTourTypeQuery } from "@/redux/features/Tour/tour.api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  Share2,
  Heart,
  Star,
  Check,
  X,
  Navigation,
  Hotel,
  Car,
  Wifi,
  Shield,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  ChevronUp,
  Coffee,
  Tag,
  FileText,
  UserCheck,
  Wind,
  Moon,
  Sunrise,
  Users,
  DollarSign,
  BookOpen,
  Map,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  Gift,
  Award,
  Camera,
  Video,
  Headphones,
  Globe2,
  Compass,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tour, isLoading, error } = useGetSingleTourQuery(id as string);
  console.log("Single tour data --->",tour)
  const {data:tourType} = useGetTourTypeQuery(undefined);
    console.log(tourType)


  const [selectedImage, setSelectedImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isIncludedExpanded, setIsIncludedExpanded] = useState(false);
  const [isExcludedExpanded, setIsExcludedExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

const handleBookNow = () => {
  if (id) {
    navigate(`/booking/${id}`);
  }
};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-1/3"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-32"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-[500px] w-full"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl w-2/3"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-64 w-full"></div>
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-64 w-full"></div>
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl h-64 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl mb-6 shadow-lg">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-3">
            Error Loading Tour
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We encountered an issue loading the tour details. Please try again.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-white max-w-7xl mx-auto px-4 xl:px-0">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 shadow-lg">
            <Compass className="w-10 h-10 text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent mb-3">
            Tour Not Found
          </h2>
          <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/tours")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            Browse All Tours
          </button>
        </motion.div>
      </div>
    );
  }

  const tourData = tour.data;
  const duration = Math.ceil(
    (new Date(tourData.endDate).getTime() - new Date(tourData.startDate).getTime()) / (1000 * 3600 * 24)
  );

  const stats = [
    { icon: Users, value: `${tourData.maxGuest}+`, label: "Max Guests" },
    { icon: Clock, value: `${duration}`, label: "Days" },
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: ShieldCheck, value: "100%", label: "Safety" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "itinerary", label: "Itinerary", icon: Navigation },
    { id: "amenities", label: "Amenities", icon: Wind },
    { id: "location", label: "Location", icon: Map },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white ">
      {/* Floating Action Buttons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 space-y-3 hidden lg:block">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLiked(!liked)}
          className="p-4 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <Heart className={`w-6 h-6 ${liked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <Share2 className="w-6 h-6 text-gray-600" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
          onClick={handleBookNow}
        >
          <DollarSign className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tourData.images[0]})`,
            transform: "scale(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#8F87F1]/20 to-[#C68EFD]/20 mix-blend-overlay" />

        <div className="relative h-full max-w-7xl mx-auto px-4 xl:px-0 flex flex-col justify-end pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Premium Experience
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{tourData.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                <span>{tourData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <span>
                  {new Date(tourData.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(tourData.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span>{duration} Days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative -mt-12 max-w-7xl mx-auto px-4 xl:px-0 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6  border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-[#8F87F1]" />
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 xl:px-0 pb-20">
        {/* Navigation Tabs */}
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm rounded-2xl  mb-8">
          <div className="flex flex-wrap gap-2 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white shadow-lg"
                    : "text-gray-600 hover:text-[#8F87F1] hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {/* Image Gallery */}
                  <div className="bg-white rounded-3xl  overflow-hidden">
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      autoPlay
                      interval={5000}
                      selectedItem={selectedImage}
                      onChange={setSelectedImage}
                      className="rounded-3xl"
                    >
                      {tourData.images.map((img: string, index: number) => (
                        <div key={index} className="h-[500px]">
                          <img
                            src={img}
                            alt={`Tour image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => setShowImageModal(true)}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl  p-8"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold flex items-center gap-3">
                        <Palette className="w-8 h-8 text-[#8F87F1]" />
                        Experience Overview
                      </h2>
                      <button
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className="flex items-center gap-2 text-[#8F87F1] font-semibold"
                      >
                        {isDescriptionExpanded ? "Show Less" : "Read More"}
                        {isDescriptionExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <div
                      className={`prose prose-lg max-w-none ${isDescriptionExpanded ? "" : "max-h-48 overflow-hidden"}`}
                    >
                      <p className="text-gray-700 leading-relaxed text-lg">{tourData.description}</p>
                    </div>
                  </motion.div>

                  {/* Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] rounded-3xl p-8 text-white"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                          <Check className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold">Included</h3>
                      </div>
                      <ul className="space-y-3">
                        {tourData.included.slice(0, 4).map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                              <Check className="w-4 h-4 text-[#8F87F1]" />
                            </div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white rounded-3xl  p-8"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                          <X className="w-7 h-7 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Excluded</h3>
                      </div>
                      <ul className="space-y-3">
                        {tourData.excluded.slice(0, 4).map((item: string, index: number) => (
                          <li key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                              <X className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {activeTab === "itinerary" && (
                <motion.div
                  key="itinerary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl  p-8"
                >
                  <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                    <Navigation className="w-8 h-8 text-[#8F87F1]" />
                    Daily Itinerary
                  </h2>
                  <div className="space-y-8">
                    {tourData.tourPlan.map((day: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-6 group"
                      >
                        <div className="relative flex flex-col items-center">
                          <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {index + 1}
                          </div>
                          {index < tourData.tourPlan.length - 1 && (
                            <div className="absolute top-16 bottom-0 w-1 bg-gradient-to-b from-[#8F87F1] to-[#C68EFD]/30"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 group-hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10 flex items-center justify-center">
                                {index === 0 && <Sunrise className="w-6 h-6 text-[#8F87F1]" />}
                                {index === tourData.tourPlan.length - 1 && <Moon className="w-6 h-6 text-[#C68EFD]" />}
                                {index > 0 && index < tourData.tourPlan.length - 1 && (
                                  <Compass className="w-6 h-6 text-purple-500" />
                                )}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900">Day {index + 1}</h3>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">{day}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "amenities" && (
                <motion.div
                  key="amenities"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl  p-8"
                >
                  <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                    <Zap className="w-8 h-8 text-[#8F87F1]" />
                    Premium Amenities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tourData.amenities.map((amenity: string, index: number) => {
                      const amenitiesIcons = [
                        { icon: Wifi, color: "from-blue-500 to-cyan-500" },
                        { icon: Hotel, color: "from-emerald-500 to-teal-500" },
                        { icon: Coffee, color: "from-amber-500 to-orange-500" },
                        { icon: Car, color: "from-purple-500 to-pink-500" },
                        { icon: Shield, color: "from-green-500 to-emerald-500" },
                        { icon: UserCheck, color: "from-indigo-500 to-blue-500" },
                        { icon: Headphones, color: "from-violet-500 to-purple-500" },
                        { icon: Camera, color: "from-pink-500 to-rose-500" },
                        { icon: Globe2, color: "from-cyan-500 to-blue-500" },
                      ];
                      const { icon: Icon, color } = amenitiesIcons[index % amenitiesIcons.length];

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -5 }}
                          className="group"
                        >
                          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:border-transparent group-hover:shadow-xl transition-all duration-300">
                            <div
                              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}
                            >
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <h4 className="font-semibold text-gray-900 text-lg mb-2">{amenity}</h4>
                            <p className="text-gray-600 text-sm">Included in your premium package</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "location" && (
                <motion.div
                  key="location"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-3xl  p-8"
                >
                  <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
                    <Map className="w-8 h-8 text-[#8F87F1]" />
                    Location Details
                  </h2>

                  <div className="space-y-8">
                    {/* Location Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Departure Card */}
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200  hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                              <Sunrise className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Departure Point</h3>
                            <p className="text-gray-600">Your journey begins here</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-gray-800 font-medium">{tourData.departureLocation}</p>
                              <p className="text-sm text-gray-600 mt-1">Main departure location for all participants</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
                              <Clock className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700">Check-in 1 hour before</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Arrival Card */}
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200  hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-50 flex items-center justify-center flex-shrink-0">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C68EFD] to-pink-500 flex items-center justify-center">
                              <Moon className="w-6 h-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">Arrival Point</h3>
                            <p className="text-gray-600">Your destination awaits</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-gray-800 font-medium">{tourData.arrivalLocation}</p>
                              <p className="text-sm text-gray-600 mt-1">Final destination for the tour experience</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Location Details */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                        <Compass className="w-6 h-6 text-[#8F87F1]" />
                        Journey Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                              <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Duration</div>
                              <div className="text-gray-600">{duration} Days</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
                              <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Tour Dates</div>
                              <div className="text-gray-600">
                                {new Date(tourData.startDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}{" "}
                                -{" "}
                                {new Date(tourData.endDate).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                              <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Group Size</div>
                              <div className="text-gray-600">Up to {tourData.maxGuest} guests</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                              <Shield className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Age Requirement</div>
                              <div className="text-gray-600">{tourData.minAge}+ years</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center">
                              <Navigation className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Tour Location</div>
                              <div className="text-gray-600">{tourData.location}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center">
                              <Tag className="w-5 h-5 text-rose-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">Tour Type</div>
                              <div className="text-gray-600">
                                {tourType?.data.find((t: { _id: string }) => t._id === tourData.tourType)?.name || "Premium"}
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map Visualization (Placeholder) */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8F87F1]/10 to-[#C68EFD]/10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <Globe className="w-7 h-7" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">Tour Route Map</h3>
                            <p className="text-gray-300">Visual representation of your journey</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                                <Sunrise className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">Starting Point</div>
                                <div className="text-sm text-gray-300">{tourData.departureLocation}</div>
                              </div>
                            </div>
                            <div className="h-6 border-l-2 border-dashed border-blue-400 ml-4"></div>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                <Moon className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="font-medium">Destination</div>
                                <div className="text-sm text-gray-300">{tourData.arrivalLocation}</div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                            <div className="text-center p-4">
                              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-3">
                                <Navigation className="w-4 h-4" />
                                <span className="text-sm font-medium">Total Distance</span>
                              </div>
                              <div className="text-3xl font-bold">{duration * 50} km</div>
                              <p className="text-sm text-gray-300 mt-1">Approximate travel distance</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Transportation</div>
                            <div className="text-sm text-gray-600">
                              All transportation between locations is included
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Safety First</div>
                            <div className="text-sm text-gray-600">
                              All locations are vetted for safety and accessibility
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Timing</div>
                            <div className="text-sm text-gray-600">
                              Please arrive at departure point 30 minutes early
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-4 h-4 text-amber-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">Guide</div>
                            <div className="text-sm text-gray-600">Experienced guide will accompany throughout</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-3xl  p-8 border border-gray-100 "
            >
              <div className="text-center mb-8">
                <div className="text-6xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent mb-2">
                  ${tourData.costFrom}
                </div>
                <div className="text-gray-500">per person</div>
                <div className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-green-50 rounded-full text-green-700">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Early Bird Discount Available</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Available Slots</span>
                  <span className="font-bold text-gray-900">{tourData.maxGuest} seats</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-bold text-gray-900">{duration} days</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Age Requirement</span>
                  <span className="font-bold text-gray-900">{tourData.minAge}+ years</span>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="group w-full py-5 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                <span className="relative z-10">Book This Experience</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Free cancellation up to 24 hours
                </div>
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  Best price guarantee
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] rounded-3xl  p-8 text-white"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Headphones className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Need Help?</h3>
                  <p className="opacity-90">We're here for you 24/7</p>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[#8F87F1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Call us at</div>
                    <div className="font-semibold text-lg">+1 (234) 567-890</div>
                  </div>
                </a>

                <a
                  href="mailto:support@example.com"
                  className="flex items-center gap-4 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#8F87F1] group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Email us</div>
                    <div className="font-semibold text-lg">support@example.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#8F87F1]" />
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Live Chat</div>
                    <div className="font-semibold text-lg">Available 24/7</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white shadow-2xl rounded-full hover:shadow-3xl transition-all duration-300 z-50"
      >
        <ChevronUp className="w-6 h-6 text-gray-600" />
      </motion.button>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={tourData.images[selectedImage]}
                alt="Full size tour"
                className="rounded-2xl max-h-[90vh] object-contain"
              />
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TourDetails;