import { Router } from 'express';
import { fetchAllProducts } from '../products/fetch-all-products.js';


export const merchantRouter = () => {
    const router = Router()

    router.get("/products/all-rest", async (_req, res) => {
      const { accessToken, shop } = res.locals.shopify.session;
    
      try {
        const products = await fetchAllProducts(shop, accessToken);
        res.status(200).send({ products });
      } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).send({ error: error.message });
      }
    });

    return router;
}
