import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import MainPage from "./MainPage";
import BeerInfo from "./BeerInfo";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/beer/:id" element={<BeerInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
