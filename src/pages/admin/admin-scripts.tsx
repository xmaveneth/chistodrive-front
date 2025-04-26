import AccountAddBtn from '@/components/atoms/account-add-btn';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddScriptDialog from '@/components/molecules/admin/add-script-dialog';
import AddScriptVersionDialog from '@/components/molecules/admin/add-script-version-dialog';
import DeleteScriptDialog from '@/components/molecules/admin/delete-script-dialog';
import ScriptRow from '@/components/molecules/admin/script-row';
import ScriptVersionRow from '@/components/molecules/admin/script-version-row';
import TableHead from '@/components/molecules/admin/table-head';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { Script } from '@/lib/types/scripts';
import { range } from '@/lib/utils/range';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminScripts() {
    const [showAddScriptDialog, toggleAddScriptDialog] = useToggle(false);
    const [showAddScriptVersionDialog, toggleAddScriptVersionDialog] =
        useToggle(false);

    const [showDeleteScriptDialog, toggleDeleteScriptDialog] = useToggle(false);

    const { id } = useParams();
    const parsedId = Number(id);
    const { data: scripts, isLoading } = useScripts(parsedId);
    const [selectedScript, setSelectedScript] = useState<Script | null>(null);

    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Название</div>
                <div>Создан</div>
                <div>Статус</div>
                <div></div>
            </TableHead>

            {isLoading ? (
                <Skeleton />
            ) : (
                scripts &&
                scripts.data.map((script, idx) => (
                    <>
                        <ScriptRow
                            key={`script-${idx}`}
                            script={script}
                            index={idx + 1}
                            onDelete={() => {
                                setSelectedScript(script);
                                toggleDeleteScriptDialog(true);
                            }}
                            onClick={() => {
                                setSelectedScript(script);
                                toggleAddScriptVersionDialog(true);
                            }}
                        />

                        {script.versions.map((version, version_idx) => (
                            <ScriptVersionRow
                                key={`script-version-${idx}-${version_idx}`}
                                version={version}
                                order={`${idx + 1}.${version_idx + 1}`}
                            />
                        ))}
                    </>
                ))
            )}

            <div className="py-3 mt-1 w-188 sm:w-290">
                <AccountAddBtn
                    onClick={() => toggleAddScriptDialog(true)}
                    className="sticky left-40 sm:left-52 mx-0 z-20"
                />
            </div>

            <DialogLayout
                title="Добавить скрипт"
                description="Введите название, чтобы добавить скрипт"
                isOpen={showAddScriptDialog}
                closeDialog={() => toggleAddScriptDialog(false)}
            >
                <AddScriptDialog
                    closeDialog={() => toggleAddScriptDialog(false)}
                    carWashId={parsedId}
                />
            </DialogLayout>

            <DialogLayout
                title="Добавить версию скрипта"
                description="Введите название версии скрипта"
                isOpen={showAddScriptVersionDialog}
                closeDialog={() => toggleAddScriptVersionDialog(false)}
            >
                <AddScriptVersionDialog
                    closeDialog={() => toggleAddScriptVersionDialog(false)}
                    scriptId={selectedScript?.script_id || null}
                />
            </DialogLayout>

            <DialogLayout
                title="Вы уверены что хотите удалить данный скрипт?"
                isOpen={showDeleteScriptDialog}
                closeDialog={() => toggleDeleteScriptDialog(false)}
            >
                <DeleteScriptDialog
                    selectedScript={selectedScript}
                    closeDialog={() => toggleDeleteScriptDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}

function Skeleton() {
    return range(1, 5).map((number) => (
        <div
            key={`skeleton-${number}`}
            className="w-180 sm:w-282 text-center py-3 mx-4 bg-gray-400 text-transparent animate-pulse rounded-sm mb-1"
        >
            Loading
        </div>
    ));
}
