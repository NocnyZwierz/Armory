import img from "../src/assets/main.jpg";

const db = {
  category: [
    { id: 1, title: "Hełmy", img: img },
    { id: 2, title: "Naramienniki", img: img },
    { id: 3, title: "Ręce", img: img },
    { id: 4, title: "Rękawice", img: img },
    { id: 5, title: "Napierśniki", img: img },
    { id: 6, title: "Nogi", img: img },
  ],
  item: [
    { id: 1, title: "Hełm stalowy", price: 500, category: "Hełmy", new: true, featured: false, img: img, description: "Solidny hełm stalowy zapewniający doskonałą ochronę głowy w walce." },
    { id: 2, title: "Hełm rycerski", price: 750, category: "Hełmy", new: false, featured: true, img: img, description: "Tradycyjny hełm rycerski z zamkniętą przyłbicą dla maksymalnej ochrony." },
    { id: 3, title: "Hełm wikinga", price: 600, category: "Hełmy", new: false, featured: false, img: img, description: "Wytrzymały hełm inspirowany stylem wikingów, idealny do rekonstrukcji historycznych." },
    { id: 4, title: "Hełm samuraja", price: 900, category: "Hełmy", new: true, featured: true, img: img, description: "Pięknie zdobiony hełm samuraja, łączący styl i funkcjonalność." },
    { id: 5, title: "Hełm legionisty", price: 650, category: "Hełmy", new: false, featured: false, img: img, description: "Klasyczny hełm legionisty rzymskiego, idealny dla pasjonatów historii." },
    { id: 6, title: "Naramienniki stalowe", price: 400, category: "Naramienniki", new: false, featured: false, img: img, description: "Solidne naramienniki zapewniające skuteczną ochronę ramion podczas walki." },
    { id: 7, title: "Naramienniki rycerskie", price: 600, category: "Naramienniki", new: true, featured: true, img: img, description: "Eleganckie i funkcjonalne naramienniki w stylu średniowiecznym." },
    { id: 8, title: "Naramienniki wikinga", price: 550, category: "Naramienniki", new: false, featured: false, img: img, description: "Mocne i stylowe naramienniki inspirowane kulturą wikingów." },
    { id: 9, title: "Naramienniki samuraja", price: 700, category: "Naramienniki", new: true, featured: true, img: img, description: "Zdobione naramienniki samurajskie dla prawdziwych wojowników." },
    { id: 10, title: "Naramienniki gladiatora", price: 500, category: "Naramienniki", new: false, featured: false, img: img, description: "Naramienniki inspirowane uzbrojeniem starożytnych gladiatorów." },
    { id: 11, title: "Ochrona na ręce stalowa", price: 300, category: "Ręce", new: false, featured: false, img: img, description: "Stalowa osłona na ręce zapewniająca solidną ochronę przed ciosami." },
    { id: 12, title: "Ochrona rycerska", price: 450, category: "Ręce", new: true, featured: false, img: img, description: "Stylowa ochrona rąk dla rycerzy i rekonstruktorów historycznych." },
    { id: 13, title: "Ochrona samuraja", price: 500, category: "Ręce", new: false, featured: true, img: img, description: "Elegancka ochrona rąk inspirowana zbrojami samurajskimi." },
    { id: 14, title: "Ochrona wikinga", price: 350, category: "Ręce", new: true, featured: false, img: img, description: "Praktyczna i solidna osłona na ręce wikinga." },
    { id: 15, title: "Ochrona gladiatora", price: 400, category: "Ręce", new: false, featured: false, img: img, description: "Ochrona rąk w stylu gladiatora, idealna do walk arenowych." },
    { id: 16, title: "Rękawice stalowe", price: 200, category: "Rękawice", new: false, featured: false, img: img, description: "Solidne stalowe rękawice zapewniające ochronę dłoni w walce." },
    { id: 17, title: "Rękawice rycerskie", price: 350, category: "Rękawice", new: true, featured: true, img: img, description: "Eleganckie rękawice rycerskie, idealne do turniejów." },
    { id: 18, title: "Rękawice samuraja", price: 400, category: "Rękawice", new: false, featured: false, img: img, description: "Zdobione rękawice inspirowane japońskimi zbrojami." },
    { id: 19, title: "Rękawice wikinga", price: 300, category: "Rękawice", new: false, featured: true, img: img, description: "Mocne i trwałe rękawice dla prawdziwych wojowników." },
    { id: 20, title: "Rękawice gladiatora", price: 250, category: "Rękawice", new: false, featured: false, img: img, description: "Wytrzymałe rękawice inspirowane antycznym stylem." },
  ],
};

export default db;
