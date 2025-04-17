import AccountAddBtn from '@/components/atoms/account-add-btn';
import { AccountVehicle } from '@/components/atoms/account-vehicle';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddVehicleDialog from '@/components/molecules/account/add-vehicle-dialog';
import DeleteVehicleDialog from '@/components/molecules/account/delete-vehicle-dialog';
import { useUserContext } from '@/lib/hooks/context/use-user-context';
import { Car } from '@/lib/types/user';
import { range } from '@/lib/utils/range';
import { useState } from 'react';

export default function AccountCars() {
    const { user } = useUserContext();

    const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
    const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);

    return (
        <section className="pt-6">
            <div>
                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user != null
                        ? user.cars.map((car, idx) => (
                              <AccountVehicle
                                  key={`${car.id}-${idx}`}
                                  vehicle={car}
                                  onClick={() => setSelectedVehicle(car)}
                                  idx={idx + 1}
                              />
                          ))
                        : range(1, 5).map((index) => (
                              <AccountVehicleSkeleton
                                  key={`vehicle-skeleton-${index}`}
                              />
                          ))}
                </ul>

                <AccountAddBtn onClick={() => setShowAddVehicleDialog(true)} />
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

            <DialogLayout
                title="Добавить автомобиль"
                description="Заполните форму, чтобы добавить автомобиль"
                isOpen={showAddVehicleDialog}
                closeDialog={() => setShowAddVehicleDialog(false)}
            >
                <AddVehicleDialog
                    closeDialog={() => setShowAddVehicleDialog(false)}
                />
            </DialogLayout>
        </section>
    );
}

function AccountVehicleSkeleton() {
    return (
        <li className="w-full px-6 py-3 bg-gray-400 text-transparent animate-pulse flex items-center gap-5 rounded-full lg:py-5">
            <div className="h-5 shrink-0 lg:h-8">Loading</div>
        </li>
    );
}
