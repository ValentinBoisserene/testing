export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  portionsPerUnit: number;
  unitLabel: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Hamburguesas (kg)",
    image: "https://static.vecteezy.com/system/resources/thumbnails/023/328/622/small/photo-frame-mockup-vintage-style-with-adhesive-tapes-retro-photo-frame-template-png.png",
    price: 7000,
    portionsPerUnit: 10,
    unitLabel: "unidades"
  },

  {
    id: 2,
    name: "Arroz (500gr)",
    image: "https://static.vecteezy.com/system/resources/thumbnails/023/328/622/small/photo-frame-mockup-vintage-style-with-adhesive-tapes-retro-photo-frame-template-png.png",
    price: 1500,
    portionsPerUnit: 16,
    unitLabel: "paquete"
  },

  {
    id: 3,
    name: "Fideos (500gr)",
    image: "https://static.vecteezy.com/system/resources/thumbnails/023/328/622/small/photo-frame-mockup-vintage-style-with-adhesive-tapes-retro-photo-frame-template-png.png",
    price: 1500,
    portionsPerUnit: 8,
    unitLabel: "paquete"
  }
];