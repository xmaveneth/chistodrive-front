import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { useAuthContext } from '@/lib/hooks/context/use-auth-context';
import { cn } from '@/lib/utils/cn';
import { ServiceResult, Slot } from '@/lib/utils/search-services';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export type ServiceCardProps = {
    imgPath: string;
    name: string;
    address: string;
    serviceName: string;
    description: string;
    price: number;
    slots: Slot[];
    onClick: (val: string, carwash: ServiceResult, slot: Slot) => void;
    service: ServiceResult
};

export default function ServiceCard({
    imgPath,
    name,
    address,
    serviceName,
    description,
    price,
    slots,
    onClick,
    service
}: ServiceCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const { isError, data: user, isLoading } = useCurrentUser();
    const { toggleLoginDialog } = useAuthContext();

    const isLoggedIn = !(isError || !user);
    
    return (
        <div className="rounded-lg bg-input-bg">
            <div className="overflow-clip relative aspect-[1.55/1] rounded-lg mb-1">
                <img
                    onLoad={() => setIsImageLoading(false)}
                    src={imgPath}
                    alt="Изображение автомойки"
                    className={cn(
                        'object-center object-cover w-full h-full',
                        isImageLoading && 'opacity-0'
                    )}
                />
                {isImageLoading && (
                    <div className="inset-0 absolute z-10 flex items-center justify-center">
                        <span className="card-loader"></span>
                    </div>
                )}
            </div>
            <div className="p-2 pb-3.5 sm:p-3 sm:pb-4.5">
                <p className="flex items-start gap-1 mb-2.5 text-sm min-h-[3em] text-white/70">
                    <MapPinIcon className="size-4 shrink-0 text-btn-bg" />
                    {address && address}
                </p>
                <p className="mb-2.5 text-2xl">{name}</p>
                <div className="my-5">
                    <span className='px-8 block max-w-full text-balance py-3 rounded-full text-sm bg-background'>{serviceName}</span>
                </div>
                <p className="mb-2.5 text-white/70 min-h-26 sm:min-h-30">
                    {description}
                </p>
                <p className="mb-3 text-2xl text-btn-bg">{price} ₽</p>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                    {slots && slots.map(slot => (
                        <button disabled={isLoading} key={`slot-${slot.id}`} onClick={() => isLoggedIn ? onClick(slot.time, service, slot) : toggleLoginDialog(true)} className='px-3 py-1.5 rounded-full bg-btn-bg cursor-pointer font-medium hover:bg-btn-hover transition-colors duration-200 ease-in'>{slot.time}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}
