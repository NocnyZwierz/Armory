import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import style from "./Item.module.scss";
import { getFinishe } from "../../../redux/slice/finishesSlice";
import { addToCart } from "../../../redux/slice/cartSlice";

function Item() {
  const { id } = useParams();
  const items = useSelector((state: RootState) => state.item);
  const item = items.find((el) => el.id === Number(id));
  const [selectedFinish, setSelectedFinish] = useState<string>("Mirror Polish");
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const finishes = useSelector((state: RootState) => state.finishe);

  useEffect(() => {
    dispatch(getFinishe());
  }, [dispatch]);

  if (!item) {
    return <div>Nie znaleziono produktu</div>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...item,
        quantity,
        finish: selectedFinish,
      })
    );
  };

  return (
    <Container className="py-4">
      <Button onClick={() => navigate(-1)}>Wróć</Button>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className={`${style.productCard} my-3`}>
            <Row className="g-0">
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className={style.productImage}
                />
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className={style.description}>
                    {item.description}
                  </Card.Text>
                  <Form.Group controlId="finishSelect" className="mt-3">
                    <Form.Label>Rodzaj wykończenia</Form.Label>
                    <Form.Select
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                    >
                      {finishes.map((finish) => (
                        <option key={finish.id} value={finish.title}>
                          {finish.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="quantitySelect" className="mt-3">
                    <Form.Label>Ilość</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Number(e.target.value))
                      }
                    />
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className={style.price}>Cena: {item.price}</span>
                    <Button variant="primary" onClick={handleAddToCart}>
                      Dodaj do koszyka
                    </Button>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Item;
