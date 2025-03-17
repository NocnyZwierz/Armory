import React, { useEffect, useState } from "react";
import style from "./AdminPanel.module.scss";
import { Button, Col, Row } from "react-bootstrap";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  img: string;
}

interface Order {
  customerName: string;
  customerSurname: string;
  deliveryAddress: string;
  customerEmail: string;
  id: string;
  items: { productId: string; title: string; price: number; quantity: number }[];
}


const AdminPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  console.log(orders,"<-------- zamówienia")
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
        console.log(data, "<-----------product");
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
        console.log(data, "<-------------order");
      })
      .catch((error) => {
        setErrorOrders(error.message);
        setLoadingOrders(false);
      });
  }, []);
  console.log(products, "<---------już przypisane produkty");
  console.log(orders, "<----------- już przypisane zamówienia");
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
          <div className={style.mainProductDiv}>
            {products.map((product) => (
              <div className={style.productDiv}>
                <Row>
                  <Col>
                    <img src={product.img} alt={product.title} />
                  </Col>
                  <Col>
                    <h4>{product.title}</h4>
                    <p>{product.price}</p>
                    <p>{product.category}</p>
                    <Row>
                      <Col>
                        <Button>Edytuj</Button>
                      </Col>
                      <Col>
                        <Button>Usuń</Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
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
              <div>
                <Row>
                  <Col>
                    <p>{order.customerName}</p>
                  </Col>

                  <Col>
                    <p>{order.customerSurname}</p>
                  </Col>

                  <Col>
                    <p>{order.deliveryAddress}</p>
                  </Col>

                  <Col>
                    <p>{order.customerEmail}</p>
                  </Col>

                  <Col>
                    <p>{order.id}</p>
                  </Col>
                  <div className={style.orderItems}>
                    {Array.isArray(order.items) &&
                      order.items.map((item, index) => (
                        <div key={index}>
                          <p>Product ID: {item.title}</p>
                          <p>Price: {item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                      ))}
                  </div>
                </Row>
              </div>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
