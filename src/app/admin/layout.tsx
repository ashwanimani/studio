
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import type { Metadata } from 'next';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Metadata cannot be used in client components directly like this.
// If metadata is needed, it should be in a server component or page.tsx.
// export const metadata: Metadata = {
//   title: 'ChirpChat Admin',
//   description: 'Admin section for ChirpChat',
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminLoginPage = pathname === "/admin/login";

  return (
    <div className="flex min-h-screen w-full bg-background">
      {!isAdminLoginPage && <AdminSidebar />}
      <main className={cn(
        "flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8",
        isAdminLoginPage ? "items-center justify-center bg-muted/40" : "bg-muted/40"
      )}>
        {children}
      </main>
    </div>
  );
}
