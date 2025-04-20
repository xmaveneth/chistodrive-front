import AccountAddBtn from '@/components/atoms/account-add-btn';
import AccountItemSkeleton from '@/components/atoms/account-item-skeleton';
import { AccountVehicle } from '@/components/atoms/account-vehicle';
import NoItemsMessage from '@/components/atoms/no-items-message';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddVehicleDialog from '@/components/molecules/account/add-vehicle-dialog';
import DeleteVehicleDialog from '@/components/molecules/account/delete-vehicle-dialog';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { useVehicleTypes } from '@/lib/hooks/vehicles/use-vehicle-types';
import { Car } from '@/lib/types/user';
import { hasVehicleInAppointments } from '@/lib/utils/check-vehicle-in-entries';
import notify from '@/lib/utils/notify';
import { range } from '@/lib/utils/range';
import { useState } from 'react';

export default function AccountCars() {
    const { data: vehicleTypes } = useVehicleTypes();
    const { data: user } = useCurrentUser();

    const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
    const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);

    return (
        <section className="pt-3">
            <div>
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">
                    Автомобили
                </p>
                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user != null ? (
                        user.cars.length > 0 ? (
                            user.cars.map((car, idx) => (
                                <AccountVehicle
                                    key={`${car.id}-${idx}`}
                                    vehicle={car}
                                    onClick={() =>
                                        hasVehicleInAppointments(
                                            car.reg_number,
                                            user
                                        )
                                            ? notify(
                                                  'У вас есть активные записи, вы не можете удалить данный автомобиль'
                                              )
                                            : setSelectedVehicle(car)
                                    }
                                    idx={idx + 1}
                                />
                            ))
                        ) : (
                            <NoItemsMessage className="-mt-4" />
                        )
                    ) : (
                        range(1, 5).map((index) => (
                            <AccountItemSkeleton
                                key={`vehicle-skeleton-${index}`}
                            />
                        ))
                    )}
                </ul>

                <AccountAddBtn onClick={() => setShowAddVehicleDialog(true)} />
            </div>

            <DialogLayout
                title="Вы уверены что хотите удалить автомобиль?"
                isOpen={selectedVehicle != null}
                closeDialog={() => setSelectedVehicle(null)}
            >
                {selectedVehicle != null && (
                    <DeleteVehicleDialog
                        closeDialog={() => setSelectedVehicle(null)}
                        selectedVehicleId={selectedVehicle.id}
                    />
                )}
            </DialogLayout>

            <DialogLayout
                title="Добавить автомобиль"
                description="Заполните форму, чтобы добавить автомобиль"
                isOpen={showAddVehicleDialog}
                closeDialog={() => setShowAddVehicleDialog(false)}
            >
                <AddVehicleDialog
                    closeDialog={() => setShowAddVehicleDialog(false)}
                    vehicleTypes={vehicleTypes}
                />
            </DialogLayout>
        </section>
    );
}
