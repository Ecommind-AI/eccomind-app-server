export interface ProductRecommendation {
  title?: string;
  description?: string;
  price?: number;
  currency?: string;
  image_url?: string;
  product_link?: string;
}

export interface Message {
  type: "user" | "assistant";
  text?: string;
  isButton?: boolean;
  products_recommendations?: ProductRecommendation[]; // Array of product recommendations
}

export interface ShopData {
  initial_message: string;
  initial_suggestions: string[];
  primary_color: string;
  test_mode: boolean;
}
