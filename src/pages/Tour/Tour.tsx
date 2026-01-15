import { useGetAllToursQuery } from "@/redux/features/Tour/tour.api";
import React from "react";
import { Calendar, Users, MapPin, DollarSign, Star, ChevronRight, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const { data: tours, isLoading, error } = useGetAllToursQuery({});
  const navigate = useNavigate();



  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 max-w-7xl mx-auto px-4 xl:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-2/5">
                    <div className="bg-gray-200 rounded-2xl h-64 w-full"></div>
                  </div>
                  <div className="lg:w-3/5 space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Tours</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  const tourData = tours?.data?.tours?.data || [];

  if (tourData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
            <span className="text-2xl">🏝️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Tours Available</h2>
          <p className="text-gray-600">Check back soon for new adventures</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent mb-4">
            Premium Tours
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover unforgettable experiences with our carefully curated premium tours
          </p>
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourData.map((tour: any) => (
            <div
              key={tour._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#8F87F1]/20"
            >
              {/* Image with overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={tour.images[0]}
                  alt={tour.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold text-gray-800">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    Premium
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex justify-between items-end">
                    <h2 className="text-xl font-bold text-white line-clamp-1">{tour.title}</h2>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold">
                      <DollarSign className="w-4 h-4" />
                      {tour.costFrom}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location & Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-[#8F87F1]" />
                    <span className="text-sm font-medium">{tour.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#C68EFD]" />
                    <span className="text-sm">
                      {new Date(tour.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#8F87F1]/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-[#8F87F1]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Max Guests</p>
                      <p className="font-semibold">{tour.maxGuest}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C68EFD]/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#C68EFD]" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Min Age</p>
                      <p className="font-semibold">{tour.minAge}+</p>
                    </div>
                  </div>
                </div>

                {/* Included Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">What's Included</h4>
                  <div className="flex flex-wrap gap-2">
                    {tour.included.slice(0, 3).map((item: string, idx: number) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium"
                      >
                        <Shield className="w-3 h-3" />
                        {item.split(" ")[0]}
                      </span>
                    ))}
                    {tour.included.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                        +{tour.included.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => navigate(`/tours/${tour.slug}`)}
                  className="group/btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] rounded-2xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{tourData.length}</div>
              <div className="text-sm opacity-90">Premium Tours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.9</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tour;
