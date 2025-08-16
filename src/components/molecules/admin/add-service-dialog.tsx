import PrimaryBtn from '@/components/atoms/primary-btn';
import ErrorField from '@/components/forms/error-field';
import SelectField from '@/components/forms/select-field';
import { useCreateCarwashService } from '@/lib/hooks/services/use-create-carwash-service';
import { ServiceType } from '@/lib/types/services';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type AddServiceDialogProps = {
    closeDialog: () => void;
    selectedServiceList: ServiceType[];
};
export default function AddServiceDialog({
    closeDialog,
    selectedServiceList,
}: AddServiceDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);
    const [serviceName, setServiceName] = useState('');
    const [serviceNameError, setServiceNameError] = useState("");
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceDescriptionError, setServiceDescriptionError] = useState("");

    const values = selectedServiceList.map(item => {
        return {
            id: item.service_type_id,
            label: item.service_type_ru_name
        }
    })

    const [serviceTypeId, setServiceTypeId] = useState<number>(values[0]?.id || 0);
    const { mutate: createService, isPending } = useCreateCarwashService(
        parsedId,
        closeDialog
    );

    const currentServiceTypeId = values.find(v => v.id === serviceTypeId);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (serviceTypeId == null) return;

        setServiceNameError("");
        setServiceDescriptionError("");

        if (serviceName.length > 50) {
            setServiceNameError("Пожалуйста, введите более короткое название услуги");
            return;
        }

        if (serviceName.length === 0) {
            setServiceNameError("Пожалуйста, введите название услуги");
            return;
        }

        if (serviceDescription.length > 200) {
            setServiceNameError("Пожалуйста, введите более короткое описание услуги");
            return;
        }

        if (serviceDescription.length === 0) {
            setServiceNameError("Пожалуйста, введите описание услуги");
            return;
        }

        createService({ name: serviceName, description: serviceDescription, service_type_id: serviceTypeId });
    }

    return (
        <form onSubmit={handleSubmit} className="my-10 space-y-2">
            <div className="space-y-2 my-8">
                <Field>
                    <Label className="mb-1 flex items-center justify-between">
                        Введите название услуги
                    </Label>
                    <Input
                        type="text"
                        placeholder="Введите название услуги"
                        className={cn(
                            'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-full px-4 py-3 outline-none data-[focus]:ring-1',
                            serviceNameError && 'border-red-600'
                        )}
                        onChange={(e) => setServiceName(e.target.value)}
                        value={serviceName}
                    />
                    {serviceNameError && <ErrorField>{serviceNameError}</ErrorField>}
                </Field>

                <Field>
                    <Label className="mb-1 flex items-center justify-between">
                        Введите описание услуги
                    </Label>
                    <Input
                        type="text"
                        placeholder="Введите описание услуги"
                        className={cn(
                            'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-full px-4 py-3 outline-none data-[focus]:ring-1',
                            serviceDescriptionError && 'border-red-600'
                        )}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        value={serviceDescription}
                    />
                    {serviceDescriptionError && <ErrorField>{serviceDescriptionError}</ErrorField>}
                </Field>

                {values.length > 0 && currentServiceTypeId != null &&
                    <Field>
                        <Label className="mb-1 flex items-center justify-between">
                            Выберите тип услуги
                        </Label>

                        <SelectField
                            values={values}
                            value={currentServiceTypeId}
                            onChange={(val) => setServiceTypeId(val)}
                            className="w-full"
                            placeholder="Выберите тип услуги"
                            hasMargin={false}
                        />

                    </Field>
                }
            </div>


            <PrimaryBtn
                disabled={isPending}
                className="w-full"
                type='submit'
            >
                Добавить услугу
            </PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </form>
    );
}

