import PolicyLayout from "@/components/layouts/policy-layout";
import { rules } from "@/lib/data/rules";

export default function Rules() {
    return (
        <PolicyLayout heading={`ПРАВИЛА <span style="color: #BDA57E">СЕРВИСА</span>`} sections={rules} />
    )
}

