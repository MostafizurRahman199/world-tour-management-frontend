import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const MissionWithGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tourImages = [
    {
      id: 1,
      title: "Mountain Adventures",
      description: "Exploring the world's highest peaks",
      image: "https://images.unsplash.com/photo-1464822759843-e8f0b3672d0c?w=1200&h=600&fit=crop&auto=format",
    },
    {
      id: 2,
      title: "Cultural Experiences",
      description: "Immerse in local traditions",
      image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1200&h=600&fit=crop&auto=format",
    },
    {
      id: 3,
      title: "Beach Getaways",
      description: "Tropical paradise adventures",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&auto=format",
    },
    {
      id: 4,
      title: "City Explorations",
      description: "Urban discovery tours",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop&auto=format",
    },
    {
      id: 5,
      title: "Wildlife Safaris",
      description: "Encounter nature's wonders",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=600&fit=crop&auto=format",
    },
    {
      id: 6,
      title: "Desert Expeditions",
      description: "Journey through golden sands",
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=600&fit=crop&auto=format",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-in">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 md:mb-8 leading-tight">
                Redefining{" "}
                <span className="bg-gradient-to-r from-[#8F87F1] to-[#C68EFD] bg-clip-text text-transparent">
                  Travel
                </span>{" "}
                Experiences
              </h2>

              <div className="space-y-4 md:space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-loose">
                  We believe in the power of travel to transform lives and create lasting memories. Our team of
                  passionate travel experts is dedicated to crafting journeys that go beyond ordinary tourism.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed md:leading-loose">
                  With years of experience exploring hidden gems and popular destinations alike, we help travelers
                  discover the world in authentic, sustainable, and unforgettable ways.
                </p>
              </div>

            
            </div>
          </div>

          {/* Gallery Slider */}
         
        </div>
      </div>
    </section>
  );
};

export default MissionWithGallery;
