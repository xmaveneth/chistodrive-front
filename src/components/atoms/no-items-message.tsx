import { cn } from '@/lib/utils';

type NoItemsMessageProps = {
    className?: string;
};

export default function NoItemsMessage({ className }: NoItemsMessageProps) {
    return (
        <p className={cn('text-sm text-text-muted md:text-base', className)}>
            Здесь пока ничего нет.
        </p>
    );
}
