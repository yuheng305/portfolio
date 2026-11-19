import { MAP } from "../../data/vietnamMap";

// Same Mercator projection the map paths were generated with, for placing pins.
export function project([lon, lat]) {
  const { scale, tx, ty } = MAP.mercator;
  const λ = (lon * Math.PI) / 180;
  const φ = (lat * Math.PI) / 180;
  return [tx + scale * λ, ty - scale * Math.log(Math.tan(Math.PI / 4 + φ / 2))];
}

// Darkens (amount < 0) or lightens (amount > 0) a #rrggbb colour.
export function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const channel = (shift) => {
    const c = (n >> shift) & 255;
    const target = amount < 0 ? 0 : 255;
    return Math.round(c + (target - c) * Math.abs(amount));
  };
  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

// First four-digit year in a label ("08/2025", "Summer 2020", "2015 – 2018"); "Today" sorts last.
export const sortYear = (label = "") => Number(label.match(/\d{4}/)?.[0] ?? 9999);
