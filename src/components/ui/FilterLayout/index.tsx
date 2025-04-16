import { cn } from '@/utils/cn';

type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  className?: string;
};

export function FilterLayout({
  children,
  sidebar,
  className,
}: FilterLayoutProps) {
  return (
    <div className={cn('flex flex-col md:flex-row gap-8', className)}>
      <aside className="w-full md:w-80 flex-shrink-0">
        <div className="sticky top-8">{sidebar}</div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
