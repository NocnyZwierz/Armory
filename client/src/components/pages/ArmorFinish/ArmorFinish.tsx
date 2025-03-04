import React from "react";
import style from "./ArmorFinish.module.scss";

const finishes = [
  {
    name: "Mirror Polish",
    description:
      "A highly reflective finish achieved through extensive polishing. Offers aesthetic appeal but requires maintenance to prevent tarnishing.",
    image: "/images/mirror-polish.jpg",
  },
  {
    name: "Satin Finish",
    description:
      "A smooth but non-reflective finish that reduces glare. Achieved by sanding or using abrasives, offering a balance between aesthetics and practicality.",
    image: "/images/satin-finish.jpg",
  },
  {
    name: "Blackened Steel",
    description:
      "A darkened finish achieved through chemical treatments or heat. Provides a unique appearance and some level of rust resistance.",
    image: "/images/blackened-steel.jpg",
  },
  {
    name: "Brushed Finish",
    description:
      "A textured finish with visible linear brush marks. Commonly used to reduce reflections and hide small scratches.",
    image: "/images/brushed-finish.jpg",
  },
  {
    name: "Rustic / Aged Finish",
    description:
      "A deliberately aged or oxidized look that mimics historical patina. Often used for historical reenactments or decorative purposes.",
    image: "/images/rustic-finish.jpg",
  },
];

const ArmorFinish = () => {
  return (
    <div className={style.container}>
        <h3>Wszystkie elementy domyślnie są wykończone na "lustro"</h3>
        <p>Przy zamawianiu jeśli ma być inne wykończenie proszę wybrać odpowiednie wykończenie przy zamawianiu produktu.</p>
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
