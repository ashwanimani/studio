
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, MessageCircle, Search, LogIn } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Link href="/feed" className="flex items-center gap-2 text-lg font-semibold md:text-base font-headline text-primary" prefetch={false}>
        <MessageCircle className="h-7 w-7" />
        <span className="hidden md:inline-block">ChirpChat</span>
        <span className="sr-only">ChirpChat</span>
      </Link>
      
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search videos, users..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/notifications" prefetch={false}>
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/login" prefetch={false}>
            <LogIn className="mr-2 h-4 w-4" />
            Admin Login
          </Link>
        </Button>
      </div>
    </header>
  );
}
