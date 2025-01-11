import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../extensions/chat-bot/assets', // Output to Shopify's assets folder
    rollupOptions: {
      input: './src/main.tsx', // Main entry point for your React app
      output: {
        entryFileNames: 'chatbot.js', // Ensure the output file is named chatbot.js
        assetFileNames: '[name].[ext]', // Handle other assets (e.g., CSS, images)
      },
    },
    minify: 'terser', // Use Terser for minification
    terserOptions: {
      mangle: {
        toplevel: true, // Mangle top-level variable names to avoid conflicts
      },
      compress: {
        drop_console: true, // Optional: Remove console logs
      },
    },
  },
  publicDir: false, // Prevent copying unnecessary files
});
