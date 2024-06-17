//bg-blue-950 border-blue-950
//bg-zinc-900 border-zinc-900
//bg-rose-950 border-rose-950
//bg-yellow-700 border-yellow-700
//bg-orange-700 border-orange-700

import { PRODUCTS_PRICES } from "@/config/products";

export const COLORS = [
  {
    label: "Black",
    value: "black",
    tw: "zinc-900",
  },
  {
    label: "Blue",
    value: "blue",
    tw: "blue-950",
  },
  {
    label: "Rose",
    value: "rose",
    tw: "rose-950",
  },
  {
    label: "Yellow",
    value: "yellow",
    tw: "yellow-700",
  },
  {
    label: "Orange",
    value: "orange",
    tw: "orange-700",
  },
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhoneX",
      value: "iphoneX",
    },
    {
      label: "iPhone 11",
      value: "iphone11",
    },
    {
      label: "iPhone 12",
      value: "iphone12",
    },
    {
      label: "iPhone 13",
      value: "iphone13",
    },
    {
      label: "iPhone 14",
      value: "iphone14",
    },
    {
      label: "iPhone 15",
      value: "iphone15",
    },
  ],
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicon",
      value: "silicon",
      description: undefined,
      price: PRODUCTS_PRICES.material.silicon,
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch resistant coating",
      price: PRODUCTS_PRICES.material.polycarbonate,
    },
  ],
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICES.finish.smooth,
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCTS_PRICES.finish.textured,
    },
  ],
} as const;
