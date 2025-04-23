import { WorkDay } from '@/lib/types/admin';

export const workSchedule: WorkDay[] = [
    { start: '09:00', end: '18:00', is_day_off: false }, // Monday
    { start: '09:00', end: '18:00', is_day_off: false }, // Tuesday
    { start: '09:00', end: '18:00', is_day_off: false }, // Wednesday
    { start: '10:00', end: '17:00', is_day_off: false }, // Thursday
    { start: '10:00', end: '17:00', is_day_off: false }, // Friday
    { start: '11:00', end: '15:00', is_day_off: false }, // Saturday
    { start: null, end: null, is_day_off: true }, // Sunday
];
