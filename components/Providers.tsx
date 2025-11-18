"use client";
import { wagmiConfig } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import NetworkGuard from "./NetworkGuard";
import PredictionProvider from "./PredictionProvider";
import HistorySidebar from "./Base/HistorySidebar/HistorySidebar.component";
import { SidebarProvider } from "@/context/SidebarContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const Providers = ({ children }: ProvidersProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        {mounted && (
          <NetworkGuard>
            <SidebarProvider>
              <PredictionProvider>
                {children}
                <HistorySidebar />
              </PredictionProvider>
            </SidebarProvider>
          </NetworkGuard>
        )}
      </WagmiConfig>
    </QueryClientProvider>
  );
};
