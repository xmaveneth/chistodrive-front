import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import useToggle from '@/lib/hooks/useToggle';
import { City, defaultCity } from '@/lib/types/city';
import { createContext, useEffect } from 'react';

type CityContextType = {
    showCityList: boolean;
    currentCity: City;
    toggleCityList: (value?: boolean) => void;
    selectCity: (city: City) => void;
};

export const CityContext = createContext<CityContextType | null>(null);

export function CityProvider({ children }: { children: React.ReactNode }) {
    const [showCityList, toggleCityList] = useToggle(false);
    const [currentCity, setCurrentCity] = useLocalStorage<City>(
        'currentCity',
        defaultCity
    );

    useEffect(() => {
        if (showCityList) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }

        return () =>
            document.documentElement.classList.remove('overflow-hidden');
    }, [showCityList]);

    function selectCity(city: City) {
        setCurrentCity(city);
    }

    return (
        <CityContext.Provider
            value={{ showCityList, currentCity, toggleCityList, selectCity }}
        >
            {children}
        </CityContext.Provider>
    );
}
