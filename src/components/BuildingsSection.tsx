import { useState } from "react";
import { Building } from "@/data/buildings";
import Icon from "@/components/ui/icon";

interface BuildingsSectionProps {
  buildings: Building[];
  onQRClick: (building: Building) => void;
}

export default function BuildingsSection({ buildings, onQRClick }: BuildingsSectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="buildings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-agu-violet/10 to-agu-orange/10 border border-agu-violet/20 rounded-full px-5 py-2 mb-5">
            <Icon name="Building2" size={14} className="text-agu-violet" />
            <span className="font-golos text-sm font-semibold text-agu-violet">Инфраструктура</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-agu-dark mb-4">
            Все{" "}
            <span className="gradient-text">корпусы</span> АГУ
          </h2>
          <p className="font-golos text-slate-500 text-lg max-w-xl mx-auto">
            Институты, службы и возможности каждого корпуса
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildings.map((building, idx) => (
            <div
              key={building.id}
              className="group rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl card-hover bg-white"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${building.gradient} p-6 relative overflow-hidden`}>
                {/* Decorative circles */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="font-montserrat font-black text-2xl text-white">{building.letter}</span>
                    </div>
                    <h3 className="font-montserrat font-bold text-white text-lg leading-tight">
                      {building.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1.5 text-white/70 text-xs">
                      <Icon name="MapPin" size={11} />
                      {building.address}
                    </div>
                  </div>

                  {building.qrCodes.length > 0 && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <Icon name="QrCode" size={12} className="text-white" />
                        <span className="font-montserrat font-bold text-white text-xs">{building.qrCodes.length} QR</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo placeholder */}
              {building.photo ? (
                <div className="h-44 overflow-hidden">
                  <img
                    src={building.photo}
                    alt={building.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div
                  className="h-36 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${building.color}08, ${building.color}15)` }}
                >
                  <div className="text-center">
                    <Icon name="Camera" size={32} className="mx-auto mb-1" style={{ color: building.color, opacity: 0.4 }} />
                    <span className="text-xs font-golos" style={{ color: building.color, opacity: 0.6 }}>
                      Фото фасада
                    </span>
                  </div>
                </div>
              )}

              {/* Body */}
              <div className="p-5">
                <p className="text-slate-500 text-sm font-golos leading-relaxed mb-4">{building.description}</p>

                {/* Institutes list */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    expanded === building.id ? "max-h-96" : "max-h-24"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {building.institutes.map((inst) => (
                      <div key={inst} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ background: building.color }}
                        />
                        <span className="font-golos text-xs text-slate-600 leading-relaxed">{inst}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {building.institutes.length > 2 && (
                  <button
                    onClick={() => setExpanded(expanded === building.id ? null : building.id)}
                    className="mt-3 flex items-center gap-1.5 text-xs font-golos font-semibold transition-colors"
                    style={{ color: building.color }}
                  >
                    <Icon name={expanded === building.id ? "ChevronUp" : "ChevronDown"} size={14} />
                    {expanded === building.id ? "Свернуть" : `Ещё ${building.institutes.length - 2}`}
                  </button>
                )}

                {/* Extra for S */}
                {building.extra && (
                  <div
                    className="mt-3 rounded-xl px-3 py-2 flex items-center gap-2"
                    style={{ background: `${building.color}10` }}
                  >
                    <Icon name="Star" size={13} style={{ color: building.color }} />
                    <span className="font-golos text-xs font-semibold" style={{ color: building.color }}>
                      {building.extra.join(", ")}
                    </span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mt-5">
                  {building.qrCodes.length > 0 && (
                    <button
                      onClick={() => onQRClick(building)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-montserrat font-semibold text-xs text-white transition-all hover:opacity-90"
                      style={{ background: `linear-gradient(135deg, ${building.color}, ${building.color}cc)` }}
                    >
                      <Icon name="QrCode" size={14} />
                      QR-коды
                    </button>
                  )}
                  {building.id === "S" && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-montserrat font-semibold text-xs border-2 text-slate-600 hover:text-sky-600 hover:border-sky-400 transition-all border-slate-200">
                      <Icon name="Layers" size={14} />
                      Этажи
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
