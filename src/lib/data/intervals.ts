import { ScheduleIntervalsResponse } from '@/lib/types/intervals';

export const fakeScheduleIntervalsResponse: ScheduleIntervalsResponse = {
    intervals: [
        {
            vehicle_type_name: 'Легковой',
            interval_data: [
                {
                    service_category_name: 'Кузов',
                    services: [
                        {
                            service_name: 'Техническая мойка',
                            service_params_id: 1,
                            intervals: [
                                {
                                    interval_id: 1,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2],
                                    boxes: [2],
                                },
                                {
                                    interval_id: 2,
                                    start_time: '12:00',
                                    end_time: '16:00',
                                    price: 700,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 3,
                                    start_time: '16:00',
                                    end_time: '20:00',
                                    price: 800,
                                    workers: [1, 2],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                        {
                            service_name: 'Бережная мойка',
                            service_params_id: 2,
                            intervals: [
                                {
                                    interval_id: 4,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2, 3],
                                    boxes: [1],
                                },
                                {
                                    interval_id: 5,
                                    start_time: '12:00',
                                    end_time: '17:00',
                                    price: 750,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 6,
                                    start_time: '17:00',
                                    end_time: '20:00',
                                    price: 820,
                                    workers: [1],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            vehicle_type_name: 'Внедорожник',
            interval_data: [
                {
                    service_category_name: 'Кузов',
                    services: [
                        {
                            service_name: 'Техническая мойка',
                            service_params_id: 1,
                            intervals: [
                                {
                                    interval_id: 1,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2],
                                    boxes: [2],
                                },
                                {
                                    interval_id: 2,
                                    start_time: '12:00',
                                    end_time: '16:00',
                                    price: 700,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 3,
                                    start_time: '16:00',
                                    end_time: '20:00',
                                    price: 800,
                                    workers: [1, 2],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                        {
                            service_name: 'Бережная мойка',
                            service_params_id: 2,
                            intervals: [
                                {
                                    interval_id: 4,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2, 3],
                                    boxes: [1],
                                },
                                {
                                    interval_id: 5,
                                    start_time: '12:00',
                                    end_time: '17:00',
                                    price: 750,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 6,
                                    start_time: '17:00',
                                    end_time: '20:00',
                                    price: 820,
                                    workers: [1],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            vehicle_type_name: 'Премиум',
            interval_data: [
                {
                    service_category_name: 'Кузов',
                    services: [
                        {
                            service_name: 'Техническая мойка',
                            service_params_id: 1,
                            intervals: [
                                {
                                    interval_id: 1,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2],
                                    boxes: [2],
                                },
                                {
                                    interval_id: 2,
                                    start_time: '12:00',
                                    end_time: '16:00',
                                    price: 700,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 3,
                                    start_time: '16:00',
                                    end_time: '20:00',
                                    price: 800,
                                    workers: [1, 2],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                        {
                            service_name: 'Бережная мойка',
                            service_params_id: 2,
                            intervals: [
                                {
                                    interval_id: 4,
                                    start_time: '10:00',
                                    end_time: '12:00',
                                    price: 500,
                                    workers: [1, 2, 3],
                                    boxes: [1],
                                },
                                {
                                    interval_id: 5,
                                    start_time: '12:00',
                                    end_time: '17:00',
                                    price: 750,
                                    workers: [2],
                                    boxes: [2, 3],
                                },
                                {
                                    interval_id: 6,
                                    start_time: '17:00',
                                    end_time: '20:00',
                                    price: 820,
                                    workers: [1],
                                    boxes: [1, 2, 3],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    select_values: {
        workers: [
            {
                script_worker_id: 1,
                worker_name: 'Иванов Иван Иванович',
            },
            {
                script_worker_id: 2,
                worker_name: 'Павлов Павел Павлович',
            },
            {
                script_worker_id: 3,
                worker_name: 'Сергеев Сергей Сергеевич',
            },
        ],
        boxes: [
            {
                script_box_id: 1,
                box_name: 'Бокс №1',
            },
            {
                script_box_id: 2,
                box_name: 'Бокс №2',
            },
            {
                script_box_id: 3,
                box_name: 'Бокс №3',
            },
        ],
    },
};
