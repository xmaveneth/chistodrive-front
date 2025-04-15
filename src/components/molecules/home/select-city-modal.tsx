import SearchField from '@/components/forms/search-field';
import CityList from '@/components/molecules/home/city-list';
import { useCities } from '@/lib/hooks/useCities';
import { useCityContext } from '@/lib/hooks/useCityContext';
import { Button, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export default function SelectCityModal() {
    const { data: cities, isLoading, isError } = useCities();
    const [searchTerm, setSearchTerm] = useState('');
    const { currentCity, showCityList, selectCity, toggleCityList } =
        useCityContext();
        

    return (
        <Transition show={showCityList}>
            <div
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                className="transition absolute top-15 duration-300 left-1/2 -translate-x-1/2 ease-in data-[closed]:opacity-0 bg-background max-w-80 w-full sm:w-80 rounded-2xl p-2 text-black-20"
            >
                <Button
                    onClick={() => toggleCityList(false)}
                    className="ml-auto cursor-pointer relative block"
                >
                    <XMarkIcon className="size-4" />
                    <span className="absolute inset-0 size-8 -translate-x-1/2"></span>
                </Button>
                <div className="px-2">
                    <header className="mb-3 px-1">
                        <p className="text-lg text-center">Выберите город</p>
                    </header>
                    <SearchField
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Ваш город"
                        className="w-full"
                    />
                    <ul className="space-y-1 h-60 md:h-80 overflow-y-auto scrollbar-hidden px-1 py-1">
                        <CityList
                            cities={cities}
                            searchTerm={searchTerm}
                            select={selectCity}
                            currentCityId={currentCity.id}
                            isLoading={isLoading}
                            isError={isError}
                        />
                    </ul>
                </div>
            </div>
        </Transition>
    );
}
