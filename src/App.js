import AppRouter from "./router";
import { ParkingProvider } from "./context/ParkingContext";

function App() {
  return (
    <ParkingProvider>
      <main className="h-screen">
        <AppRouter />
      </main>
    </ParkingProvider>
  );
}

export default App;
