import Link from 'next/link';

import { NavigationLinks } from '@/components/features/Navigation/NavigationLinks';
import { UserNav } from '@/components/features/Navigation/UserNav';

export function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          <NavigationLinks />

          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-gray-900 dark:text-white"
          >
            Latest Grind.
          </Link>

          <UserNav />
        </div>
      </div>
    </nav>
  );
}
