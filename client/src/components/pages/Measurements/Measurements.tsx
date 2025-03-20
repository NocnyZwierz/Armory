import React from "react";
import style from "./Measurements.module.scss";
import measure1 from "../../../assets/measure/measure1.jpg";
import measure2 from "../../../assets/measure/measure2.jpg";
import measure3 from "../../../assets/measure/measure3.jpg";

const Measurements = () => {
  return (
    <div className={style.measurementsContainer}>
      <h1>Pomiary</h1>
      <p>
        Oto instrukcja, której będziesz potrzebować podczas zamawiania
        gambesonu, kaftanu, rajtuz, spodni lub jakiegokolwiek innego rodzaju
        odzieży. Przy każdym zamówieniu potrzebne będą Twoje wymiary wzrostu i
        wagi.
      </p>
      <p>
        **INSTRUKCJA JAK TO ZROBIĆ:** Przede wszystkim, podczas pobierania
        wymiarów będziesz potrzebować pomocy członka rodziny lub przyjaciela.
      </p>
      <p>
        Stań poprawnie. Stań prosto, wysoko i oddychaj normalnie podczas
        mierzenia. Niektóre pomiary mogą być dokładniejsze podczas wydechu,
        inne podczas wdechu.
      </p>

      <div className={style.measurementImages}>
        <img src={measure1} alt="Instrukcja pomiaru" className={style.measurementImage} />
        <img src={measure2} alt="Instrukcja pomiaru" className={style.measurementImage} />
        <img src={measure3} alt="Instrukcja pomiaru" className={style.measurementImage} />
      </div>

      <p>
        Użyj odpowiedniego rodzaju taśmy mierniczej. Podczas mierzenia ciała,
        powinieneś używać miękkiej taśmy z tkaniny lub elastycznego plastiku.
      </p>
    </div>
  );
};

export default Measurements;
