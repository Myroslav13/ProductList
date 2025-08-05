interface ImageSet {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

interface dessertData {
  image: ImageSet;
  name: string;
  quantity: number;
  price: number;
}

export type {dessertData};