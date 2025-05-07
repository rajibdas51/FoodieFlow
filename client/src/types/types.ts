export interface FoodItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  numReviews: number;
  countInStock: number;
}

export type FoodList = FoodItem[];
