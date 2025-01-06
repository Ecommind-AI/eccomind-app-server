import Products from "../db/models/productModel";
import { fetchAllProducts } from "./fetch-all-products";

export const syncShopProducts = async (shopDomain, accessToken) => {
    const products = await fetchAllProducts(shopDomain, accessToken);

    // Save products to MongoDB using bulk operations
    const bulkOps = products.map((product) => ({
        updateOne: {
            filter: { id: product.id },
            update: { ...product, shop_domain: shopDomain, created_at: new Date() },
            upsert: true, // Insert if it doesn't exist
        },
    }));
    const result = await Products.bulkWrite(bulkOps);
    console.log(`Bulk operation successful: ${result.nModified} documents updated.`);
    console.log(`Saved ${products.length} products for shop: ${shopDomain}`);
}