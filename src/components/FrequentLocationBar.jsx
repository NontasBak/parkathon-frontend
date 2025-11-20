import React, { useState, useEffect } from "react";
import {
  Crosshair,
  Home,
  Briefcase,
  GraduationCap,
  TreePine,
  Dumbbell,
  ShoppingCart,
  MapPin,
} from "lucide-react";
import { getFrequentLocations } from "../api/frequentLocations";

const ICON_MAP = {
  Home: Home,
  Work: Briefcase,
  University: GraduationCap,
  DogPark: TreePine,
  Gym: Dumbbell,
  Supermarket: ShoppingCart,
};

const FrequentLocationBar = ({ onLocationClick }) => {
  const [frequentLocations, setFrequentLocations] = useState([]);
  const userId = "a1b2c3d4-e5f6-7890-1234-567890abcdef";

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getFrequentLocations(userId);
        setFrequentLocations(locationsData || []);
      } catch (err) {
        console.error("Failed to fetch frequent locations:", err);
      }
    };

    fetchLocations();
  }, []);

  const nearbyLocation = {
    id: "nearby",
    name: "Nearby",
    icon: Crosshair,
    backgroundColor: "oklch(77.7% 0.152 181.912)",
    hoverColor: "oklch(72% 0.152 181.912)",
  };

  const handleLocationClick = (location) => {
    if (onLocationClick) {
      onLocationClick(location);
    }
  };

  const getIconComponent = (iconName) => {
    return ICON_MAP[iconName] || MapPin;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex gap-3 justify-start ml-6 overflow-x-auto pb-2">
        {/* Nearby Button */}
        <button
          onClick={() => handleLocationClick(nearbyLocation)}
          className="flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-xl text-white text-sm font-medium flex-shrink-0"
          style={{
            backgroundColor: nearbyLocation.backgroundColor,
            border: "1px solid oklch(39.1% 0.09 240.876)",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = nearbyLocation.hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = nearbyLocation.backgroundColor)}
          aria-label={`Go to ${nearbyLocation.name}`}
        >
          <Crosshair
            className="w-4 h-4"
            style={{
              filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
            }}
          />
          <span>{nearbyLocation.name}</span>
        </button>

        {/* Frequent Locations */}
        {frequentLocations.map((location) => {
          const IconComponent = getIconComponent(location.icon);
          const backgroundColor = "oklch(39.1% 0.09 240.876)";
          const hoverColor = "oklch(34% 0.09 240.876)";

          return (
            <button
              key={location._id || location.location_id}
              onClick={() => handleLocationClick(location)}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg hover:shadow-xl text-white text-sm font-medium flex-shrink-0"
              style={{
                backgroundColor: backgroundColor,
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = backgroundColor)}
              aria-label={`Go to ${location.label}`}
            >
              <IconComponent
                className="w-4 h-4"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
                }}
              />
              <span>{location.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentLocationBar;
