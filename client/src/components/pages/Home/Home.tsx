import React, { useEffect, useState } from "react";
import img from "../../../assets/Tło.jpg";
import img2 from "../../../assets/main.jpg";
import style from "./Home.module.scss";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategory } from "../../../redux/slice/categorySlice";
import { RootState } from "../../../redux/store";

interface Category {
  id: number;
  title: string;
}

function Home() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state: RootState) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.toString()) {
      setSearchParams({});
    }
  });

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      const findCategory = categories.find((cat) => cat.title === urlCategory);
      setSelectedCategory(findCategory || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams, categories]);

  const handleCategoryClick = (cat: Category) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("category", cat.title);
    setSearchParams(newParams);
    setSelectedCategory(cat);
    navigate(`/shop?${newParams.toString()}`);
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
          {categories.map((cat) => (
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
        <h3>polecane produkty jako karuzela</h3>
        {/* mapa polecanych produktów */}
        <div>
          <img src={img2} alt="" />
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>Nowości jako karuzela</h3>
        {/* mapa polecanych produktów */}
        <div>
          <img src={img2} alt="" />
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>O mnie</h3>
        <Row>
          <Col>
            <p>Tu sie pordolnie lrem ipsum</p>
          </Col>
          <Col>
            <img src={img} alt="" />
            <p>duża fota</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
