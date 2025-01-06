import { fetchShopData } from "./fetch-shop-data.js";
import { fetchAllProducts } from "../products/fetch-all-products.js";
import Shop from "../db/models/shopModel.js";
import Products from "../db/models/productModel.js";
import { syncShopProducts } from "../products/sync-shop-products.js";


/**
 * Fetch shop data and all products for a given shop.
 * @param {string} shop - The shop domain.
 * @param {string} accessToken - The access token for the shop.
 * @returns {Promise<Object>} - Returns a promise that resolves to an object containing shop data and products.
 */
export async function initShop(shop, accessToken) {
    try {
        const shopData = await fetchShopData(shop, accessToken);

        // Save shop data to MongoDB
        await Shop.findOneAndUpdate(
            { id: shopData.id },
            {
                ...shopData,
                domain: shop,
                initial_message: "How can we help you today? 👋",
                initial_suggestions: ["What are your best-selling products right now?"],
                primary_color: "#2563EB"
            },
            { upsert: true, new: true }
        );

        await syncShopProducts(shop, accessToken)
    } catch (error) {
        console.error("Error initializing shop data and products:", error.message);
    }
}
