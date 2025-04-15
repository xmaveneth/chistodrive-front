import { SearchServiceContext } from '@/lib/providers/search-service-provider';
import { useContext } from 'react';

export function useSearchServicesContext() {
    const SearchServicesContext = useContext(SearchServiceContext);

    if (SearchServicesContext == null) {
        throw new Error('Must be within provider');
    }

    return SearchServicesContext;
}
