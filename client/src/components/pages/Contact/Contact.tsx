import React from "react";
import { Col, Row } from "react-bootstrap";

const Contact = () => {
  return (
    <div>
      <h1>Formularz kontaktowy</h1>
      <Row>
        <Col>
          <Row>
            <input />
            <input />
            <input />
            <input />
          </Row>
        </Col>
        <Col>
          <input />
        </Col>
      </Row>
      <div>
        <input type="checkbox" />
        <p>
          Aliquam viverra orci diam, ut convallis est luctus ac. Vestibulum ac
          lacinia diam. Proin vehicula maximus tellus, non scelerisque turpis
          elementum malesuada. Aliquam sodales sem ac magna congue fringilla.
          Class aptent taciti sociosqu ad litora torquent per conubia nostra,
          per inceptos himenaeos. Donec semper arcu non sodales vestibulum.
          Integer egestas convallis dolor, eu vestibulum risus imperdiet vitae.
          Donec tempor at nibh eu convallis.
        </p>
      </div>
      <button>Wyślij</button>
    </div>
  );
};

export default Contact;
