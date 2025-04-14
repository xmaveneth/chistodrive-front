import ServiceCard from '@/components/molecules/search/service-card';
import { ServiceResult } from '@/lib/utils/search-services';

type SearchResultProps = {
    services: ServiceResult[] | undefined;
};

export default function SearchResult({ services }: SearchResultProps) {
    if (services == null) return null;

    return (
        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-5 xs:gap-3 md:gap-3.5">
            {services.map((service) => (
                <ServiceCard
                    key={`service-${service.car_wash_id}`}
                    imgPath={service.img}
                    rating={4}
                    name={service.car_wash_name}
                    address={service.address}
                    description={service.description}
                    price={service.price}
                    url={service.url}
                />
            ))}
        </div>
    );
}
