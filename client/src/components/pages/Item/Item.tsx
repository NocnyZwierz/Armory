import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Carousel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import style from "./Item.module.scss";
import { fetchFinish } from "../../../redux/slice/finishesSlice";
import { addToCart } from "../../../redux/slice/cartSlice";
import { fetchItems } from "../../../redux/slice/itemList";
import { Bounce, ToastContainer, toast } from "react-toastify";


function Item() {
  const { id } = useParams();
  const { items } = useAppSelector((state: RootState) => state.item);
  const item = items.find((el: any) => el.id === id);
  const { finish } = useAppSelector((state: RootState) => state.finish);
  const [selectedFinish, setSelectedFinish] = useState<string>("Mirror Polish");
  const [quantity, setQuantity] = useState<number>(1);
  const [photos, setPhotos] = useState<any>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
    dispatch(fetchFinish());
  }, [dispatch, items.length]);

  useEffect(() => {
    const fetchData = async (item: any) => {
      try {
        const response = await fetch(
          `/api/photos/${item.id}`,
          {
            method: "GET",
          }
        );
        const photosJson = await response.json();
        setPhotos([...photosJson]);
      } catch (error) {
        console.error("Wystąpił błąd podczas wysyłania zamówienia:", error);
      }
    };
    if (item) {
      fetchData(item);
    }
  }, [item]);

  if (!item) {
    return <div>Nie znaleziono produktu</div>;
  }

  const validateData = () => {
    let isValid = true;
    if (!selectedFinish || selectedFinish.trim() === "") {
      toast.error("Wybierz rodzaj wykończenia", {
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
      isValid = false;
    }
    if (!quantity || quantity < 1) {
      toast.error("Ilość musi być większa lub równa 1", {
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
      isValid = false;
    }

    if (quantity > 1000) {
      toast.error("Ilość nie może być większa niż 1000", {
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
      isValid = false;
    }

    return isValid;
  };

  const handleAddToCart = () => {
    if (!validateData()) {
      return;
    }
    dispatch(
      addToCart({
        ...item,
        quantity,
        finish: selectedFinish,
      })
    );
    toast.success("Dodano do koszyka", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <Container className={style.productContainer}>
      <Button onClick={() => navigate(-1)} className={style.backButton}>
        Wróć
      </Button>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className={`${style.productCard} my-3`}>
            <Row className="g-0">
              <Col md={6}>
                {photos.length > 0 ? (
                  <Carousel>
                    {photos.map((photo: any, index: number) => (
                      <Carousel.Item key={index}>
                        <img
                          className={`d-block w-100 ${style.productImage}`}
                          src={`/${photo.path}`}
                          alt={photo.title}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : (
                  <Card.Img
                    variant="top"
                    src={"/" + item.img}
                    alt={item.title}
                    className={style.productImage}
                  />
                )}
              </Col>
              <Col md={6}>
                <Card.Body>
                  <Card.Title className={style.title}>{item.title}</Card.Title>
                  <Card.Text className={style.description}>
                    {item.description}
                  </Card.Text>
                  <Form.Group
                    controlId="finishSelect"
                    className={`mt-3 ${style.formGroup}`}
                  >
                    <Form.Label className={style.description}>
                      Rodzaj wykończenia
                    </Form.Label>
                    <Form.Select
                      value={selectedFinish}
                      onChange={(e) => setSelectedFinish(e.target.value)}
                    >
                      {finish.map((finish) => (
                        <option key={finish.id} value={finish.title}>
                          {finish.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    controlId="quantitySelect"
                    className={`mt-3 ${style.formGroup}`}
                  >
                    <Form.Label>Ilość</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </Form.Group>
                  <div className="d-flex align-items-center justify-content-between mt-auto">
                    <span className={style.price}>Cena: {item.price} zł</span>
                    <Button
                      className={style.customButton}
                      onClick={handleAddToCart}
                    >
                      Dodaj do koszyka
                    </Button>
                    <ToastContainer />
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
