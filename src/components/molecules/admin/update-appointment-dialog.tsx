import PrimaryBtn from '@/components/atoms/primary-btn';
import { useUpdateCarwashAppointment } from '@/lib/hooks/appointments/use-update-carwash-appointment';
import { CarwashAppointment, Status } from '@/lib/types/appointments';
import FilterField from '../search/filter-field';
import SelectField from '@/components/forms/select-field';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

type UpdateAppointmentDialogProps = {
    closeDialog: () => void;
    selectedAppointment: CarwashAppointment;
    statuses: Status[];
    toggleStatus: () => void;
};
export default function UpdateAppointmentDialog({
    closeDialog,
    selectedAppointment,
    statuses,
    toggleStatus
}: UpdateAppointmentDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);

    const { mutate, isPending } = useUpdateCarwashAppointment(
        parsedId,
        closeDialog
    );


    const [statusId, setStatusId] = useState<number>(
        statuses[0].id
    );

    const statusValues = statuses.map((status) => {
        return {
            id: status.id,
            label: status.name,
        };
    });

    const currentStatus =
        statusValues.find((status) => status.id === statusId) ?? statusValues[0];

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ appointment_id: selectedAppointment.id, status_id: statusId });
        toggleStatus();
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
