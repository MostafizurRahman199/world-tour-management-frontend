import React from "react";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import Button from "../ui/CustomUI/Button";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#C68EFD] via-[#A78BFA] to-[#8F87F1] text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#8F87F1]"
                  viewBox="0 0 28 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                TourVista
              </span>
            </div>
            <p className="text-gray-100 text-lg leading-relaxed">
              Your adventure begins here. Let's explore the world together and create unforgettable memories.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-100">
                <MapPin size={18} className="text-[#C68EFD]" />
                <span>123 Adventure Street, Travel City</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-100">
                <Phone size={18} className="text-[#C68EFD]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-100">
                <Mail size={18} className="text-[#C68EFD]" />
                <span>info@tourvista.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {["Home", "Destinations", "Packages", "About Us", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-100 hover:text-white transition-all duration-300 hover:translate-x-2 hover:font-medium flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#C68EFD] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Support
            </h3>
            <ul className="space-y-4">
              {[
                "FAQ",
                "Privacy Policy",
                "Terms & Conditions",
                "Booking Policy",
                "Customer Support",
                "Travel Guides",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-100 hover:text-white transition-all duration-300 hover:translate-x-2 hover:font-medium flex items-center group"
                  >
                    <span className="w-2 h-2 bg-[#8F87F1] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-100 leading-relaxed">
              Subscribe to our newsletter for exclusive deals, travel tips, and destination highlights.
            </p>

            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="Your email address"
                />
              </div>
              <Button type="submit" variant="animated" size="lg" fullWidth className="mt-4">
                Subscribe
              </Button>
            </form>

            {/* Social Links */}
            <div className="pt-4">
              <p className="text-gray-100 mb-4">Follow us on social media</p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, color: "" },
                  { Icon: Twitter, color: "" },
                  { Icon: Instagram, color: "" },
                  { Icon: Youtube, color: "" },
                ].map(({ Icon, color }, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`bg-white/10 backdrop-blur-sm p-3 rounded-xl text-gray-100 ${color} transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:shadow-lg`}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-200 text-sm">
              © 2025 TourVista. All Rights Reserved. Crafted with ❤️ for travelers.
            </p>
            <div className="flex space-x-6 text-sm text-gray-200">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
