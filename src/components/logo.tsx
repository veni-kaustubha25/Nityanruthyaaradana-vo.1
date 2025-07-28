import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary shrink-0"
        >
            <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                fill="currentColor"
                fillOpacity="0.2"
            />
            <path
                d="M12 6C9.13 6 6.88 8.05 6.2 10.74C7.05 10.25 8.05 10 9.12 10C11.83 10 14.05 11.84 14.68 14.39C16.14 13.6 17.34 12.06 17.79 10.21C16.41 7.84 14.37 6 12 6Z"
                fill="currentColor"
            />
        </svg>
        <span className="font-headline text-xl lg:text-2xl font-bold text-foreground break-words">
            Nithyanruthyaaradana
        </span>
    </div>
  );
}
