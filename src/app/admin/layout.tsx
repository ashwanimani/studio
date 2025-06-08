
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChirpChat Admin',
  description: 'Admin section for ChirpChat',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 sm:p-6 md:gap-8 bg-muted/40">
        {children}
      </main>
    </div>
  );
}
