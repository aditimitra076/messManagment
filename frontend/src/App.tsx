 /* import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
    
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;*/

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// 1. Import your Provider
import { ModalProvider } from "./contextAPI/ModalContext";

function App() {
  return (
    // 2. Wrap the app with the Provider
    <ModalProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>

        <Footer />
      </Router>
    </ModalProvider>
  );
}

export default App;