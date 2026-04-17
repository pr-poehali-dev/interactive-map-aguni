import { useState, useEffect, useRef } from "react";
import { Building, QRCode } from "@/data/buildings";
import Icon from "@/components/ui/icon";

const UPLOAD_URL = "https://functions.poehali.dev/88cf9536-70f2-4fab-8352-581854d360ed";

interface QRModalProps {
  building: Building | null;
  onClose: () => void;
  onUpdateQR: (buildingId: string, qrId: string, image: string) => void;
  onAddQR: (buildingId: string, name: string, url: string) => void;
}

type UploadStatus = "idle" | "uploading" | "done" | "error";

interface QRCardProps {
  qr: QRCode;
  building: Building;
  onImageUpdate: (url: string) => void;
}

function QRCard({ qr, building, onImageUpdate }: QRCardProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [preview, setPreview] = useState<string | null>(qr.image || null);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved image from S3 on mount
  useEffect(() => {
    if (qr.image) return;
    fetch(`${UPLOAD_URL}?folder=qr`)
      .then((r) => r.json())
      .then((data) => {
        const match = (data.files || []).find(
          (f: { building_id: string; file_id: string; url: string }) =>
            f.building_id === building.id && f.file_id === qr.id
        );
        if (match) {
          setPreview(match.url);
          onImageUpdate(match.url);
        }
      })
      .catch(() => {});
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Только изображения (PNG, JPG, GIF)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Файл слишком большой (макс. 5 МБ)");
      return;
    }
    setErrorMsg("");
    setStatus("uploading");

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      try {
        const resp = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            building_id: building.id,
            file_id: qr.id,
            folder: "qr",
            image: dataUrl,
          }),
        });
        const result = await resp.json();
        if (result.url) {
          setPreview(result.url);
          onImageUpdate(result.url);
          setStatus("done");
        } else {
          throw new Error("No URL");
        }
      } catch {
        setStatus("error");
        setErrorMsg("Ошибка загрузки. Попробуйте ещё раз.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDelete = async () => {
    setStatus("uploading");
    try {
      await fetch(UPLOAD_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: `agu/qr/${building.id}/${qr.id}.png` }),
      });
      setPreview(null);
      onImageUpdate("");
      setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div
      className="relative group rounded-2xl overflow-hidden border-2 transition-all duration-300"
      style={{
        borderColor: preview ? `${building.color}50` : "#e2e8f0",
        background: preview ? `${building.color}06` : "#f8fafc",
      }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="relative flex flex-col items-center justify-center p-4 min-h-[160px]">
        {status === "uploading" ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-10 h-10 rounded-full animate-spin"
              style={{
                border: `3px solid ${building.color}30`,
                borderTopColor: building.color,
              }}
            />
            <span className="text-xs font-golos text-slate-500 font-semibold">Загрузка...</span>
          </div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt={qr.name}
              className="w-28 h-28 object-contain rounded-xl"
            />
            {status === "done" && (
              <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => inputRef.current?.click()}
                className="bg-white text-slate-800 rounded-xl px-2.5 py-1.5 text-[11px] font-montserrat font-semibold hover:bg-slate-100 transition-colors flex items-center gap-1"
              >
                <Icon name="RefreshCw" size={11} />
                Заменить
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white rounded-xl px-2.5 py-1.5 text-[11px] font-montserrat font-semibold hover:bg-red-600 transition-colors flex items-center gap-1"
              >
                <Icon name="Trash2" size={11} />
                Удалить
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-2 w-full h-full min-h-[120px] justify-center rounded-xl transition-opacity hover:opacity-70"
            style={{ color: building.color }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: `${building.color}15` }}
            >
              <Icon name="Upload" size={22} style={{ color: building.color }} />
            </div>
            <div className="text-center">
              <div className="font-montserrat font-semibold text-xs" style={{ color: building.color }}>
                Загрузить QR
              </div>
              <div className="text-slate-400 text-[10px] mt-0.5">PNG, JPG · до 5 МБ</div>
            </div>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      {/* Label */}
      <div
        className="px-3 py-2 border-t"
        style={{ borderColor: preview ? `${building.color}20` : "#e2e8f0" }}
      >
        <div className="font-montserrat font-semibold text-xs text-slate-800 text-center leading-tight">
          {qr.name}
        </div>
        {errorMsg && (
          <div className="text-[10px] text-red-500 text-center mt-1 font-golos">{errorMsg}</div>
        )}
      </div>
    </div>
  );
}

function FloorMapCard({ building }: { building: Building }) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`${UPLOAD_URL}?folder=floors`)
      .then((r) => r.json())
      .then((data) => {
        const match = (data.files || []).find(
          (f: { building_id: string; file_id: string; url: string }) =>
            f.building_id === building.id && f.file_id === "map"
        );
        if (match) setPreview(match.url);
      })
      .catch(() => {});
  }, []);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setStatus("uploading");
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setPreview(dataUrl);
      try {
        const resp = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ building_id: building.id, file_id: "map", folder: "floors", image: dataUrl }),
        });
        const result = await resp.json();
        if (result.url) { setPreview(result.url); setStatus("done"); }
        else throw new Error();
      } catch {
        setStatus("error");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="rounded-2xl border-2 border-dashed transition-all duration-300 group"
      style={{ borderColor: preview ? "#0ea5e940" : "#cbd5e1" }}
      onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
      onDragOver={(e) => e.preventDefault()}
    >
      {status === "uploading" ? (
        <div className="h-48 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full animate-spin" style={{ border: "3px solid #0ea5e930", borderTopColor: "#0ea5e9" }} />
        </div>
      ) : preview ? (
        <div className="relative group/img">
          <img src={preview} alt="Карта этажей" className="w-full rounded-2xl max-h-64 object-contain" />
          {status === "done" && (
            <div className="absolute top-3 right-3 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Check" size={14} className="text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
            <button
              onClick={() => inputRef.current?.click()}
              className="bg-white text-slate-800 rounded-xl px-4 py-2 text-sm font-montserrat font-semibold flex items-center gap-2 hover:bg-slate-100"
            >
              <Icon name="RefreshCw" size={14} />
              Заменить
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full h-48 flex flex-col items-center justify-center gap-3 text-sky-500 hover:text-sky-600 transition-colors"
        >
          <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center">
            <Icon name="Layers" size={32} className="text-sky-400" />
          </div>
          <div className="text-center">
            <div className="font-montserrat font-semibold text-sm text-sky-600">Загрузить карту этажей</div>
            <div className="text-slate-400 text-xs mt-1">PNG, JPG · перетащите или нажмите</div>
          </div>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
    </div>
  );
}

export default function QRModal({ building, onClose, onUpdateQR }: QRModalProps) {
  if (!building) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.75)", backdropFilter: "blur(10px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden animate-scale-in flex flex-col">
        {/* Header */}
        <div className={`bg-gradient-to-r ${building.gradient} p-6 relative flex-shrink-0`}>
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
              <div className="text-white/75 text-sm mt-0.5 flex items-center gap-1.5">
                <Icon name="Upload" size={13} />
                Загрузка QR-кодов
              </div>
            </div>
          </div>
        </div>

        {/* Hint bar */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-3 flex items-center gap-2 flex-shrink-0">
          <Icon name="Info" size={14} className="text-slate-400 flex-shrink-0" />
          <span className="font-golos text-xs text-slate-500">
            Файлы сохраняются автоматически. Наведите на картинку, чтобы заменить или удалить.
          </span>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {building.qrCodes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="QrCode" size={18} style={{ color: building.color }} />
                <span className="font-montserrat font-bold text-slate-800">QR-коды</span>
                <span className="ml-auto text-xs font-golos text-slate-400">{building.qrCodes.length} позиций</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {building.qrCodes.map((qr) => (
                  <QRCard
                    key={qr.id}
                    qr={qr}
                    building={building}
                    onImageUpdate={(url) => onUpdateQR(building.id, qr.id, url)}
                  />
                ))}
              </div>
            </div>
          )}

          {building.id === "S" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Layers" size={18} className="text-sky-500" />
                <span className="font-montserrat font-bold text-slate-800">Карта этажей</span>
              </div>
              <FloorMapCard building={building} />
            </div>
          )}

          {building.qrCodes.length === 0 && building.id !== "S" && (
            <div className="text-center py-12">
              <div
                className="w-20 h-20 rounded-3xl mx-auto mb-5 flex items-center justify-center"
                style={{ background: `${building.color}15` }}
              >
                <Icon name="QrCode" size={36} style={{ color: building.color, opacity: 0.6 }} />
              </div>
              <div className="font-montserrat font-bold text-slate-700 text-lg mb-2">
                QR-коды не настроены
              </div>
              <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                Напишите, какие сервисы добавить — и я настрою.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
