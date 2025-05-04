import { ChevronDownIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

export const AdminNavAdd = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full flex justify-start gap-2"
        >
          <PlusCircleIcon className="h-4 w-4" />
          Add New
          <ChevronDownIcon className="h-4 w-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem asChild>
          <Link href="/beans/new" className="w-full cursor-pointer">
            Add Bean
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/roasters/new" className="w-full cursor-pointer">
            Add Roaster
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
