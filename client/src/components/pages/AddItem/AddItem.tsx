import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Button, Form } from "react-bootstrap";
import style from "./AddItem.module.scss";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { fetchCategory } from "../../../redux/slice/categorySlice";

const AddItem = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((state: RootState) => state.category);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProduct, setNewProduct] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Pole tytułu nie może być puste!", {
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

    if (!price.trim()) {
      toast.error("Pole ceny nie może być puste!", {
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
      toast.error("Cena musi być liczbą nieujemną!", {
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
      toast.error("Musisz wybrać kategorię!", {
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
      toast.error("Opis nie może być pusty!", {
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
      img,
      description,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Błąd podczas dodawania produktu.");
      }

      const createdProduct = await response.json();
      const productId = createdProduct.id;

      if (files && files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }
        formData.append("productId", productId);

        const photosResponse = await fetch("/api/photos", {
          method: "POST",
          body: formData,
        });

        if (!photosResponse.ok) {
          throw new Error("Błąd podczas dodawania zdjęć.");
        }

        const responsFoto = await photosResponse.json();
        const body = { img: responsFoto[0].path };

        const updateImg = await fetch(`/api/products/${productId}`, {
          headers: { "Content-Type": "application/json" },
          method: "PATCH",
          body: JSON.stringify(body),
        });

        if (!updateImg.ok) {
          throw new Error("Błąd podczas aktualizacji zdjęcia.");
        }
      }

      setTitle("");
      setPrice("");
      setSelectedCategory("");
      setNewProduct(false);
      setFeatured(false);
      setImg("");
      setDescription("");
      setFiles(null);

      toast.success("Dodano produkt do sklepu!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
        onClose: () => navigate(-1),
      });
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
    <div className={style.addItemContainer}>
      <h1>Dodaj nowy produkt</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Tytuł</Form.Label>
          <Form.Control
            type="text"
            placeholder="Wprowadź tytuł produktu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="Wprowadź cenę produktu"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
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
          />
        </Form.Group>

        <Form.Group controlId="formFeatured">
          <Form.Check
            type="checkbox"
            label="Wyróżniony"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
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
          />
        </Form.Group>

        <Form.Group controlId="formFiles">
          <Form.Label>Zdjęcia</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className={style.submitButton}>
          Dodaj produkt
        </Button>
        <ToastContainer />
      </Form>
    </div>
  );
};

export default AddItem;
