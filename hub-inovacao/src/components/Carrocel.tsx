import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import PassouEncontrou from "@/assets/Startups/PassouEncontrou.png"
import DecodeByte from "@/assets/Startups/DecodeByte.png"
import Elementum from "@/assets/Startups/Elementum.png"
import NOOK from "@/assets/Startups/NOOK.png"
import ARETIZZE from "@/assets/Startups/ARETIZZE.png"

export default function Carrossel() {
  return (
    <div className="relative flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        loop={true}
        speed={500}
        spaceBetween={20} // Espaço entre os slides
        slidesPerView={1}
        navigation={{ prevEl: ".prev-btn", nextEl: ".next-btn" }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        className="w-full max-w-7xl h-auto md:h-[530px] flex items-center justify-center"
      >
        {[PassouEncontrou, DecodeByte, Elementum, NOOK, ARETIZZE].map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center flex-shrink-0 mt-40">
            <Image src={logo} alt={`Logo ${index + 1}`} className="w-auto h-[200px] object-contain" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}