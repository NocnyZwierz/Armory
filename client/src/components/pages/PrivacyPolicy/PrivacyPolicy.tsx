import React from "react";
import styles from "./PrivacyPolicy.module.scss";

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <h1>Polityka Prywatności</h1>
      <p>
        Zgodnie z art. 13 Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. 
        w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych informujemy, że:
      </p>

      <ul>
        <li>
          <strong>1.</strong> Administratorem Twoich danych osobowych jest <b>Various Visage Jan Nowak</b> z siedzibą w Polsce.
        </li>
        <li>
          <strong>2.</strong> Kontakt w sprawie danych: <b>armory@gmail.com</b>, telefon: <b>+48 888 888 88</b>.
        </li>
        <li>
          <strong>3.</strong> Twoje dane będą przetwarzane na podstawie <b>art. 6 ust. 1 lit. b RODO</b> w celu realizacji umowy lub procesów handlowych.
        </li>
        <li>
          <strong>4.</strong> Dane osobowe będą przekazywane wyłącznie podmiotom uprawnionym na mocy prawa.
        </li>
        <li>
          <strong>5.</strong> Dane nie będą przekazywane osobom trzecim.
        </li>
        <li>
          <strong>6.</strong> Masz prawo dostępu do danych, ich poprawiania, usunięcia, ograniczenia przetwarzania oraz cofnięcia zgody.
        </li>
        <li>
          <strong>7.</strong> Przysługuje Ci prawo do wniesienia skargi do <b>Prezesa Urzędu Ochrony Danych Osobowych</b>.
        </li>
        <li>
          <strong>8.</strong> Podanie danych jest wymagane do realizacji umowy i jest dobrowolne w pozostałym zakresie.
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicy;
