import Icon from "@/components/ui/icon";

const facts = [
  {
    icon: "GraduationCap",
    title: "Крупнейший вуз Алтая",
    text: "АГУ — ведущий классический университет Алтайского края, основан в 1973 году",
    color: "#1a3fa8",
  },
  {
    icon: "Users",
    title: "20 000+ студентов",
    text: "Более двадцати тысяч студентов обучаются на различных программах бакалавриата, специалитета и магистратуры",
    color: "#7c3aed",
  },
  {
    icon: "Building2",
    title: "Разветвлённый кампус",
    text: "7 корпусов в Барнауле, включая учебные, спортивный комплекс и студенческую поликлинику",
    color: "#f97316",
  },
  {
    icon: "Globe",
    title: "Международная деятельность",
    text: "Партнёрские связи с университетами России, Азии и Европы. Активный обмен студентами и преподавателями",
    color: "#0ea5e9",
  },
  {
    icon: "FlaskConical",
    title: "Наука и инновации",
    text: "Собственные научные центры, лаборатории и инновационная инфраструктура для исследований",
    color: "#10b981",
  },
  {
    icon: "Heart",
    title: "Студенческая жизнь",
    text: "Лига студентов, Точка кипения, Центр Творчества — богатая внеучебная жизнь для каждого",
    color: "#ec4899",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-5" />
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, #1a3fa815 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #7c3aed10 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-agu-orange/10 to-agu-amber/10 border border-agu-orange/20 rounded-full px-5 py-2 mb-5">
            <Icon name="University" size={14} className="text-agu-orange" />
            <span className="font-golos text-sm font-semibold text-agu-orange">Об университете</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-agu-dark mb-4">
            Алтайский{" "}
            <span className="gradient-text">государственный</span>
            <br />
            университет
          </h2>
          <p className="font-golos text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Классический университет с богатой историей, современной инфраструктурой
            и сильным академическим сообществом в сердце Западной Сибири
          </p>
        </div>

        {/* Hero banner */}
        <div className="gradient-bg rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden noise">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-agu-orange/20 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative text-center text-white">
            <div className="font-montserrat font-black text-6xl sm:text-8xl text-agu-amber mb-2">1973</div>
            <div className="font-golos text-xl text-white/80">год основания университета</div>
            <div className="w-24 h-1 bg-white/30 rounded-full mx-auto my-6" />
            <p className="font-golos text-white/75 max-w-lg mx-auto leading-relaxed">
              Более 50 лет АГУ готовит специалистов по направлениям от юриспруденции и экономики
              до биотехнологий и информационных систем
            </p>
          </div>
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, idx) => (
            <div
              key={fact.title}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm card-hover"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${fact.color}15` }}
              >
                <Icon name={fact.icon as "GraduationCap"} size={24} style={{ color: fact.color }} />
              </div>
              <h3 className="font-montserrat font-bold text-agu-dark text-base mb-2">{fact.title}</h3>
              <p className="font-golos text-slate-500 text-sm leading-relaxed">{fact.text}</p>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://www.asu.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 gradient-bg text-white font-montserrat font-bold px-8 py-4 rounded-2xl shadow-lg hover:scale-105 transition-transform text-base"
          >
            <Icon name="ExternalLink" size={18} />
            Официальный сайт АГУ
          </a>
        </div>
      </div>
    </section>
  );
}
