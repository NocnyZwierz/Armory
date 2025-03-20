import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from "./Gallery.module.scss";

import image1 from '../../../assets/gallery/pexels-andreas-schnabl-1775843-19450232.jpg';
import image2 from '../../../assets/gallery/pexels-anna-alexes-18139455-8009836.jpg';
import image3 from '../../../assets/gallery/pexels-brenpintelos-7476120.jpg';
import image4 from '../../../assets/gallery/pexels-emma-bosley-ritchie-313368788-13653614.jpg';
import image5 from '../../../assets/gallery/pexels-keegan-houser-557040-1478685.jpg';
import image6 from '../../../assets/gallery/pexels-marina-zvada-844583049-21524817.jpg';
import image7 from '../../../assets/gallery/pexels-stephen-leonardi-587681991-30258185.jpg';
import image8 from '../../../assets/gallery/pexels-timrael-30530388.jpg';


const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const Gallery = () => {
  return (
    <div className={style.galleryContainer}>
      <h1>Galeria</h1>
      <p>Foto relacja z imprez rycerskich</p>
      <Carousel fade indicators interval={3000} className={style.carousel}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img className={style.carouselImage} src={image} alt={`Slide ${index + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
