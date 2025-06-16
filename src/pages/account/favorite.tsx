import AccountItemSkeleton from '@/components/atoms/account-item-skeleton';
import { FavouriteCarwash } from '@/components/atoms/favourite-carwash';
import { FavouriteEntry } from '@/components/atoms/favourite-entry';
import NoItemsMessage from '@/components/atoms/no-items-message';
import SelectMenu from '@/components/atoms/select-menu';
import DialogLayout from '@/components/layouts/dialog-layout';
import AccountSlotDialog from '@/components/molecules/account/account-slot-dialog';
import DeleteCarwashDialog from '@/components/molecules/account/delete-carwash-dialog';
import DeleteSlotDialog from '@/components/molecules/account/delete-slot-dialog';
import { useCurrentUser } from '@/lib/hooks/auth/use-current-user';
import { FavouriteSlot } from '@/lib/types/user';
import { range } from '@/lib/utils/range';
import { useState } from 'react';

const favoriteTypes = [
    "Окно",
    "Автомойки"
];

export default function AccountFavorite() {
    const { data: user } = useCurrentUser();

    const [selectedSlot, setSelectedSlot] = useState<FavouriteSlot | null>(
        null
    );
    const [showSlotDialog, setShowSlotDialog] = useState(false);
    const [selected, setSelected] = useState(favoriteTypes[0]);

    const [showDeleteSlotDialog, setShowDeleteSlotDialog] = useState(false);
    const [showDeleteCarwashDialog, setShowDeleteCarwashDialog] =
        useState(false);

    function RenderMobileFavorites() {
        if (user == null) return (range(1, 5).map((index) => (
            <AccountItemSkeleton
                key={`vehicle-skeleton-${index}`}
            />
        )));

        if (selected === "Окно") {
            const data = user.favourites.slot;

            if (data.length === 0) {
                return <NoItemsMessage />;
            }

            return data.map((slot, idx) => (
                <FavouriteEntry
                    key={`${slot.id}-${idx}`}
                    slot={slot}
                    deleteSlot={() => {
                        setShowDeleteSlotDialog(true);
                        setSelectedSlot(slot);
                    }}
                    showSlot={() => {
                        setSelectedSlot(slot);
                        setShowSlotDialog(true);
                    }}
                />
            ));

        } else if (selected === "Автомойки") {
            const data = user.favourites.car_wash;

            if (data.length === 0) {
                return <NoItemsMessage />;
            }

            return data.map((carwash, idx) => (
                <FavouriteCarwash
                    key={`${carwash.id}-${idx}`}
                    carwash={carwash}
                    deleteCarwash={() =>
                        setShowDeleteCarwashDialog(true)
                    }
                />
            ))

        }
    }

    return (
        <section>
            <div className="flex md:hidden flex-col gap-4 lg:flex-row md:justify-between md:pt-3 md:gap-6">
                <div className="md:flex-1">
                    <p className="mb-3.5 text-sm sm:text-base md:text-lg">
                        <div className="w-40 mb-2">
                            <SelectMenu selected={selected} setSelected={setSelected} values={favoriteTypes} />
                        </div>
                    </p>

                    <div className="space-y-2 mb-3.5 md:space-y-5">
                        <RenderMobileFavorites />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col gap-4 lg:flex-row md:justify-between md:pt-3 md:gap-6">
                <div className="md:flex-1">
                    <p className="mb-2.5 text-sm sm:text-base md:text-lg">
                        Окно
                    </p>

                    <div className="space-y-3 mb-3.5 md:space-y-5">
                        {user != null ? (
                            user.favourites.slot.length > 0 ? (
                                user.favourites.slot.map((slot, idx) => (
                                    <FavouriteEntry
                                        key={`${slot.id}-${idx}`}
                                        slot={slot}
                                        deleteSlot={() => {
                                            setShowDeleteSlotDialog(true);
                                            setSelectedSlot(slot);
                                        }}
                                        showSlot={() => {
                                            setSelectedSlot(slot);
                                            setShowSlotDialog(true);
                                        }}
                                    />
                                ))
                            ) : (
                                <NoItemsMessage />
                            )
                        ) : (
                            range(1, 5).map((index) => (
                                <AccountItemSkeleton
                                    key={`vehicle-skeleton-${index}`}
                                />
                            ))
                        )}
                    </div>

                </div>
                <div className="md:flex-1">
                    <p className="mb-2.5 text-sm sm:text-base md:text-lg">
                        Автомойки
                    </p>

                    <div className="space-y-2 mb-3.5 md:space-y-5">
                        {user != null ? (
                            user.favourites.car_wash.length > 0 ? (
                                user.favourites.car_wash.map((carwash, idx) => (
                                    <FavouriteCarwash
                                        key={`${carwash.id}-${idx}`}
                                        carwash={carwash}
                                        deleteCarwash={() =>
                                            setShowDeleteCarwashDialog(true)
                                        }
                                    />
                                ))
                            ) : (
                                <NoItemsMessage />
                            )
                        ) : (
                            range(1, 5).map((index) => (
                                <AccountItemSkeleton
                                    key={`vehicle-skeleton-${index}`}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {selectedSlot != null && (
                <DialogLayout
                    isOpen={showSlotDialog}
                    closeDialog={() => setShowSlotDialog(false)}
                >
                    <AccountSlotDialog
                        slot={selectedSlot}
                        closeDialog={() => setShowSlotDialog(false)}
                    />
                </DialogLayout>
            )}

            <DialogLayout
                title="Вы уверены что хотите удалить данное окно?"
                isOpen={showDeleteSlotDialog}
                closeDialog={() => setShowDeleteSlotDialog(false)}
            >
                <DeleteSlotDialog
                    selectedSlot={selectedSlot}
                    closeDialog={() => setShowDeleteSlotDialog(false)}
                />
            </DialogLayout>

            <DialogLayout
                title="Вы уверены что хотите удалить данную автомойку?"
                isOpen={showDeleteCarwashDialog}
                closeDialog={() => setShowDeleteCarwashDialog(false)}
            >
                <DeleteCarwashDialog
                    closeDialog={() => setShowDeleteCarwashDialog(false)}
                />
            </DialogLayout>
        </section>
    );
}
