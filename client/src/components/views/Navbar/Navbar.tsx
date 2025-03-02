import React from "react";
import style from "./Navbar.module.scss";
import { Col, Container, Row, Nav, Navbar } from "react-bootstrap";
import { BiCart } from "react-icons/bi";
import img from "../../../assets/main.jpg";
import { Link, useNavigate } from "react-router-dom";

const NavbarMain = () => {
  const navigate = useNavigate();
  return (
    <div className={style.main}>
      <input />
      <Row>
        <Col>
          <div className={style.imgDiv} onClick={() => navigate("/")}>
            <img src={img} alt="logo" />
          </div>
        </Col>
        <Col>
          {/* <div>
            <Nav.Link as={Link} to="/login">
              Logowanie
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Rejestracja
            </Nav.Link>
          </div> */}
          <Row>
            <Col>
              <div>{BiCart({})}</div>
            </Col>
            <Col>
              <div>0</div>
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
