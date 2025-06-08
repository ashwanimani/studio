
"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

function AdminDashboardPageContent() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Admin Dashboard</CardTitle>
        <CardDescription>Welcome to the admin area.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is a protected admin dashboard. Only logged-in admins can see this.</p>
        <p className="mt-4">You can add admin-specific content and tools here.</p>
      </CardContent>
      <CardContent>
         <Button onClick={handleLogout} variant="outline" className="w-full">
          Log Out
        </Button>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <AdminDashboardPageContent />
    </AdminAuthGuard>
  );
}
