import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/imaages-carousel";

import mouthwashers from "@/assets/mouthwashers/mouthwasher-3.jpg";
import banner_2 from "@/assets/banner/banner-2.png";

interface Props {
  courses: {
    title: string;
    slug: string;
    img: string;
  }[];
}

export default function ImagesCarousel({ courses }: Props) {
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
        {courses.map(({ slug, title, img }, i) => (
          <CarouselItem key={`course-${i}`}>
            <a href={slug} className="select-none">
              <Card className={"p-0 border-0"}>
                <CardContent
                  className={`flex items-center justify-center p-0 ${height}`}
                >
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-auto object-cover"
                    draggable="false"
                  />
                </CardContent>
              </Card>
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
