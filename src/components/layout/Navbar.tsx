import { useState } from "react";
import { BookOpen, Info, LifeBuoy, ChevronDown, Menu, X } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Link } from "react-router-dom";
import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api";
import DropDown from "../common/Navbar/DropDown";
import MainIcon from "@/assets/icons/Navbar/MainIcon";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { ROLE } from "@/constants/role";

// Navigation links array
const navigationLinks = [
  { href: "/", label: "Home", roles: ["PUBLIC", ROLE.USER, ROLE.SUPER_ADMIN] },
  { href: "/about", label: "About Us", roles: ["PUBLIC", ROLE.USER, ROLE.SUPER_ADMIN] },
  { href: "/admin", label: "Admin Dashboard", roles: [ROLE.SUPER_ADMIN] },
  { href: "/user", label: "User Dashboard", roles: [ROLE.USER] },
  {
    label: "Features",
    roles: ["PUBLIC", ROLE.USER, ROLE.SUPER_ADMIN],
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
    roles: ["PUBLIC", ROLE.USER, ROLE.SUPER_ADMIN],
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
    roles: ["PUBLIC", ROLE.USER, ROLE.SUPER_ADMIN],
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
  const [logout] = useLogoutMutation();
  const { data, isLoading, error } = useUserInfoQuery(undefined);
  const user = data?.data?.data;
  const dispatch = useDispatch();

  // Helper function to check if a link should be visible based on user role
  const shouldShowLink = (linkRoles: string[]) => {
    if (!user) {
      // If user is not logged in, only show PUBLIC links
      return linkRoles.includes("PUBLIC");
    }

    // If user is logged in, check if user's role is in linkRoles
    return linkRoles.includes(user.role) || linkRoles.includes("PUBLIC");
  };

  // Filter navigation links based on user role
  const getFilteredLinks = () => {
    return navigationLinks.filter((link) => shouldShowLink(link.roles));
  };

  // Optional loading state
  if (isLoading) {
    console.log("Loading user info...");
  }

  console.log(data);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const filteredLinks = getFilteredLinks();

  return (
    <header className="bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <MainIcon />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              TourVista
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {filteredLinks.map((link, index) => (
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
                  <Link
                    to={link.href}
                    className="px-4 py-2.5 font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 block"
                  >
                    {link.label}
                  </Link>
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
              </>
            )}

            {/* Logged-in UI */}
            {user && <DropDown user={user} handleLogout={handleLogout} isMobile={false} />}
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
              {filteredLinks.map((link, index) => (
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
                          <Link
                            key={itemIndex}
                            to={item.href}
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
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="block px-3 py-2.5 font-semibold text-gray-700 hover:text-[#8F87F1] rounded-lg hover:bg-gradient-to-r hover:from-[#C68EFD]/10 hover:to-[#8F87F1]/10 transition-all duration-300 border-b border-gray-200/30"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
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
                {user && <DropDown user={user} handleLogout={handleLogout} isMobile={true} />}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
