import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import  { fetchItems }  from "../../../redux/slice/itemList";
import style from "./ItemList.module.scss"
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/slice/cartSlice";

function ItemList(props: { title: string; id: number }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.item.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = items.filter((item: any) => item.category === props.id);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({...item, quantity: 1}));
  }
  return (
    <div>
      <h1>{props.title}</h1>
      {filteredItems.map(item => (
        <div className={style.mainElement} key={item.id}>
          <h2>{item.title}</h2>
          <p>Cena: {item.price}</p>
          <img src={item.img} alt={item.title} />
            <div>
            <Link to={`/item/${item.id}`}>
            Zobacz szczegóły
          </Link>
              <button onClick={() => handleAddToCart(item)}>Dodaj do koszyka</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
