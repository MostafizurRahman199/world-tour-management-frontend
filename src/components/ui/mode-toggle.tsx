import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

export function ModeToggle() {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "system";
    applyTheme(savedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    let effectiveTheme = newTheme;
    if (newTheme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    document.documentElement.classList.toggle("dark", effectiveTheme === "dark");
  };

  const handleThemeChange = (newTheme: string) => {
    applyTheme(newTheme);
    setIsOpen(false);
  };

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-4 py-2.5 font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
        aria-label="Toggle theme"
      >
        <div className="relative w-5 h-5">
          <Sun
            className="absolute w-5 h-5 transition-all duration-300"
            style={{
              transform: isDark ? "scale(0) rotate(-90deg)" : "scale(1) rotate(0deg)",
              opacity: isDark ? 0 : 1,
            }}
          />
          <Moon
            className="absolute w-5 h-5 transition-all duration-300"
            style={{
              transform: isDark ? "scale(1) rotate(0deg)" : "scale(0) rotate(90deg)",
              opacity: isDark ? 1 : 0,
            }}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 transition-all duration-300 transform ${
          isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/20">
          <div className="space-y-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`w-full p-3 rounded-xl transition-all duration-300 group/item ${
                  theme === option.value
                    ? "bg-gradient-to-r from-[#C68EFD]/10 to-[#8F87F1]/10"
                    : "hover:bg-gradient-to-r hover:from-[#C68EFD]/10 hover:to-[#8F87F1]/10"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      theme === option.value
                        ? "bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] scale-110"
                        : "bg-gradient-to-r from-[#C68EFD] to-[#8F87F1] group-hover/item:scale-110"
                    }`}
                  >
                    <option.icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`font-medium transition-colors ${
                      theme === option.value ? "text-[#8F87F1]" : "text-gray-800 group-hover/item:text-[#8F87F1]"
                    }`}
                  >
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
