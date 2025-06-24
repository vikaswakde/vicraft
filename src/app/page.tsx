import {
  CircleUser,
  CreditCard,
  Menu,
  MessageSquare,
  Music,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const crafts = [
  {
    id: "feedback-button",
    craft: "FeedbackButton",
    href: "/craft/feedback-button",
    icon: MessageSquare,
    alt: "Feedback icon",
  },
  {
    id: "gooey-menu",
    craft: "GooeyMenu",
    href: "/craft/gooey-menu",
    icon: Menu,
    alt: "GooeyMenu icon",
  },
  {
    id: "radial-menu",
    craft: "RadialMenu",
    href: "/craft/radial-menu",
    icon: CircleUser,
    alt: "RadialMenu icon",
  },
  // {
  //   id: 'airport-airplane-take-off',
  //   craft: 'AirportAirPlaneTakeOff',
  //   href: '/craft/airport-airplane-take-off',
  //   icon: Plane,
  //   alt: 'AirportAirPlaneTakeOff icon'
  // },
  {
    id: "apple-music-lyrics-animation",
    craft: "AppleMusicLyricsAnimation",
    href: "https://apple-music-lyrics-animation-devnagri.vercel.app/",
    icon: Music,
    alt: "Apple Music Lyrics Animation icon",
  },
  {
    id: "pocket-card",
    craft: "PocketCard",
    href: "/craft/pocket-card",
    icon: CreditCard,
    alt: "PocketCard icon",
  },
  // Add other crafts here
];

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-5xl">viCrafts</h1>

        <ul className="list-inside list-none text-sm text-center sm:text-left font-(family-name:--font-geist-mono)">
          {crafts.map((craft) => (
            <li key={craft.id} className="mb-2">
              <Link
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href={craft.href}
              >
                {React.createElement(craft.icon, {
                  "aria-hidden": true,
                  size: 16,
                  className: "shrink-0",
                })}
                {craft.craft}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/vikaswakde"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"
            alt="File icon"
            width={26}
            height={26}
            className="invert"
          />
          Github
        </a>
      </footer>
    </div>
  );
}
