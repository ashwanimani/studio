"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, PlusSquare, Users, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/feed', label: 'Feed', icon: Home },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
  { href: '/upload', label: 'Upload', icon: PlusSquare },
  { href: '/groups', label: 'Groups', icon: Users },
  { href: '/profile', label: 'Profile', icon: UserCircle },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/feed' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-md text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
              )}
              prefetch={false}
            >
              <item.icon className={cn("h-6 w-6", isActive ? "text-primary" : "")} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
