import AccountAddBtn from '@/components/atoms/account-add-btn';
import { AccountVehicle } from '@/components/atoms/account-vehicle';
import { fakeUser } from '@/lib/data/account-entries';

export default function AccountCars() {
    const user = fakeUser;

    return (
        <section className="pt-6">
            <div>
                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user.cars.map((car, idx) => (
                        <AccountVehicle
                            key={`${car.id}-${idx}`}
                            vehicle={car}
                        />
                    ))}
                </ul>

                <AccountAddBtn />
            </div>
        </section>
    );
}
