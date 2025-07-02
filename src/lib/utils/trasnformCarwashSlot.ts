import { CarwashSlot } from "../types/carwash";
import { Slot } from "./search-services";

export default function transformCarwashSlot(slot: CarwashSlot | null): Slot | null {
    if (!slot) return null;

    return {
        id: slot.slot_id,
        time: slot.time,
        price: slot.price
    };
}
