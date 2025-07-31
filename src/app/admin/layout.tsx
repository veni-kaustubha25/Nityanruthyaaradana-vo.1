
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - Nithyanruthyaaradana",
  description: "Admin panel for managing the Nithyanruthyaaradana website.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </body>
    </html>
  );
}
