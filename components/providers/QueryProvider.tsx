"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // IMPORTANT: create QueryClient inside useState so it's stable between renders
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Recommended sane defaults for production-ish setup
            retry: 1,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            staleTime: 1000 * 60, // 1 minute
          },
          mutations: {
            retry: 0, // usually for login we don't auto-retry
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools – you can remove in production build if you like */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
