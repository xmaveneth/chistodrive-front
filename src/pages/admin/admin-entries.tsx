import AdminSkeleton from '@/components/atoms/admin-skeleton';
import PrimaryBtn from '@/components/atoms/primary-btn';
import DatePicker from '@/components/forms/date-picker';
import PriceRangePicker from '@/components/forms/price-range-picker';
import SelectField from '@/components/forms/select-field';
import TimeRangePicker from '@/components/forms/time-range-picker';
import DialogLayout from '@/components/layouts/dialog-layout';
import AppointmentRow from '@/components/molecules/admin/appointment-row';
import TableHead from '@/components/molecules/admin/table-head';
import UpdateAppointmentDialog from '@/components/molecules/admin/update-appointment-dialog';
import FilterField from '@/components/molecules/search/filter-field';
import { useFilterValues } from '@/lib/hooks/appointments/use-filter-values';
import { useCarwashAppointments } from '@/lib/hooks/appointments/use-get-carwash-appointments';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { CarwashAppointment } from '@/lib/types/appointments';
import { formatDateToString } from '@/lib/utils/format-date';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminEntries() {
    const { id } = useParams();
    const parsedId = Number(id);
    const { data: filterValues, isLoading: isLoadingFilters } =
        useFilterValues(parsedId);
    const startTime = useRef('00:00');
    const endTime = useRef('23:00');
    const startPrice = useRef(100);
    const endPrice = useRef(9900);
    const [date, setDate] = useState<string>(formatDateToString(new Date()));
    const [serviceTypeId, setServiceTypeId] = useState<number>(0);
    const [statusId, setStatudId] = useState<number>(0);

    function triggerSearch() {
        loadAppointments({
            start_time: startTime.current,
            end_time: endTime.current,
            start_price: startPrice.current,
            end_price: endPrice.current,
            date,
            service_id: serviceTypeId,
            status_id: statusId,
        });
    }

    const {
        mutate: loadAppointments,
        data: appointments,
        isPending: isLoadingAppointments,
    } = useCarwashAppointments(parsedId);

    const [showUpdateAppointmentDialog, toggleUpdateAppointmentDialog] =
        useToggle(false);
    const [selectedAppointment, setSelectedAppointment] =
        useState<CarwashAppointment | null>(null);

    function handleSelectDate(val: string) {
        setDate(val);
    }

    function handleSelectServiceType(val: number) {
        setServiceTypeId(val);
    }

    function handleSelectStatus(val: number) {
        console.log("current status ", statusId);
        console.log("selected status ", val);
        setStatudId(val);
    }

    const services = filterValues?.filters?.services?.map((service) => {
        return {
            id: service.id,
            label: service.name,
        };
    });

    const statuses = filterValues?.filters?.statuses?.map((status) => {
        return {
            id: status.id,
            label: status.name,
        };
    });

    const currentServiceTypeOption =
        services?.find((filter) => filter.id === serviceTypeId) ?? null;

    const currentStatusOption =
        statuses?.find((filter) => filter.id === statusId) ?? null;

    const TableHeadContent = () => (
        <>
            {' '}
            <div>Статус</div>
            <div>Дата</div>
            <div>Время</div>
            <div>Услуга</div>
            <div>Стоимость</div>
            <div>Исполнитель</div>
            <div>Бокс</div>
            <div>Авто</div>
            <div>Номер авто</div>
            <div>Имя</div>
            <div>Телефон</div>
            <div></div>
        </>
    );

    const TableFilters = () => (
        <div className="flex items-center gap-x-6 mb-8 flex-wrap z-40">
            <FilterField title="Дата">
                <DatePicker
                    onChange={handleSelectDate}
                    value={date}
                    className="w-60"
                />
            </FilterField>

            <FilterField title="Временной интервал">
                <TimeRangePicker
                    from={startTime.current}
                    to={endTime.current}
                    onChange={(range) => {
                        startTime.current = range.from;
                        endTime.current = range.to;
                    }}
                    className="w-60"
                />
            </FilterField>

            <FilterField title="Цена, ₽">
                <PriceRangePicker
                    from={startPrice.current}
                    to={endPrice.current}
                    onChange={(range) => {
                        startPrice.current = range.from;
                        endPrice.current = range.to;
                    }}
                    className="w-60"
                />
            </FilterField>

            {currentServiceTypeOption && services && !isLoadingFilters && (
                <FilterField title="Тип услуги">
                    <SelectField
                        values={services}
                        value={currentServiceTypeOption}
                        onChange={ handleSelectServiceType}
                        className="w-60 z-40"
                    />
                </FilterField>
            )}

            {currentStatusOption && statuses && !isLoadingFilters && (
                <FilterField title="Статус услуги">
                    <SelectField
                        values={statuses}
                        value={currentStatusOption}
                        onChange={handleSelectStatus}
                        className="w-60 z-40"
                    />
                </FilterField>
            )}

            <PrimaryBtn
                onClick={triggerSearch}
                className="mt-5.5 w-50"
            >
                Применить
            </PrimaryBtn>
        </div>
    );

    return (
        <div>
            <TableFilters />
            <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
                <TableHead gridClass="grid-cols-[60px_1.5fr_1fr_2fr_1fr_1fr_250px_1fr_1fr_1fr_1fr_1fr_60px] w-400 sm:w-460 z-10">
                    <TableHeadContent />
                </TableHead>

                {isLoadingAppointments ? (
                    <AdminSkeleton className="w-400 sm:w-460" />
                ) : (
                    appointments &&
                    (appointments.data.length > 0 ? (
                        appointments.data.map((appointment, idx) => (
                            <div key={`appointment-${idx}`}>
                                <AppointmentRow
                                    appointment={appointment}
                                    index={idx + 1}
                                    id={appointment.id}
                                    onEdit={() => {
                                        setSelectedAppointment(appointment);
                                        toggleUpdateAppointmentDialog(true);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="mx-4 w-400 sm:w-460">
                            По вашему запросу не найдено ни одного результата
                        </div>
                    ))
                )}
            </div>

            {selectedAppointment && appointments && (
                <DialogLayout
                    title="Обновление статуса записи"
                    description="Заполните данные, чтобы обновить статус записи"
                    isOpen={showUpdateAppointmentDialog}
                    closeDialog={() => toggleUpdateAppointmentDialog(false)}
                >
                    <UpdateAppointmentDialog
                        statuses={appointments.statuses}
                        selectedAppointment={selectedAppointment}
                        closeDialog={() => toggleUpdateAppointmentDialog(false)}
                        toggleStatus={triggerSearch}
                    />
                </DialogLayout>
            )}
        </div>
    );
}
