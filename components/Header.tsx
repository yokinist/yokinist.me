"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import BLOG from "~/blog.config";
import { locale } from "~/lib/i18n/lang";
import { toggleTheme } from "~/lib/theme";
import { Twemoji } from "./Twemoji";

const links = [
  { id: 1, name: locale.NAV.INDEX, to: "/", show: true },
  { id: 2, name: locale.NAV.ABOUT, to: "/about", show: BLOG.showAbout },
];

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const activeNav = pathname === links[1].to ? links[1].to : links[0].to;

  return (
    <div className="shrink-0">
      <ul className="flex flex-row items-center">
        {links.map(
          (link) =>
            link.show && (
              <li key={link.id} className="block ml-5 text-sm">
                <Link
                  href={link.to}
                  className={clsx("transition-colors", {
                    "text-zinc-900 dark:text-zinc-100": link.to === activeNav,
                    "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100":
                      link.to !== activeNav,
                  })}
                >
                  {link.name}
                </Link>
              </li>
            ),
        )}
        <li className="ml-3">
          <button
            className="block p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={toggleTheme}
            aria-label={locale.NAV.THEME}
            title={locale.NAV.THEME}
            type="button"
          >
            {/* Picked by the dark class on <html> */}
            <MoonIcon aria-hidden className="w-5 h-5 dark:hidden" />
            <SunIcon aria-hidden className="w-5 h-5 hidden dark:block" />
          </button>
        </li>
      </ul>
    </div>
  );
};

type HeaderProps = {
  navBarTitle: string | null;
  fullWidth?: boolean;
};

export const Header: React.FC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);

  const handler = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (navRef?.current && !BLOG.autoCollapsedNavBar) {
      if (!entry.isIntersecting) {
        navRef.current.classList.add("sticky-nav-full");
      } else {
        navRef.current.classList.remove("sticky-nav-full");
      }
    } else {
      navRef?.current?.classList.add("remove-sticky");
    }
  }, []);

  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    if (sentinalRef?.current) obvserver.observe(sentinalRef.current);
    return () => {
      if (sentinalRef?.current) obvserver.unobserve(sentinalRef.current);
    };
  }, [handler]);

  return (
    <>
      <div className="h-4 md:h-12" ref={sentinalRef} />
      <div
        className={clsx(
          "sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8",
          {
            "px-4 md:px-24": fullWidth,
            "max-w-2xl px-4": !fullWidth,
          },
        )}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/" aria-label={BLOG.title}>
            <div className="min-w-max">
              <Twemoji emoji={"👋"} size={28} />
            </div>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title} -
              <span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};
