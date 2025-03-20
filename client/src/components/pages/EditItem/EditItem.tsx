import React, { useEffect, useMemo, useState } from "react";
import style from "./EditItem.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { fetchCategory } from "../../../redux/slice/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { fetchItems } from "../../../redux/slice/itemList";
import { Bounce, toast, ToastContainer } from "react-toastify";

const EditItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state: RootState) => state.category);
  const { items } = useAppSelector((state: RootState) => state.item);
  const { id } = useParams();

  const filteredItems = useMemo(
    () => items.filter((item: any) => item.id === id),
    [items, id]
  );

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchItems());
  }, [dispatch]);

  useEffect(() => {
    if (filteredItems.length > 0) {
      const item = filteredItems[0];
      setTitle(item.title || "");
      setPrice(item.price ? item.price.toString() : "");
      setSelectedCategory(item.category || "");
      setNewProduct(item.new || false);
      setFeatured(item.featured || false);
      setDescription(item.description || "");
    }
  }, [filteredItems]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!price.trim()) {
      toast.error("Pole ceny nie może być puste", {
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
      return;
    }

    const parsedPrice = parseFloat(price);

    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Cena nie może być ujemna", {
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
      return;
    }

    if (!title.trim()) {
      toast.error("Pole tytułu nie może być puste", {
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
      return;
    }
    if (!description.trim()) {
      toast.error("Pole opis nie może być puste", {
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
      return;
    }

    if (!selectedCategory) {
      toast.error("Pole kategorie nie może być puste", {
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
      return;
    }

    const product = {
      title,
      price: parsedPrice,
      category: selectedCategory,
      new: newProduct,
      featured,
      description,
    };

    try {
      if (!id) {
        throw new Error("Brak identyfikatora produktu");
      }

      const response = await fetch(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas aktualizacji produktu");
      }

      navigate(-1);
    } catch (error: any) {
      toast.error(error.message, {
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
    }
  };

  return (
    <div className={style.editItemContainer}>
      <h1>Edytuj produkt</h1>
      {filteredItems.length > 0 ? (
        <img src={"/" + filteredItems[0].img} alt="" />
      ) : (
        <p>Brak obrazka</p>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tytuł</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź tytuł produktu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="Wprowadź cenę produktu"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          >
            <option value="">Wybierz kategorię</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formNewProduct">
          <Form.Check
            type="checkbox"
            label="Nowość"
            checked={newProduct}
            onChange={(e) => setNewProduct(e.target.checked)}
            className="form-check-input"
          />
        </Form.Group>

        <Form.Group controlId="formFeatured">
          <Form.Check
            type="checkbox"
            label="Wyróżniony"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="form-check-input"
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Opis</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Wprowadź opis produktu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className={style.submitButton}>
          Uaktualnij produkt
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className={style.submitButton}
        >
          Wróć
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default EditItem;
