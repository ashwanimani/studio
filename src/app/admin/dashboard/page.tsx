
"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video, FolderKanban, ShieldAlert, Activity, SettingsIcon, ShieldCheck } from "lucide-react";
import Link from "next/link";

// Mock data for stats
const stats = {
  totalUsers: 1258,
  totalVideos: 576,
  totalGroups: 89,
  pendingModeration: 12,
};

function AdminDashboardPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-headline text-foreground">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+201 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+50 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Groups</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGroups.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Moderation</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.pendingModeration}</div>
            <p className="text-xs text-muted-foreground">Videos & comments</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 sm:flex-row sm:gap-4 sm:flex-wrap">
            <Button asChild variant="outline">
              <Link href="/admin/users" prefetch={false}><Users className="mr-2 h-4 w-4" />Manage Users</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/admin/moderation" prefetch={false}><ShieldCheck className="mr-2 h-4 w-4" />Moderate Content</Link>
            </Button>
             <Button asChild variant="outline">
              <Link href="/admin/settings" prefetch={false}><SettingsIcon className="mr-2 h-4 w-4" />Site Settings</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><Activity className="h-5 w-5" />Recent Activity</CardTitle>
            <CardDescription>Overview of recent administrative actions and site events.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Recent activity feed will be displayed here.</p>
            {/* Placeholder for activity items */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminAuthGuard>
      <AdminDashboardPageContent />
    </AdminAuthGuard>
  );
}
