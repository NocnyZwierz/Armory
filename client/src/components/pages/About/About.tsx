import React from "react";
import img from "../../../assets/Komes.jpg";
import style from "./About.module.scss";

const About = () => {
  return (
    <div className={style.aboutContainer}>
      <img src={img} alt="O mnie" className={style.aboutImage} />
      <div className={style.aboutText}>
        <h1>O mnie</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl
          mauris, pulvinar lacinia urna vitae, pulvinar imperdiet augue. Cras
          quis leo in purus efficitur pharetra ut vitae magna. Donec et mauris
          porta, consectetur risus nec, bibendum sem. Nam purus massa, rutrum
          quis semper ac, vulputate a ligula. Sed tellus justo, mattis quis
          semper vulputate, lacinia id risus. Etiam tincidunt augue nec laoreet
          faucibus. Pellentesque condimentum ipsum non ultrices convallis.
          Aliquam erat volutpat.
        </p>
        <p>
          Nunc dictum accumsan nisi efficitur pulvinar. Sed laoreet interdum
          sapien fermentum condimentum. Proin quam ipsum, eleifend quis rutrum
          sit amet, hendrerit id erat. Fusce vitae malesuada lectus.
          Pellentesque habitant morbi tristique senectus et netus et malesuada
          fames ac turpis egestas. Sed iaculis sodales leo et varius. Duis dolor
          nibh, feugiat vitae enim eget, posuere aliquam erat.
        </p>
        <p>
          Proin varius, sem a rutrum auctor, urna diam rhoncus lacus, et
          placerat eros mauris non mi. Quisque viverra imperdiet consectetur.
          Nulla dignissim dolor sed augue pharetra elementum. Proin vel
          malesuada neque. Duis viverra eros quis nunc aliquet aliquam. Aenean
          eu vehicula nisi. In cursus fermentum pharetra. Sed scelerisque tortor
          non diam pharetra imperdiet. Suspendisse rutrum auctor pulvinar.
          Praesent sit amet tincidunt lacus. Suspendisse id magna nec leo luctus
          lacinia.
        </p>
        <p>
          Ut tempor porttitor arcu, vel semper ex maximus ac. In hac habitasse
          platea dictumst. Nulla et ipsum eget sapien interdum tincidunt a in
          est. Mauris congue pharetra quam tincidunt bibendum. In eu interdum
          augue. Suspendisse potenti. Curabitur tempus enim ligula. Vivamus
          eleifend in diam id egestas. Proin sed tellus eget nunc facilisis
          ornare nec at purus. Duis id ipsum pellentesque nisi tristique tempus.
          Nulla sit amet nisi tempor, consectetur ipsum ut, imperdiet ipsum.
        </p>
      </div>
    </div>
  );
};

export default About;
