"use client";

import Alert from "@/components/alert/Alert";
import Header from "@/components/layout/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./globals.css";
import "./reset.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Header />
          {children}
          <Alert />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
