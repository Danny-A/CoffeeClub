import Image from 'next/image';
import React from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

interface RoasterHeroProps {
  profileImageUrl?: string | null;
  logoUrl?: string | null;
  name: string;
  className?: string;
}

export function RoasterHero({
  profileImageUrl,
  logoUrl,
  name,
  className,
}: RoasterHeroProps) {
  return (
    <div
      className={cn(
        'relative w-full h-48 md:h-64 bg-blue-100 dark:bg-gray-800 rounded-xl flex items-center justify-center',
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden">
        {profileImageUrl ? (
          <Image
            src={profileImageUrl}
            alt={name + ' profile image'}
            className="object-cover w-full h-full"
            loading="eager"
            width={1200}
            height={260}
          />
        ) : null}
      </div>
      {logoUrl && (
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 z-10">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white dark:border-gray-900 shadow bg-white rounded">
            <AvatarImage
              src={logoUrl}
              alt={name + ' logo'}
              className="object-contain"
            />
            <AvatarFallback className="rounded">
              {name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}
