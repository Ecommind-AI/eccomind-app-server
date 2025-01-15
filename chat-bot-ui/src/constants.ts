import { Message } from "./types";

export const defaultInitialMessages: Message[] = [
  { type: "assistant", text: "How can we help you today? 👋" },
  // {
  //   type: "user",
  //   text: "What are the benefits of wearing barefoot shoes?",
  //   isButton: true,
  // },
  // {
  //   type: "user",
  //   text: "What if the size I choose doesn’t fit?",
  //   isButton: true,
  // },
  // {
  //   type: "user",
  //   text: "What types of shoes does Rutsu Barefoot offer?",
  //   isButton: true,
  // },
];
export const ECOMMIND_SERVER_URL =
  "https://sales-mate-app.onrender.com";

export const SHOP_DOMAIN =
  window.shopDomain || "shoesstore123235.myshopify.com";

export const CURRENCY_SYMBOLS: Record<string, string> = {
  ILS: "₪",
  USD: "$",
};
