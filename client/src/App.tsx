import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from "react-router-dom";
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
import Item from "./components/pages/Item/Item";
import ArmorFinish from "./components/pages/ArmorFinish/ArmorFinish";
import Cart from "./components/pages/Cart/Cart";
import OrderForm from "./components/pages/OrderForm/OrderForm";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import NotFound from "./components/pages/NotFound/NotFound";
import Search from "./components/pages/Search/Search";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";

function App() {

  const CartStatus = useSelector((state: RootState) => state.cart);
  return (
    <main>
      <Container className={style.mainDiv}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/item/:id" element={<Item />} />
          <Route path="/gallery" element={<Gallery/>} />
          <Route path="/terms" element={<Terms/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/measurements" element={<Measurements/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/armor-finish" element={<ArmorFinish/>} />
          <Route path="/cart" element={<Cart/>} />
          { CartStatus && CartStatus.length > 0
          ?  <Route path="/order-form" element={<OrderForm/>} />
          : <Route path="/order-form" element={<Navigate to="/shop"/>} />
          }
          <Route path="*" element={<NotFound />} />
          <Route path="/search/:searchPhrase" element={<Search/>} />
          <Route path="/admin-panel" element={<AdminPanel/>} />
        </Routes>
        <Footer/>
      </Container>
    </main>
  );
}

export default App;
