import React from "react";
import style from "./ArmorFinish.module.scss";
import MirrorPolish from "../../../assets/Finish/MirrorPolish.jpg";
import BlackenedSteel from "../../../assets/Finish/BlackenedSteel.jpg";
import SatinFinish from "../../../assets/Finish/SatinFinish.jpg";
import BrushedFinish from "../../../assets/Finish/BrushedFinish.jpg"
import Rustic from "../../../assets/Finish/Rustic.jpg"

const finishes = [
  {
    name: "Polerowanie na lustro",
    description:
      "Bardzo refleksyjne wykończenie uzyskane poprzez intensywne polerowanie. Zapewnia estetyczny wygląd, ale wymaga konserwacji, aby zapobiec matowieniu.",
    image: MirrorPolish,
  },
  {
    name: "Wykończenie satynowe",
    description:
      "Gładkie, ale nieodblaskowe wykończenie redukujące odblaski. Uzyskiwane poprzez szlifowanie lub stosowanie materiałów ściernych, oferując równowagę między estetyką a praktycznością.",
    image: SatinFinish,
  },
  {
    name: "Stal czerniona",
    description:
      "Przyciemnione wykończenie uzyskane poprzez obróbkę chemiczną lub termiczną. Zapewnia unikalny wygląd i pewien poziom odporności na rdzę.",
    image: BlackenedSteel,
  },
  {
    name: "Wykończenie szczotkowane",
    description:
      "Teksturowane wykończenie z widocznymi liniowymi śladami szczotkowania. Powszechnie stosowane w celu redukcji odbić i maskowania drobnych rys.",
    image: BrushedFinish,
  },
  {
    name: "Wykończenie rustykalne / postarzane",
    description:
      "Celowo postarzony lub utleniony wygląd, który naśladuje historyczną patynę. Często stosowane w rekonstrukcjach historycznych lub celach dekoracyjnych.",
    image: Rustic,
  },
];

const ArmorFinish = () => {
  return (
    <div className={style.container}>
      <h3>Wszystkie elementy domyślnie są wykończone na "lustro"</h3>
      <p>
        Przy składaniu zamówienia, jeśli chcesz inne wykończenie, wybierz
        odpowiednią opcję podczas zamawiania produktu.
      </p>
      {finishes.map((finish, index) => (
        <div key={index} className={style.finish}>
          <h2>{finish.name}</h2>
          <div className={style.content}>
            <p>{finish.description}</p>
            <img src={finish.image} alt={finish.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ArmorFinish;
