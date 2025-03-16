import { useState } from "react";

export default function CustomCarousel({images}) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto max-h-[500px]">
      <div className="overflow-hidden rounded-xl">
        <img
          src={images[current]}
          alt={`Slide ${current + 1}`}
          className="w-full h-auto object-contain transition-transform duration-500"
        />
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-gray-900" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
