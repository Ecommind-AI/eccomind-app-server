// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import shopify from "./shopify.js";
import { fetchAllProducts } from "./products/fetch-all-products.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import { registerWebhooksForAllShops } from "./webhooks/register-webhooks.js";
import { customerWebhooksHandlers } from "./webhooks/webhook-handlers.js/customer-webhooks-handlers.js";
import { productsWebhooksHandlers } from "./webhooks/webhook-handlers.js/products-webhooks-handlers.js";
import { onInstall } from "./middlewares/on-install-middlware.js";
import { chatRouter } from "./routes/chat-router.js";
import { merchantRouter } from "./routes/merchat-router.js";

dotenv.config();

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "8000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  onInstall,
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: { ...customerWebhooksHandlers, ...productsWebhooksHandlers } })
);


// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/auth/*", shopify.validateAuthenticatedSession());
app.use("/api/merchant", shopify.validateAuthenticatedSession(), merchantRouter());
app.use("/api/chat", chatRouter())

app.use(express.json());

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});


const startServer = async () => {
  await connectDB()
  await registerWebhooksForAllShops()
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
  });
}

await startServer()

