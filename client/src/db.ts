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
    // Hełmy
    { id: 1, title: "Hełm stalowy", price: 500, category: "Hełmy", new: true, featured: false, img: img },
    { id: 2, title: "Hełm rycerski", price: 750, category: "Hełmy", new: false, featured: true, img: img },
    { id: 3, title: "Hełm wikinga", price: 600, category: "Hełmy", new: false, featured: false, img: img },
    { id: 4, title: "Hełm samuraja", price: 900, category: "Hełmy", new: true, featured: true, img: img },
    { id: 5, title: "Hełm legionisty", price: 650, category: "Hełmy", new: false, featured: false, img: img },

    // Naramienniki
    { id: 6, title: "Naramienniki stalowe", price: 400, category: "Naramienniki", new: false, featured: false, img: img },
    { id: 7, title: "Naramienniki rycerskie", price: 600, category: "Naramienniki", new: true, featured: true, img: img },
    { id: 8, title: "Naramienniki wikinga", price: 550, category: "Naramienniki", new: false, featured: false, img: img },
    { id: 9, title: "Naramienniki samuraja", price: 700, category: "Naramienniki", new: true, featured: true, img: img },
    { id: 10, title: "Naramienniki gladiatora", price: 500, category: "Naramienniki", new: false, featured: false, img: img },

    // Ręce
    { id: 11, title: "Ochrona na ręce stalowa", price: 300, category: "Ręce", new: false, featured: false, img: img },
    { id: 12, title: "Ochrona rycerska", price: 450, category: "Ręce", new: true, featured: false, img: img },
    { id: 13, title: "Ochrona samuraja", price: 500, category: "Ręce", new: false, featured: true, img: img },
    { id: 14, title: "Ochrona wikinga", price: 350, category: "Ręce", new: true, featured: false, img: img },
    { id: 15, title: "Ochrona gladiatora", price: 400, category: "Ręce", new: false, featured: false, img: img },

    // Rękawice
    { id: 16, title: "Rękawice stalowe", price: 200, category: "Rękawice", new: false, featured: false, img: img },
    { id: 17, title: "Rękawice rycerskie", price: 350, category: "Rękawice", new: true, featured: true, img: img },
    { id: 18, title: "Rękawice samuraja", price: 400, category: "Rękawice", new: false, featured: false, img: img },
    { id: 19, title: "Rękawice wikinga", price: 300, category: "Rękawice", new: false, featured: true, img: img },
    { id: 20, title: "Rękawice gladiatora", price: 250, category: "Rękawice", new: false, featured: false, img: img },

    // Napierśniki
    { id: 21, title: "Napierśnik stalowy", price: 1000, category: "Napierśniki", new: false, featured: true, img: img },
    { id: 22, title: "Napierśnik rycerski", price: 1200, category: "Napierśniki", new: true, featured: false, img: img },
    { id: 23, title: "Napierśnik samuraja", price: 1100, category: "Napierśniki", new: false, featured: true, img: img },
    { id: 24, title: "Napierśnik wikinga", price: 900, category: "Napierśniki", new: false, featured: false, img: img },
    { id: 25, title: "Napierśnik gladiatora", price: 950, category: "Napierśniki", new: false, featured: false, img: img },

    // Nogi
    { id: 26, title: "Ochrona nóg stalowa", price: 700, category: "Nogi", new: false, featured: false, img: img },
    { id: 27, title: "Ochrona rycerska", price: 850, category: "Nogi", new: true, featured: false, img: img },
    { id: 28, title: "Ochrona samuraja", price: 800, category: "Nogi", new: false, featured: true, img: img },
    { id: 29, title: "Ochrona wikinga", price: 750, category: "Nogi", new: false, featured: false, img: img },
    { id: 30, title: "Ochrona gladiatora", price: 720, category: "Nogi", new: false, featured: false, img: img },
  ],
};

export default db;
