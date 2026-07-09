import type { SupportedLanguageCode } from "./language";

export type LocalizedText = Record<SupportedLanguageCode, string>;

export type MenuItemLabel =
  | "vegetarian"
  | "vegan"
  | "spicy"
  | "gluten_free"
  | "new"
  | "contains-seafood"
  | "contains-dairy"
  | "contains-nuts";

export interface MenuItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string | null;
  labels?: MenuItemLabel[];
}

export interface MenuCategory {
  id: string;
  name: LocalizedText;
  items: MenuItem[];
}

export interface Menu {
  categories: MenuCategory[];
}
