'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/register', label: 'Become a Donor' },
    { href: '/find-donors', label: 'Find Donors' },
    { href: '/requests', label: 'Blood Requests' },
    { href: '/education', label: 'Education' },
    { href: '/rewards', label: 'Rewards' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <Droplet className="h-8 w-8 fill-white group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold">BloodConnect</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-red-800 text-white'
                    : 'text-red-50 hover:bg-red-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-2 py-2 rounded-md text-xs font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-red-800 text-white'
                    : 'text-red-50 hover:bg-red-700'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
