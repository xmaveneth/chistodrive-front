import { cn } from '@/lib/utils';

type TableHeadProps = {
    children: React.ReactNode;
    gridClass: string;
    leftCol?: string;
};

export default function TableHead({
    children,
    gridClass,
    leftCol = '№',
}: TableHeadProps) {
    return (
        <div
            className={cn(
                'w-188 sm:w-290 sticky top-0 z-20 text-center grid bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4',
                gridClass
            )}
        >
            <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg">
                {leftCol}
                <span className='absolute left-0 top-0 bottom-0  w-10 bg-light-bg -z-10'></span>
            </div>
            {children}
        </div>
    );
}
