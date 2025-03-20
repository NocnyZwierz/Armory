import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Footer.module.scss";

function Footer() {
  return (
    <div className={style.footer}>
      <Row>
        <Col>
          <h2>Zapisz się na newsletter</h2>
          <div className={style.newsletter}>
            <input placeholder="Twój e-mail" />
            <button>Zapisz się</button>
          </div>
        </Col>

        <Col>
          <h3>Serwis Klienta</h3>
          <ul>
            <li><Link to="/measurements">Pomiary</Link></li>
            <li><Link to="/contact">Kontakt</Link></li>
            <li><Link to="/terms">Regulamin</Link></li>
            <li><Link to="/privacy-policy">Polityka Prywatności</Link></li>
          </ul>
        </Col>

        <Col>
          <h3>Media społecznościowe</h3>
          <div className={style.socialMedia}>
            <div>Facebook</div>
            <div>Instagram</div>
            <div>Snapchat</div>
          </div>
        </Col>

        <Col>
          <h3>Informacje</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Col>
      </Row>

      <p className={style.footerBottom}>© 2024 Prawa zastrzeżone.</p>
    </div>
  );
}

export default Footer;
