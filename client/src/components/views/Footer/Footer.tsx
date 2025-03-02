import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    // tło całego footera będzie ładna średniowieczna grafika
    <div>
      <Row>
      <Col>
        <h2>Zapisz się nie newsletter</h2>
        <input/>
        <button>Zapisz się</button>
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
      <h3>Media społecznosciowe</h3>
        <div>Facebook</div>
        <div>Insta</div>
        <div>snap</div>
      </Col>

      <Col>
      <h3>Informacje</h3>
        <p>Lorem info</p>
      </Col>

      </Row>
      <p>Prawa zastrzeżone albo jakis inny chuj</p>
    </div>
  );
}

export default Footer;
