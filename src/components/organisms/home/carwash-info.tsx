import AddFavouriteBtn from "@/components/atoms/add-favourite-btn";
import { CarwashData, CarwashSlot } from "@/lib/types/carwash"
import Rating from "@mui/material/Rating";
import { MapPinIcon, Phone } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../shared/error-boundary";
import useSearchSlotsContext from "@/lib/hooks/context/use-search-slots-context";
import PrimaryFilters from "../search/primary-filters";
import { useState } from "react";
import { conjugateReviewWord } from "@/lib/utils/conjugate-review-word";
import { useCurrentUser } from "@/lib/hooks/auth/use-current-user";
import { useAuthContext } from "@/lib/hooks/context/use-auth-context";
import DialogLayout from "@/components/layouts/dialog-layout";
import EntryDialog from "@/components/molecules/search/entry-dialog";
import { useParams } from "react-router-dom";
import transformCarwashData from "@/lib/utils/transformCarwashData";
import transformCarwashSlot from "@/lib/utils/trasnformCarwashSlot";
import { cn } from "@/lib/utils";
import { CarwashGallery } from "@/components/molecules/home/carwash-gallery";
import { formatTimeToHHMM } from "@/lib/utils/format-date";
import { useAddFavouriteCarwash } from "@/lib/hooks/carwash/use-add-favourite-carwash";
import { useDeleteFavouriteCarwash } from "@/lib/hooks/carwash/use-delete-favourite-carwash";

const Header = () => {
    return (
        <div className="mt-3.5 mb-6 sm:mt-5 xl:mt-7 xl:mb-9.5">
            <h2 className="mb-3.5 sm:mb-5 xl:mb-7 md:text-lg">
                Фильтры
            </h2>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FilterWrapper />
            </ErrorBoundary>
        </div>
    )
}

type SlotSectionProps = {
    slots: CarwashSlot[];
    onClick: (price: number, slot: CarwashSlot) => void;
}

const SlotSection: React.FC<SlotSectionProps> = ({ slots, onClick }) => {
    const { isError, data: user, isLoading } = useCurrentUser();
    const isLoggedIn = !(isError || !user);
    const { toggleLoginDialog } = useAuthContext();

    return (
        <div className={cn('flex flex-wrap items-center gap-2 md:gap-x-3 overflow-clip transition-all duration-300 ease-in-out'
        )}>
            {slots && slots.map(slot => (
                <button disabled={isLoading} key={`slot-${slot.slot_id}`} onClick={() => isLoggedIn ? onClick(slot.price, slot) : toggleLoginDialog(true)} className='px-3 py-1.5 rounded-full bg-btn-bg cursor-pointer font-medium hover:bg-btn-hover transition-colors duration-200 ease-in'>{formatTimeToHHMM(slot.time)}</button>
            ))}
        </div>
    )
}

type SlotsProps = {
    onClick: (price: number, slot: CarwashSlot) => void;
}

const Slots: React.FC<SlotsProps> = ({ onClick }) => {
    const { slotsData } = useSearchSlotsContext();

    return (
        <div>
            {slotsData?.data.map((category, idx) => (
                <div key={`category-group-${idx + 1}`}>
                    <div className="mb-4 text-lg">{category.service_category_name}</div>
                    {category.service_list.map((service, serviceIdx) => (
                        <div key={`slot-group-${serviceIdx + 1}`} className="mb-5">
                            <div className="my-2">{service.service_name}</div>
                            <p className="mb-3 text-btn-bg">{service.start_price === service.end_price ? `${service.start_price} ₽` : `${service.start_price} ₽ - ${service.end_price} ₽`} </p>
                            <SlotSection slots={service.slot_list} onClick={onClick} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const Info: React.FC<{ carwashData: CarwashData, onClick: (price: number, slot: CarwashSlot) => void }> = ({ carwashData, onClick }) => {

    const { id } = useParams();
    const { data: user } = useCurrentUser();

    const isFavourite = user?.favourites.car_wash.find(
                (fav_carwash) => fav_carwash.car_wash_id  === Number(id)
            ) != null;

    const { mutate: addFavouriteCarwash, isPending: isFavoritePending } =
        useAddFavouriteCarwash(
            () => {},
            () => {}
        );
    const { mutate: deleteFavouriteCarwash, isPending: isDeleteFavoritePending } =
        useDeleteFavouriteCarwash(
            () => {},
            () => {},
        );

    function handleAddFavourite() {

        addFavouriteCarwash(Number(id));
    }

    function handleDeleteFavourite() {
        if (user == null) return;

        const favouriteSlot = user.favourites.car_wash.find(
            (fav_carwash) => fav_carwash.car_wash_id === Number(id)
        );

        if (favouriteSlot == null) return;

        deleteFavouriteCarwash(favouriteSlot.car_wash_id);
    }


    return (
        <div className="lg:flex-1 lg:order-1 text-sm md:text-base">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h2 className="text-white text-xl mb-2.5 sm:text-2xl">{carwashData.data.name}</h2>

                    <div className="flex items-center gap-2">
                        <Rating name="read-only" value={carwashData.data.rating} size="small" readOnly />
                        <span className="text-white">{carwashData.data.rating}</span>
                        <span className="text-gray-300 ml-2">{carwashData.data.review_num} {conjugateReviewWord(carwashData.data.review_num)}</span>
                    </div>
                </div>

                {user != null && <AddFavouriteBtn
                    addClick={handleAddFavourite}
                    deleteClick={handleDeleteFavourite}
                    disabled={isFavoritePending || isDeleteFavoritePending}
                    sizeClass="size-5"
                    className="p-2"
                    isAdded={isFavourite}
                />}

            </div>
            <div className="mt-4">
                <p className="flex items-center gap-3 mb-3 text-gray-300">
                    <Phone className="size-5 shrink-0 text-btn-bg" />
                    {carwashData.data.phone}
                </p>
                <p className="flex items-center gap-3 mb-3 text-gray-300">
                    <MapPinIcon className="size-5 shrink-0 text-btn-bg" />
                    {carwashData.data.location}
                </p>

                <p className="mt-5 text-gray-300">{carwashData.data.description}</p>

            </div>

            <div className="mt-4">
                <Slots onClick={onClick} />
            </div>
        </div>
    )
}

type CarwashInfoProps = {
    carwashData: CarwashData;
}

export default function CarwashInfo({ carwashData }: CarwashInfoProps) {
    const [showEntryDialog, setShowEntryDialog] = useState(false);
    const { date, userCars } = useSearchSlotsContext();
    const { id } = useParams();
    const [selectedSlot, setSelectedSlot] = useState<CarwashSlot | null>(null);
    const [price, setPrice] = useState(0);

    const serviceResult = transformCarwashData(carwashData, price, Number(id));
    const slot = transformCarwashSlot(selectedSlot);

    function handleTimeSelect(price: number, slot: CarwashSlot) {
        setSelectedSlot(slot);
        setPrice(price);
        setShowEntryDialog(true);
    }

    return (
        <>
            <Header />
            <section className="flex flex-col lg:flex-row gap-4.5 sm:gap-10 lg:items-start">
                <Info carwashData={carwashData} onClick={handleTimeSelect} />
                <CarwashGallery carwashData={carwashData} />
            </section>

            <DialogLayout
                isOpen={showEntryDialog}
                closeDialog={() => setShowEntryDialog(false)}
            >
                {slot != null && <EntryDialog
                    userCars={userCars}
                    carwash={serviceResult}
                    date={date}
                    time={slot.time}
                    slot={slot}
                    closeDialog={() => setShowEntryDialog(false)}
                />
                }
            </DialogLayout>
        </>
    )
}

function FilterWrapper() {
    const {
        areFiltersLoading,
        filters,
        date,
        setDate,
        startTime,
        endTime,
        setStartTime,
        setEndTime,
        startPrice,
        endPrice,
        setStartPrice,
        setEndPrice,
        serviceCategoryId,
        setServiceCategoryId,
        serviceTypeId,
        setServiceTypeId,
        vehicleTypeId,
        setVehicleTypeId,
    } = useSearchSlotsContext();

    return <PrimaryFilters areFiltersLoading={areFiltersLoading} filters={filters} date={date} setDate={setDate} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndPrice={setEndPrice} setEndTime={setEndTime} endPrice={endPrice} startPrice={startPrice} serviceCategoryId={serviceCategoryId} setServiceCategoryId={setServiceCategoryId} serviceTypeId={serviceTypeId} setServiceTypeId={setServiceTypeId} vehicleTypeId={vehicleTypeId} setVehicleTypeId={setVehicleTypeId} setStartPrice={setStartPrice} />;
}


