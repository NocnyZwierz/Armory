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
    const product = {
      title,
      price: parseFloat(price),
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
        throw new Error("Błąd podczas dodawania produktu");
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

        const responsFoto = await photosResponse.json();

        if (!photosResponse.ok) {
          throw new Error("Błąd podczas dodawania zdjęć");
        }
        const body = {
          img: responsFoto[0].path
        }

      const updateImg = await fetch(`/api/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify(body)
      });
      if (!updateImg.ok) {
        throw new Error("Błąd podczas update img");
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

      toast.success("Dodano produkt do sklepu", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          navigate(-1);
        },
      });
    } catch (error: any) {
      console.error(error);
      alert(error.message);
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
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="number"
            placeholder="Wprowadź cenę produktu"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Kategoria</Form.Label>
          <Form.Control
            as="select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
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
            required
          />
        </Form.Group>

        <Form.Group controlId="formFiles">
          <Form.Label>Zdjęcia</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
        </Form.Group>

        <Button variant="primary" type="submit" className={style.submitButton}>
          Dodaj produkt
        </Button>
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
      </Form>
    </div>
  );
};

export default AddItem;
