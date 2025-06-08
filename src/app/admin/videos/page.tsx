
"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction, ArrowLeft, Video } from "lucide-react";
import Link from "next/link";

function VideoManagementPlaceholderPageContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Video className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-2xl font-headline">Video Management</CardTitle>
          <CardDescription>This section is currently under development.</CardDescription>
        </CardHeader>
        <CardContent>
          <Construction className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-6">
            Tools for managing video content are coming soon. Please check back later!
          </p>
          <Button asChild>
            <Link href="/admin/dashboard" prefetch={false}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VideoManagementPage() {
  return (
    <AdminAuthGuard>
      <VideoManagementPlaceholderPageContent />
    </AdminAuthGuard>
  );
}
