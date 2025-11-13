import { Routes, Route } from "react-router";
import HomePage from "../pages/HomePage";

/**
 * AppRouter - Main routing configuration for the application
 * Defines all application routes and protected route logic
 */
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
