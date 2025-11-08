import React, { useState } from "react";
import GallerySlider from "./_component/GallerySlider";
import StatCard from "./_component/StatCard";
import ValueCard from "./_component/ValueCard";
import TeamMember from "./_component/TeamMember";
import MissionWithGallery from "./_component/GallerySlider";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Our <span className="text-white/90">Journey</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8">
            Crafting unforgettable travel experiences that connect people with the world's most amazing destinations
          </p>
          <div className="w-24 h-1 bg-white/50 mx-auto"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      <MissionWithGallery/>
      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard number="500+" label="Tours Organized" gradient="from-[#8F87F1] to-[#C68EFD]" />
            <StatCard number="10K+" label="Happy Travelers" gradient="from-[#C68EFD] to-[#8F87F1]" />
            <StatCard number="50+" label="Destinations" gradient="from-[#8F87F1] to-[#C68EFD]" />
            <StatCard number="98%" label="Satisfaction Rate" gradient="from-[#C68EFD] to-[#8F87F1]" />
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Our Travel <span className="text-[#C68EFD]">Philosophy</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            We're committed to creating travel experiences that are meaningful, sustainable, and unforgettable
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon="🌍"
              title="Sustainable Travel"
              description="We prioritize eco-friendly practices and support local communities to ensure our adventures preserve the beauty of each destination."
              delay={0}
            />
            <ValueCard
              icon="✨"
              title="Authentic Experiences"
              description="Go beyond tourist spots with carefully curated experiences that reveal the true soul of each destination."
              delay={200}
            />
            <ValueCard
              icon="🤝"
              title="Personalized Service"
              description="Every journey is tailored to your preferences, with dedicated support from planning to return."
              delay={400}
            />
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-muted to-background">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Meet Our <span className="text-[#8F87F1]">Expert Guides</span>
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Passionate travel professionals dedicated to making your journey extraordinary
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              image="https://avatars.githubusercontent.com/u/67595254?v=4"
              initial="S"
              name="Sarah Chen"
              role="Adventure Specialist"
              expertise={["Mountaineering", "Wilderness Survival", "Rock Climbing"]}
              experience="10+ years"
              description="10+ years guiding mountain expeditions and outdoor adventures across 5 continents."
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              initial="M"
              name="Marco Rossi"
              role="Cultural Expert"
              expertise={["History", "Local Cuisine", "Language"]}
              experience="8+ years"
              description="Born and raised in Italy, Marco brings ancient history and local traditions to life."
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
              initial="A"
              name="Aisha Khan"
              role="Luxury Travel Curator"
              expertise={["Luxury Resorts", "Fine Dining", "VIP Services"]}
              experience="12+ years"
              description="Creating bespoke luxury experiences in the world's most exclusive destinations."
            />
            <TeamMember
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              initial="J"
              name="James Wilson"
              role="Expedition Leader"
              expertise={["Navigation", "Safety Protocols", "Remote Logistics"]}
              experience="15+ years"
              description="Leading challenging expeditions to remote locations with safety as the top priority."
            />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#8F87F1] to-[#C68EFD] rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Next Adventure?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let's create your perfect journey together. Share your dream destination and we'll make it reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#8F87F1] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  Plan Your Trip
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#8F87F1] transition-all duration-300 transform hover:scale-105">
                  Browse Tours
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
