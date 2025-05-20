import PrimaryBtn from '@/components/atoms/primary-btn';
import { useUpdateCarwashAppointment } from '@/lib/hooks/appointments/use-update-carwash-appointment';
import { CarwashAppointment, Status } from '@/lib/types/appointments';
import FilterField from '../search/filter-field';
import SelectField from '@/components/forms/select-field';
import { FormEvent, useState } from 'react';

type UpdateAppointmentDialogProps = {
    closeDialog: () => void;
    carWashId: number;
    selectedAppointment: CarwashAppointment;
    statuses: Status[];
};
export default function UpdateAppointmentDialog({
    closeDialog,
    carWashId,
    selectedAppointment,
    statuses,
}: UpdateAppointmentDialogProps) {
    const { mutate, isPending } = useUpdateCarwashAppointment(
        carWashId,
        closeDialog
    );

    const [statusId, setStatusId] = useState<number>(
        statuses.find((status) => status.name === selectedAppointment.status)
            ?.id ?? 0
    );

    const statusValues = statuses.map((status) => {
        return {
            id: status.id,
            label: status.name,
        };
    });

    const currentStatus =
        statusValues.find((status) => status.id === statusId) ?? null;

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ appointment_id: selectedAppointment.id, status_id: statusId });
    };

    return (
        <form className="my-10 space-y-2" onSubmit={(e) => onSubmit(e)}>
            <div className="space-y-2 my-8">
                {currentStatus && statuses && (
                    <FilterField title="Статус записи">
                        <SelectField
                            values={statusValues}
                            value={currentStatus}
                            onChange={(val) => setStatusId(val)}
                            className="w-60 z-40"
                        />
                    </FilterField>
                )}
            </div>

            <PrimaryBtn type="submit" className="w-full" disabled={isPending}>
                Обновить статус
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}
