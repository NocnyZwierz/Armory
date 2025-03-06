/* eslint-disable prettier/prettier */
export interface Category {
  id: string;
  title: string;
  img: string;
}

export interface Item {
  id: string;
  title: string;
  price: number;
  category: string;
  new: boolean;
  featured: boolean;
  img: string;
  description: string;
}

export interface Finish {
  id: string;
  title: string;
}

export interface DBData {
  categories: Category[];
  items: Item[];
  finishes: Finish[];
}

export const db: DBData = {
  categories: [
    { id: '1', title: 'Hełmy', img: 'assets/main.jpg' },
    { id: '2', title: 'Naramienniki', img: 'assets/main.jpg' },
    { id: '3', title: 'Ręce', img: 'assets/main.jpg' },
    { id: '4', title: 'Rękawice', img: 'assets/main.jpg' },
    { id: '5', title: 'Napierśniki', img: 'assets/main.jpg' },
    { id: '6', title: 'Nogi', img: 'assets/main.jpg' },
  ],
  items: [
    {
      id: '1',
      title: 'Hełm stalowy',
      price: 500,
      category: 'Hełmy',
      new: true,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Solidny hełm stalowy zapewniający doskonałą ochronę głowy w walce.',
    },
    {
      id: '2',
      title: 'Hełm rycerski',
      price: 750,
      category: 'Hełmy',
      new: false,
      featured: true,
      img: 'assets/main.jpg',
      description:
        'Tradycyjny hełm rycerski z zamkniętą przyłbicą dla maksymalnej ochrony.',
    },
    {
      id: '3',
      title: 'Hełm wikinga',
      price: 600,
      category: 'Hełmy',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Wytrzymały hełm inspirowany stylem wikingów, idealny do rekonstrukcji historycznych.',
    },
    {
      id: '4',
      title: 'Hełm samuraja',
      price: 900,
      category: 'Hełmy',
      new: true,
      featured: true,
      img: 'assets/main.jpg',
      description:
        'Pięknie zdobiony hełm samuraja, łączący styl i funkcjonalność.',
    },
    {
      id: '5',
      title: 'Hełm legionisty',
      price: 650,
      category: 'Hełmy',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Klasyczny hełm legionisty rzymskiego, idealny dla pasjonatów historii.',
    },
    {
      id: '6',
      title: 'Naramienniki stalowe',
      price: 400,
      category: 'Naramienniki',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Solidne naramienniki zapewniające skuteczną ochronę ramion podczas walki.',
    },
    {
      id: '7',
      title: 'Naramienniki rycerskie',
      price: 600,
      category: 'Naramienniki',
      new: true,
      featured: true,
      img: 'assets/main.jpg',
      description:
        'Eleganckie i funkcjonalne naramienniki w stylu średniowiecznym.',
    },
    {
      id: '8',
      title: 'Naramienniki wikinga',
      price: 550,
      category: 'Naramienniki',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description: 'Mocne i stylowe naramienniki inspirowane kulturą wikingów.',
    },
    {
      id: '9',
      title: 'Naramienniki samuraja',
      price: 700,
      category: 'Naramienniki',
      new: true,
      featured: true,
      img: 'assets/main.jpg',
      description:
        'Zdobione naramienniki samurajskie dla prawdziwych wojowników.',
    },
    {
      id: '10',
      title: 'Naramienniki gladiatora',
      price: 500,
      category: 'Naramienniki',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Naramienniki inspirowane uzbrojeniem starożytnych gladiatorów.',
    },
    {
      id: '11',
      title: 'Ochrona na ręce stalowa',
      price: 300,
      category: 'Ręce',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Stalowa osłona na ręce zapewniająca solidną ochronę przed ciosami.',
    },
    {
      id: '12',
      title: 'Ochrona rycerska',
      price: 450,
      category: 'Ręce',
      new: true,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Stylowa ochrona rąk dla rycerzy i rekonstruktorów historycznych.',
    },
    {
      id: '13',
      title: 'Ochrona samuraja',
      price: 500,
      category: 'Ręce',
      new: false,
      featured: true,
      img: 'assets/main.jpg',
      description: 'Elegancka ochrona rąk inspirowana zbrojami samurajskimi.',
    },
    {
      id: '14',
      title: 'Ochrona wikinga',
      price: 350,
      category: 'Ręce',
      new: true,
      featured: false,
      img: 'assets/main.jpg',
      description: 'Praktyczna i solidna osłona na ręce wikinga.',
    },
    {
      id: '15',
      title: 'Ochrona gladiatora',
      price: 400,
      category: 'Ręce',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description: 'Ochrona rąk w stylu gladiatora, idealna do walk arenowych.',
    },
    {
      id: '16',
      title: 'Rękawice stalowe',
      price: 200,
      category: 'Rękawice',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Solidne stalowe rękawice zapewniające ochronę dłoni w walce.',
    },
    {
      id: '17',
      title: 'Rękawice rycerskie',
      price: 350,
      category: 'Rękawice',
      new: true,
      featured: true,
      img: 'assets/main.jpg',
      description: 'Eleganckie rękawice rycerskie, idealne do turniejów.',
    },
    {
      id: '18',
      title: 'Rękawice samuraja',
      price: 400,
      category: 'Rękawice',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description: 'Zdobione rękawice inspirowane japońskimi zbrojami.',
    },
    {
      id: '19',
      title: 'Rękawice wikinga',
      price: 300,
      category: 'Rękawice',
      new: false,
      featured: true,
      img: 'assets/main.jpg',
      description: 'Mocne i trwałe rękawice dla prawdziwych wojowników.',
    },
    {
      id: '20',
      title: 'Rękawice gladiatora',
      price: 250,
      category: 'Rękawice',
      new: false,
      featured: false,
      img: 'assets/main.jpg',
      description: 'Wytrzymałe rękawice inspirowane antycznym stylem.',
    },
    {
      id: '21',
      title: 'Napierśnik rycerski',
      price: 850,
      category: 'Napierśniki',
      new: true,
      featured: false,
      img: 'assets/main.jpg',
      description:
        'Solidny napierśnik rycerski zapewniający ochronę tułowia podczas bitwy.',
    },
    {
      id: '22',
      title: 'Nagolenniki rycerskie',
      price: 450,
      category: 'Nogi',
      new: false,
      featured: true,
      img: 'assets/main.jpg',
      description:
        'Wytrzymałe nagolenniki rycerskie, zapewniające ochronę nóg podczas walki.',
    },
  ],
  finishes: [
    { id: '1', title: 'Mirror Polish' },
    { id: '2', title: 'Satin Finish' },
    { id: '3', title: 'Blackened Steel' },
    { id: '4', title: 'Brushed Finish' },
    { id: '5', title: 'Rustic / Aged Finish' },
  ],
};
