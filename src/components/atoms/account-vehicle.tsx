import { Car } from '@/lib/types/user';
import VehiclePlaceholder from '@/assets/images/account/car-display.webp';

type AccountVehicleProps = {
    vehicle: Car;
};

export function AccountVehicle({ vehicle }: AccountVehicleProps) {
    return (
        <li className="w-full px-6 py-3 bg-input-bg flex items-center gap-5 rounded-full lg:py-5">
            <span className='text-xs text-btn-bg sm:text-sm lg:text-base'>01</span>
            <div className='h-5 shrink-0 lg:h-8 hidden sm:block'>
                <img src={VehiclePlaceholder} alt="Вид серого автомобиля сбоку" className='w-full h-full object-contain object-center' />
            </div>
            <div className='shrink-1 break-all text-sm sm:text-base sm:ml-2 sm:w-50 lg:w-60 lg:text-lg'>{vehicle.model}</div>
            <div className='ml-auto text-text-muted text-xs sm:text-sm sm:ml-2 lg:text-base hidden xs:block'>{vehicle.reg_number}</div>
            <button className='text-text-muted ml-auto text-sm cursor-pointer xs:ml-2 sm:ml-auto lg:text-base'>Удалить</button>
        </li>
    );
}
