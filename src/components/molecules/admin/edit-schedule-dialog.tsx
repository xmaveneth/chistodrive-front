import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryBtn from '@/components/atoms/primary-btn';
import CheckboxField from '@/components/forms/checkbox-field';
import { Field, Input, Label } from '@headlessui/react';
import { WorkDay } from '@/lib/types/admin';
import { useUpdateCarwashSchedule } from '@/lib/hooks/carwashes/use-update-carwash-schedule';
import { AxiosError } from 'axios';
import notify from '@/lib/utils/notify';

type EditScheduleDialogProps = {
    closeDialog: () => void;
    carWashId: number;
    schedules: WorkDay[] | null;
};

const russianTimeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const workDaySchema = z
    .object({
        start: z
            .string()
            .regex(russianTimeRegex, 'Неверный формат времени')
            .nullable(),
        end: z
            .string()
            .regex(russianTimeRegex, 'Неверный формат времени')
            .nullable(),
        is_day_off: z.boolean(),
    })
    .superRefine((data, ctx) => {
        if (data.is_day_off === false) {
            if (
                data.start == null ||
                data.start === '' ||
                data.end == null ||
                data.end === ''
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: 'Укажите время начала и окончания работы',
                    path: ['is_day_off'],
                });
                return; 
            }

            if (data.start >= data.end) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        'Время начала должно быть раньше времени окончания',
                    path: ['is_day_off'],
                });
            }
        }
    });


const schema = z.object({
    schedule: z.array(workDaySchema).length(7, 'Должно быть ровно 7 дней'),
});

type FormValues = z.infer<typeof schema>;

const defaultDay: WorkDay = {
    start: '09:00',
    end: '18:00',
    is_day_off: false,
};

export default function EditScheduleDialog({
    closeDialog,
    carWashId,
    schedules,
}: EditScheduleDialogProps) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            schedule: schedules ?? Array.from({ length: 7 }, () => defaultDay),
        },
    });

    const { fields } = useFieldArray({
        control,
        name: 'schedule',
    });

    const watchedSchedule = watch('schedule');

    const { mutate, isPending } = useUpdateCarwashSchedule();

    const onSubmit = (values: FormValues) => {
        const cleaned = values.schedule.map((day) =>
            day.is_day_off ? { start: null, end: null, is_day_off: true } : day
        );

        mutate(
            {
                car_wash_id: carWashId,
                data: cleaned,
            },
            {
                onSuccess: () => {
                    notify('Расписание успешно обновлено!');
                    closeDialog();
                },
                onError: (error: unknown) => {
                    if (error instanceof AxiosError && error.response) {
                        const detail = error.response.data?.detail;
                        notify(
                            typeof detail[0].msg === 'string'
                                ? detail[0].msg
                                : 'Ошибка добавления записи. Попробуйте позже.'
                        );
                    } else {
                        notify('Ошибка добавления записи. Попробуйте позже.');
                    }
                },
            }
        );
    };

    const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    return (
        <form
            className="my-10 space-y-4 sm:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex items-start flex-col gap-3 xs:flex-row"
                >
                    <div className="text-white w-6 sm:mt-1">
                        {weekDays[index]}:
                    </div>
                    <div className="xs:basis-4/5 ml-auto flex items-center flex-wrap justify-between gap-x-4 gap-y-2 text-xs sm:text-base">
                        <Field className="flex items-center gap-2 xs:ml-auto">
                            <Label className="text-white text-xs">С</Label>
                            <Input
                                type="time"
                                step={60}
                                className="bg-input-bg rounded-full px-3 py-1.5"
                                {...register(`schedule.${index}.start`)}
                                value={
                                    watchedSchedule[index]?.is_day_off
                                        ? ''
                                        : watchedSchedule[index]?.start ?? ''
                                }
                                disabled={watchedSchedule[index]?.is_day_off}
                            />
                        </Field>
                        <Field className="flex items-center gap-2">
                            <Label className="text-white text-xs">До</Label>
                            <Input
                                type="time"
                                step={60}
                                className="bg-input-bg rounded-full px-3 py-1.5"
                                {...register(`schedule.${index}.end`)}
                                value={
                                    watchedSchedule[index]?.is_day_off
                                        ? ''
                                        : watchedSchedule[index]?.end ?? ''
                                }
                                disabled={watchedSchedule[index]?.is_day_off}
                            />
                        </Field>
                        <div className="xs:ml-14 sm:ml-8 mt-2 mr-4">
                            <CheckboxField
                                name={`schedule.${index}.is_day_off`}
                                ref={
                                    register(`schedule.${index}.is_day_off`).ref
                                }
                                onBlur={
                                    register(`schedule.${index}.is_day_off`)
                                        .onBlur
                                }
                                isChecked={watchedSchedule[index]?.is_day_off}
                                onChange={({ target }) => {
                                    setValue(
                                        `schedule.${index}.is_day_off`,
                                        target.value
                                    );
                                }}
                                error={
                                    errors.schedule?.[index]?.is_day_off
                                        ?.message
                                }
                            >
                                <span className="mt-0.5 block text-white sm:text-sm sm:mt-0">
                                    Выходной
                                </span>
                            </CheckboxField>
                        </div>
                    </div>
                </div>
            ))}

            <div>
                <PrimaryBtn
                    type="submit"
                    className="w-full mb-4"
                    disabled={isPending}
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
        </form>
    );
}
