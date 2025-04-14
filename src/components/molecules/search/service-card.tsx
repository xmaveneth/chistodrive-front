import { cn } from '@/lib/utils/cn';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import { MapPinIcon, StarIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export type ServiceCardProps = {
    imgPath: string;
    rating: number;
    name: string;
    address: string;
    description: string;
    price: number;
    url: string;
};

export default function ServiceCard({
    imgPath,
    rating,
    name,
    address,
    description,
    price,
    url
}: ServiceCardProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="rounded-lg bg-input-bg">
            <div className="overflow-clip relative aspect-[1.55/1] rounded-lg">
                <img
                    onLoad={() => setIsLoading(false)}
                    src={imgPath}
                    alt="Изображение автомойки"
                    className={cn(
                        'object-center object-cover w-full h-full',
                        isLoading && 'opacity-0'
                    )}
                />
                {isLoading && (
                    <div className="inset-0 absolute z-10 flex items-center justify-center">
                        <span className='card-loader'></span>
                    </div>
                )}
            </div>
            <div className="p-2 pb-3.5 sm:p-3 sm:pb-4.5">
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70">
                    <MapPinIcon className="size-4 shrink-0 text-btn-bg" />
                    {address && address}
                </p>
                <div className="flex items-center mb-3">
                    <div className="text-xs sm:text-sm mr-1.5">{rating}</div>
                    {Array.from({ length: 5 }, (_, index) => (
                        <StarIcon
                            key={index}
                            className={cn(
                                'size-4 sm:size-5',
                                index + 1 > rating
                                    ? 'text-background'
                                    : 'text-btn-bg'
                            )}
                        />
                    ))}
                </div>
                <p className="mb-2.5 text-lg sm:text-xl">{name}</p>
                <p className="mb-2.5 text-xs sm:text-sm text-white/70 min-h-26 sm:min-h-30">{description}</p>
                <p className="mb-2.5 text-sm sm:text-base">
                    от{' '}
                    <span className="text-2xl ml-1 text-btn-bg">{price} ₽</span>
                </p>
                <a
                    href={url}
                    target="_blank"
                    className="flex items-center justify-between gap-1 text-xs sm:text-sm text-white/70 hover:ring-1 hover:ring-btn-bg/50 rounded-sm p-1 transition-all duration-300 ease"
                >
                    Узнать подробнее
                    <ArrowUpRightIcon className="size-4 sm:size-5 text-btn-bg shrink-0" />
                </a>
            </div>
        </div>
    );
}
