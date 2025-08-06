import PrimaryBtn from '@/components/atoms/primary-btn';
import ErrorField from '@/components/forms/error-field';
import { useCreateScriptInterval } from '@/lib/hooks/scripts/use-create-script-interval';
import { ServiceWithIntervals } from '@/lib/types/intervals';
import { Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type AddIntervalDialogProps = {
    closeDialog: () => void;
    selectServiceWithIntervals: ServiceWithIntervals | null;
};

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export default function AddIntervalDialog({
    closeDialog,
    selectServiceWithIntervals,
}: AddIntervalDialogProps) {
    const { id } = useParams();
    const { mutate, isPending } = useCreateScriptInterval(closeDialog);

    const [startTime, setStartTime] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endTimeError, setEndTimeError] = useState('');

    function handleClick() {
        if (selectServiceWithIntervals == null) return;

        if (!startTime || !timeRegex.test(startTime)) {
            setStartTimeError(
                'Введите корректное время начала в формате HH:MM'
            );
            return;
        }

        setStartTimeError('');

        if (!endTime || !timeRegex.test(endTime)) {
            setEndTimeError(
                'Введите корректное время окончания в формате HH:MM'
            );
            return;
        }

        if (endTime <= startTime) {
            setEndTimeError(
                'Время начала не может быть больше или равным времени окончания'
            );
            return;
        }

        setEndTimeError('');

        mutate({
            script_id: Number(id),
            service_param_id: selectServiceWithIntervals.service_params_id,
            start_time: startTime,
            end_time: endTime,
        });
    }

    return (
        <div className="my-6">
            <div className="mb-8 space-y-4">
                <Field className="flex flex-col items-start gap-2">
                    <Label className="text-white">Время начала</Label>
                    <Input
                        type="time"
                        step={60}
                        className="bg-input-bg rounded-full px-3 py-1.5"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                    {startTimeError !== '' && (
                        <ErrorField>{startTimeError}</ErrorField>
                    )}
                </Field>
                <Field className="flex flex-col items-start gap-2">
                    <Label className="text-white">Время окончания</Label>
                    <Input
                        type="time"
                        step={60}
                        className="bg-input-bg rounded-full px-3 py-1.5"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                    {endTimeError !== '' && (
                        <ErrorField>{endTimeError}</ErrorField>
                    )}
                </Field>
            </div>

            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Сохранить
            </PrimaryBtn>

            <PrimaryBtn
                type="button"
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
