import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/imaages-carousel";

import mouthwashers from "@/assets/mouthwashers/mouthwasher-3.webp";
import banner_2 from "@/assets/banner/banner-2.webp";

interface Props {
  courses?: {
    title: string;
    slug: string;
    img: string;
    status?: "past" | "active" | "upcoming";
    year?: number;
  }[];
}

export default function ImagesCarousel({ courses = [] }: Props) {
  const height = "h-fit";

  const banners = [banner_2, mouthwashers];

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className={`w-full ${height}`}
    >
      <CarouselContent>
        {courses.map(({ slug, title, img, status, year }, i) => (
          <CarouselItem key={`course-${i}`}>
            <a href={slug} className="select-none relative block">
              <Card className={"p-0 border-0"}>
                <CardContent
                  className={`flex items-center justify-center p-0 ${height}`}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-auto object-cover"
                    draggable="false"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "low"}
                  />
                </CardContent>
              </Card>
              {status === "past" && year && (
                <span className="absolute top-3 left-3 md:top-5 md:left-5 bg-zinc-900/80 text-zinc-100 text-xs md:text-sm font-semibold px-3 py-1 rounded-full">
                  Curso pasado {year}
                </span>
              )}
            </a>
          </CarouselItem>
        ))}
        {banners.map(({ src }, i) => (
          <CarouselItem key={`banner-${i}`}>
            <div className="select-none">
              <Card className={"p-0 border-0"}>
                <CardContent
                  className={`flex items-center justify-center p-0 ${height}`}
                >
                  <img
                    src={src}
                    alt={`banner-${i + 1}`}
                    className="w-full h-auto object-cover"
                    draggable="false"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={i === 0 ? "high" : "low"}
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
