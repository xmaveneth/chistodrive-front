import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { useAssignScriptWorker } from '@/lib/hooks/workers/use-assign-script-worker';
import { Box } from '@/lib/types/boxes';
import { Worker } from '@/lib/types/workers';
import { createSelectFieldBoxes } from '@/lib/utils/sort-script-workers';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type AssignWorkerDialogProps = {
    closeDialog: () => void;
    currentWorker: Worker | null;
    allBoxes: Box[];
};
export default function AssignWorkerDialog({
    currentWorker,
    closeDialog,
    allBoxes,
}: AssignWorkerDialogProps) {
    const { id } = useParams<{ id: string }>();
    const selectFieldBoxes = createSelectFieldBoxes(allBoxes);
    const [selectedBoxId, setSelectedBoxId] = useState(
        selectFieldBoxes.length > 0 ? selectFieldBoxes[0].id : null
    );
    const { mutate, isPending } = useAssignScriptWorker(Number(id));

    function handleClick() {
        if (selectedBoxId == null || currentWorker == null) return;

        mutate({script_worker_id: currentWorker.id, script_box_id: selectedBoxId});
    }

    return (
        <div className="my-6">
            <div className="w-full py-3 px-6 bg-input-bg rounded-full mb-4">
                {currentWorker?.full_name}
            </div>

            <div className="flex items-center w-full gap-2 text-sm mb-6">
                <div className="text-white text-center basis-1/3">Бокс, №</div>
                {selectFieldBoxes.length > 0 && (
                    <SelectField
                        className="basis-2/3"
                        hasMargin={false}
                        onChange={(val) => setSelectedBoxId(val)}
                        value={selectFieldBoxes.find(box => box.id === selectedBoxId) || selectFieldBoxes[0]}
                        values={selectFieldBoxes}
                    />
                )}
            </div>

            <PrimaryBtn disabled={isPending} onClick={handleClick} className="w-full mb-3">Добавить сотрудника</PrimaryBtn>

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
