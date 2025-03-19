import React, { useState } from "react";
import styles from "./OrderForm.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { clearCart } from "../../../redux/slice/cartSlice";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const OrderForm = () => {
  const dispatch = useAppDispatch();
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

  const validateForm = () => {
    const { firstName, lastName, address, email } = formData;
    if (!firstName.trim()) {
      toast.error("Imię jest wymagane", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Nazwisko jest wymagane", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    if (!address.trim()) {
      toast.error("Adres dostawy jest wymagany", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    if (!email.trim()) {
      toast.error("Email jest wymagany", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Podaj prawidłowy adres email", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const orderData = {
      customerName: formData.firstName,
      customerSurname: formData.lastName,
      customerEmail: formData.email,
      deliveryAddress: formData.address,
      items: cartItems,
      totalAmount: totalPrice,
    };
    try {
      const response = await fetch("api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        toast.error("Błąd przy wysyłaniu zamówienia", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }

      toast.success("Zamówienie przekazane do realizacji", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          dispatch(clearCart());
        },
      });
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania zamówienia", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
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
          />
        </label>
        <label>
          Nazwisko:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Adres dostawy:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Zamów
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default OrderForm;
