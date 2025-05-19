export type City = {
    id: number;
    name: string;
    ru_name: string;
    lat: string;
    lng: string;
};

export const defaultCity: City = {
    id: 1,
    name: 'Moscow',
    ru_name: 'Москва',
    lat: '55.7558',
    lng: '37.6176',
};
