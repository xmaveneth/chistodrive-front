import PolicyLayout from "@/components/layouts/policy-layout";
import { rules } from "@/lib/data/rules";

export default function Rules() {
    return (
        <PolicyLayout heading={`ПОЛЬЗОВАТЕЛЬСКОЕ <span style="color: #BDA57E">СОГЛАШЕНИЕ</span>`} sections={rules} />
    )
}

