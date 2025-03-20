import React, { useState } from "react";
import style from "./Navbar.module.scss";
import {
  Col,
  Row,
  Nav,
  Navbar,
  Container,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import img from "/main.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const NavbarMain = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [searchPhrase, setSearchPhrase] = useState("");

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchPhrase.trim()) {
      navigate(`/search/${searchPhrase}`);
    }
  };

  return (
    <div className={style.main}>
      <Container className={style.headerContainer}>
        <Form className={style.searchForm} onSubmit={handleSearch}>
          <Row>
          <Col>
          <FormControl
            type="search"
            placeholder="Szukaj..."
            className={style.searchInput}
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
          </Col>
          <Col>
          <Button
            variant="outline-success"
            type="submit"
            className={style.searchButton}
          >
            Szukaj
          </Button>
          </Col>
          </Row>
        </Form>
      </Container>
      <Row>
        <Col>
          <div className={style.imgDiv} onClick={() => navigate("/")}>
            <img src="/main.jpg" alt="logo" />
          </div>
        </Col>
        <Col>
          <Row>
            <Col className="d-flex justify-content-end">
              <div
                className={style.cartContainer}
                onClick={() => navigate("/cart")}
              >
                <div className={style.cartIconWrapper}>
                  {BiCart({ className: style.cartIcon })}
                </div>
                {totalQuantity > 0 && (
                  <div className={style.cartCount}>{totalQuantity}</div>
                )}
              </div>
            </Col>
            <Navbar collapseOnSelect expand="lg" className="justify-content-between">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className={`ml-auto ${style.customToggler}`} />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link as={Link} to="/about" className={style.customNavLink}>
                    O mnie
                  </Nav.Link>
                  <Nav.Link as={Link} to="/shop" className={style.customNavLink}>
                    Sklep
                  </Nav.Link>
                  <Nav.Link as={Link} to="/gallery" className={style.customNavLink}>
                    Galeria
                  </Nav.Link>
                  <Nav.Link as={Link} to="/terms" className={style.customNavLink}>
                    Regulamin
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contact" className={style.customNavLink}>
                    Kontakt
                  </Nav.Link>
                  <Nav.Link as={Link} to="/measurements" className={style.customNavLink}>
                    Pomiary
                  </Nav.Link>
                  <Nav.Link as={Link} to="/armor-finish" className={style.customNavLink}>
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
