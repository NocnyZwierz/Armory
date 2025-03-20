import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { fetchFinish } from "../../../redux/slice/finishesSlice";
import { removeProduct, updateItemsInCart } from "../../../redux/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import style from './Cart.module.scss'

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { finish } = useAppSelector((state: RootState) => state.finish);
  const cartItems = useAppSelector((state: RootState) => state.cart);
  
  const [localCartUpdates, setLocalCartUpdates] = useState<{
    [id: number]: { quantity: number; finish: string };
  }>({});

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  useEffect(() => {
    dispatch(fetchFinish());
  }, [dispatch]);


  useEffect(() => {
    const initialUpdates: {
      [id: number]: { quantity: number; finish: string };
    } = {};
    cartItems.forEach((item,index) => {
      initialUpdates[index] = { quantity: item.quantity, finish: item.finish };
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
    Object.keys(localCartUpdates).forEach((key:any, index) => {
      const index2 = parseInt(key, 10);
      const { quantity, finish } = localCartUpdates[index2];
      dispatch(updateItemsInCart({ id: index2, finish, quantity }));
    });
  };

  if (cartItems.length === 0) {
    return (
      <Container className={style.cartContainer}>
        <h1>Koszyk</h1>
        <div className={style.emptyCart}>
          <p>Twój koszyk jest pusty.</p>
        </div>
      </Container>
    );
  }

  return (
<Container className={style.cartContainer}>
  <h1>Koszyk</h1>
  {cartItems.map((item, index) => (
    <div key={index} className={style.cartItem}>
      <Row className="align-items-center w-100">
        <Col xs={3}>
          <img src={item.img} alt={item.title} />
        </Col>
        <Col xs={3} className={style.productDetails}>
          <h3>{item.title}</h3>
          <Form.Group controlId={`finishSelect-${item.id}`} className="mt-2">
            <Form.Label>Rodzaj wykończenia</Form.Label>
            <Form.Select
              value={localCartUpdates[index]?.finish || item.finish}
              onChange={(e) => handleFinishChange(index, e.target.value)}
            >
              {finish.map((finish) => (
                <option key={finish.id} value={finish.title}>
                  {finish.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={2} className={style.price}>
          <p>Cena: {item.price} PLN</p>
        </Col>
        <Col xs={2}>
          <Form.Control
            type="number"
            min="1"
            className={style.quantityInput}
            value={localCartUpdates[index]?.quantity || item.quantity}
            onChange={(e) =>
              handleQuantityChange(index, Number(e.target.value))
            }
          />
        </Col>
        <Col xs={2} className={style.price}>
          <p>
            Cena całkowita:{" "}
            {item.price * (localCartUpdates[index]?.quantity || item.quantity)}{" "}
            PLN
          </p>
        </Col>
        <Col xs={1}>
          <div
            className={style.removeButton}
            onClick={() => handleRemove(index)}
          >
            {FaRegTrashAlt({})}
          </div>
        </Col>
      </Row>
    </div>
  ))}
  <Button className={style.updateButton} onClick={handleUpdateCart}>
    Uaktualnij koszyk
  </Button>

  <div className={style.cartSummary}>
    <h3>Podsumowanie</h3>
    <p className={style.totalPrice}>Cena całkowita koszyka: {totalPrice} PLN</p>
    <Button
      className={style.checkoutButton}
      onClick={() => navigate("/order-form")}
    >
      Złóż zamówienie
      </Button>
  </div>
</Container>
  );
};

export default Cart;
