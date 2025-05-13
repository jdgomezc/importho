import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface Props {
  className?: string;
  courses: {
    title: string;
    slug: string;
  }[];
}

export function NavSheet({ courses, className }: Props) {
  const brands = [
    {
      title: "IMPORTHO",
      href: "/importho",
    },
    {
      title: "GUMMETAL",
      href: "/gummetal",
    },
    {
      title: "Enjuagues dentales",
      href: "/mouthwashes",
      // description: "Gummetal es una marca de productos de ortodoncia y su aprendizaje.",
    },
    {
      title: "Todos los productos",
      href: "/catalog",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant="outline">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <nav className="flex flex-col gap-6 pt-2">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-primary">Catálogo</h4>
              <div className="flex flex-col gap-4">
                {brands.map((brand) => (
                  <SheetClose asChild key={brand.title}>
                    <a
                      href={brand.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {brand.title}
                    </a>
                  </SheetClose>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-primary">Cursos</h4>
              <div className="flex flex-col gap-4">
                {courses?.map(({ title, slug }) => (
                  <SheetClose asChild key={slug}>
                    <a
                      href={slug}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors max-w-72"
                    >
                      {title}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <a
                    href={`/courses`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Todos los cursos
                  </a>
                </SheetClose>
              </div>
            </div>

            <SheetClose asChild>
              <a
                href="/contact"
                className="text-lg text-primary transition-colors font-bold"
              >
                Contáctanos
              </a>
            </SheetClose>
          </nav>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
