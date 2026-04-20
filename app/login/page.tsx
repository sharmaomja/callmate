import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100svh-4rem)] bg-white px-4 py-10 text-black sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
        <section className="hidden min-h-[32rem] overflow-hidden rounded-[2rem] border border-black/8 bg-[#fafaf8] p-8 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">Callmate</p>
            <h1 className="mt-4 max-w-md text-5xl font-semibold tracking-[-0.05em] text-black">
              Join the room fast. Let AI stay in the call with you.
            </h1>
          </div>

          <div className="space-y-6 border-t border-black/8 pt-8 text-sm text-black/58">
            <div>
              <p className="text-black">Simple entry</p>
              <p className="mt-2 max-w-sm">Sign in, open the dashboard, and move straight into a live room.</p>
            </div>
            <div>
              <p className="text-black">Calm setup</p>
              <p className="mt-2 max-w-sm">The interface stays quiet so the call and the AI agent remain the focus.</p>
            </div>
          </div>
        </section>

        <section className="surface-panel animate-enter mx-auto w-full max-w-md rounded-[2rem] p-6 sm:p-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">Login</p>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl">
              Welcome to Callmate
            </h2>
            <p className="text-sm leading-7 text-black/56">
              Continue into your calling workspace and start or join a room in seconds.
            </p>
          </div>

          <form className="mt-8 flex flex-col gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-black/62">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="input-shell"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-black/62">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                className="input-shell"
              />
            </div>
          </form>

          <Link href="/dashboard" className="mt-6 block">
            <Button className="h-11 w-full rounded-full text-sm font-semibold">
              Continue to dashboard
            </Button>
          </Link>

          <p className="mt-6 text-xs leading-6 text-black/42">
            This screen keeps the same lightweight flow for now and moves directly into the dashboard.
          </p>
        </section>
      </div>
    </div>
  );
}
