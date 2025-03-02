import React from "react";
import img from "../../../assets/Tło.jpg";
import img2 from "../../../assets/main.jpg";
import style from "./Home.module.scss";
import { Col, Row } from "react-bootstrap";

function Home() {
  return (
    <div className={style.div}>
      <div>
        <img src={img} alt="" />
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>Kategorie</h3>
        {/*tutaj mapa kategorii co mozna wybrać */}
        <div>
          <img src={img} alt="" />
          <p>Nazwa kategoriii</p>
          <button>do danej kategorii</button>
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>polecane produkty jako karuzela</h3>
        {/* mapa polecanych produktów */}
        <div>
          <img src={img2} alt="" />
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>Nowości jako karuzela</h3>
        {/* mapa polecanych produktów */}
        <div>
          <img src={img2} alt="" />
        </div>
      </div>

      <div>
        <div>tu jakis ładny łacznik cos ala wieniec -----------</div>
        <h3>O mnie</h3>
        <Row>
          <Col>
          <p>Tu sie pordolnie lrem ipsum</p>
          </Col>
          <Col>
            <img src={img} alt=""/>
            <p>duża fota</p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
