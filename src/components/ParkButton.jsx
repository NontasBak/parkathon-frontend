import { CircleParking, ChevronUp } from "lucide-react";

export default function ParkButton() {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-[1000] max-w-md w-full">
      <div className="bg-white rounded-t-2xl shadow-lg py-4 relative flex justify-center w-full">
        {/* Semi-circle drag handle at top center */}
        <button className="absolute -top-3 left-1/2 transform -translate-x-1/2" onClick={() => {}}>
          <div className="bg-white rounded-t-xl w-10 h-6 flex items-center justify-center">
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
        </button>

        <button
          className="bg-[#1B4965] hover:bg-[#234a61] text-white font-semibold py-1 px-24 rounded-lg flex items-center justify-center gap-2 transition-colors"
          onClick={() => {}}
        >
          <CircleParking />
          <span className="text-lg">Park</span>
        </button>
      </div>
    </div>
  );
}
