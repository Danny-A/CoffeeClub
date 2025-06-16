'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { SlidingPanel } from '@/components/ui/SlidingPanel';
import { cn } from '@/utils/cn';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Beans', href: '/beans' },
  { name: 'Roasters', href: '/roasters' },
  { name: 'Recipes', href: '/recipes' },
  // { name: 'Coffee Bars', href: '/coffee-bars' },
];

export function NavigationLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = navigation.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setIsOpen(false)}
      className={cn(
        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
        pathname === item.href
          ? 'border-indigo-500 text-gray-900 dark:text-white'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
      )}
    >
      {item.name}
    </Link>
  ));

  return (
    <SlidingPanel
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      trigger={
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
          <Menu className="h-4 w-4" /> Menu
        </Button>
      }
    >
      <div className="flex flex-col space-y-4">{navItems}</div>
    </SlidingPanel>
  );
}
