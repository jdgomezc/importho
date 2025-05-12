import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/imaages-carousel";

import banner_1 from "@/assets/banner/banner-1.jpeg";
import banner_2 from "@/assets/banner/banner-2.png";
import banner_3 from "@/assets/banner/banner-3.jpg";

export default function ImagesCarousel() {
  const height = "h-fit";

  const images = [banner_1, banner_2, banner_3];

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
        {images.map(({ src }, i) => (
          <CarouselItem key={i}>
            <div className="select-none">
              <Card className={"p-0 border-0"}>
                <CardContent
                  className={`flex items-center justify-center p-0 ${height}`}
                >
                  <img
                    src={src}
                    alt={`image_${i + 1}`}
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
