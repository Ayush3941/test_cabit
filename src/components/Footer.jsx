'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Foot() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: wire to your API
  };

  return (
    <footer className="w-full bg-[#1C1F22]/95 text-[#E0E0E0] shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        {/* GRID */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Newsletter — FIRST on mobile for visibility */}
          <div className="lg:col-span-3 order-1 lg:order-none">
            <h5 className="text-amber-300 font-semibold">Newsletter</h5>
            <p className="mt-2 text-xs text-[#B0B0B0]">
              Stay updated with our latest news & offers.
            </p>

            <form onSubmit={handleSubscribe} className="mt-4">
              {/* Stacks on xs, inline from sm+ */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full rounded-xl border border-[#444]
                    bg-[#2A2D31] px-3 py-2.5 text-sm text-[#E0E0E0]
                    placeholder:text-[#9BA1A6]
                    focus:outline-none focus:ring-2 focus:ring-amber-400
                    sm:flex-1
                  "
                />
                <button
                  type="submit"
                  className="
                    w-full sm:w-auto rounded-xl bg-amber-300 px-4 py-2.5
                    text-sm font-semibold text-[#2D3134] shadow
                    hover:bg-amber-400 active:scale-[0.98]
                    focus:outline-none focus:ring-2 focus:ring-amber-400
                  "
                >
                  Subscribe
                </button>
              </div>

              {/* tiny helper row fits small screens */}
              <p className="mt-2 text-[11px] leading-snug text-[#8E9398]">
                By subscribing, you agree to our{' '}
                <Link href="/terms" className="no-underline text-amber-300 hover:text-amber-200">
                  Terms
                </Link>{' '}
                &{' '}
                <Link href="/privacy" className="no-underline text-amber-300 hover:text-amber-200">
                  Privacy Policy
                </Link>.
              </p>
            </form>
          </div>

          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <img src="/images/logo2.png" alt="Cabit" className="h-20 relative drop-shadow-[1px_1px_0px_rgba(255,255,255,1)] w-auto" />
            </div>
            <p className="mt-4 text-xs text-[#B0B0B0]">© 2024 CabIt. All rights reserved.</p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h5 className="text-amber-300 font-semibold">Company</h5>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:block sm:space-y-2">
              <li>
                <Link href="/" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h5 className="text-amber-300 font-semibold">Support</h5>
            <ul className="mt-3 grid grid-cols-2 gap-2 -ml-7 sm:block sm:space-y-2">
              <li>
                <Link href="/contact" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/help" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h5 className="text-amber-300 font-semibold">Legal</h5>
            <ul className="mt-3 -ml-10 space-y-2">
              <li>
                <Link href="/privacy" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="no-underline text-sm text-[#B0B0B0] hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + bottom row */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[#9BA1A6] text-center sm:text-left">
              Built with ❤️ for travelers across India.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="https://x.com" className="no-underline text-xs text-[#B0B0B0] hover:text-white transition">
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                className="no-underline text-xs text-[#B0B0B0] hover:text-white transition"
              >
                Instagram
              </Link>
              <Link
                href="https://linkedin.com"
                className="no-underline text-xs text-[#B0B0B0] hover:text-white transition"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
