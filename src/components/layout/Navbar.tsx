import { useState } from "react";
import { BookOpen, Info, LifeBuoy, ChevronDown, Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Link } from "react-router-dom";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  {
    label: "Features",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#",
        label: "Tour Packages",
        description: "Curated travel experiences for every adventurer.",
      },
      {
        href: "#",
        label: "Destination Guides",
        description: "Comprehensive guides for your next journey.",
      },
      {
        href: "#",
        label: "Travel Planning",
        description: "Let us plan your perfect itinerary.",
      },
    ],
  },
  {
    label: "Destinations",
    submenu: true,
    type: "simple",
    items: [
      { href: "#", label: "Europe" },
      { href: "#", label: "Asia" },
      { href: "#", label: "Americas" },
      { href: "#", label: "Africa" },
    ],
  },
  {
    label: "Resources",
    submenu: true,
    type: "icon",
    items: [
      { href: "#", label: "Travel Blog", icon: BookOpen },
      { href: "#", label: "Support", icon: LifeBuoy },
      { href: "#", label: "About Us", icon: Info },
    ],
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data?.data;


  

  // Optional loading state
  if (isLoading) {
    console.log("Loading user info...");
  }

  console.log(data);

  // If user is not logged in
  if (error) {
    // Show login/register buttons normally
  }

  const handleLogout = async () => {
   
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className="bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <svg
                className="w-6 h-6 text-[#8F87F1]"
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.submenu ? (
                  <>
                    <button
                      className="flex items-center space-x-1 px-4 py-2.5 font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 group"
                      onClick={() => handleDropdownToggle(link.label)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/20">
                        <div className="space-y-2">
                          {link.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#C68EFD]/10 hover:to-[#8F87F1]/10 transition-all duration-300 group/item"
                            >
                              {link.type === "icon" && item.icon && (
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                    <item.icon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-medium text-gray-800 group-hover/item:text-[#8F87F1] transition-colors">
                                    {item.label}
                                  </span>
                                </div>
                              )}

                              {link.type === "description" && (
                                <div className="space-y-2">
                                  <div className="font-semibold text-gray-800 group-hover/item:text-[#8F87F1] transition-colors">
                                    {item.label}
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{item?.description}</p>
                                </div>
                              )}

                              {link.type === "simple" && (
                                <span className="font-medium text-gray-800 group-hover/item:text-[#8F87F1] transition-colors">
                                  {item.label}
                                </span>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="px-4 py-2.5 font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 block"
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {isLoading && <span className="text-white/80">Loading...</span>}

            {!isLoading && !user && (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2.5 font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2.5 font-semibold bg-white text-[#8F87F1] hover:bg-gray-100 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl transition-all duration-300"
                >
                  Register
                </Link>
                <ModeToggle />
              </>
            )}

            {/* Logged-in UI */}
            {user && (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img
                    src={user.picture}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer"
                  />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 font-semibold hover:bg-red-50 rounded-b-xl transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-white/20 shadow-2xl transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <nav className="space-y-4">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  {link.submenu ? (
                    <div className="border-b border-gray-200/30 pb-4">
                      <button
                        className="flex items-center justify-between w-full px-3 py-2.5 font-semibold text-[#8F87F1] bg-gradient-to-r from-[#C68EFD]/10 to-[#8F87F1]/10 rounded-lg"
                        onClick={() => handleDropdownToggle(link.label)}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div className={`mt-2 space-y-1 pl-4 ${activeDropdown === link.label ? "block" : "hidden"}`}>
                        {link.items.map((item, itemIndex) => (
                          <a
                            key={itemIndex}
                            href={item.href}
                            className="block px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-[#C68EFD]/10 hover:to-[#8F87F1]/10 text-gray-700 hover:text-[#8F87F1] transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {link.type === "icon" && item.icon && (
                              <div className="flex items-center space-x-3">
                                <div className="w-6 h-6 bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] rounded-md flex items-center justify-center">
                                  <item.icon className="w-3 h-3 text-white" />
                                </div>
                                <span className="font-medium">{item.label}</span>
                              </div>
                            )}

                            {link.type === "description" && (
                              <div className="space-y-1">
                                <div className="font-medium">{item.label}</div>
                                <p className="text-xs text-gray-600">{item.description}</p>
                              </div>
                            )}

                            {link.type === "simple" && <span className="font-medium">{item.label}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="block px-3 py-2.5 font-semibold text-gray-700 hover:text-[#8F87F1] rounded-lg hover:bg-gradient-to-r hover:from-[#C68EFD]/10 hover:to-[#8F87F1]/10 transition-all duration-300 border-b border-gray-200/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}

              {/*-------- Mobile Auth Buttons --------*/}
              <div className="pt-4 space-y-3">
                {!user && (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center px-6 py-3 font-semibold text-[#8F87F1] border border-[#8F87F1] hover:bg-[#8F87F1] hover:text-white rounded-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block w-full text-center px-6 py-3 font-semibold bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] text-white hover:shadow-xl rounded-xl transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </>
                )}

                {/* Logged-in mobile UI */}
                {user && (
                  <div className="p-4 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={user.picture} className="w-12 h-12 rounded-full border" alt="profile" />
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-center font-semibold text-red-600 border border-red-300 rounded-xl hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
