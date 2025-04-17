import { User } from '@/lib/types/user';

export function hasVehicleInAppointments(reg_num: string, user: User): boolean {
    return user.appointments.actual.some((a) => a.reg_num === reg_num);
}
