import React from "react";
import { Col, Row } from "react-bootstrap";
import style from "./Contact.module.scss";

const Contact = () => {
  return (
    <div className={style.contactContainer}>
      <h1>Formularz kontaktowy</h1>
      <Row className={style.formRow}>
        <Col className={style.firstColumn}>
          <input type="text" placeholder="Imię" />
          <input type="email" placeholder="E-mail" />
          <input type="tel" placeholder="Telefon" />
          <input type="text" placeholder="Temat" />
        </Col>
        <Col>
          <input type="text" placeholder="Treść wiadomości" className={style.MassageInput} />
        </Col>
      </Row>
      <div className={style.checkboxContainer}>
        <input type="checkbox" />
        <p>
          Wyrażam zgodę na przetwarzanie moich danych osobowych zgodnie z
          polityką prywatności. Aliquam viverra orci diam, ut convallis est
          luctus ac. Vestibulum ac lacinia diam. Proin vehicula maximus tellus,
          non scelerisque turpis elementum malesuada.
        </p>
      </div>
      <button className={style.submitButton}>Wyślij</button>
    </div>
  );
};

export default Contact;
