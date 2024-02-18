import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import BLOG from "~/blog.config";
import { fetchLocaleLang } from "~/lib/i18n/lang";
import { Twemoji } from "./Twemoji";

const locale = fetchLocaleLang();
const links = [
  { id: 1, name: locale.NAV.INDEX, to: BLOG.path || "/", show: true },
  { id: 2, name: locale.NAV.ABOUT, to: "/about", show: BLOG.showAbout },
  // { id: 4, name: locale.NAV.RSS, to: '/feed', show: true },
];

const NavBar: React.VFC = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const activeNav = useMemo(() => {
    if (router.asPath === links[0].to) return links[0].to;
    if (router.asPath === links[1].to) return links[1].to;
    return links[0].to;
  }, [router]);

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row items-center">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className={classNames(
                  "block ml-4 text-black dark:text-gray-50 nav",
                  {
                    "border-b-2 border-blue-700 dark:border-blue-400":
                      link.to === activeNav,
                  },
                )}
              >
                <Link href={link.to}>{link.name}</Link>
              </li>
            ),
        )}
        <li className="ml-4">
          <button
            className="group block p-1 bg-night hover:bg-day dark:bg-day dark:hover:bg-night rounded-full transition-all duration-300"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="toggle Dark Mode"
            type="button"
          >
            {theme === "light" ? (
              <MoonIcon className="w-5 h-5 text-day group-hover:text-night" />
            ) : (
              <SunIcon className="w-5 h-5 text-night group-hover:text-day" />
            )}
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

export const Header: React.VFC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
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
    // Don't touch this, I have no idea how it works XD
    return () => {
      if (sentinalRef?.current) obvserver.unobserve(sentinalRef.current);
    };
  }, [handler]);

  return (
    <>
      <div className="h-4 md:h-12" ref={sentinalRef} />
      <div
        className={classNames(
          "sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60",
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
