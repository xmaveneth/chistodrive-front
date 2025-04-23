import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

export default function AdminScripts() {
    return (
        <div className="overflow-auto">
            <div className="w-290 sticky top-0 z-20 text-center grid grid-cols-[80px_1fr_1fr_1fr_80px] bg-light-bg p-4 rounded-full divide-x-1 divide-white/20 mb-4">
                <div className="sticky left-0 z-20 bg-light-bg rounded-l-xl  text-btn-bg">
                    <div
                        className="absolute bg-light-bg left-1/2 top-1/2 -translate-1/2 rounded-l-full -z-10 p-4 text-transparent"
                        aria-hidden={true}
                    >
                        text
                    </div>
                    №
                </div>
                <div className="">Название</div>
                <div className="">Создан</div>
                <div className="">Статус</div>
                <div className=""></div>
            </div>
            <div className="w-282 text-center grid grid-cols-[80px_1fr_1fr_1fr_80px] divide-x-1 mx-4 divide-white/20 border-y border-white/20">
                <button className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                    <PencilSquareIcon className="size-4" /> 1
                </button>
                <div className="py-3">Будний день</div>
                <div className="py-3">asd</div>
                <div className="py-3">asd</div>
                <div className="py-3">
                    {' '}
                    <button className="cursor-pointer">
                        <TrashIcon className="text-btn-bg size-4 mx-auto" />
                    </button>
                </div>
            </div>
            <div className="w-282 text-center grid grid-cols-[80px_1fr_1fr_1fr_80px] divide-x-1 mx-4 divide-white/20 border-b border-white/20">
                <button className="py-3 cursor-pointer sticky left-0 bg-background z-10 flex items-center gap-2 justify-center text-btn-bg">
                    <PencilSquareIcon className="size-4" /> 1
                </button>
                <div className="py-3">asd</div>
                <div className="py-3">15.01.2025</div>
                <div className="py-3">asd</div>
                <div className="py-3">
                    {' '}
                    <button className="cursor-pointer">
                        <TrashIcon className="text-btn-bg size-4 mx-auto" />
                    </button>
                </div>
            </div>
            <div className="w-282 text-center relative grid grid-cols-[80px_1fr_1fr_1fr_80px] divide-x-1 mx-4 divide-white/20 border-b border-white/20">
                <div></div>
                <div className="flex">
                    <div className='flex sticky left-0 z-20'>
                        <button className="cursor-pointer px-4 border-r border-white/20 flex items-center justify-center bg-background text-btn-bg">
                            <PencilSquareIcon className="size-4" />
                        </button>
                        <div className="px-4 border-r border-white/20 flex items-center justify-center text-btn-bg">
                            1.1
                        </div>
                    </div>
                    <div className='flex items-center justify-center flex-1'>Weekday</div>
                </div>
                <div className="py-3">15.01.2025</div>
                <div className="py-3">asd</div>
                <div className="py-3">
                    {' '}
                    <button className="cursor-pointer">
                        <TrashIcon className="text-btn-bg size-4 mx-auto" />
                    </button>
                </div>
            </div>
        </div>
    );
}
