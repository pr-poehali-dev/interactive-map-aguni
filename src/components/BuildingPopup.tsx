import { Building } from "@/data/buildings";
import Icon from "@/components/ui/icon";

interface BuildingPopupProps {
  building: Building;
  onClose: () => void;
  onQRClick: (building: Building) => void;
}

export default function BuildingPopup({ building, onClose, onQRClick }: BuildingPopupProps) {
  return (
    <div className="animate-scale-in font-golos" style={{ minWidth: 280 }}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${building.gradient} p-4 relative`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors"
        >
          <Icon name="X" size={14} className="text-white" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="font-montserrat font-black text-2xl text-white">{building.letter}</span>
          </div>
          <div>
            <div className="font-montserrat font-bold text-white text-base leading-tight">
              {building.name}
            </div>
            <div className="text-white/75 text-xs mt-0.5 flex items-center gap-1">
              <Icon name="MapPin" size={11} />
              {building.address}
            </div>
          </div>
        </div>
      </div>

      {/* Photo placeholder */}
      {building.photo ? (
        <div className="h-36 overflow-hidden">
          <img src={building.photo} alt={building.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="h-28 flex items-center justify-center text-slate-400 text-sm"
          style={{ background: "linear-gradient(135deg, #f0f4ff, #ede9fe)" }}
        >
          <div className="text-center">
            <Icon name="Building2" size={28} className="mx-auto mb-1 opacity-40" />
            <span className="text-xs opacity-60">Фото корпуса</span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="p-4">
        <p className="text-slate-500 text-xs mb-3 leading-relaxed">{building.description}</p>

        {/* Institutes */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Icon name="GraduationCap" size={14} className="text-agu-violet" />
            <span className="font-montserrat font-semibold text-xs text-slate-700">Институты и службы</span>
          </div>
          <div className="flex flex-col gap-1">
            {building.institutes.map((inst) => (
              <div key={inst} className="flex items-start gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: building.color }}
                />
                <span className="text-xs text-slate-600 leading-relaxed">{inst}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra info for S */}
        {building.extra && building.extra.length > 0 && (
          <div className="mb-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon name="Star" size={13} className="text-amber-500" />
              <span className="font-montserrat font-semibold text-xs text-amber-700">Дополнительно</span>
            </div>
            {building.extra.map((e) => (
              <div key={e} className="text-xs text-amber-600 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                {e}
              </div>
            ))}
          </div>
        )}

        {/* QR button */}
        {building.qrCodes.length > 0 && (
          <button
            onClick={() => onQRClick(building)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-montserrat font-semibold text-sm text-white transition-all hover:opacity-90 hover:scale-[1.02] bg-gradient-to-r ${building.gradient}`}
          >
            <Icon name="QrCode" size={16} />
            QR-коды ({building.qrCodes.length})
          </button>
        )}

        {/* Floor map for S */}
        {building.id === "S" && (
          <button
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-xl font-montserrat font-semibold text-sm text-slate-600 border-2 border-slate-200 hover:border-sky-400 hover:text-sky-600 transition-all"
          >
            <Icon name="Layers" size={16} />
            Карта этажей
          </button>
        )}
      </div>
    </div>
  );
}
