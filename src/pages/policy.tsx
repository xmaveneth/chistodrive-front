import PolicyLayout from "@/components/layouts/policy-layout";
import { policy } from "@/lib/data/policy";

export default function Policy() {
    return <PolicyLayout heading={`ПОЛИТИКА ОБРАБОТКИ <span style="color: #BDA57E">ПЕРСОНАЛЬНЫХ ДАННЫХ</span>`} sections={policy} />
}
