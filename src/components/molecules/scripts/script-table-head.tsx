import { cn } from '@/lib/utils';

type ScriptTableHeadProps = {
    children: React.ReactNode;
    leftCol?: string;
    columns: string;
    width: number;
};

export default function ScriptTableHead({
    children,
    leftCol = '№',
    columns,
    width,
}: ScriptTableHeadProps) {
    return (
        <div
            className={cn(
                'sticky top-0 z-20 text-center grid bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4'
            )}
            style={{
                gridTemplateColumns: columns,
                width: `${width}px`,
            }}
        >
            <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg flex items-center justify-center">
                {leftCol}
                <span className='absolute left-0 top-0 bottom-0  w-10 bg-light-bg -z-10'></span>
            </div>
            {children}
        </div>
    );
}
