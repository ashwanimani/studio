
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface AdminAuthGuardProps {
  children: ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // This check runs only on the client-side
      const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
      if (!isAdmin) {
        router.replace("/admin/login");
      } else {
        setIsVerified(true);
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying admin access...</p>
      </div>
    );
  }

  if (!isVerified) {
    // This case should ideally be handled by the redirect, 
    // but it's a fallback / safety net.
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-destructive">Access Denied. Redirecting...</p>
        </div>
    );
  }

  return <>{children}</>;
}
