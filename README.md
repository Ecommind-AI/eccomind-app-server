# Shopify AI Chatbot Assistant

## Project Overview

This project is a plug-and-play Shopify app created using the Shopify CLI. It provides an AI chatbot assistant that Shopify merchants can install and customize to fit their store's branding and policies. The app comes with an admin panel for customization and a theme extension for displaying the chatbot in the store.

The app has the following main functionalities:
- Fetches all shop products into the database upon installation.
- Provides a setup page where merchants can customize chatbot settings (e.g., shop description, return policy, contact details, colors).
- Offers a REST API to communicate with both the admin frontend and the chatbot theme extension.
- Listens to product updates via webhooks powered by Google Pub/Sub.

## Requirements

Before setting up the project, ensure you have the following installed:
- **Node.js** (version 16 or higher)
- **Shopify CLI**: Install it using the following command:
  ```bash
  npm install -g @shopify/cli@latest
  ```
- **npm** (comes with Node.js)
- **Render account** (for deploying the server)

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone <repository_url>
   cd ecommind-app-server
   ```

2. **Install Dependencies**
   Run `npm install` in the following directories:
   - Root directory:
     ```bash
     npm install
     ```
   - Web server directory:
     ```bash
     cd web
     npm install
     ```
   - Admin UI directory:
     ```bash
     cd frontend
     npm install
     ```
   - Chatbot UI extension directory:
     ```bash
     cd ../../extensions/chat-bot-ui
     npm install
     ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (`./ecommind-app-server`) and configure the required environment variables. Example:
   ```env
   SHOPIFY_API_KEY=<your_shopify_api_key>
   SHOPIFY_API_SECRET=<your_shopify_api_secret>
   SCOPES=read_products
   SHOPIFY_CHAT_BOT_ID=<your_chatbot_id>
   MONGO_URI=<your_mongo_connection_string>
   ```

   Additionally, create a `.env` file in the `./ecommind-app-server/web` directory with the following variable:
   ```env
   MONGO_URI=<your_mongo_connection_string>
   ```

4. **Run the Project**
   Use the following command from the root directory to start the app in development mode:
   ```bash
   npm run dev
   ```
   This command starts the Shopify app, including the admin UI and web server. The web server handles:
   - Serving static files for the admin panel UI.
   - Fetching and storing shop products upon installation.
   - Registering webhooks via Google Pub/Sub to track product updates.
   - Providing a REST API to the admin frontend and chatbot theme extension for retrieving and updating shop-specific configurations.

5. **Run the Chatbot Extension**
  Navigate to the `chat-bot-ui` directory and run ```npm run dev```
  This will run the chatbot extension locally for development purpose.

6. **Build the Chatbot Extension**
   Navigate to the `chat-bot-ui` directory and build the extension:
   ```bash
   cd extensions/chat-bot
   npm run build
   ```
   This will generate the static assets in the `./extensions/chat-bot/assets/` folder.

7. **Deploying the App**
   - **Deploy the Server on Render:**
     To deploy a new version of the app server, push your code to the `main` branch and then go to Render to deploy the latest commit.
   - **Deploy the Shopify Extension:**
     After building the chatbot extension, run the following command from the root directory to deploy the extension hosted on Shopify:
     ```bash
     npm run deploy
     ```

## Creating a New App Instance

If you want to create a new app instance to generate a different installation link (or for separate Shopify App Store listings), follow these steps:

1. **Clone the Repository**
   Create a new copy of this repository:
   ```bash
   git clone <repository_url> new-app-instance
   cd new-app-instance
   ```

2. **Update the `shopify.app.toml` File**
   Update the following properties in the `shopify.app.toml` file to reflect the new app:
   - **`client_id`**: Replace with the API key of the new app.
   - **`name`**: Set a new name for the app.
   - **`handle`**: Assign a unique handle for the app.
   - **`application_url`**: Set the URL where the new app will be hosted.
   - **`auth.redirect_urls`**: Update with the new callback URL (usually `<application_url>/api/auth/callback`).

3. **Set Up Environment Variables**
   Create a new `.env` file and update the values to match the new app:
   ```env
   SHOPIFY_API_KEY=<new_shopify_api_key>
   SHOPIFY_API_SECRET=<new_shopify_api_secret>
   SCOPES=read_products
   SHOPIFY_CHAT_BOT_ID=<new_chatbot_id>
   MONGO_URI=<your_mongo_connection_string>
   ```

   Ensure the same updates are made in the `./web/.env` file.

4. **Update Hosting Settings**
   If deploying the app server on Render or another hosting platform, set up a new service and configure it to use the updated repository and environment variables.

5. **Rebuild and Deploy the App**
   - Build the chatbot extension:
     ```bash
     cd extensions/chat-bot-ui
     npm run build
     ```
   - Deploy the server and Shopify extension:
     ```bash
     npm run deploy
     ```

6. **Test the New App Instance**
   Test the new app in a Shopify development store to ensure it works as expected and generates a new installation link.

## Explanation of `shopify.app.toml`

The `shopify.app.toml` file is a configuration file for the Shopify CLI, defining key parameters and settings for your app. Here's an explanation of its contents:

- **`client_id`**
  - The API key for your Shopify app. This is used to authenticate your app with Shopify.

- **`name`**
  - The name of your Shopify app as it appears in the Shopify admin and app store.

- **`handle`**
  - A unique identifier for your app. This is used internally by Shopify.

- **`application_url`**
  - The base URL where your app is hosted. Shopify redirects merchants to this URL for authentication and app interaction.

- **`embedded`**
  - Determines whether the app is embedded inside the Shopify admin (true) or runs externally (false).

### `[build]`
- **`automatically_update_urls_on_dev`**
  - Automatically updates URLs to point to your development store during local development.
- **`dev_store_url`**
  - Specifies the development store to use during app testing.
- **`include_config_on_deploy`**
  - Ensures the configuration is included when deploying the app.

### `[access_scopes]`
- **`scopes`**
  - Specifies the access scopes your app requires. For example, `read_products` allows the app to read product information from the store.

### `[auth]`
- **`redirect_urls`**
  - A list of redirect URLs for OAuth authentication. Shopify redirects users to these URLs after they log in.

### `[webhooks]`
- **`api_version`**
  - Specifies the Shopify API version used for webhooks.
- **`[[webhooks.subscriptions]]`**
  - Defines webhook subscriptions for your app. Each subscription includes:
    - **`topics`**: The topics to subscribe to (e.g., `products/create`, `products/delete`, `products/update`).
    - **`uri`**: The webhook destination. In this case, `pubsub://` specifies a Google Pub/Sub destination.

### `[pos]`
- **`embedded`**
  - Determines whether the app is embedded inside Shopify POS (Point of Sale).

## Project Structure

- **Root Directory (`./ecommind-app-server`)**
  - Contains the main server code (Node.js Express app).
  - Handles Shopify API integrations and webhooks.

- **Web Directory (`./ecommind-app-server/web`)**
  - Express.js server to serve the admin panel UI and handle backend operations.

- **Admin UI (`./ecommind-app-server/web/frontend`)**
  - A React app for the admin panel where merchants can customize their chatbot.

- **Chatbot UI Extension (`./ecommind-app-server/extensions/chat-bot-ui`)**
  - A React app built using Vite for the chatbot interface embedded in the store.
  - Outputs compiled assets (`chatbot.js`, `main.css`) into the `./extensions/chat-bot/assets/` folder.

- **Static Assets (`./ecommind-app-server/extensions/chat-bot/assets`)**
  - Contains the compiled JavaScript and CSS files for the chatbot UI extension.

## Development Notes

- **Theme Extension Integration**
  The chatbot theme extension includes a Liquid template file (`chatbot-popup.liquid`) with the following structure:
  ```liquid
  <div id="chatbot-root"></div>
  <script src="{{ 'chatbot.js' | asset_url }}"></script>
  <link href="{{ 'main.css' | asset_url }}" rel="stylesheet">
  <script>
    console.log("Shopify Domain:", Shopify.shop);
    window.shopDomain = Shopify.shop;
    document.addEventListener('DOMContentLoaded', function () {
      const root = document.getElementById('chatbot-root');
      if (root) {
        ReactDOM.createRoot(root).render(
          React.createElement(Chatbot)
        );
      }
    });
  </script>
  
  {% schema %}
  {
    "name": "Chatbot Popup",
    "target": "body",
    "settings": [
      {
        "type": "text",
        "id": "chatbot_greeting",
        "label": "Greeting Message",
        "default": "Hi there! How can I help you?"
      }
    ]
  }
  {% endschema %}
  ```

- **Build Configuration**
  The `vite.config.js` file in the chatbot UI ensures the build output is compatible with Shopify's assets folder structure. Example configuration:
  ```javascript
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    build: {
      outDir: '../extensions/chat-bot/assets',
      rollupOptions: {
        input: './src/main.tsx',
        output: {
          entryFileNames: 'chatbot.js',
          assetFileNames: '[name].[ext]'
        }
      },
      minify: 'terser',
      terserOptions: {
        mangle: {
          toplevel: true
        },
        compress: {
          drop_console: true
        }
      }
    },
    publicDir: false
  });
  ```

## License

[MIT License](./LICENSE)

## Contact

For support or inquiries, please contact [your_email@example.com].
