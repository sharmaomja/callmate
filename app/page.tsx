import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Ladingpage() {
  return (
    <div className="bg-white text-black">
      <section className="overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pb-24 lg:pt-14">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <div className="animate-enter max-w-xl">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/40">
                Callmate
              </p>
              <h1 className="max-w-lg text-5xl font-semibold tracking-[-0.05em] text-balance text-black sm:text-6xl lg:text-7xl">
                Video calls with AI in the room.
              </h1>
              <p className="max-w-md text-base leading-7 text-black/58 sm:text-lg">
                Start a call, share the room, and let the agent stay inside the conversation.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-11 rounded-full px-6 text-sm font-semibold",
                )}
              >
                Start now
              </Link>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full border-black/12 bg-transparent px-6 text-sm text-black hover:bg-black/[0.04] hover:text-black",
                )}
              >
                Open dashboard
              </Link>
            </div>
          </div>

          <div className="animate-enter-delay">
            <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-[#f6f6f4] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
              <div className="overflow-hidden rounded-[1.6rem] border border-black/8 bg-white">
                <div className="flex items-center justify-between border-b border-black/8 px-5 py-3 text-xs uppercase tracking-[0.24em] text-black/40">
                  <span>Callmate Room</span>
                  <span>Live</span>
                </div>

                <div className="grid gap-3 p-3 lg:grid-cols-[minmax(0,1fr)_17rem]">
                  <div className="space-y-3">
                    <div className="flex min-h-[22rem] flex-col justify-between rounded-[1.4rem] bg-[linear-gradient(180deg,#f2f2ef_0%,#ebebe7_100%)] p-5 sm:min-h-[25rem]">
                      <div className="flex items-center justify-between text-sm text-black/48">
                        <span>Main call</span>
                        <span>Audio on</span>
                      </div>

                      <div className="max-w-sm space-y-3">
                        <p className="text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl">
                          AI listens, responds, and keeps up with the call in real time.
                        </p>
                        <p className="text-sm leading-6 text-black/52">
                          No extra window. No extra flow.
                        </p>
                      </div>

                      <div className="flex items-center justify-between gap-4 text-sm text-black/55">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-black" />
                          AI agent connected
                        </div>
                        <div className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-black/55">
                          Live context
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-[1.2rem] border border-black/8 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-black/35">Rooms</p>
                        <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-black">
                          Join fast
                        </p>
                      </div>
                      <div className="rounded-[1.2rem] border border-black/8 bg-white p-4">
                        <p className="text-xs uppercase tracking-[0.28em] text-black/35">Agent</p>
                        <p className="mt-4 text-xl font-semibold tracking-[-0.03em] text-black">
                          Stay in context
                        </p>
                      </div>
                    </div>
                  </div>

                  <aside className="flex flex-col justify-between rounded-[1.4rem] border border-black/8 bg-[#fbfbfa] p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-black/35">How it works</p>
                      <div className="mt-5 space-y-5 border-t border-black/8 pt-5 text-sm text-black/52">
                        <div>
                          <p className="text-black">Create or join</p>
                        </div>
                        <div>
                          <p className="text-black">Share the room</p>
                        </div>
                        <div>
                          <p className="text-black">Let AI stay in the call</p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      className="mt-6 inline-flex text-sm text-black/65 transition-colors hover:text-black"
                    >
                      Go to dashboard
                    </Link>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/8 bg-[#fafaf8] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/35">
              Minimal calling flow
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-black sm:text-4xl">
              Less setup. Faster calls.
            </h2>
          </div>

          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-full px-6 text-sm font-semibold",
            )}
          >
            Continue
          </Link>
        </div>
      </section>
    </div>
  );
}
