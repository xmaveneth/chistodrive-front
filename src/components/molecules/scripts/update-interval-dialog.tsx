import PrimaryBtn from '@/components/atoms/primary-btn';
import ErrorField from '@/components/forms/error-field';
import { useUpdateScriptInterval } from '@/lib/hooks/scripts/use-update-script-interval';
import { Interval, ScriptBox, ScriptWorker } from '@/lib/types/intervals';
import { cn } from '@/lib/utils';
import { Field, Input, Label } from '@headlessui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

type UpdateIntervalDialogProps = {
    closeDialog: () => void;
    selectIntervalForUpdate: Interval | null;
    allBoxes: ScriptBox[];
    allWorkers: ScriptWorker[];
};

export default function UpdateIntervalDialog({
    closeDialog,
    selectIntervalForUpdate,
    allBoxes,
    allWorkers,
}: UpdateIntervalDialogProps) {
    const { id } = useParams();
    const { mutate, isPending } = useUpdateScriptInterval(closeDialog);

    const [price, setPrice] = useState(selectIntervalForUpdate?.price || '');
    const [priceError, setPriceError] = useState('');

    const [selectedWorkers, setSelectedWorkers] = useState(() =>
        allWorkers.map((worker) => {
            const existing = selectIntervalForUpdate?.workers.find(
                (w) => w.script_worker_id === worker.script_worker_id
            );

            return {
                script_worker_id: worker.script_worker_id,
                prio_num: existing?.prio_num ?? 0,
            };
        })
    );

    const [selectedBoxes, setSelectedBoxes] = useState(() =>
        allBoxes.map((box) => {
            const existing = selectIntervalForUpdate?.boxes.find(
                (w) => w.script_box_id === box.script_box_id
            );

            return {
                script_box_id: box.script_box_id,
                prio_num: existing?.prio_num ?? 0,
            };
        })
    );

    function handleWorkerPriorityChange(idx: number) {
        setSelectedWorkers((prev) => {
            const current = prev[idx];

            if (current.prio_num !== 0) {
                const removedPriority = current.prio_num;

                return prev.map((w, i) => {
                    if (i === idx) return { ...w, prio_num: 0 };
                    if (w.prio_num > removedPriority) {
                        return { ...w, prio_num: w.prio_num - 1 };
                    }
                    return w;
                });
            }

            const used = prev.map((w) => w.prio_num).filter((n) => n !== 0);
            const next = used.length + 1;

            return prev.map((w, i) =>
                i === idx ? { ...w, prio_num: next } : w
            );
        });
    }

    function handleBoxPriorityChange(idx: number) {
        setSelectedBoxes((prev) => {
            const current = prev[idx];

            if (current.prio_num !== 0) {
                const removedPriority = current.prio_num;

                return prev.map((b, i) => {
                    if (i === idx) return { ...b, prio_num: 0 };
                    if (b.prio_num > removedPriority) {
                        return { ...b, prio_num: b.prio_num - 1 };
                    }
                    return b;
                });
            }

            const used = prev.map((w) => w.prio_num).filter((n) => n !== 0);
            const next = used.length + 1;

            return prev.map((w, i) =>
                i === idx ? { ...w, prio_num: next } : w
            );
        });
    }

    function handleClick() {
        if (selectIntervalForUpdate == null) return;

        if (!price || isNaN(Number(price))) {
            setPriceError('Введите цифру');
            return;
        }

        setPriceError('');

        mutate({
            script_id: Number(id),
            interval_id: selectIntervalForUpdate.interval_id,
            workers: selectedWorkers.filter((w) => w.prio_num !== 0),
            boxes: selectedBoxes.filter((b) => b.prio_num !== 0),
            price: Number(price),
        });
    }

    return (
        <div className="my-6">
            <div className="mb-8 space-y-4">
                <Field className="flex flex-col items-start gap-2">
                    <Label className="text-white">Цена</Label>
                    <Input
                        type="text"
                        className="bg-input-bg rounded-full px-3 py-1.5"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    {priceError !== '' && <ErrorField>{priceError}</ErrorField>}
                </Field>

                <Field>
                    <Label className="text-white mb-2 block">Работники</Label>
                    <div className="grid gap-3 w-full rounded-lg bg-light-bg py-3 px-4">
                        {allWorkers.map((worker, idx) => (
                            <div
                                key={`select-worker-${idx}`}
                                className="flex items-center gap-4"
                            >
                                <button
                                    onClick={() =>
                                        handleWorkerPriorityChange(idx)
                                    }
                                    className={cn(
                                        'rounded-sm border border-btn-bg shrink-0 w-6 flex items-center justify-center cursor-pointer',
                                        selectedWorkers[idx].prio_num === 0 &&
                                            'text-transparent'
                                    )}
                                >
                                    {selectedWorkers[idx].prio_num}
                                </button>
                                <div>{worker.worker_name}</div>
                            </div>
                        ))}
                    </div>
                </Field>

                <Field>
                    <Label className="text-white mb-2 block">Боксы</Label>
                    <div className="grid gap-3 w-full rounded-lg bg-light-bg py-3 px-4">
                        {allBoxes.map((box, idx) => (
                            <div
                                key={`select-box-${idx}`}
                                className="flex items-center gap-4"
                            >
                                <button
                                    onClick={() => handleBoxPriorityChange(idx)}
                                    className={cn(
                                        'rounded-sm border border-btn-bg shrink-0 w-6 flex items-center justify-center cursor-pointer',
                                        selectedBoxes[idx].prio_num === 0 &&
                                            'text-transparent'
                                    )}
                                >
                                    {selectedBoxes[idx].prio_num}
                                </button>
                                <div>{box.box_name}</div>
                            </div>
                        ))}
                    </div>
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
