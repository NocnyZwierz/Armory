import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { fetchFinish } from "../../../redux/slice/finishesSlice";
import { removeProduct, updateItemsInCart } from "../../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { finish } = useAppSelector((state: RootState) => state.finish);
  const cartItems = useAppSelector((state: RootState) => state.cart);
  console.log(cartItems)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  
  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };
  console.log(cartItems)
  useEffect(() => {
    dispatch(fetchFinish());
  }, [dispatch]);

  const [localCartUpdates, setLocalCartUpdates] = useState<{
    [id: number]: { quantity: number; finish: string };
  }>({});

  useEffect(() => {
    const initialUpdates: {
      [id: number]: { quantity: number; finish: string };
    } = {};
    cartItems.forEach((item) => {
      initialUpdates[item.id] = { quantity: item.quantity, finish: item.finish };
    });
    setLocalCartUpdates(initialUpdates);
  }, [cartItems]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setLocalCartUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity: newQuantity },
    }));
  };

  const handleFinishChange = (id: number, newFinish: string) => {
    setLocalCartUpdates((prev) => ({
      ...prev,
      [id]: { ...prev[id], finish: newFinish },
    }));
  };

  const handleUpdateCart = () => {
    Object.keys(localCartUpdates).forEach((key) => {
      const id = parseInt(key, 10);
      const { quantity, finish } = localCartUpdates[id];
      dispatch(updateItemsInCart({ id, finish, quantity }));
    });
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-4">
        <h1>Koszyk</h1>
        <p>Twój koszyk jest pusty.</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1>Koszyk</h1>
      {cartItems.map((item) => (
        <div>
          <Row className="align-items-center mb-3">
            <Col>
              <div>
                <img src={item.img} alt={item.title} style={{ width: "100px" }} />
              </div>
            </Col>
            <Col>
              <h3>{item.title}</h3>
              <Form.Group controlId={`finishSelect-${item.id}`} className="mt-3">
                <Form.Label>Rodzaj wykończenia</Form.Label>
                <Form.Select
                  value={localCartUpdates[item.id]?.finish || item.finish}
                  onChange={(e) => handleFinishChange(item.id, e.target.value)}
                >
                  {finish.map((finish) => (
                    <option key={finish.id} value={finish.title}>
                      {finish.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <p>Cena: {item.price} PLN</p>
            </Col>
            <Col>
              <Form.Control
                type="number"
                min="1"
                value={localCartUpdates[item.id]?.quantity || item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, Number(e.target.value))
                }
              />
            </Col>
            <Col>
              <p>
                Cena całkowita:{" "}
                {item.price *
                  (localCartUpdates[item.id]?.quantity || item.quantity)}{" "}
                PLN
              </p>
            </Col>
            <Col>
              <div onClick={() => handleRemove(item.id)}>
                {FaRegTrashAlt({})}
              </div>
            </Col>
          </Row>
        </div>
      ))}
      <Button variant="primary" onClick={handleUpdateCart}>
        Uaktualnij koszyk
      </Button>
      <h3>Podsumowanie</h3>
      <p>Cena całkowita koszyka: {totalPrice} PLN</p>
      <button onClick={() => navigate('/order-form')}>Złóż zamówienie</button>
    </Container>
  );
};

export default Cart;
