import React, { useState } from "react";
import styles from "./OrderForm.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const OrderForm = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dane zamówienia:", formData);
  };

  return (
    <div className={styles.orderFormContainer}>
      <h2 className={styles.title}>Formularz Zamówienia</h2>
      <Container className="py-4">
        <h1>Koszyk</h1>
        {cartItems.map((item) => (
          <div key={item.id}>
            <Row className="align-items-center mb-3">
              <Col>
                <div>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100px" }}
                  />
                </div>
              </Col>
              <Col>
                <h3>{item.title}</h3>
                <Form.Group
                  controlId={`finishSelect-${item.id}`}
                  className="mt-3"
                >
                  <Form.Label>Rodzaj wykończenia</Form.Label>
                </Form.Group>
              </Col>
              <Col>
                <p>Ilość: {item.quantity}</p>
              </Col>
              <Col>
                <p>Cena: {item.price} PLN</p>
              </Col>

            </Row>
          </div>
        ))}
        <h3>Podsumowanie</h3>
        <p>Cena całkowita koszyka: {totalPrice} PLN</p>
      </Container>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Imię:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Adres dostawy:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Zamów
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
