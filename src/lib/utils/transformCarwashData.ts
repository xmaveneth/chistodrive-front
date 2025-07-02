import { CarwashData } from "../types/carwash";
import { ServiceResult } from "./search-services";

export default function transformCarwashData(carwashData: CarwashData, price: number, id: number) {

    const extracted = carwashData.data;

    const serviceResult: ServiceResult = {
        car_wash_id: id,
        car_wash_name: extracted.name,
        address: extracted.location,
        lat: extracted.lat,
        lng: extracted.lng,
        img: "",
        url: "",
        service_name: "",
        description: extracted.description,
        price: price,
        start_price: 100,
        end_price: 100,
        slots: []
    };

    return serviceResult;
}
