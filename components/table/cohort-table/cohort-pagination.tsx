import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

function getPages(pageIndex: number, pageCount: number) {
  // simple + production-safe: [1 ...] [current-1 current current+1] [... last]
  const current = pageIndex + 1;

  const pages = new Set<number>();
  pages.add(1);
  pages.add(pageCount);

  for (let p = current - 1; p <= current + 1; p++) {
    if (p >= 1 && p <= pageCount) pages.add(p);
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function CohortPagination({
  pageIndex,
  // pageSize,
  pageCount,
  canPrevious,
  canNext,
  goToPage,
  prev,
  next,
}: {
  pageIndex: number;
  pageSize?: number;
  pageCount: number;
  canPrevious: boolean;
  canNext: boolean;
  goToPage: (pageIndex: number) => void;
  prev: () => void;
  next: () => void;
}) {
  const pages = getPages(pageIndex, pageCount);

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
      {/* left info (dashboard feel) */}
      {/* <div className="hidden text-sm text-slate-600 md:block">
        Page{" "}
        <span className="font-semibold text-slate-900">{pageIndex + 1}</span> of{" "}
        <span className="font-semibold text-slate-900">{pageCount}</span>
        <span className="mx-2 text-slate-300">|</span>
      </div> */}

      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canPrevious) prev();
              }}
              aria-disabled={!canPrevious}
              className={[
                "h-9 rounded-xl border border-slate-200 bg-white shadow-sm",
                "hover:bg-slate-50",
                !canPrevious ? "pointer-events-none opacity-50" : "",
              ].join(" ")}
            />
          </PaginationItem>

          {pages.map((p, idx) => {
            const prevPage = pages[idx - 1];
            const showEllipsis = idx > 0 && p - prevPage > 1;

            return (
              <React.Fragment key={p}>
                {showEllipsis ? (
                  <PaginationItem>
                    <PaginationEllipsis className="text-slate-400" />
                  </PaginationItem>
                ) : null}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={p === pageIndex + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(p - 1);
                    }}
                    className={[
                      "h-9 min-w-9 rounded-xl border text-sm shadow-sm",
                      p === pageIndex + 1
                        ? "border-slate-900 bg-slate-900 text-white hover:bg-slate-900"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              </React.Fragment>
            );
          })}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (canNext) next();
              }}
              aria-disabled={!canNext}
              className={[
                "h-9 rounded-xl border border-slate-200 bg-white shadow-sm",
                "hover:bg-slate-50",
                !canNext ? "pointer-events-none opacity-50" : "",
              ].join(" ")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
