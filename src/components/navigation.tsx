"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import type { ElementRef } from "react";
import { NavSheet } from "@/components/nav-sheet";

export function Navigation() {
  const brands = [
    {
      title: "IMPORTHO",
      href: "/importho",
      description: "Importho es una marca de productos de ortodoncia.",
    },
    {
      title: "GUMMETAL",
      href: "/gummetal",
      description:
        "Gummetal es una marca de productos de ortodoncia y su aprendizaje.",
    },
    {
      title: "ERTTY",
      href: "/ertty",
      description:
        "Sistemas Ertty es una organización que ofrece servicios de capacitación y formación en ortodoncia.",
    },
  ];

  return (
    <>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={"text-zinc-600"}>
              Marcas
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col gap-2 w-96 relative">
                {brands.map((brand) => (
                  <ListItem href={brand.href} title={brand.title}>
                    {brand.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <a
              href="/catalog"
              className={cn(navigationMenuTriggerStyle(), "text-zinc-600")}
            >
              Catálogo
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <a
              href="/contact"
              className={cn(navigationMenuTriggerStyle(), "text-zinc-600")}
            >
              Contáctanos
            </a>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavSheet className="flex md:hidden" />
    </>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none text-primary">
              {title}
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
