import React, { useEffect, useState } from "react";
import style from "./AdminPanel.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../AdminLogin/AdminLogin";

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
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}

const AdminPanel = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorProducts, setErrorProducts] = useState(null);
  const [errorOrders, setErrorOrders] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);


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

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin: "admin" }),
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    localStorage.removeItem("adminToken");
    setIsLogged(false);
    navigate("/");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Czy na pewno chcesz usunąć produkt?")) {
      fetch(`/api/products/${id}`, { method: "DELETE" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Błąd podczas usuwania produktu");
          }
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error deleting product: ", error);
        });
    }
  };

  if (!isLogged) {
    return <AdminLogin onLoginSuccess={() => setIsLogged(true)} />;
  }

  return (
    <div className={style.adminPanel}>
      <h1>Panel Administratora</h1>
      <Button variant="secondary" onClick={handleLogout}>
        Wyloguj
      </Button>
      <section className={style.productsSection}>
        <h2>Produkty</h2>{" "}
        <Button onClick={() => navigate("/add-item")}>
          Dodaj produkt do sklepu
        </Button>
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
                      <Button onClick={() => navigate(`/edit-item/${product.id}`)}>Edytuj</Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Usuń
                        </Button>
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
                    {order.items.map((item, index) => (
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
