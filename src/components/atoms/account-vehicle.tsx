import { Car } from '@/lib/types/user';
import VehiclePlaceholder from '@/assets/images/account/car-display.webp';

type AccountVehicleProps = {
    vehicle: Car;
    onClick: () => void;
    idx: number;
};

export function AccountVehicle({ vehicle, onClick, idx }: AccountVehicleProps) {
    
    return (
        <li className="w-full px-6 py-3 bg-input-bg flex flex-col xs:flex-row items-center gap-2 xs:gap-5 rounded-full lg:py-5">
            <span className='xs:text-xs text-btn-bg sm:text-sm lg:text-base'>{idx < 10 ? `0${idx}` : idx}</span>
            <div className='h-5 shrink-0 lg:h-8 hidden sm:block'>
                <img src={VehiclePlaceholder} alt="Вид серого автомобиля сбоку" className='w-full h-full object-contain object-center' />
            </div>
            <div className='shrink-1 break-all xs:text-sm text-center text-balance xs:text-left sm:text-base sm:ml-2 sm:w-50 lg:w-60 lg:text-lg'>{vehicle.brand} {vehicle.model}</div>
            <div className='xs:ml-auto text-text-muted xs:text-xs sm:text-sm sm:ml-2 lg:text-base'>{vehicle.reg_number}</div>
            <button onClick={onClick} className='text-text-muted xs:text-sm cursor-pointer xs:ml-2 sm:ml-auto lg:text-base transition-colors hover:text-white duration-200 ease-in'>Удалить</button>
        </li>
    );
}
