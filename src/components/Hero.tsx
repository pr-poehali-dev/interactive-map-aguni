import Icon from "@/components/ui/icon";

interface HeroProps {
  onMapClick: () => void;
  onBuildingsClick: () => void;
}

const stats = [
  { value: "7", label: "Корпусов", icon: "Building2" },
  { value: "12+", label: "Институтов", icon: "GraduationCap" },
  { value: "20 000+", label: "Студентов", icon: "Users" },
  { value: "1973", label: "Год основания", icon: "Calendar" },
];

export default function Hero({ onMapClick, onBuildingsClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-agu-orange/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-48 h-48 bg-agu-violet/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-5 py-2 mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="w-2 h-2 bg-agu-amber rounded-full animate-pulse" />
          <span className="font-golos text-sm font-medium text-white/90">
            Алтайский государственный университет
          </span>
        </div>

        {/* Main heading */}
        <h1
          className="font-montserrat font-black text-5xl sm:text-6xl lg:text-8xl leading-none mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Кампус
          <br />
          <span className="text-agu-amber">АГУ</span>
        </h1>

        <p
          className="font-golos text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          Интерактивная карта корпусов, институтов и сервисов
          <br className="hidden sm:block" />
          Алтайского государственного университета в Барнауле
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <button
            onClick={onMapClick}
            className="flex items-center justify-center gap-3 bg-white text-agu-blue font-montserrat font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-blue-900/30 hover:scale-105 hover:shadow-3xl transition-all duration-300 text-base"
          >
            <Icon name="MapPin" size={20} />
            Открыть карту
          </button>
          <button
            onClick={onBuildingsClick}
            className="flex items-center justify-center gap-3 bg-white/15 backdrop-blur-sm border-2 border-white/40 text-white font-montserrat font-semibold px-8 py-4 rounded-2xl hover:bg-white/25 transition-all duration-300 text-base"
          >
            <Icon name="Building2" size={20} />
            Все корпусы
          </button>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.65s" }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/20 transition-all duration-300"
            >
              <Icon name={stat.icon as "Building2"} size={22} className="text-agu-amber mb-2 mx-auto" />
              <div className="font-montserrat font-black text-2xl text-white mb-1">
                {stat.value}
              </div>
              <div className="font-golos text-xs text-white/65">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-golos text-xs">Прокрутите вниз</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
