import { BadgeCheck, Briefcase, Target } from "lucide-react";
import Image from "next/image";

function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Grid - always place padding on main grid
    <div className="min-h-screen  bg-linear-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* subtle background glow */}
      {/* <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-sky-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[520px] w-[520px] rounded-full bg-indigo-200/30 blur-3xl" /> */}
      <div
        className="
      mx-auto
      w-full
      min-h-screen
      max-w-350
      py-8
      px-6
      sm:py-10
      lg:py-16
      sm:px-14
      lg:px-20
      flex
      items-center
      justify-center
    "
      >
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="mb-10 md:mb-0 col-span-12 md:col-span-6 h-full">
            {/* keep left content not full width */}
            <div className="h-full flex items-center">
              <div className="w-full">
                <div className="flex flex-col gap-6">
                  {/* Logo card */}
                  <div className="inline-flex w-fit rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                    <Image
                      src="/images/cape-logo/cape-logo.png"
                      alt="cape logo"
                      width={220}
                      height={110}
                      priority
                    />
                  </div>

                  {/* Heading + subheading */}
                  <div>
                    <h1 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-slate-900">
                      Welcome to Your Leadership Journey
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-slate-500 leading-relaxed max-w-[46ch]">
                      Join thousands of leaders mastering essential leadership
                      skills and advancing their careers
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="mt-2 flex flex-col gap-4">
                    {/* item */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-10 w-10 rounded-full bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center">
                        <BadgeCheck className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Expert-led programs
                        </p>
                        <p className="text-sm text-slate-500">
                          Learn from industry professionals
                        </p>
                      </div>
                    </div>

                    {/* item */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-10 w-10 rounded-full bg-rose-50 ring-1 ring-rose-200 flex items-center justify-center">
                        <Target className="h-5 w-5 text-rose-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Real-world leadership
                        </p>
                        <p className="text-sm text-slate-500">
                          Apply strategies immediately
                        </p>
                      </div>
                    </div>

                    {/* item */}
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 h-10 w-10 rounded-full bg-sky-50 ring-1 ring-sky-200 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-sky-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          Career advancement
                        </p>
                        <p className="text-sm text-slate-500">
                          Track your progress
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Col span - always w-fulll */}
          <div className="col-span-12 md:col-span-6 w-full relative">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginLayout;
