import { v4 as uuidv4 } from "uuid";
export interface Item {
  //   id: string;
  name: string;
  price?: { [key: string]: number | string };
  brandName?: string;
  url: string;
  imageUrl: string;
}

export interface CelebFashion {
  celebrity_name: string;
  hat: Item[];
  glasses: Item[];
  jewelry: Item[];
  tops: Item[];
  pants: Item[];
  shoes: Item[];
  conclusion: string;
  [index: string]: Item[] | string;
}
