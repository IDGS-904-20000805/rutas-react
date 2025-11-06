import React, { useState } from "react";
import AppRouter from "./routes/AppRouter";
import { UserContext } from "./context/UserContext.jsx";
const App = () => {
  const [user, setUser] = useState(null);

  return (
    // El Provider envuelve el router
    <UserContext.Provider value={{ user, setUser }}>
      <AppRouter />
    </UserContext.Provider>
  );
};

export default App;
