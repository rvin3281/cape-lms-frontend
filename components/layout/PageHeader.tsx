import React from "react";

export type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between bg-white p-4">
      <div>
        <h1 className="text-[20px] md:text-[24px] lg:text-[30px] font-bold text-slate-900">
          {title}
        </h1>
        <p className="text-[16px] lg:text-[18px] text-slate-600">
          {description}
        </p>
      </div>
      <div className="flex gap-2">{/* actions */}</div>
    </div>
  );
}

export default PageHeader;
