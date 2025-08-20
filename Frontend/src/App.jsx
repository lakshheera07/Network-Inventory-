import React, { useState } from "react";
import AppRoutes from "./routes/Routes";

const App = () => {
  const [devices, setDevices] = useState([]);
  return <AppRoutes devices={devices} setDevices={setDevices} />;
};

export default App;
