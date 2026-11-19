import { useEffect, useState } from "react";
import useCarousel from "../../hooks/useCarousel";
import usePageVisibleInView from "../../hooks/usePageVisibleInView";

const arrowClass =
  "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 shadow transition hover:bg-white";

// images: array of { src, caption? }.
// With autoPlay, slides only advance while the carousel is visible and not hovered.
export default function Carousel({ images, autoPlay = false, interval = 4000 }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = usePageVisibleInView(autoPlay);
  const { index, goTo, next, prev } = useCarousel(images.length, {
    autoPlay,
    interval,
    paused: hovered || !visible,
  });
  const nextSrc = images.length > 1 ? images[(index + 1) % images.length].src : null;

  // Warm the cache for the next slide so advancing doesn't flash an empty frame.
  useEffect(() => {
    if (nextSrc) new Image().src = nextSrc;
  }, [nextSrc]);

  if (images.length === 0) return null;
  const slide = images[index];
  const multiple = images.length > 1;

  return (
    <figure
      ref={ref}
      className="mx-auto w-full max-w-3xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
        <img
          src={slide.src}
          alt={slide.caption || `Photo ${index + 1} of ${images.length}`}
          className="h-full w-full object-contain"
          loading="lazy"
          decoding="async"
        />
        {multiple && (
          <>
            <button type="button" onClick={prev} aria-label="Previous photo" className={`${arrowClass} left-3`}>
              ❮
            </button>
            <button type="button" onClick={next} aria-label="Next photo" className={`${arrowClass} right-3`}>
              ❯
            </button>
          </>
        )}
      </div>
      {slide.caption && <figcaption className="mt-3 text-center text-sm text-body">{slide.caption}</figcaption>}
      {multiple && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {images.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-2.5 bg-line hover:bg-faint"
              }`}
            />
          ))}
        </div>
      )}
    </figure>
  );
}
