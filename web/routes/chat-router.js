import { Router } from 'express';
import Shop from '../db/models/shopModel.js';

export const chatRouter = () => {
    const router = Router();

    router.get("/shop/data", async (req, res) => {
        const shopDomain = req.query.domain;

        if (!shopDomain) {
            console.log("Shop domain was not specified at /shop/chat/data request")
            return res.status(400).send({ error: "Shop domain was not specified" })
        }

        try {
            const shopData = await Shop.findOne(
                { domain: shopDomain },
                { initial_message: 1, initial_suggestions: 1, primary_color: 1, _id: 0 }
            ).lean()

            if (shopData) {
                return res.status(200).send(shopData)
            }

            return res.status(404).send({ error: "Shop not found", shopDomain })

        } catch (error) {
            console.log("Error getting shop data for domain: " + shopDomain)
            res.status(500).send("Error getting shop data for domain: " + shopDomain)
        }
    })

    return router;
}  