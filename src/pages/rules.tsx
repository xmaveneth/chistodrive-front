import PolicyLayout from "@/components/layouts/policy-layout";
import { policy } from "@/lib/data/policy";

export default function Rules() {
    return (
        <PolicyLayout heading={`ПРАВИЛА <span style="color: #BDA57E">СЕРВИСА</span>`} sections={policy} />
    )
}

