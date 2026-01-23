function LoginRedirection({ title }: { title: string }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-white/70 backdrop-blur">
      {/* <div className="shadow-lg"> */}
      <div className="flex items-start gap-4">
        {/* loader */}
        {/* <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-700 animate-bounce [animation-delay:-0.2s]" />
              <span className="h-2 w-2 rounded-full bg-slate-700 animate-bounce [animation-delay:-0.1s]" />
              <span className="h-2 w-2 rounded-full bg-slate-700 animate-bounce" />
            </div>
          </div> */}

        {/* text */}
        <div className="flex flex-col items-center justify-center">
          <p className="text-[20px] lg:text-[30px] font-semibold text-slate-900">
            Redirecting
            <span className="inline-flex w-8 justify-start">
              <span className="inline-block animate-[dots_1.2s_infinite_steps(4,end)]">
                ...
              </span>
            </span>
          </p>

          <p className="mt-1 text-[18px] lg:text-[24px] text-black">{title}</p>

          {/* subtle progress bar */}
          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-1/3 rounded-full bg-slate-800 animate-[indeterminate_1.1s_infinite]" />
          </div>
        </div>
      </div>

      {/* local CSS animations */}
      <style jsx>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(320%);
          }
        }
        @keyframes dots {
          0% {
            width: 0ch;
          }
          25% {
            width: 1ch;
          }
          50% {
            width: 2ch;
          }
          75% {
            width: 3ch;
          }
          100% {
            width: 0ch;
          }
        }
      `}</style>
      {/* </div> */}
    </div>
  );
}

export default LoginRedirection;
