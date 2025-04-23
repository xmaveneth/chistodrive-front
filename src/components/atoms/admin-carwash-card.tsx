import { CarWash } from '@/lib/types/admin';
import { MapPinIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

type AdminCarwashCardProps = {
    carwash: CarWash;
};

export function AdminCarwashCard({ carwash }: AdminCarwashCardProps) {
    return (
        <Link
            to={`/admin/carwash/${carwash.id}`}
            className="w-full px-3 py-3 pl-6 bg-input-bg rounded-2xl break-word text-left cursor-pointer transition-colors duration-200 ease-in hover:bg-zinc-700/60"
        >
            <div className="mb-1 md:text-lg">{carwash.name}</div>
            <p className="flex items-center gap-1 mb-1 text-xs sm:text-sm text-white/70 break-word">
                <MapPinIcon className="size-4 shrink-0 text-btn-bg" />
                {carwash.location && carwash.location}
            </p>
        </Link>
    );
}
