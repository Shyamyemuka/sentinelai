import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SentinelAI — Intrusion Detection System",
  description: "Real-time AI-based intrusion detection platform featuring trained XGBoost network classification and SSE alert streaming.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {/* Fine-grained texture pattern overlay on top of background */}
        <div className="fixed inset-0 pointer-events-none bg-texture opacity-30 z-50"></div>
        {children}
      </body>
    </html>
  );
}
