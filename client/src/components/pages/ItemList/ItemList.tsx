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
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <div>
      <h1>{props.title}</h1>
      {filteredItems.map((item) => (
        <div className={style.mainElement} key={item.id}>
          <h2>{item.title}</h2>
          <p>Cena: {item.price}</p>
          <img src={item.img} alt=""/>
          <div>
            <Link to={`/item/${item.id}`}>Zobacz szczegóły</Link>
            <button onClick={() => handleAddToCart(item)}>
              Dodaj do koszyka
            </button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;

