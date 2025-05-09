"use client";

import { useState, useEffect } from "react";

interface Props {
  products: ClientProductEntry[];
}

export function Results({ products }: Props) {
  const [filteredProducts, setFilteredProducts] =
    useState<ClientProductEntry[]>(products);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // This effect runs on the client after hydration
    const params = new URLSearchParams(window.location.search);
    const queryFromUrl = params.get("q")?.toLowerCase() || "";
    setSearchQuery(queryFromUrl);

    if (!products) {
      setIsLoading(false);
      setFilteredProducts([]); // Handle case where products might be undefined/null initially
      return;
    }

    if (queryFromUrl) {
      const filtered = products.filter((product) => {
        const titleMatch = (product.data.title || "")
          .toLowerCase()
          .includes(queryFromUrl);
        const brandMatch = (product.data.brand || "")
          .toLowerCase()
          .includes(queryFromUrl);
        const nameMatch = (product.data.name || "")
          .toLowerCase()
          .includes(queryFromUrl);
        return titleMatch || brandMatch || nameMatch;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all if no query
    }
    setIsLoading(false);
  }, [products]); // Rerun when products changes (though typically it won't after initial load)
  // We don't add window.location.search directly as it's not reactive state
  // For true reactivity to URL changes without full page reloads (e.g. using Next/React Router),
  // you'd use router events or hooks like `useSearchParams`.
  // For this MPA setup, this useEffect runs once on page load/hydration.

  if (isLoading) {
    // Optional: show a loading state, though filtering should be fast
    return <p className="text-center text-lg">Cargando resultados...</p>;
  }

  // You might want to use a utility or a shared component for product URLs if they are dynamic
  const getProductUrl = (product: ClientProductEntry) =>
    `/product/${product.id}`; // Example

  return (
    <article className="flex flex-col h-full w-10/12 mx-auto my-auto gap-8 mt-4 md:mt-auto md:gap-16 pb-24 md:pb-0">
      <h1 className="text-4xl text-center font-bold text-primary">
        {searchQuery ? (
          <p className="font-normal">
            Resultados de <b className="">{searchQuery}</b>
          </p>
        ) : (
          <p>Todos los productos</p>
        )}
      </h1>
      {filteredProducts.length > 0 ? (
        <ul className="pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-12 max-w-[90rem] place-items-center items-start mx-auto">
          {filteredProducts.map(
            ({ data: { title, price, img, brand, name } }, i) => {
              return (
                <li key={i}>
                  <a
                    href={`/${name}`}
                    className="w-72 flex flex-col gap-4 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={img}
                      alt={title}
                      className="size-72 bg-gradient-to-b from-zinc-100 to-zinc-300 object-contain"
                      draggable="false"
                    />
                    <section className="flex flex-col">
                      <h2 className="text-base font-bold text-zinc-700">
                        {title}
                      </h2>
                      <p className="text-sm text-zinc-500">{brand}</p>
                      <p className="text-sm text-zinc-600">{price}</p>
                    </section>
                  </a>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <article className="text-center text-lg">
          {searchQuery ? (
            <p>
              No se encontraron resulatos para <b>{searchQuery}</b>.
            </p>
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </article>
      )}
    </article>
  );
}

export default Results;
