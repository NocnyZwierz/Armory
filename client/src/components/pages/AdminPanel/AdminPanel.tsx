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

const AdminPanel = (props: any) => {
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
    const token = localStorage.getItem("adminToken");
    if (token) {
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

      fetch("/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    }
  }, [isLogged]);

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
    const token = localStorage.getItem("adminToken");
    if (window.confirm("Czy na pewno chcesz usunąć produkt?")) {
      fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    return (
      <AdminLogin
        onLoginSuccess={() => {
          props.setIsAdmin(true);
          setIsLogged(true);
        }}
      />
    );
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
                    <Row className={style.buttonGroup}>
                      <Col>
                        <Button
                          onClick={() => navigate(`/edit-item/${product.id}`)}
                        >
                          Edytuj
                        </Button>
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
          <div className={style.ordersContainer}>
            {orders.map((order) => (
              <div key={order.id} className={style.orderCard}>
                <div className={style.orderHeader}>
                  <p>
                    <strong>ID zamówienia:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Klient:</strong> {order.customerName}{" "}
                    {order.customerSurname}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customerEmail}
                  </p>
                  <p>
                    <strong>Adres dostawy:</strong> {order.deliveryAddress}
                  </p>
                </div>
                <div className={style.orderItems}>
                  <h4>Produkty:</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Ilość</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.title}</td>
                          <td>{item.price} zł</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
