import AccountAddBtn from '@/components/atoms/account-add-btn';
import { AccountVehicle } from '@/components/atoms/account-vehicle';
import DialogLayout from '@/components/layouts/dialog-layout';
import DeleteVehicleDialog from '@/components/molecules/account/delete-vehicle-dialog';
import { fakeUser } from '@/lib/data/account-entries';
import { Car } from '@/lib/types/user';
import { useState } from 'react';

export default function AccountCars() {
    const user = fakeUser;

    const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);

    return (
        <section className="pt-6">
            <div>
                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user.cars.map((car, idx) => (
                        <AccountVehicle
                            key={`${car.id}-${idx}`}
                            vehicle={car}
                            onClick={() => setSelectedVehicle(car)}
                        />
                    ))}
                </ul>

                <AccountAddBtn />
            </div>

            <DialogLayout
                title="Вы уверены что хотите удалить автомобиль?"
                isOpen={selectedVehicle != null}
                closeDialog={() => setSelectedVehicle(null)}
            >
                <DeleteVehicleDialog
                    closeDialog={() => setSelectedVehicle(null)}
                />
            </DialogLayout>
        </section>
    );
}
