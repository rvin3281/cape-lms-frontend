type LoginHeaderProps = {
  title: string;
  description: string;
};
function LoginHeader({ title, description }: LoginHeaderProps) {
  return (
    <div className="login-header">
      <h2 className="text-[20px] lg:text-[24px] font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </div>
  );
}
export default LoginHeader;
