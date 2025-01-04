import { useEffect, useState } from "react";
import { ShopData } from "../types";
import { EcommindServerAPI } from "../api/eccommind-api";
import { SHOP_DOMAIN } from "../constants";

export const useShopData = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shopData, setShopData] = useState<ShopData | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopData = await EcommindServerAPI.getShopData(SHOP_DOMAIN);
        setShopData(shopData);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, []);

  return { shopData, isLoading };
};
