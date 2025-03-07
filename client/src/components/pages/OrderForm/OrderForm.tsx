import React, { useState } from 'react';
import styles from './OrderForm.module.scss';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dane zamówienia:', formData);
  };

  return (
    <div className={styles.orderFormContainer}>
      <h2 className={styles.title}>Formularz Zamówienia</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Imię:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Nazwisko:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Adres dostawy:
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <button type="submit" className={styles.submitButton}>Zamów</button>
      </form>
    </div>
  );
};

export default OrderForm;