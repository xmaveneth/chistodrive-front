import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { Worker } from '@/lib/types/workers';

type AssignWorkerDialogProps = {
    closeDialog: () => void;
    currentWorker: Worker | null;
};
export default function AssignWorkerDialog({
    currentWorker,
    closeDialog,
}: AssignWorkerDialogProps) {
    return (
        <div className="my-6">
            <div className="w-full py-3 px-6 bg-input-bg rounded-full mb-4">
                {currentWorker?.full_name}
            </div>

            <div className="flex items-center w-full gap-2 text-sm mb-6">
                <div className="text-white text-center basis-1/3">Бокс, №</div>
                <SelectField
                    className="basis-2/3"
                    hasMargin={false}
                    onChange={() => {}}
                    value={{ label: 'afsfs', id: 2 }}
                    values={[
                        { label: 'afsfs', id: 2 },
                        { label: 'afsfasds', id: 3 },
                    ]}
                />
            </div>

            <PrimaryBtn className="w-full mb-3">Добавить сотрудника</PrimaryBtn>

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
