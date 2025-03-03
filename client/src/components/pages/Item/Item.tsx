import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import style from "./Item.module.scss";

function Item() {
  const { id } = useParams();
  const items = useSelector((state: RootState) => state.item);
  const item = items.find((el) => el.id === Number(id));

  if (!item) {
    return <div>Nie znaleziono produktu</div>;
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className={`${style.productCard} my-3`}>
            <Row className="g-0">
              {/* Kolumna z obrazkiem */}
              <Col md={6}>
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className={style.productImage}
                />
              </Col>

              {/* Kolumna z tytułem, opisem i przyciskiem */}
              <Col md={6}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className={style.description}>
                    {item.description}
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className={style.price}>Cena: {item.price}</span>
                    <Button variant="primary">Dodaj do koszyka</Button>
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
