import React, { useState, useRef, useEffect } from "react";
import { Settings, X } from "lucide-react";

const EditRadius = ({ currentRadius, onRadiusChange, minRadius = 10, maxRadius = 1000 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [sliderValue, setSliderValue] = useState(currentRadius);
    const containerRef = useRef(null);

    useEffect(() => {
        setSliderValue(currentRadius);
    }, [currentRadius]);

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleSliderChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        setSliderValue(newValue);
        onRadiusChange(newValue);
    };

    const formatRadius = (radius) => {
        if (radius >= 1000) {
            return `${(radius / 1000).toFixed(1)}km`;
        }
        return `${radius}m`;
    };

    const backgroundColor = "oklch(39.1% 0.09 240.876)";
    const hoverColor = "oklch(34% 0.09 240.876)";

    return (
        <div ref={containerRef} className="relative">
            {/* Settings Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-14 h-14 rounded-full transition-all shadow-lg hover:shadow-xl"
                style={{
                    backgroundColor: isOpen ? hoverColor : backgroundColor,
                }}
                onMouseEnter={(e) => {
                    if (!isOpen) e.currentTarget.style.backgroundColor = hoverColor;
                }}
                onMouseLeave={(e) => {
                    if (!isOpen) e.currentTarget.style.backgroundColor = backgroundColor;
                }}
                aria-label="Edit search radius"
            >
                <Settings
                    className="w-7 h-7 text-white"
                    style={{
                        filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
                    }}
                />
            </button>

            {/* Radius Control Popup */}
            {isOpen && (
                <div
                    className="absolute right-0 bottom-full mb-2 p-4 rounded-lg shadow-xl"
                    style={{
                        backgroundColor: "white",
                        minWidth: "240px",
                        zIndex: 2000,
                    }}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-sm font-semibold" style={{ color: backgroundColor }}>
                            Set radius
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4" style={{ color: backgroundColor }} />
                        </button>
                    </div>

                    {/* Slider */}
                    <div className="mb-3">
                        <input
                            type="range"
                            min={minRadius}
                            max={maxRadius}
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${backgroundColor} 0%, ${backgroundColor} ${((sliderValue - minRadius) / (maxRadius - minRadius)) * 100
                                    }%, #e5e7eb ${((sliderValue - minRadius) / (maxRadius - minRadius)) * 100}%, #e5e7eb 100%)`,
                            }}
                        />
                    </div>

                    {/* Range Labels */}
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span>{formatRadius(minRadius)}</span>
                        <span className="font-semibold" style={{ color: backgroundColor }}>
                            {formatRadius(sliderValue)}
                        </span>
                        <span>{formatRadius(maxRadius)}</span>
                    </div>
                </div>
            )}

            <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${backgroundColor};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${backgroundColor};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    );
};

export default EditRadius;
