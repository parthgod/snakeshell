"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ProgressBar
        height="5px"
        color="green"
      />
    </QueryClientProvider>
  );
};

export default Providers;
