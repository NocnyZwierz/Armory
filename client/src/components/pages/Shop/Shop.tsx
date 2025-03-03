import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getCategory } from "../../../redux/slice/categorySlice";
import style from "./Shop.module.scss";
import ItemList from "../ItemList/ItemList";
import { useSearchParams } from "react-router-dom";

interface Category {
  id: number;
  title: string;
}

const Shop = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state: RootState) => state.category);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  
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
  };

  return (
    <div>
      <h1>Sklep</h1>
      <Row>
        <Col>
          <h2>Kategorie</h2>
          {categories.map((cat) => (
            <div key={cat.id} onClick={() => handleCategoryClick(cat)}>
              {cat.title}
            </div>
          ))}
        </Col>
        <Col>
          {selectedCategory === null ? (
            <>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={style.main}
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className={style.catDiv}>
                    <img src={cat.img} alt={cat.title} />
                    <h2>{cat.title}</h2>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <ItemList title={selectedCategory.title} id={selectedCategory.id} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Shop;
