import React from "react";
import { Crosshair, House, BriefcaseBusiness, Dumbbell } from "lucide-react";

const FrequentLocationBar = ({ onLocationClick }) => {
  const locations = [
    {
      id: "nearby",
      name: "Nearby",
      icon: Crosshair,
      backgroundColor: "oklch(77.7% 0.152 181.912)",
      hoverColor: "oklch(72% 0.152 181.912)",
    },
    {
      id: "home",
      name: "Home",
      icon: House,
      backgroundColor: "oklch(39.1% 0.09 240.876)",
      hoverColor: "oklch(34% 0.09 240.876)",
    },
    {
      id: "work",
      name: "Work",
      icon: BriefcaseBusiness,
      backgroundColor: "oklch(39.1% 0.09 240.876)",
      hoverColor: "oklch(34% 0.09 240.876)",
    },
    {
      id: "gym",
      name: "Gym",
      icon: Dumbbell,
      backgroundColor: "oklch(39.1% 0.09 240.876)",
      hoverColor: "oklch(34% 0.09 240.876)",
    },
  ];

  const handleLocationClick = (locationId) => {
    if (onLocationClick) {
      onLocationClick(locationId);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-3 justify-start ml-6">
        {locations.map((location) => {
          const IconComponent = location.icon;
          return (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-xl text-white text-sm font-medium"
              style={{
                backgroundColor: location.backgroundColor,
                border: location.id === "nearby" ? "1px solid oklch(39.1% 0.09 240.876)" : "none",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = location.hoverColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = location.backgroundColor)}
              aria-label={`Go to ${location.name}`}
            >
              <IconComponent
                className="w-4 h-4"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
                }}
              />
              <span>{location.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentLocationBar;
