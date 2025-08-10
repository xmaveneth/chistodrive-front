import SecondaryBtn from '@/components/atoms/secondary-btn';
import ScriptCheckbox from '@/components/forms/script-checkbox';
import ScriptCheckboxSkeleton from '@/components/molecules/scripts/script-checkbox-skeleton';
import { useCarWashBoxes } from '@/lib/hooks/boxes/use-carwash-boxes';
import { useScriptBoxes } from '@/lib/hooks/boxes/use-script-boxes';
import { useUpdateScriptBoxes } from '@/lib/hooks/boxes/use-update-script-boxes';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import {
    createAllBoxesArray,
    createSelectedBoxesArray,
    generateSelectedBoxIds,
} from '@/lib/utils/sort-script-boxes';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ScriptBoxes() {
    const { id, carwashId } = useParams<{ id: string, carwashId: string }>();
    const { mutate: updateBoxes } = useUpdateScriptBoxes(Number(id));

    const { data: scripts, isLoading: scriptsLoading } = useScripts(
        Number(carwashId)
    );

    const currentScript = scripts?.data.find(
        (script) => script.script_id === Number(id)
    );

    const isReady = currentScript?.script_status === 'Готов';

    const {
        data: selectedBoxes,
        isLoading: isLoadingSelectedBoxes,
        error: selectedBoxesError,
    } = useScriptBoxes(Number(id));
    const {
        data: allBoxes,
        isLoading: isLoadingAllBoxes,
        error: allBoxesError,
    } = useCarWashBoxes(Number(carwashId));

    const [allBoxeNames, setAllBoxeNames] = useState(
        createAllBoxesArray(allBoxes)
    );
    const [selectedboxNames, setSelectedboxNames] = useState(
        createSelectedBoxesArray(selectedBoxes)
    );

    useEffect(() => {
        setSelectedboxNames(createSelectedBoxesArray(selectedBoxes));
    }, [isLoadingSelectedBoxes]);

    useEffect(() => {
        setAllBoxeNames(createAllBoxesArray(allBoxes));
    }, [isLoadingAllBoxes]);

    function handleClick() {
        updateBoxes(generateSelectedBoxIds(allBoxes, selectedboxNames));
    }

    function handleChange(boxName: string) {
        if (selectedboxNames.includes(boxName)) {
            setSelectedboxNames((prev) =>
                prev.filter((vehicle) => vehicle !== boxName)
            );
        } else {
            setSelectedboxNames((prev) => [...prev, boxName]);
        }
    }

    if (isLoadingSelectedBoxes || isLoadingAllBoxes || scriptsLoading)
        return <ScriptCheckboxSkeleton />;
    if (selectedBoxesError || allBoxesError)
        return <p>Произошла ошибка загрузки боксов, попробуйте позже</p>;

    return (
        <div className="mt-6 md:mt-8">
            <div className="grid gap-3">
                {allBoxeNames?.map((boxName) => (
                    <ScriptCheckbox
                        name={boxName}
                        onChange={() => handleChange(boxName)}
                        onBlur={() => {}}
                        key={boxName}
                        isChecked={selectedboxNames.includes(boxName)}
                        readonly={isReady === true}
                    >
                        {boxName}
                    </ScriptCheckbox>
                ))}
            </div>

            {isReady === false && <SecondaryBtn
                onClick={handleClick}
                className="mt-6 py-2 rounded-lg"
            >
                Сохранить
            </SecondaryBtn>}
        </div>
    );
}
