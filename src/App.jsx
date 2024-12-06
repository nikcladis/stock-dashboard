import { useState } from "react";
import Dashboard from "@components/Dashboard";
import ThemeContext from "@contexts/ThemeContext";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

export default App;
