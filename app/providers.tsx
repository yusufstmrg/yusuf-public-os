"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";

import { authClient } from "@/lib/auth/client";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    router.prefetch("/os");
    router.prefetch("/auth/sign-in");
  }, [router]);

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  const replace = useCallback((href: string) => {
    router.replace(href);
  }, [router]);

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={navigate}
      replace={replace}
      onSessionChange={() => router.refresh()}
      emailOTP
      social={{ providers: ["google"] }}
      redirectTo="/os"
      Link={Link}
      organization={{}}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </NeonAuthUIProvider>
  );
}
