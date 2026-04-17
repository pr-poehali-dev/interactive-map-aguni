import { useEffect, useRef } from "react";
import { Building, QRCode } from "@/data/buildings";
import Icon from "@/components/ui/icon";

interface QRModalProps {
  building: Building | null;
  onClose: () => void;
  onUpdateQR: (buildingId: string, qrId: string, image: string) => void;
  onAddQR: (buildingId: string, name: string, url: string) => void;
}

function QRCodeDisplay({ qr, color }: { qr: QRCode; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Simple QR-like pattern placeholder
    const size = 120;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, size, size);

    // Draw a decorative QR placeholder
    const modules = 8;
    const cellSize = (size - 20) / modules;
    const offset = 10;

    // Generate pseudo-random pattern from URL
    const seed = qr.url.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = (i: number) => ((seed * (i + 1) * 2654435761) >>> 0) % 2 === 0;

    ctx.fillStyle = color;
    for (let row = 0; row < modules; row++) {
      for (let col = 0; col < modules; col++) {
        if (
          (row < 3 && col < 3) ||
          (row < 3 && col >= modules - 3) ||
          (row >= modules - 3 && col < 3) ||
          rand(row * modules + col)
        ) {
          ctx.fillRect(
            offset + col * cellSize,
            offset + row * cellSize,
            cellSize - 1,
            cellSize - 1
          );
        }
      }
    }

    // Corner squares
    const corners = [[0, 0], [0, modules - 3], [modules - 3, 0]];
    for (const [r, c] of corners) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.strokeRect(
        offset + c * cellSize - 1,
        offset + r * cellSize - 1,
        cellSize * 3 + 2,
        cellSize * 3 + 2
      );
      ctx.fillStyle = "#fff";
      ctx.fillRect(
        offset + c * cellSize + 1,
        offset + r * cellSize + 1,
        cellSize * 3 - 2,
        cellSize * 3 - 2
      );
      ctx.fillStyle = color;
      ctx.fillRect(
        offset + c * cellSize + 3,
        offset + r * cellSize + 3,
        cellSize * 3 - 6,
        cellSize * 3 - 6
      );
    }
  }, [qr, color]);

  return (
    <div className="flex flex-col items-center gap-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow card-hover">
      {qr.image ? (
        <img src={qr.image} alt={qr.name} className="w-28 h-28 object-contain rounded-xl" />
      ) : (
        <div className="qr-placeholder w-28 h-28">
          <canvas ref={canvasRef} className="w-20 h-20 rounded-lg" />
        </div>
      )}
      <div className="text-center">
        <div className="font-montserrat font-semibold text-xs text-slate-800 leading-tight">{qr.name}</div>
        <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[110px]">{qr.url}</div>
      </div>
      <label className="cursor-pointer text-[10px] text-agu-violet font-semibold flex items-center gap-1 hover:text-agu-blue transition-colors">
        <Icon name="Upload" size={11} />
        Загрузить QR
        <input type="file" className="hidden" accept="image/*" />
      </label>
    </div>
  );
}

export default function QRModal({ building, onClose, onUpdateQR, onAddQR }: QRModalProps) {
  if (!building) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className={`bg-gradient-to-r ${building.gradient} p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <span className="font-montserrat font-black text-3xl text-white">{building.letter}</span>
            </div>
            <div>
              <div className="font-montserrat font-bold text-white text-xl">{building.name}</div>
              <div className="text-white/75 text-sm mt-0.5">QR-коды сообществ и сервисов</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
          <div className="p-6">
            {building.qrCodes.length > 0 ? (
              <>
                <p className="text-slate-500 text-sm mb-5 font-golos">
                  Нажмите на QR-код, чтобы загрузить свою картинку. Коды отображаются при нажатии на корпус на карте.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {building.qrCodes.map((qr) => (
                    <QRCodeDisplay
                      key={qr.id}
                      qr={qr}
                      color={building.color}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: `${building.color}20` }}
                >
                  <Icon name="QrCode" size={32} style={{ color: building.color }} />
                </div>
                <div className="font-montserrat font-bold text-slate-700 text-lg mb-2">
                  QR-коды не добавлены
                </div>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Для этого корпуса пока нет QR-кодов. Вы можете добавить их позже.
                </p>
              </div>
            )}

            {/* Floor map for S */}
            {building.id === "S" && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Layers" size={18} className="text-sky-500" />
                  <span className="font-montserrat font-bold text-slate-800">Карта этажей</span>
                </div>
                <div
                  className="rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50 h-48 flex items-center justify-center flex-col gap-3 cursor-pointer hover:bg-sky-100 transition-colors"
                >
                  <Icon name="Upload" size={32} className="text-sky-400" />
                  <div className="text-center">
                    <div className="font-montserrat font-semibold text-sky-600 text-sm">Загрузить карту этажей</div>
                    <div className="text-sky-400 text-xs mt-0.5">PNG, JPG или PDF</div>
                  </div>
                </div>
              </div>
            )}

            {/* Add QR button */}
            <button
              className="w-full mt-5 flex items-center justify-center gap-2 py-3 rounded-2xl font-montserrat font-semibold text-sm border-2 border-dashed border-slate-200 text-slate-400 hover:border-agu-violet hover:text-agu-violet transition-all"
            >
              <Icon name="Plus" size={16} />
              Добавить QR-код
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
