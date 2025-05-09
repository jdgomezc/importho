// @ts-check
import { defineConfig, envField, passthroughImageService } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: passthroughImageService(),
  },
  integrations: [react()],
  env: {
    schema: {
      FACEBOOK_URL: envField.string({
        access: "public",
        context: "server",
      }),
      WHATSAPP_URL: envField.string({
        access: "public",
        context: "server",
      }),
      PHONE_URL: envField.string({
        access: "public",
        context: "server",
      }),
      PHONE_NUMBER: envField.string({
        access: "public",
        context: "server",
      }),
      INSTAGRAM_URL: envField.string({
        access: "public",
        context: "server",
      }),
      UBICATION_URL: envField.string({
        access: "public",
        context: "server",
      }),
    },
  },
});
