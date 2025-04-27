'use client';

import { CoffeeIcon, HomeIcon, StoreIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Beans', href: '/admin/beans', icon: CoffeeIcon },
  { name: 'Roasters', href: '/admin/roasters', icon: StoreIcon },
];

export function AdminNavigationLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium gap-2',
              pathname === item.href
                ? 'border-indigo-500 text-gray-900 dark:text-white'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
