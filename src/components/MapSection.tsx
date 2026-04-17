import { useEffect, useRef, useState } from "react";
import { Building } from "@/data/buildings";
import BuildingPopup from "./BuildingPopup";
import Icon from "@/components/ui/icon";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

interface MapSectionProps {
  buildings: Building[];
  onQRClick: (building: Building) => void;
}

export default function MapSection({ buildings, onQRClick }: MapSectionProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").Marker[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    const waitForLeaflet = () => {
      if (!window.L) {
        setTimeout(waitForLeaflet, 100);
        return;
      }

      const L = window.L;

      const map = L.map(mapRef.current!, {
        center: [53.343, 83.779],
        zoom: 14,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // High-quality tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      leafletMap.current = map;

      buildings.forEach((building) => {
        const el = document.createElement("div");
        el.style.cssText = `
          width: 44px; height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, ${building.color}, ${building.color}cc);
          border: 3px solid white;
          box-shadow: 0 4px 20px ${building.color}60, 0 0 0 6px ${building.color}25;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 14px;
          color: white;
          position: relative;
          z-index: 1000;
        `;
        el.innerHTML = building.letter;
        el.addEventListener("mouseenter", () => {
          el.style.transform = "scale(1.2)";
          el.style.boxShadow = `0 8px 30px ${building.color}80, 0 0 0 8px ${building.color}30`;
        });
        el.addEventListener("mouseleave", () => {
          el.style.transform = "scale(1)";
          el.style.boxShadow = `0 4px 20px ${building.color}60, 0 0 0 6px ${building.color}25`;
        });

        const icon = L.divIcon({
          html: el,
          className: "",
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });

        const marker = L.marker([building.lat, building.lng], { icon }).addTo(map);

        marker.on("click", (e) => {
          const containerPoint = map.latLngToContainerPoint(e.latlng);
          const mapContainer = mapRef.current!;
          const rect = mapContainer.getBoundingClientRect();
          setPopupPos({
            x: rect.left + containerPoint.x,
            y: rect.top + containerPoint.y,
          });
          setSelectedBuilding(building);
        });

        markersRef.current.push(marker);
      });

      map.on("click", () => setSelectedBuilding(null));
    };

    waitForLeaflet();

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-20 bg-agu-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-agu-blue/10 to-agu-violet/10 border border-agu-blue/20 rounded-full px-5 py-2 mb-5">
            <Icon name="Map" size={14} className="text-agu-blue" />
            <span className="font-golos text-sm font-semibold text-agu-blue">Интерактивная карта</span>
          </div>
          <h2 className="font-montserrat font-black text-4xl sm:text-5xl text-agu-dark mb-4">
            Корпусы на{" "}
            <span className="gradient-text">карте Барнаула</span>
          </h2>
          <p className="font-golos text-slate-500 text-lg max-w-xl mx-auto">
            Нажмите на маркер корпуса, чтобы узнать подробности, институты и QR-коды
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {buildings.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                if (!leafletMap.current) return;
                leafletMap.current.flyTo([b.lat, b.lng], 17, { duration: 1 });
                setSelectedBuilding(b);
              }}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: b.color }} />
              <span className="font-golos text-xs font-semibold text-slate-700">{b.letter === "П" ? "Поликлиника" : `Корпус ${b.letter}`}</span>
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/15 border border-white">
          <div ref={mapRef} style={{ height: "560px", width: "100%" }} />

          {/* Custom popup overlay */}
          {selectedBuilding && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div
                className="pointer-events-auto absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -60%)",
                  zIndex: 9999,
                  filter: "drop-shadow(0 20px 40px rgba(26,63,168,0.25))",
                }}
              >
                <div className="bg-white rounded-3xl overflow-hidden" style={{ width: 300 }}>
                  <BuildingPopup
                    building={selectedBuilding}
                    onClose={() => setSelectedBuilding(null)}
                    onQRClick={(b) => { setSelectedBuilding(null); onQRClick(b); }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Map overlay label */}
          <div className="absolute top-4 left-4 glass rounded-2xl px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={14} className="text-agu-blue" />
              <span className="font-montserrat font-bold text-xs text-agu-dark">г. Барнаул, АГУ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}