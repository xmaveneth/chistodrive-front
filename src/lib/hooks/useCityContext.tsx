import { CityContext } from "@/lib/providers/city-provider";
import { useContext } from "react";

export function useCityContext() {
    const cityContext = useContext(CityContext);

    if (cityContext == null) {
        throw new Error('Must be within provider');
    }

    return cityContext;
}