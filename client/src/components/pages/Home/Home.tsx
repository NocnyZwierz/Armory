import React, { useEffect, useState } from "react";
import img from "../../../assets/Tło.jpg";
import komes from "../../../assets/Komes.jpg"
import style from "./Home.module.scss";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { RootState } from "../../../redux/store";
import  { fetchItems }  from "../../../redux/slice/itemList";

interface Category {
  id: number;
  title: string;
  img: string;
}

const VISIBLE_ITEMS = 4;

function Home() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useAppSelector((state: RootState) => state.category);
  const { items } = useAppSelector((state: RootState) => state.item);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [newsCarouselIndex, setNewsCarouselIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.toString()) {
      setSearchParams({});
    }
  });

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      const findCategory = category.find((cat) => cat.title === urlCategory);
      setSelectedCategory(findCategory || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, category]);

  const handleCategoryClick = (cat: Category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", cat.title);
    setSearchParams(newParams);
    setSelectedCategory(cat);
    navigate(`/shop?${newParams.toString()}`);
  };

 
  const recommendedItems = items.filter((item) => item.featured === true);
  const newItems = items.filter((item) => item.new === true);

  const groupedItems = [];
  for (let i = 0; i < recommendedItems.length; i += VISIBLE_ITEMS) {
    groupedItems.push(recommendedItems.slice(i, i + VISIBLE_ITEMS));
  }

  const handleCarouselSelect = (selectedIndex: number) => {
    setCarouselIndex(selectedIndex);
  };

  const handleNewsCarouselSelect = (selectedIndex: number) => {
    setNewsCarouselIndex(selectedIndex);
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.banner}>
        <img src={img} alt="" />
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>Kategorie</h3>
        <div className={style.categoryContainer}>
          {category.map((cat) => (
            <div
              key={cat.id}
              className={style.category}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className={style.catDiv}>
                <img src={cat.img} alt={cat.title} />
                <h2>{cat.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <div>
          <h3>Polecane produkty</h3>
          <Carousel
            activeIndex={carouselIndex}
            onSelect={handleCarouselSelect}
            indicators={true}
            interval={5000}
            className={style.carousel}
          >
            {groupedItems.map((group, id) => (
              <Carousel.Item key={id}>
                <Row className="justify-content-center">
                  {group.map((item) => (
                    <Col key={item.id} xs={12} sm={6} md={3}>
                      <Card className={style.itemCard}>
                        <Card.Img
                          variant="top"
                          src={item.img}
                          className={style.image}
                        />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text className={style.price}>
                            {item.price} zł
                          </Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/item/${item.id}`)}
                          >
                            Zobacz szczegóły
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>Nowości jako karuzela</h3>

        <Carousel
          activeIndex={newsCarouselIndex}
          onSelect={handleNewsCarouselSelect}
          indicators={true}
          interval={5000}
          className={style.carousel}
        >
          {newItems.map((item, id) => (
            <Carousel.Item key={id}>
              <div className={style.newsItem}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={style.newsImage}
                />
                <h4 className={style.newsTitle}>{item.title}</h4>
                <p className={style.newsPrice}>{item.price} zł</p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/item/${item.id}`)}
                >
                  Zobacz szczegóły
                </Button>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>O mnie</h3>
        <Row>
          <Col>
            <p>Tu sie pordolnie lrem ipsum</p>
          </Col>
          <Col>
            <img src={komes} alt="" />
            <p>duża fota</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
