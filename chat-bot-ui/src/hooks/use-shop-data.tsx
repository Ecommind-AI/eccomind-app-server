import { useEffect, useState } from "react";
import { ShopData } from "../types";
import { EcommindServerAPI } from "../api/eccommind-api";

export const useShopData = (shopDomain: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shopData, setShopData] = useState<ShopData | null>(null);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopData = await EcommindServerAPI.getShopData(shopDomain);
        setShopData(shopData);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopData();
  }, [shopDomain]);

  return { shopData, isLoading };
};
