import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { fetchItems } from "../../../redux/slice/itemList";
import style from "./ItemList.module.scss";
import { Link } from "react-router-dom";
import { addToCart } from "../../../redux/slice/cartSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";

function ItemList(props: { title: string; id: number }) {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) => state.item.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const filteredItems = items.filter((item: any) => item.category === props.id);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    toast.success("Dodano do koszyka", {
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
  };

  return (
    <div className={style.container}>
      <h1>{props.title}</h1>
      <div className={style.productGrid}>
        {filteredItems.map((item) => (
          <div className={style.mainElement} key={item.id}>
            <h2>{item.title}</h2>
            <p>Cena: {item.price} zł</p>
            <img src={item.img} alt={item.title} />
            <div className={style.buttons}>
              <Link to={`/item/${item.id}`} className={style.customLink}>
                Zobacz szczegóły
              </Link>
              <button
                className={style.customButton}
                onClick={() => handleAddToCart(item)}
              >
                Dodaj do koszyka
              </button>
              
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ItemList;
