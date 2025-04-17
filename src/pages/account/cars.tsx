import AccountAddBtn from '@/components/atoms/account-add-btn';
import AccountItemSkeleton from '@/components/atoms/account-item-skeleton';
import { AccountVehicle } from '@/components/atoms/account-vehicle';
import NoItemsMessage from '@/components/atoms/no-items-message';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddVehicleDialog from '@/components/molecules/account/add-vehicle-dialog';
import DeleteVehicleDialog from '@/components/molecules/account/delete-vehicle-dialog';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { Car } from '@/lib/types/user';
import { hasVehicleInAppointments } from '@/lib/utils/check-vehicle-in-entries';
import { range } from '@/lib/utils/range';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function AccountCars() {
    const { data: user } = useCurrentUser();

    const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null);
    const [showAddVehicleDialog, setShowAddVehicleDialog] = useState(false);

    return (
        <section className="pt-6">
            <div>
                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user != null
                        ? (user.cars.length > 0 ? user.cars.map((car, idx) => (
                              <AccountVehicle
                                  key={`${car.id}-${idx}`}
                                  vehicle={car}
                                  onClick={() =>
                                      hasVehicleInAppointments(
                                          car.reg_number,
                                          user
                                      )
                                          ? toast(
                                                'У вас есть активные записи, вы не можете удалить данный автомобиль'
                                            )
                                          : setSelectedVehicle(car)
                                  }
                                  idx={idx + 1}
                              />
                          )) : <NoItemsMessage className='-mt-4' />)
                        : range(1, 5).map((index) => (
                              <AccountItemSkeleton
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
                {selectedVehicle != null && <DeleteVehicleDialog
                    closeDialog={() => setSelectedVehicle(null)}
                    selectedVehicleId={selectedVehicle.id}
                />}
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
