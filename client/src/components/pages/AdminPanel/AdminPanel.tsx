import React, { useEffect, useState } from "react";
import style from "./AdminPanel.module.scss";

interface Product {
    id: number;
    name: string;
    price: number;
  }
  
  interface Order {
    id: number;
    status: string;
  }

const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania produktów");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoadingProducts(false);
      })
      .catch((error) => {
        setErrorProducts(error.message);
        setLoadingProducts(false);
      });

    fetch("/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania zamówień");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoadingOrders(false);
      })
      .catch((error) => {
        setErrorOrders(error.message);
        setLoadingOrders(false);
      });
  }, []);

  return (
    <div className={style.adminPanel}>
      <h1>Panel Administratora</h1>

      <section className={style.productsSection}>
        <h2>Produkty</h2>
        {loadingProducts ? (
          <p>Ładowanie produktów...</p>
        ) : errorProducts ? (
          <p>Błąd: {errorProducts}</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} – {product.price} zł
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={style.ordersSection}>
        <h2>Zamówienia</h2>
        {loadingOrders ? (
          <p>Ładowanie zamówień...</p>
        ) : errorOrders ? (
          <p>Błąd: {errorOrders}</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                Zamówienie #{order.id}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
