import AdminSkeleton from '@/components/atoms/admin-skeleton';
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
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminEntries() {
    const { id } = useParams();
    const parsedId = Number(id);
    const { data: appointments, isLoading: isLoadingAppointments } =
        useCarwashAppointments(parsedId);
    const { data: filterValues, isLoading: isLoadingFilters } =
        useFilterValues(parsedId);
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('23:30');
    const [startPrice, setStartPrice] = useState(100);
    const [endPrice, setEndPrice] = useState(9900);
    const [date, setDate] = useState<string>(formatDateToString(new Date()));
    const [serviceTypeId, setServiceTypeId] = useState<number>(0);

    const [showUpdateAppointmentDialog, toggleUpdateAppointmentDialog] =
        useToggle(false);
    const [selectedAppointment, setSelectedAppointment] =
        useState<CarwashAppointment | null>(null);

    const filters = filterValues?.filters?.services?.map((service) => {
        return {
            id: service.id,
            label: service.name,
        };
    });

    const currentServiceTypeOption =
        filters?.find((filter) => filter.id === serviceTypeId) ?? null;

    return (
        <div>
            <div className="flex items-center gap-6 mb-8 flex-wrap z-40">
                <FilterField title="Дата">
                    <DatePicker
                        onChange={(val) => setDate(val)}
                        value={date}
                        className="w-60"
                    />
                </FilterField>

                <FilterField title="Временной интервал">
                    <TimeRangePicker
                        from={startTime}
                        to={endTime}
                        onChange={(range) => {
                            setStartTime(range.from);
                            setEndTime(range.to);
                        }}
                        className="w-60"
                    />
                </FilterField>

                <FilterField title="Цена, ₽">
                    <PriceRangePicker
                        from={startPrice}
                        to={endPrice}
                        onChange={(range) => {
                            setStartPrice(range.from);
                            setEndPrice(range.to);
                        }}
                        className="w-60"
                    />
                </FilterField>

                {currentServiceTypeOption && filters && !isLoadingFilters && (
                    <FilterField title="Тип услуги">
                        <SelectField
                            values={filters}
                            value={currentServiceTypeOption}
                            onChange={(val) => setServiceTypeId(val)}
                            className="w-60 z-40"
                        />
                    </FilterField>
                )}
            </div>
            <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
                <TableHead gridClass="grid-cols-[60px_1fr_1fr_250px_1fr_1fr_1fr_1fr_1fr_1fr_1.5fr_60px] w-400 sm:w-460 z-10">
                    <div>Имя</div>
                    <div>Телефон</div>
                    <div>Исполнитель</div>
                    <div>Авто</div>
                    <div>Номер авто</div>
                    <div>Услуга</div>
                    <div>Стоимость</div>
                    <div>Время</div>
                    <div>Дата</div>
                    <div>Статус</div>
                    <div></div>
                </TableHead>

                {isLoadingAppointments ? (
                    <AdminSkeleton />
                ) : (
                    appointments &&
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
                        carWashId={parsedId}
                    />
                </DialogLayout>
            )}
        </div>
    );
}
