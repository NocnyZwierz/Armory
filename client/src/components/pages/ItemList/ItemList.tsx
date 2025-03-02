import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getItems } from "../../../redux/slice/itemList";
import style from "./ItemList.module.scss"

function ItemList(props: { title: string; id: number }) {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.item);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const filteredItems = items.filter((item) => item.category === props.title);
  console.log(filteredItems, "<-------------------")
  return (
    <div>
      <h1>{props.title}</h1>
      {filteredItems.map(item => (
        <div className={style.mainElement} key={item.id}>
          <h2>{item.title}</h2>
          <p>Cena: {item.price}</p>
          <img src={item.img} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

export default ItemList;
