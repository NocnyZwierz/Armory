import React from "react";
import style from "./Terms.module.scss";

const Terms = () => {
  return (
    <div className={style.termsContainer}>
      <h1>Regulamin Sklepu</h1>
      <p>
        Przed dokonaniem zakupów w naszym sklepie prosimy o zapoznanie się z regulaminem. 
        Korzystając ze sklepu internetowego, akceptujesz poniższe zasady.
      </p>

      <ul>
        <li>Kupujący zobowiązuje się do podania prawdziwych danych przy składaniu zamówienia.</li>
        <li>Sklep zastrzega sobie prawo do anulowania zamówienia w przypadku błędnych danych.</li>
        <li>Zwroty są możliwe w ciągu 14 dni od daty zakupu.</li>
        <li>Wszystkie produkty objęte są gwarancją zgodnie z prawem konsumenckim.</li>
        <li>Wysyłka realizowana jest w ciągu 3-5 dni roboczych.</li>
      </ul>

      <p>
        Jeśli masz pytania, skontaktuj się z nami przez e-mail: <strong>kontakt@twojsklep.pl</strong>
      </p>
    </div>
  );
};

export default Terms;
