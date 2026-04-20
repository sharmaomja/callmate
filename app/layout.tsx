import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-50 border-b border-black/8 bg-white/90 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-3 text-black transition-opacity hover:opacity-80">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-black text-[0.7rem] font-semibold tracking-[0.24em] text-white">
                CM
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-black/72">
                  Callmate
                </span>
                <span className="text-xs text-black/45">Video calls with an AI agent</span>
              </div>
            </Link>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-sm text-black/62 transition-colors hover:bg-black/[0.04] hover:text-black"
              >
                Dashboard
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90"
              >
                Login
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
