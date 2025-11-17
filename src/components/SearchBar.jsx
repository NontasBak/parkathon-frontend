import React, { useState } from "react";
import { Search, Mic, UserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { setDestination } from "../api/destination";

const SearchBar = ({ onSearch, onMicrophoneClick, onProfileClick, onError }) => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
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
              onClick={handleProfileClick}
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
      </form>
    </div>
  );
};

export default SearchBar;
