import { Router } from 'express';
import { fetchAllProducts } from '../products/fetch-all-products.js';
import Shop from '../db/models/shopModel.js';


export const merchantRouter = () => {
  const router = Router()

  router.get("/shop/data", async (_req, res) => {
    const { accessToken, shop } = res.locals.shopify.session;

    try {
      // Fetch shop data from the database
      const data = await Shop.findOne(
        { domain: shop },
        {
          initial_message: true,
          initial_suggestions: true,
          delivery_description: true,
          returns_policy: true,
          shop_description: true,
          general_information: true,
          primary_color: true,
          secondary_color: true,
          FAQs: true,
        }
      ).lean();

      // Transform FAQs string to array format
      if (data?.FAQs) {
        const faqsArray = data.FAQs.split("Q:")
          .filter(Boolean)
          .map((faq) => {
            const [question, answer] = faq.split("A:").map((str) => str.trim());
            return { question, answer };
          });

        // Replace the FAQs string with the transformed array
        data.FAQs = faqsArray;
      }

      res.status(200).send(data);
    } catch (error) {
      console.error("Error fetching shop data:", error.message);
      res.status(500).send({ error: error.message });
    }
  });

  router.put("/shop/data", async (req, res) => {
    const { accessToken, shop } = res.locals.shopify.session;
    const updatedData = req.body;

    try {
      // Transform FAQs array back to string format
      if (updatedData.FAQs && Array.isArray(updatedData.FAQs)) {
        updatedData.FAQs = updatedData.FAQs
          .map(faq => `Q: ${faq.question}\nA: ${faq.answer}`)
          .join("\n\n");
      }

      // Update the shop data in the database
      const result = await Shop.updateOne(
        { domain: shop },
        { $set: updatedData }
      );

      if (result.modifiedCount > 0) {
        res.status(200).send({ message: "Shop data updated successfully." });
      } else {
        res.status(404).send({ error: "Shop not found." });
      }
    } catch (error) {
      console.error("Error updating shop data:", error.message);
      res.status(500).send({ error: error.message });
    }
  });



  return router;
}
