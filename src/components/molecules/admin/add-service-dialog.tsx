import PrimaryBtn from '@/components/atoms/primary-btn';
import ErrorField from '@/components/forms/error-field';
import { useCreateCarwashService } from '@/lib/hooks/services/use-create-carwash-service';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type AddServiceDialogProps = {
    closeDialog: () => void;
    selectedServiceType: number | null;
};
export default function AddServiceDialog({
    closeDialog,
    selectedServiceType,
}: AddServiceDialogProps) {
    const { id } = useParams();
    const parsedId = Number(id);
    const [serviceName, setServiceName] = useState('');
    const [serviceNameError, setServiceNameError] = useState("");
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceDescriptionError, setServiceDescriptionError] = useState("");



    const { mutate: createService, isPending } = useCreateCarwashService(
        parsedId,
        closeDialog
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (selectedServiceType == null) {
            return;
        }
        setServiceNameError("");
        setServiceDescriptionError("");

        if (serviceName.length > 480) {
            setServiceNameError("Пожалуйста, введите более короткое название услуги");
            return;
        }

        if (serviceName.length === 0) {
            setServiceNameError("Пожалуйста, введите название услуги");
            return;
        }

        if (serviceDescription.length > 480) {
            setServiceNameError("Пожалуйста, введите более короткое описание услуги");
            return;
        }

        if (serviceDescription.length === 0) {
            setServiceNameError("Пожалуйста, введите описание услуги");
            return;
        }

        createService({ name: serviceName, description: serviceDescription, service_type_id: selectedServiceType });
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
                            'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-sm px-4 py-3 outline-none data-[focus]:ring-1',
                            serviceNameError && 'border-red-600'
                        )}
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                    {serviceNameError  && <ErrorField>{serviceNameError }</ErrorField>}
                </Field>            

                <Field>
                    <Label className="mb-1 flex items-center justify-between">
                        Введите описание услуги
                    </Label>
                    <Input
                        type="text"
                        placeholder="Введите описание услуги"
                        className={cn(
                            'data-[hover]:bg-[#232530] data-[focus]:shadow-input bg-input-bg w-full rounded-sm px-4 py-3 outline-none data-[focus]:ring-1',
                            serviceDescriptionError && 'border-red-600'
                        )}
                        onChange={(e) => setServiceDescription(e.target.value)}
                    />
                    {serviceDescriptionError  && <ErrorField>{serviceDescriptionError }</ErrorField>}
                </Field>
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

