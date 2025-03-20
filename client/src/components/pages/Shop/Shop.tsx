import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { RootState } from "../../../redux/store";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import style from "./Shop.module.scss";
import ItemList from "../ItemList/ItemList";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import Hełmy from "../../../assets/category/Hełmy.jpg";
import Napierśnik from "../../../assets/category/Napierśnik.jpg";
import Naramienniki from "../../../assets/category/Naramienniki.jpg";
import Nogi from "../../../assets/category/Nogi.jpg";
import Ręce from "../../../assets/category/Ręce.jpg";
import Rękawice from "../../../assets/category/Rękawice.jpg";

interface Category {
  id: number;
  title: string;
}

const Shop = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useAppSelector((state: RootState) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categoryImageMap: any = {
    1: Hełmy,
    2: Naramienniki,
    3: Ręce,
    4: Rękawice,
    5: Napierśnik,
    6: Nogi,
  };

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

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
  };

  return (
    <div className={style.shopContainer}>
      <h1>Sklep</h1>
      <Row>
        <Col style={{ width: "15%", flex: "0 0 15%" }}>
          <h2>Kategorie</h2>
          <div className={style.leftCategoryContainer}>
            {category.map((cat) => (
              <div key={cat.id} onClick={() => handleCategoryClick(cat)}>
                {cat.title}
              </div>
            ))}
          </div>
        </Col>
        <Col style={{ width: "85%", flex: "0 0 85%" }}>
          {selectedCategory === null ? (
            <div className={style.categoryContainer}>
              {category.map((cat) => (
                <div
                  key={cat.id}
                  className={style.categoryCard}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className={style.catDiv}>
                    <img src={categoryImageMap[cat.id]} alt={cat.title} />
                    <h2>{cat.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ItemList title={selectedCategory.title} id={selectedCategory.id} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
