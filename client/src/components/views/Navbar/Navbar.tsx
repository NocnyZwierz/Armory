import React, { useState } from "react";
import style from "./Navbar.module.scss";
import { Col, Row, Nav, Navbar, Container, FormControl, Button, Form } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import img from "../../../assets/main.jpg";
import {  Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const NavbarMain = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (searchPhrase.trim()) {
      navigate(`/search/${searchPhrase}`);
    }
  };


  return (
    <div className={style.main}>
            <Container className={style.headerContainer}>
        <Form className={style.searchForm} onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Szukaj..."
            className={style.searchInput}
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          <Button
            variant="outline-success"
            type="submit"
            className={style.searchButton}
          >
            Szukaj
          </Button>
        </Form>
      </Container>
      <Row>
        <Col>
          <div className={style.imgDiv} onClick={() => navigate("/")}>
            <img src={img} alt="logo" />
          </div>
        </Col>
        <Col>
          <Row>
            <Col>
              <div onClick={() => navigate("/cart")}>{BiCart({})}</div>
            </Col>
            <Col>
              <div>{totalQuantity}</div>
            </Col>
            <Navbar collapseOnSelect expand="lg">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/about">
                    O mnie
                  </Nav.Link>
                  <Nav.Link as={Link} to="/shop">
                    Sklep
                  </Nav.Link>
                  <Nav.Link as={Link} to="/gallery">
                    Galeria
                  </Nav.Link>
                  <Nav.Link as={Link} to="/terms">
                    Regulamin
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact">
                    Kontakt
                  </Nav.Link>
                  <Nav.Link as={Link} to="/measurements">
                    Pomiary
                  </Nav.Link>
                  <Nav.Link as={Link} to="/armor-finish">
                    Wykończenia pokwierzchni
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NavbarMain;
