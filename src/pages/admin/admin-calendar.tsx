import { DatePicker } from '@/components/organisms/admin/date-picker';
import { useState } from 'react';

export default function AdminCalendar() {
    const [date, setDate] = useState(new Date());

    function selectDate(newDate: Date | null) {
        if (newDate == null) return;

        setDate(newDate);
    }
    return (
        <div>
            <DatePicker value={date} onChange={selectDate} />
            <div>This is admin calendar page</div>
        </div>
    );
}
