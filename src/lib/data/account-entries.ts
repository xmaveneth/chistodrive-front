import { User } from "@/lib/types/user";

export const fakeUser: Omit<User, 'favourites'> = {
    name: 'Иван Иванов',
    telephone: '+79991234567',
    appointments: {
        actual: [
            {
                appointment_id: 1,
                date: '2025-04-20',
                time: '10:00',
                price: 700,
                car_wash_name: 'ЧистоDrive',
                location: 'ул. Тверская, 15',
                reg_num: 'А123ВС77',
                service_name: 'Ручная мойка + полировка',
            },
            {
                appointment_id: 2,
                date: '2025-04-22',
                time: '14:30',
                price: 1200,
                car_wash_name: 'АвтоЧист',
                location: 'пр-т Ленина, 28',
                reg_num: 'К456ОР99',
                service_name: 'Комплексная мойка',
            },
        ],
        archive: [
            {
                appointment_id: 3,
                date: '2025-03-15',
                time: '12:00',
                price: 500,
                car_wash_name: 'МойКо',
                location: 'ул. Новослободская, 10',
                reg_num: 'М789ТР197',
                service_name: 'Быстрая мойка',
            },
        ],
    },
    cars: [
        {
            id: 1,
            reg_number: 'А123ВС77',
            owner_id: 1,
            brand: 'Toyota',
            model: 'Camry',
            vehicle_type_id: 1,
        },
        {
            id: 2,
            reg_number: 'К456ОР99',
            owner_id: 1,
            brand: 'BMW',
            model: 'X5',
            vehicle_type_id: 2,
        },
    ],
};
