import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/views/Navbar/Navbar";
import Home from "./components/pages/Home/Home";
import { Container } from "react-bootstrap";
import style from "./App.module.scss"
import Footer from "./components/views/Footer/Footer";
import About from "./components/pages/About/About";
import Shop from "./components/pages/Shop/Shop";
import Gallery from "./components/pages/Galllery/Gallery";
import Terms from "./components/pages/Terms/Terms";
import Contact from "./components/pages/Contact/Contact";
import Measurements from "./components/pages/Measurements/Measurements";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";

function App() {
  return (
    <main>
      <Container className={style.mainDiv}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/measurements" element={<Measurements/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        </Routes>
        <Footer/>
      </Container>
    </main>
  );
}

export default App;
