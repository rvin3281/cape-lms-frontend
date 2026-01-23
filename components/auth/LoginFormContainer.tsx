function LoginFormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      {/* Card Container */}
      <div
        className=" w-full
            rounded-2xl
            border border-slate-200/70
            bg-white/80 backdrop-blur
            shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)]
            p-5 sm:p-7 lg:p-10
            flex flex-col gap-6"
      >
        {children}
      </div>
    </div>
  );
}
export default LoginFormContainer;
