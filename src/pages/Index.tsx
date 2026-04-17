import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MapSection from "@/components/MapSection";
import BuildingsSection from "@/components/BuildingsSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import QRModal from "@/components/QRModal";
import { buildings as initialBuildings, Building } from "@/data/buildings";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [buildings, setBuildings] = useState(initialBuildings);
  const [qrModalBuilding, setQrModalBuilding] = useState<Building | null>(null);

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleQRClick = (building: Building) => {
    setQrModalBuilding(building);
  };

  const handleUpdateQR = (buildingId: string, qrId: string, image: string) => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === buildingId
          ? {
              ...b,
              qrCodes: b.qrCodes.map((qr) =>
                qr.id === qrId ? { ...qr, image } : qr
              ),
            }
          : b
      )
    );
  };

  const handleAddQR = (buildingId: string, name: string, url: string) => {
    setBuildings((prev) =>
      prev.map((b) =>
        b.id === buildingId
          ? {
              ...b,
              qrCodes: [
                ...b.qrCodes,
                { id: `qr-${Date.now()}`, name, url },
              ],
            }
          : b
      )
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <Hero
        onMapClick={() => {
          setActiveSection("map");
          document.getElementById("map")?.scrollIntoView({ behavior: "smooth" });
        }}
        onBuildingsClick={() => {
          setActiveSection("buildings");
          document.getElementById("buildings")?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <MapSection buildings={buildings} onQRClick={handleQRClick} />

      <BuildingsSection buildings={buildings} onQRClick={handleQRClick} />

      <AboutSection />

      <Footer />

      <QRModal
        building={qrModalBuilding}
        onClose={() => setQrModalBuilding(null)}
        onUpdateQR={handleUpdateQR}
        onAddQR={handleAddQR}
      />
    </div>
  );
}
