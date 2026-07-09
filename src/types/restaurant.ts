import type { LocalizedText } from "./menu";

export interface RestaurantSocials {
  instagram: string;
  facebook: string;
}

export interface Restaurant {
  name: string;
  subtitle: LocalizedText;
  logo: string;
  phone: string;
  email: string;
  address: LocalizedText;
  workingHours: LocalizedText;
  socials: RestaurantSocials;
}
