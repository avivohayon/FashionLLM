export interface AiResult {
  name: string;
  gender: string;
  hat: string;
  glasses: string;
  jewelry: string;
  tops: string;
  pants: string;
  shoes: string;
  colors: string;
  conclusion: string;
  [index: string]: string;
}

export interface Item {
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
  imageUrl: string;
  conclusion: string;
  [index: string]: Item[] | string;
}

export interface UserFashionData {
  collection_name: string;
  data_list: CelebFashion[];
}
// IIQUAL unisex high waisted tailored wide leg trousers in grey
