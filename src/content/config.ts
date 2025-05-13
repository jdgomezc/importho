import { defineCollection, z } from "astro:content";

const products = defineCollection({
  schema: z.object({
    title: z.string(),
    price: z.string(),
    img: z.string(),
    brand: z.string(),
    name: z.string(),
  }),
});

const courses = defineCollection({
  schema: z.object({
    title: z.string(),
    img: z.string(),
    brand: z.string(),
  }),
});

export const collections = {
  products,
  courses,
};
