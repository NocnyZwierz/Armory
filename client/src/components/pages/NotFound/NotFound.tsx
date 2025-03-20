import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.scss";
import notFound from "../../../assets/404.jpg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={style.notFoundContainer}>
      <h1>404 - Strona nie znaleziona</h1>
      <img src={notFound} alt="Nie znaleziono strony" className={style.notFoundImage} />
      <button className={style.backButton} onClick={() => navigate("/")}>
        Wróć na stronę główną
      </button>
    </div>
  );
};

export default NotFound;
