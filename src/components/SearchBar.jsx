import React, { useState, useEffect, useRef } from "react";
import { Search, Mic, UserRound } from "lucide-react";
import { setDestination } from "../api/destination";
import { getAddressSuggestions } from "../api/suggestions";

const SearchBar = ({ onSearch, onMicrophoneClick, onProfileClick, onError }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchBarRef = useRef(null);

  // Fetch suggestions when user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchText.trim().length >= 2) {
        const results = await getAddressSuggestions(searchText);
        setSuggestions(results);
        setShowSuggestions(true);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Debounce to avoid too many API calls
    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!searchText.trim()) {
      if (onError) {
        onError("Please enter a destination");
      }
      return;
    }

    setIsLoading(true);

    try {
      // Make PUT request to set destination with mock coordinates
      const response = await setDestination(searchText);

      console.log("Destination set successfully:", response);
      console.log("Destination object:", response.destination);

      // Call the onSearch callback if provided
      // Response structure: { destination: { address, coordinates } }
      if (onSearch) {
        onSearch(searchText, response.destination);
      }

      // Clear the search text after successful submission (optional)
      // setSearchText("");
    } catch (err) {
      console.error("Failed to set destination:", err);
      if (onError) {
        onError("Invalid destination");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchText(suggestion.displayName);
    setShowSuggestions(false);
    setSuggestions([]);
    console.log(`Selected suggestion: ${suggestion.displayName}, ${suggestion.latitude} ${suggestion.longitude}`);

    // Automatically submit the selected suggestion with coordinates
    setIsLoading(true);
    try {
      // Pass coordinates in the required format to setDestination
      const coordinates = {
        latitude: suggestion.latitude,
        longitude: suggestion.longitude
      };
      
      const response = await setDestination(suggestion.displayName, coordinates);
      console.log("Destination set successfully:", response);
      
      if (onSearch) {
        onSearch(suggestion.displayName, response.destination);
      }
    } catch (err) {
      console.error("Failed to set destination:", err);
      if (onError) {
        onError("Invalid destination");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4" ref={searchBarRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-xl border border-gray-200 pl-4 pr-2 py-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Search"
          >
            <Search className={`w-5 h-5 ${isLoading ? "animate-pulse" : ""}`} />
          </button>

          <input
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter destination (e.g., Egnatia 125)"
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-gray-700 bg-transparent border-none outline-none placeholder-gray-400 disabled:opacity-50"
          />

          <div className="flex items-center space-x-2 ml-4">
            <button
              type="button"
              onClick={onMicrophoneClick}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              style={{
                backgroundColor: "oklch(77.7% 0.152 181.912)",
                "--hover-bg": "oklch(72% 0.152 181.912)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "oklch(72% 0.152 181.912)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "oklch(77.7% 0.152 181.912)")}
              aria-label="Voice search"
            >
              <Mic className="w-5 h-5 text-white" />
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              style={{
                backgroundColor: "oklch(95.3% 0.051 180.801)",
                "--hover-bg": "oklch(90% 0.051 180.801)",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "oklch(90% 0.051 180.801)")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "oklch(95.3% 0.051 180.801)")}
              aria-label="User profile"
            >
              <UserRound className="w-6 h-6" style={{ color: "oklch(77.7% 0.152 181.912)" }} />
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-4 py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0 ${
                  index === selectedIndex
                    ? "bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start">
                  <Search className="w-4 h-4 text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {suggestion.displayName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
