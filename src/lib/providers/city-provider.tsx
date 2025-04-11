import useToggle from '@/lib/hooks/useToggle';
import { City, defaultCity } from '@/lib/types/city';
import { useState, createContext } from 'react';

type CityContextType = {
    showCityList: boolean;
    currentCity: City;
    toggleCityList: (value?: boolean) => void;
    selectCity: (city: City) => void;
};

export const CityContext = createContext<CityContextType | null>(null);

export function CityProvider({ children }: { children: React.ReactNode }) {
    const [showCityList, toggleCityList] = useToggle(false)
    const [currentCity, setCurrentCity] = useState<City>(defaultCity);

    function selectCity(city: City) {
        setCurrentCity(city);
    }

    return <CityContext.Provider value={{showCityList, currentCity, toggleCityList, selectCity}}>{children}</CityContext.Provider>;
}
