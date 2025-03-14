import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slice/cartSlice";
import { Link, useParams } from "react-router-dom";
import style from "./Search.module.scss";
import { Container, Spinner } from "react-bootstrap";
import { Bounce, ToastContainer, toast } from "react-toastify";

interface Product {
  id: string;
  title: string;
  price: number;
  img: string;
}

const Search = () => {
  const dispatch = useDispatch();
  const { query } = useParams<{ query: string }>();
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`/api/products/search/${query}`);
        if (!response.ok) {
          throw new Error("Wystąpił błąd podczas pobierania wyników");
        }
        const data = await response.json();
        setFilteredItems(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Wystąpił nieznany błąd");
        }
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);
  console.log(query, "<-------------------Query");
  console.log(filteredItems, "<----------- Wyszukane przedmioty");

  return (
    <div className={style.searchContainer}>
      <h1>Wyniki dla: {query}</h1>
      {loading && <Spinner />}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <Container>
                <div className={style.mainElement} key={item.id}>
                  <h2>{item.title}</h2>
                  <p>Cena: {item.price} PLN</p>
                  <img src={item.img} alt={item.title} />
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
                </Container>
            ))
          ) : (
            <p>Brak wyników</p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
