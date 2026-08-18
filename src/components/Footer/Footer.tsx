"use client";

import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { restaurant } from "@/data";
import { useLanguage } from "@/hooks";
import type { LocalizedText } from "@/types";
import { getLocalizedText } from "@/utils";

const FIND_US_LABEL: LocalizedText = {
  en: "Find Us",
  hy: "Ինչպես գտնել մեզ",
};

const OPEN_IN_MAPS_LABEL: LocalizedText = {
  en: "Open in Google Maps",
  hy: "Բացել Google Maps-ում",
};

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 21v-8h2.5l.5-3.5H15V7.5c0-1 .3-1.5 1.5-1.5H18V3h-2.4C13 3 12 4.3 12 6.7v2.8H10v3.5h2V21" />
    </svg>
  );
}

export default function Footer() {
  const { language } = useLanguage();

  const contactRows: { key: string; icon: LucideIcon; content: ReactNode }[] = [
    {
      key: "address",
      icon: MapPin,
      content: getLocalizedText(restaurant.address, language),
    },
    {
      key: "phone",
      icon: Phone,
      content: (
        <a
          href={`tel:${restaurant.phone}`}
          aria-label={`Call ${restaurant.phone}`}
          className="cursor-pointer hover:text-menu-gold"
        >
          {restaurant.phone}
        </a>
      ),
    },
    {
      key: "email",
      icon: Mail,
      content: (
        <a
          href={`mailto:${restaurant.email}`}
          aria-label={`Email ${restaurant.email}`}
          className="cursor-pointer hover:text-menu-gold"
        >
          {restaurant.email}
        </a>
      ),
    },
  ];

  const socialLinks = [
    {
      key: "instagram",
      href: restaurant.socials.instagram,
      label: "Instagram",
      icon: InstagramIcon,
    },
    {
      key: "facebook",
      href: restaurant.socials.facebook,
      label: "Facebook",
      icon: FacebookIcon,
    },
  ].filter((social) => social.href.length > 0);

  const gridColsClass =
    socialLinks.length > 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";

  const mapQuery = encodeURIComponent(`${restaurant.name}, ${restaurant.address.en}`);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <footer className="border-t border-menu-border bg-menu-bg">
      <div
        className={`page-container grid gap-10 py-14 sm:gap-8 sm:py-16 ${gridColsClass} lg:gap-12`}
      >
        <div>
          <h2 className="font-display text-lg font-semibold text-menu-gold">
            {restaurant.name}
          </h2>
          <ul className="mt-4 space-y-3">
            {contactRows.map(({ key, icon: Icon, content }) => (
              <li
                key={key}
                className="flex items-center gap-3 text-sm text-menu-cream/80"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-menu-gold/50"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {content}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-sm font-semibold tracking-wide text-menu-gold uppercase">
            {getLocalizedText(FIND_US_LABEL, language)}
          </h3>
          <a
            href={mapLinkHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${restaurant.name} location in Google Maps`}
            className="focus-ring group relative mt-3 block h-36 w-full overflow-hidden rounded-2xl border border-menu-border sm:h-40"
          >
            <iframe
              src={mapEmbedSrc}
              title={`Map showing ${restaurant.name}`}
              tabIndex={-1}
              aria-hidden="true"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none h-full w-full transition-opacity duration-200 group-hover:opacity-90"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-menu-bg/85 px-3 py-1.5 text-xs font-medium text-menu-gold">
              {getLocalizedText(OPEN_IN_MAPS_LABEL, language)}
            </span>
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-menu-gold uppercase">
            Working Hours
          </h3>
          <p className="mt-4 flex items-center gap-3 text-sm text-menu-cream/80">
            <Clock
              className="h-4 w-4 shrink-0 text-menu-gold/50"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {getLocalizedText(restaurant.workingHours, language)}
          </p>
        </div>

        {socialLinks.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-menu-gold uppercase">
              Follow Us
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ key, href, label, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-menu-border text-menu-cream/70 transition-colors duration-200 hover:border-menu-gold/60 hover:text-menu-gold"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-menu-border py-6 text-center text-xs text-menu-cream/40">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </div>
    </footer>
  );
}
