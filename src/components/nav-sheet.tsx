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
    },
    {
      title: "GUMMETAL",
      href: "/gummetal",
    },
    {
      title: "Todos los productos",
      href: "/catalog",
    },
  ];

  const courses = [
    {
      title: "Sistemas Ertty",
      href: "/ertty",
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
              <h4 className="font-bold text-lg text-primary">Catálogo</h4>
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                {courses.map((course) => (
                  <SheetClose asChild key={course.title}>
                    <a
                      href={course.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {course.title}
                    </a>
                  </SheetClose>
                ))}
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
