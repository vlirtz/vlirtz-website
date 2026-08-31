"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navigation } from "@/lib/site";
import { BookCallButton } from "@/components/booking/BookCallButton";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/**
 * Sticky site header matching the current Hostinger navigation layout.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-white/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between lg:h-24">
        <Link href="/" className="flex shrink-0 items-center" aria-label="VLIRTZ home">
          <Image
            src="/images/logo-horizontal-notagline.png"
            alt="VLIRTZ"
            width={1836}
            height={301}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-9 text-[15px] text-ink lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-indigo">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <BookCallButton variant="secondary" />
          <Button href="/contact">Get in touch</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <BookCallButton variant="secondary" className="px-4 py-2" />

          <button
            type="button"
            className="rounded-md p-2 text-navy"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-navy" />
              <span className="block h-0.5 w-6 bg-navy" />
              <span className="block h-0.5 w-6 bg-navy" />
            </div>
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-line bg-white lg:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" className="w-full">
              Get in touch
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
