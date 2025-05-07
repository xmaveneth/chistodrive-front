import useToggle from '@/lib/hooks/utils/use-toggle';
import { IntervalWorker } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { pluralizeMaster } from '@/lib/utils/pluralizer';
import { Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

type ScriptWorkerDropdownProps = {
    workers: IntervalWorker[];
};

export default function ScriptWorkerDropdown({
    workers,
}: ScriptWorkerDropdownProps) {
    const [showPopup, toggleShowPopup] = useToggle(false);
    return (
        <div className="flex-1 flex items-center justify-center relative">
            <button
                className={cn(
                    'flex items-center gap-1',
                    workers.length > 0 && 'cursor-pointer'
                )}
                onClick={() => {
                    if (workers.length > 0) {
                        toggleShowPopup();
                    }
                }}
            >
                {`${pluralizeMaster(workers.length)}`}
                {workers.length > 0 && (
                    <ChevronDown
                        className={cn(
                            'size-4 transition-transform duration-250',
                            showPopup && 'rotate-180'
                        )}
                    />
                )}
            </button>

            <Transition show={showPopup}>
                <div className="transition duration-300 ease-in data-closed:opacity-0 absolute top-full left-1/2 -translate-x-1/2 bg-light-bg py-3 px-4 rounded-lg w-full z-30 space-y-3">
                    {workers.map((worker, index) => (
                        <div
                            key={`dropdown-worker-${index}`}
                            className="flex items-center gap-3"
                        >
                            <div className="rounded-sm border border-btn-bg shrink-0 w-6">
                                {worker.prio_num}
                            </div>
                            <div>{worker.worker_name}</div>
                        </div>
                    ))}
                </div>
            </Transition>
        </div>
    );
}
