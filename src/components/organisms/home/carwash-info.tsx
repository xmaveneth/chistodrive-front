import AddFavouriteBtn from "@/components/atoms/add-favourite-btn";
import { CarwashData } from "@/lib/types/carwash"
import Rating from "@mui/material/Rating";
import { MapPinIcon } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../shared/error-boundary";
import useSearchSlotsContext from "@/lib/hooks/context/use-search-slots-context";
import PrimaryFilters from "../search/primary-filters";
import { useState } from "react";

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

const Info: React.FC<{ carwashData: CarwashData }> = ({ carwashData }) => {
    return (
        <div className="md:flex-1 md:order-1">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h2 className="text-white text-xl mb-2.5">{carwashData.data.name}</h2>

                    <div className="flex items-center gap-2">
                        <Rating name="read-only" value={carwashData.data.rating} size="small" readOnly />
                    </div>
                </div>

                <AddFavouriteBtn
                    addClick={() => { }}
                    deleteClick={() => { }}
                    disabled={true}
                    sizeClass="size-4"
                    className=""
                    isAdded={false}
                />

            </div>
            <div>
                <p className="flex items-center gap-1 my-4 text-sm text-white/70">
                    <MapPinIcon className="size-6 shrink-0 text-btn-bg" />
                    {carwashData.data.location}
                </p>

            </div>
        </div>
    )
}

const Gallery: React.FC<{ carwashData: CarwashData }> = ({ carwashData }) => {
    const [imageIdx, setImageIdx] = useState(0);

    const images = carwashData.data.media;

    return (
        <div className="md:flex-1">
            {images.length > 0 && (
                <>
                    <div className="aspect-[4/3] rounded-xl overflow-clip mb-2">
                        <img src={images[imageIdx]} alt="Фото автомойки" className="size-full object-cover object-center" />
                    </div>
                    <div className="flex items-center overflow-x-auto gap-2 scrollbar-hidden">
                        {images.map((img, idx) => (
                            <button key={`media-${idx}`} onClick={() => setImageIdx(idx)} className="rounded-xl block cursor-pointer shrink-0 aspect-[4/3] overflow-clip" style={{width: 'calc((100% - 0.5rem) / 3)'}}>
                                <img src={img} alt="Фото автомойки" className="size-full object-cover object-center"/>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

type CarwashInfoProps = {
    carwashData: CarwashData;
}

export default function CarwashInfo({ carwashData }: CarwashInfoProps) {
    return (
        <>
            <Header />
            <section className="flex flex-col md:flex-row gap-4.5 sm:gap-10 md:gap-4 md:items-start">
                <Info carwashData={carwashData} />
                <Gallery carwashData={carwashData} />
            </section>
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


