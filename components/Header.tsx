import BLOG from '@/blog.config';
import { fetchLocaleLang } from '@/lib/lang';
import { useLocale } from '@/lib/locale';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const locale = fetchLocaleLang();
const links = [
  { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
  { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
  { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
];

const NavBar: React.VFC = () => {
  const router = useRouter();
  const activeNav = useMemo(() => {
    if (router.asPath === links[1].to) return links[1].to;
    if (router.pathname === links[0].to || router.asPath.includes('tag')) return links[0].to;
    return null;
  }, [router]);

  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          (link) =>
            link.show && (
              <li
                key={link.id}
                className={classNames('block ml-4 text-black dark:text-gray-50 nav', {
                  'border-b-2 border-indigo-400': link.to === activeNav,
                })}
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

type HeaderProps = {
  navBarTitle: string | null;
  fullWidth?: boolean;
};
const Header: React.VFC<HeaderProps> = ({ navBarTitle, fullWidth }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const sentinalRef = useRef<HTMLDivElement>(null);
  const useSticky = !BLOG.autoCollapsedNavBar;
  const handler = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current.classList.add('sticky-nav-full');
      } else {
        navRef.current.classList.remove('sticky-nav-full');
      }
    } else {
      navRef?.current?.classList.add('remove-sticky');
    }
  }, []);
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler);
    if (sentinalRef?.current) obvserver.observe(sentinalRef.current);
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
  }, [sentinalRef]);
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={classNames(
          'sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60',
          {
            'px-4 md:px-24': fullWidth,
            'max-w-3xl px-4': !fullWidth,
          },
        )}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" className="fill-current text-black dark:text-white" />
                  <rect width="24" height="24" fill="url(#paint0_radial)" />
                  <defs>
                    <radialGradient
                      id="paint0_radial"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="rotate(45) scale(39.598)"
                    >
                      <stop stopColor="#CFCFCF" stopOpacity="0.6" />
                      <stop offset="1" stopColor="#E9E9E9" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </a>
          </Link>
          {navBarTitle ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">{navBarTitle}</p>
          ) : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title} -<span className="font-normal">{BLOG.description}</span>
            </p>
          )}
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default Header;
