import { CarwashSlot } from "../types/carwash";
import { Slot } from "./search-services";

export default function transformCarwashSlot(slot: CarwashSlot, price: number): Slot {
    return {
        id: slot.slot_id,
        time: slot.time,
        price: price
    };
}
