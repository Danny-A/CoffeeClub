import Image from 'next/image';

import { cn } from '@/utils/cn';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  if (!src) {
    return (
      <div
        className={cn(
          'relative rounded-full overflow-hidden',
          sizeClasses[size],
          className
        )}
      >
        <div className="w-full h-full bg-gray-200" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden',
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 32px, (max-width: 1200px) 40px, 48px"
      />
    </div>
  );
}
