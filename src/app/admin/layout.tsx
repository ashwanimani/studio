
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
    <div className="flex min-h-screen flex-col bg-muted/40">
      {/* You can add a simple admin-specific header or sidebar here if needed later */}
      <main className="flex flex-1 flex-col items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
