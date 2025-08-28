'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

/* ------------------------- Session hook ------------------------- */
function useSessionAvatar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logo, setLogo] = useState('U');

  useEffect(() => {
    const fetchSession = async () => {
      const cookie = document.cookie.split('; ').find((r) => r.startsWith('session-id='));
      const sessionId = cookie?.split('=')[1];
      if (!sessionId) return;

      try {
        const res = await fetch(`/api/route?model=sessions&id=${sessionId}`);
        const data = await res.json();
        const resUser = await fetch(`/api/route?model=users&id=${data.record.userId}`);
        const dataUser = await resUser.json();
        const ch = String(dataUser.record.user_name?.[0] ?? 'U').toUpperCase();
        setLogo(ch);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Session fetch error:', e);
      }
    };
    fetchSession();
  }, []);

  return { isLoggedIn, logo };
}

/* ------------------------- Click-away hook ------------------------- */
function useClickAway(ref, onAway) {
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) onAway?.();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [ref, onAway]);
}

/* ------------------------- Reusable bits ------------------------- */
const NAV = [
  // { href: '/', label: 'Home' },
  { href: '/VisitingPlaces', label: 'Discover' },
  { href: '/AboutUs', label: 'About' },
  { href: '/ContactUs', label: 'Contact' },
];

function NavItem({ href, label, onClick }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={[
        'group relative px-3 py-2 text-base text-center font-medium no-underline',
        active ? 'text-black' : 'text-black hover:text-[#FFE966]',
        'rounded-lg transition-colors hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-transparent',
        // active underline glow line
        active
          ? 'after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-amber-300 after:to-transparent after:content-[""]'
          : 'after:absolute after:-bottom-0.5 after:left-6 after:right-6 after:h-0.5 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:opacity-0 after:transition-opacity group-hover:after:opacity-70 after:content-[""]',
      ].join(' ')}
    >
      {label}
    </Link>
  );
}

function NavLinks({ onClick }) {
  return (
    <>
      {NAV.map((n) => (
        <NavItem key={n.href} href={n.href} label={n.label} onClick={onClick} />
      ))}
    </>
  );
}

function PlanTripButton({ onClick, className = '' }) {
  return (
    <Link
      href="/itinerary/city"
      onClick={onClick}
      className={[
        'no-underline inline-flex items-center justify-center rounded-xl',
        'bg-amber-300 text-black px-4 py-2 text-sm font-semibold shadow',
        'border border-black/20 hover:bg-amber-400 hover:shadow-md active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
        className,
      ].join(' ')}
    >
      Plan Trip
    </Link>
  );
}

function LoginButton({ onClick, className = '' }) {
  return (
    <Link
      href="/Login"
      onClick={onClick}
      className={[
        'no-underline inline-flex items-center justify-center rounded-xl',
        'bg-white text-[#FFE966] px-4 py-2 text-sm font-semibold backdrop-blur',
        'border-2 border-[#FFE966] hover:bg-white/15 active:scale-[0.98]',
        'focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2',
        className,
      ].join(' ')}
    >
      Log in
    </Link>
  );
}

function Avatar({ letter, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open user menu"
      className="
        inline-flex h-10 w-10 items-center justify-center rounded-full
        bg-gradient-to-br from-sky-400 to-sky-600 text-white text-base font-semibold
        shadow-md transition active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-500
      "
    >
      {letter}
    </button>
  );
}

function UserMenu({ onLogout }) {
  return (
    <div
      className="
        absolute right-0 top-12 w-64 rounded-2xl border border-white/15
        bg-neutral-950/95 p-2 shadow-2xl backdrop-blur
        ring-1 ring-white/5 z-[10000]
      "
    >
      <div className="flex flex-col">
        <Link
          href="/Dashboard"
          className="px-3 py-2 text-sm font-medium text-white/90 hover:text-amber-300 rounded-lg"
          style={{ textDecoration: 'none' }}
        >
          Dashboard
        </Link>
        <div className="mx-2 my-1 h-px bg-white/10" />
        <Link href="#" className="no-underline px-3 py-2 text-sm font-medium text-white/90 hover:text-amber-300 rounded-lg">
          Settings
        </Link>
        <div className="mx-2 my-1 h-px bg-white/10" />
        <Link href="#" className="no-underline px-3 py-2 text-sm font-medium text-white/90 hover:text-amber-300 rounded-lg">
          Help
        </Link>
        <div className="mx-2 my-1 h-px bg-white/10" />
        <Link href="#" className="no-underline px-3 py-2 text-sm font-medium text-white/90 hover:text-amber-300 rounded-lg">
          Set Your Language
        </Link>
        <div className="mx-2 my-2 h-px bg-white/10" />
        <button
          onClick={onLogout}
          className="px-3 py-2 text-sm font-semibold text-red-400 hover:text-red-500 text-left rounded-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

/* ------------------------- Burger Icon ------------------------- */
function Burger({ open, onClick }) {
  return (
    <button
      aria-label="Toggle menu"
      onClick={onClick}
      className="
        md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg
        text-black hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500
        z-[10000]
      "
    >
      <span className="relative block h-5 w-6">
        <span
          className={[
            'absolute left-0 top-0 h-0.5 w-6 bg-black transition-transform duration-300',
            open ? 'translate-y-2.5 rotate-45' : '',
          ].join(' ')}
        />
        <span
          className={[
            'absolute left-0 top-2.5 h-0.5 w-6 bg-black transition-opacity duration-300',
            open ? 'opacity-0' : 'opacity-100',
          ].join(' ')}
        />
        <span
          className={[
            'absolute left-0 bottom-0 h-0.5 w-6 bg-black transition-transform duration-300',
            open ? '-translate-y-2.5 -rotate-45' : '',
          ].join(' ')}
        />
      </span>
    </button>
  );
}

/* =========================================================================================
   NavBarHome — gradient overlay (for hero pages)
   ========================================================================================= */
export default function NavBarHome() {
  const { isLoggedIn, logo } = useSessionAvatar();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef(null);
  useClickAway(avatarRef, () => setAvatarOpen(false));

  const deleteSession = async () => {
    document.cookie = 'session-id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    location.reload();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[10000]">
      {/* Gradient overlay bar */}
      <div className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: logo image */}
          <div className="flex items-center gap-3">
            <Link href="/" className="no-underline flex items-center">
              <img src="/images/logo.png" alt="Cabit" className="h-12 w-auto sm:h-28" />
            </Link>
          </div>

          {/* Right: desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLinks />
            <div className="mx-2 h-5 w-px bg-white/15" />
            {!isLoggedIn ? (
              <>
                <LoginButton />
                <PlanTripButton />
              </>
            ) : (
              <>
                <PlanTripButton />
                <div className="relative ml-2" ref={avatarRef}>
                  <Avatar letter={logo} onClick={() => setAvatarOpen((v) => !v)} />
                  {avatarOpen && <UserMenu onLogout={deleteSession} />}
                </div>
              </>
            )}
          </div>

          {/* Burger */}
          <Burger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
        </nav>
      </div>

      {/* Mobile panel */}
      <div
        className={[
          'md:hidden origin-top bg-white shadow-xl transition-transform duration-300',
          menuOpen ? 'scale-y-100' : 'scale-y-0',
        ].join(' ')}
      >
        <div className="px-4 pb-4 pt-2">
          <div className="flex flex-col">
            <NavLinks onClick={() => setMenuOpen(false)} />
            <div className="my-3 h-px bg-white/10" />
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <LoginButton onClick={() => setMenuOpen(false)} className="flex-1" />
                <PlanTripButton onClick={() => setMenuOpen(false)} className="flex-1" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <PlanTripButton onClick={() => setMenuOpen(false)} className="flex-1" />
                <div className="relative" ref={avatarRef}>
                  <Avatar letter={logo} onClick={() => setAvatarOpen((v) => !v)} />
                  {avatarOpen && (
                    <UserMenu
                      onLogout={() => {
                        setMenuOpen(false);
                        deleteSession();
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
