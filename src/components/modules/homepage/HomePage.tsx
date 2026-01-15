import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  Star,
  ChevronRight,
  Shield,
  Award,
  Globe,
  Clock,
  Check,
  TrendingUp,
  Heart,
  Sparkles,
  Compass,
  Mountain,
  Waves,
  Building2,
  Leaf,
  Trophy,
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { CustomSelect } from "@/components/ui/custom-select";
import { DatePickerString } from "@/components/ui/DatePickerString";
import { FormInput } from "@/components/ui/Form/form-input";

const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  // Search form states
  const [selectedTravelers, setSelectedTravelers] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  // Hero Slider Images
  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Discover the World",
      subtitle: "Experience premium tours with breathtaking destinations",
      cta: "Explore Tours",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Adventure Awaits",
      subtitle: "Unforgettable experiences in nature's wonders",
      cta: "Start Adventure",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
      title: "Beach Paradise",
      subtitle: "Relax in the world's most beautiful beaches",
      cta: "Find Your Beach",
    },
  ];

  // Featured Categories
  const categories = [
    { id: "beach", name: "Beach Tours", icon: Waves, count: 24, color: "from-blue-400 to-cyan-400" },
    { id: "mountain", name: "Mountain Trek", icon: Mountain, count: 18, color: "from-emerald-400 to-green-400" },
    { id: "city", name: "City Tours", icon: Building2, count: 32, color: "from-purple-400 to-pink-400" },
    { id: "nature", name: "Nature & Wildlife", icon: Leaf, count: 15, color: "from-green-400 to-emerald-400" },
    { id: "adventure", name: "Adventure", icon: Trophy, count: 22, color: "from-orange-400 to-red-400" },
    { id: "cultural", name: "Cultural", icon: Globe, count: 19, color: "from-yellow-400 to-amber-400" },
  ];

  // Featured Tours (would come from API)
  const featuredTours = [
    {
      id: "1",
      title: "Maldives Paradise Getaway",
      location: "Maldives",
      duration: "7 Days",
      price: 2999,
      rating: 4.9,
      reviews: 128,
      image:
        "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "beach",
    },
    {
      id: "2",
      title: "Swiss Alps Adventure",
      location: "Switzerland",
      duration: "10 Days",
      price: 3499,
      rating: 4.8,
      reviews: 94,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "mountain",
    },
    {
      id: "3",
      title: "Tokyo City Explorer",
      location: "Japan",
      duration: "5 Days",
      price: 1899,
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "city",
    },
    {
      id: "4",
      title: "African Safari Tour",
      location: "Kenya",
      duration: "14 Days",
      price: 4599,
      rating: 4.9,
      reviews: 72,
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "nature",
    },
  ];

  // Stats Data
  const stats = [
    { value: "10K+", label: "Happy Travelers", icon: Users },
    { value: "200+", label: "Destinations", icon: Globe },
    { value: "98%", label: "Satisfaction Rate", icon: Star },
    { value: "24/7", label: "Support", icon: Shield },
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Adventure Enthusiast",
      content: "The Swiss Alps tour exceeded all expectations! Everything was perfectly organized.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Photographer",
      content: "Best photography spots included in the Tokyo tour. Unforgettable experience!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Travel Blogger",
      content: "Premium service from start to finish. The Maldives tour was absolutely magical.",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Why Choose Us Features
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Curated experiences with highest standards",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your safety is our top priority",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock assistance",
    },
    {
      icon: TrendingUp,
      title: "Best Value",
      description: "Quality experiences at competitive prices",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${newsletterEmail}`);
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          navigation
          className="h-[80vh]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white max-w-2xl"
                  >
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90">{slide.subtitle}</p>
                    <Link
                      to="/tours"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-bold rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                    >
                      {slide.cta}
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Search Bar */}
        {/* Search Bar with Custom Components */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-25 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Destination */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                  <Search className="w-4 h-4" />
                  Destination
                </label>
                <FormInput
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full !px-4 !py-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8F87F1] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Check-in Date */}
              <div className="space-y-2">
                <DatePickerString
                  value={checkInDate}
                  onChange={setCheckInDate}
                  label={
                    <span className="flex items-center gap-2 text-gray-700 font-medium">
                      <Calendar className="w-4 h-4" />
                      Check-in
                    </span>
                  }
                  placeholder="Select date"
                  className="[&_button]:h-[44px] [&_button]:rounded-xl"
                />
              </div>

              {/* Check-out Date */}
              <div className="space-y-2">
                <DatePickerString
                  value={checkOutDate}
                  onChange={setCheckOutDate}
                  label={
                    <span className="flex items-center gap-2 text-gray-700 font-medium">
                      <Calendar className="w-4 h-4" />
                      Check-out
                    </span>
                  }
                  placeholder="Select date"
                  minDate={checkInDate}
                  className="[&_button]:h-[44px] [&_button]:rounded-xl"
                />
              </div>

              {/* Travelers Select */}
              <div className="space-y-2">
                <CustomSelect
                  value={selectedTravelers}
                  onChange={setSelectedTravelers}
                  options={[
                    { _id: "1", name: "1 Traveler" },
                    { _id: "2", name: "2 Travelers" },
                    { _id: "3", name: "3 Travelers" },
                    { _id: "4", name: "4 Travelers" },
                    { _id: "5", name: "5+ Travelers" },
                  ]}
                  placeholder="Select travelers"
                  label={
                    <span className="flex items-center gap-2 text-gray-700 font-medium">
                      <Users className="w-4 h-4" />
                      Travelers
                    </span>
                  }
                  className="[&_button]:px-4 [&_button]:h-[44px] [&_button]:rounded-xl [&_button]:border-gray-300 
                           [&_button]:hover:border-gray-400 [&_button]:focus:ring-2 [&_button]:focus:ring-[#8F87F1]
                           [&_button]:focus:border-transparent"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    // Handle search logic here
                    console.log({
                      destination: searchQuery,
                      checkIn: checkInDate,
                      checkOut: checkOutDate,
                      travelers: selectedTravelers,
                      category: selectedCategory,
                      duration: selectedDuration,
                      price: selectedPrice,
                    });
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search Tours
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 font-medium">Filters:</span>

                <CustomSelect
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories.map((cat) => ({ _id: cat.id, name: cat.name }))}
                  placeholder="All Categories"
                  className="w-full sm:w-auto [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-lg 
                           [&_button]:border-gray-300 [&_button]:hover:border-gray-400 
                           [&_button]:text-sm"
                />

                <CustomSelect
                  value={selectedDuration}
                  onChange={setSelectedDuration}
                  options={[
                    { _id: "short", name: "1-3 Days" },
                    { _id: "medium", name: "4-7 Days" },
                    { _id: "long", name: "8+ Days" },
                  ]}
                  placeholder="Any Duration"
                  className="w-full sm:w-auto [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-lg 
                           [&_button]:border-gray-300 [&_button]:hover:border-gray-400 
                           [&_button]:text-sm"
                />

                <CustomSelect
                  value={selectedPrice}
                  onChange={setSelectedPrice}
                  options={[
                    { _id: "budget", name: "Under $1000" },
                    { _id: "mid", name: "$1000-$3000" },
                    { _id: "premium", name: "$3000+" },
                  ]}
                  placeholder="Any Price"
                  className="w-full sm:w-auto [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-lg 
                           [&_button]:border-gray-300 [&_button]:hover:border-gray-400 
                           [&_button]:text-sm"
                />

                <button
                  onClick={() => {
                    // Reset all filters
                    setSelectedCategory("");
                    setSelectedDuration("");
                    setSelectedPrice("");
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-[#8F87F1] font-medium text-sm hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore By{" "}
              <span className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover amazing tours across different categories tailored for every type of traveler
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-gradient-to-br from-white to-gray-50 border-2 border-[#8F87F1]"
                      : "bg-white"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.count} tours</p>
                  {activeCategory === category.id && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Featured{" "}
                <span className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                  Tours
                </span>
              </h2>
              <p className="text-gray-600 text-lg">Handpicked premium experiences for you</p>
            </div>
            <Link to="/tours" className="inline-flex items-center gap-2 text-[#8F87F1] font-semibold mt-4 md:mt-0">
              View All Tours
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTours.map((tour) => (
              <motion.div
                key={tour.id}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{tour.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span className="text-gray-500">({tour.reviews})</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{tour.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{tour.duration}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                        ${tour.price}
                      </div>
                      <div className="text-sm text-gray-500">per person</div>
                    </div>
                  </div>
                  <Link
                    to={`/tours/${tour.id}`}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 block text-center"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                  TourVista
                </span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                We provide exceptional travel experiences with attention to every detail. Our commitment to quality
                ensures unforgettable journeys.
              </p>

              <div className="space-y-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Travel Experience"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Stats Overlay */}
              <div className="grid grid-cols-2 gap-6 -mt-12 relative z-10 px-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 shadow-2xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8F87F1]/10 to-[#C68EFD]/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-[#8F87F1]" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-gray-600">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Traveler{" "}
              <span className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See what our travelers say about their experiences with TourVista
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(testimonial.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{testimonial.rating}</span>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">Stay Updated</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Subscribe to Our Newsletter</h2>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                Get exclusive offers, travel tips, and destination updates delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    className="w-full px-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                    placeholder="Your email address"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-[#8F87F1] font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-sm opacity-80 mt-4">By subscribing, you agree to our Privacy Policy</p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
