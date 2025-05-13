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

interface Props {
  courses: {
    title: string;
    slug: string;
  }[];
}

export function Navigation({ courses }: Props) {
  const brands = [
    {
      title: "IMPORTHO",
      href: "/importho",
      // description: "Importho es una marca de productos de ortodoncia.",
    },
    {
      title: "GUMMETAL",
      href: "/gummetal",
      // description: "Gummetal es una marca de productos de ortodoncia y su aprendizaje.",
    },
    {
      title: "Todos los productos",
      href: "/catalog",
      // description: "Gummetal es una marca de productos de ortodoncia y su aprendizaje.",
    },
  ];

  return (
    <>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={"text-zinc-600"}>
              Catálogo
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-48 py-1 relative">
                {brands.map((brand) => (
                  <li className="w-full">
                    <a
                      href={brand.href}
                      className="text-primary rounded-sm p-2 w-full flex hover:bg-zinc-100"
                    >
                      {brand.title}
                    </a>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={"text-zinc-600"}>
              Cursos
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-48 py-1 relative">
                {courses?.map((course) => (
                  <li className="w-full">
                    <a
                      href={course.slug}
                      className="text-primary rounded-sm p-2 w-full flex hover:bg-zinc-100"
                    >
                      {course.title}
                    </a>
                  </li>
                ))}
                <li className="w-full">
                  <a
                    href={"/courses"}
                    className="text-primary rounded-sm p-2 w-full flex hover:bg-zinc-100"
                  >
                    Todos los cursos
                  </a>
                </li>
              </ul>
            </NavigationMenuContent>
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
