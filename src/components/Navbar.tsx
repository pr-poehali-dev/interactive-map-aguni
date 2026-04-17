import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "map", label: "Карта", icon: "Map" },
  { id: "buildings", label: "Корпусы", icon: "Building2" },
  { id: "about", label: "Об университете", icon: "GraduationCap" },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass shadow-lg shadow-blue-900/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-montserrat font-black text-lg">А</span>
          </div>
          <div className="hidden sm:block">
            <div className={`font-montserrat font-bold text-base leading-none transition-colors ${scrolled ? "text-agu-dark" : "text-white"}`}>
              АГУ
            </div>
            <div className={`font-golos text-xs transition-colors ${scrolled ? "text-slate-500" : "text-white/70"}`}>
              Кампус на карте
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-golos font-medium text-sm transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-white/20 backdrop-blur-sm text-white shadow-sm"
                  : scrolled
                  ? "text-slate-600 hover:text-agu-blue hover:bg-agu-light"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              <Icon name={item.icon as "Home"} size={15} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-agu-dark hover:bg-agu-light" : "text-white hover:bg-white/15"}`}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/20 mt-1">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-golos font-medium text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-agu-blue to-agu-violet text-white"
                    : "text-slate-700 hover:bg-agu-light"
                }`}
              >
                <Icon name={item.icon as "Home"} size={18} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}