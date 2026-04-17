import Icon from "@/components/ui/icon";

export default function Footer() {
  return (
    <footer className="bg-agu-dark text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-montserrat font-black text-lg">А</span>
            </div>
            <div>
              <div className="font-montserrat font-bold text-white">АГУ — Кампус на карте</div>
              <div className="font-golos text-white/50 text-xs">Алтайский государственный университет</div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-white/50 text-xs font-golos">
              <Icon name="MapPin" size={12} />
              г. Барнаул, пр. Ленина, 61
            </div>
            <div className="flex items-center gap-2 text-white/50 text-xs font-golos">
              <Icon name="Globe" size={12} />
              <a href="https://www.asu.ru" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">www.asu.ru</a>
            </div>
          </div>

          <div className="text-white/30 text-xs font-golos text-center">
            © {new Date().getFullYear()} АГУ
            <br />
            Интерактивная карта кампуса
          </div>
        </div>
      </div>
    </footer>
  );
}
