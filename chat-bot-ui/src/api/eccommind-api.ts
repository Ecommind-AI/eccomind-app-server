import axios from "axios";
import { ShopData } from "../types";
import { ECOMMIND_SERVER_URL } from "../constants";

const getShopData = async (shopDomain: string): Promise<ShopData | null> => {
  try {
    return (
      await axios.get(
        `${ECOMMIND_SERVER_URL}/api/chat/shop/data?domain=${shopDomain}`
      )
    ).data as ShopData;
  } catch (error: any) {
    console.log("Error fetching chat shop related data", error);
    return null;
  }
};

export const EcommindServerAPI = {
  getShopData,
};
