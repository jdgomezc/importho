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
}

export function NavSheet({ className }: Props) {
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
    <Sheet>
      <SheetTrigger asChild className={className}>
        <Button variant="outline">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <nav className="flex flex-col gap-6 pt-2">
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-primary">Marcas</h4>
              <div className="flex flex-col gap-2">
                {brands.map((brand) => (
                  <a
                    key={brand.title}
                    href={brand.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {brand.title}
                  </a>
                ))}
              </div>
            </div>

            <SheetClose asChild>
              <a
                href="/catalog"
                className="text-lg text-primary transition-colors font-bold"
              >
                Catálogo
              </a>
            </SheetClose>

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
