import React, { useEffect, useState } from "react";

/**
 * Toast notification component
 * Shows a message at the bottom of the screen and auto-dismisses
 *
 * @param {string} message - The message to display
 * @param {boolean} isVisible - Controls visibility of the toast
 * @param {function} onClose - Callback when toast is dismissed
 * @param {number} duration - Auto-dismiss duration in milliseconds (default: 3000)
 * @param {string} type - Toast type: 'error', 'success', 'info' (default: 'error')
 */
const Toast = ({ message, isVisible, onClose, duration = 3000 }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isVisible && duration > 0) {
      // Start fade out animation 300ms before hiding
      const fadeOutTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, duration - 300);

      // Hide completely after fade out
      const hideTimer = setTimeout(() => {
        setIsFadingOut(false);
        if (onClose) {
          onClose();
        }
      }, duration);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setIsFadingOut(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 z-[900] ${
        isFadingOut ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      style={{ bottom: "120px" }}
    >
      <div className="bg-white px-6 py-4 rounded-full border-2 border-[#1B4965]">
        <p className="text-sm font-medium text-center whitespace-nowrap text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
