import CityListItem from "@/components/atoms/city-list-item";
import { City } from "@/lib/types/city";

type CityListProps = {
    cities: City[] | undefined;
    searchTerm: string;
    select: (city: City) => void;
    currentCityId: number;
    isLoading: boolean;
    isError: boolean;
};

export default function CityList({
    cities,
    searchTerm,
    select,
    currentCityId,
    isLoading,
    isError,
}: CityListProps) {
    if (isLoading) return <li>Загружаем названия городов...</li>;
    if (isError) return <li>Произошла ошибка, попробуйте позже</li>;

    const filtered =
        cities?.filter((city) =>
            city.ru_name.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];

    if (!filtered.length) return <li>По вашему запросу ничего не найдено</li>;

    return (
        <>
            {filtered.map((city) => (
                <CityListItem
                    key={city.id}
                    city={city}
                    select={select}
                    isCurrent={currentCityId === city.id}
                />
            ))}
        </>
    );
}
