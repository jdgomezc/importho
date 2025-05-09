declare global {
  // Updated interface to match Astro's collection entry more closely for the data part
  interface ProductData {
    title: string;
    price: string; // Price from collection might be a string
    img: string;
    brand?: string;
    name?: string;
    // Add any other relevant fields from your product collection data
  }

  // This is the structure we expect for each item in the products prop
  interface ClientProductEntry {
    id: string; // or slug
    data: ProductData;
  }
}

export {};
