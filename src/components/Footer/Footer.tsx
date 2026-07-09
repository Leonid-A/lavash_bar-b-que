"use client";

import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { restaurant } from "@/data";
import { useLanguage } from "@/hooks";
import { getLocalizedText } from "@/utils";

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
          className="hover:text-stone-900"
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
          className="hover:text-stone-900"
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

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div
        className={`page-container grid gap-10 py-14 sm:gap-8 sm:py-16 ${gridColsClass} lg:gap-12`}
      >
        <div>
          <h2 className="font-display text-lg font-semibold text-stone-900">
            {restaurant.name}
          </h2>
          <ul className="mt-4 space-y-3">
            {contactRows.map(({ key, icon: Icon, content }) => (
              <li
                key={key}
                className="flex items-center gap-3 text-sm text-stone-600"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-stone-400"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {content}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-stone-900 uppercase">
            Working Hours
          </h3>
          <p className="mt-4 flex items-center gap-3 text-sm text-stone-600">
            <Clock
              className="h-4 w-4 shrink-0 text-stone-400"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            {getLocalizedText(restaurant.workingHours, language)}
          </p>
        </div>

        {socialLinks.length > 0 ? (
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-stone-900 uppercase">
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
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors duration-200 hover:border-stone-400 hover:text-stone-900"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-stone-200 py-6 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} {restaurant.name}. All rights reserved.
      </div>
    </footer>
  );
}
