import PrimaryBtn from '@/components/atoms/primary-btn';
import ScriptBoxListGroup from '@/components/atoms/script-box-list-group';
import SelectField from '@/components/forms/select-field';
import { mockWorkerAssignments } from '@/lib/data/workers';
import { useAssignScriptWorker } from '@/lib/hooks/workers/use-assign-script-worker';
import { Box } from '@/lib/types/boxes';
import { Worker } from '@/lib/types/workers';
import {
    createScriptWorkerBoxList,
    createSelectFieldBoxes,
} from '@/lib/utils/sort-script-workers';
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

        mutate({
            script_worker_id: currentWorker.id,
            script_box_id: selectedBoxId,
        });
    }

    const boxList = createScriptWorkerBoxList(
        mockWorkerAssignments,
        currentWorker?.id
    );

    return (
        <div className="my-6">
            <div className="w-full py-3 px-6 bg-input-bg rounded-full mb-4">
                {currentWorker?.full_name}
            </div>

            <div className="mb-6">
                {boxList.map((boxItem, index) => (
                    <ScriptBoxListGroup
                        key={`box-item-${index}`}
                        className="mb-4"
                    >
                        <div className="w-full basis-2/3 py-3 px-6 bg-input-bg rounded-full">
                            {boxItem.boxName}
                        </div>
                    </ScriptBoxListGroup>
                ))}
                {selectFieldBoxes.length > 0 && (
                    <ScriptBoxListGroup
                        key={`box-item-select-field`}
                        className="mb-4"
                    >
                        <SelectField
                            className="basis-2/3"
                            hasMargin={false}
                            onChange={(val) => setSelectedBoxId(val)}
                            value={
                                selectFieldBoxes.find(
                                    (box) => box.id === selectedBoxId
                                ) || selectFieldBoxes[0]
                            }
                            values={selectFieldBoxes}
                        />
                    </ScriptBoxListGroup>
                )}
            </div>

            <PrimaryBtn
                disabled={isPending}
                onClick={handleClick}
                className="w-full mb-3"
            >
                Добавить сотрудника
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
