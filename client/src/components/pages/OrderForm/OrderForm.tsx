import React, { useState } from "react";
import styles from "./OrderForm.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { clearCart } from "../../../redux/slice/cartSlice";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const OrderForm = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { firstName, lastName, address, email } = formData;
    if (!firstName.trim()) {
      toast.error("Imię jest wymagane", {
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
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Nazwisko jest wymagane", {
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
      return false;
    }
    if (!address.trim()) {
      toast.error("Adres dostawy jest wymagany", {
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
      return false;
    }
    if (!email.trim()) {
      toast.error("Email jest wymagany", {
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
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Podaj prawidłowy adres email", {
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
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const orderData = {
      customerName: formData.firstName,
      customerSurname: formData.lastName,
      customerEmail: formData.email,
      deliveryAddress: formData.address,
      items: cartItems,
      totalAmount: totalPrice,
    };
    try {
      const response = await fetch("api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        toast.error("Błąd przy wysyłaniu zamówienia", {
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

      toast.success("Zamówienie przekazane do realizacji", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => {
          dispatch(clearCart());
        },
      });
    } catch (error) {
      toast.error("Wystąpił błąd podczas wysyłania zamówienia", {
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
    <div className={styles.orderFormContainer}>
      <h2 className={styles.title}>Formularz Zamówienia</h2>
      <div className={styles.cartSummary}>
        <h3>Twój koszyk</h3>
        {cartItems.length === 0 ? (
          <p>Koszyk jest pusty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
              <p>{item.quantity}x</p>
              <p>{item.price} PLN</p>
            </div>
          ))
        )}
        <h3>Łączna cena: {totalPrice} PLN</h3>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Imię:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Nazwisko:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <label>
          Adres dostawy:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <button type="submit" className={styles.submitButton}>
          Zamów
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default OrderForm;
