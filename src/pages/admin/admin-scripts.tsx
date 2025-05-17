import AccountAddBtn from '@/components/atoms/account-add-btn';
import AdminSkeleton from '@/components/atoms/admin-skeleton';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddScriptDialog from '@/components/molecules/admin/add-script-dialog';
import AddScriptVersionDialog from '@/components/molecules/admin/add-script-version-dialog';
import DeleteScriptDialog from '@/components/molecules/admin/delete-script-dialog';
import DeleteScriptVersionDialog from '@/components/molecules/admin/delete-script-version-dialog';
import ScriptRow from '@/components/molecules/admin/script-row';
import ScriptVersionRow from '@/components/molecules/admin/script-version-row';
import TableHead from '@/components/molecules/admin/table-head';
import { useScripts } from '@/lib/hooks/scripts/use-scripts';
import { useLocalStorage } from '@/lib/hooks/utils/use-local-storage';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { Script, ScriptVersion } from '@/lib/types/scripts';
import { createScriptNameMap } from '@/lib/utils/create-script-name-map';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminScripts() {
    const [showAddScriptDialog, toggleAddScriptDialog] = useToggle(false);
    const [showAddScriptVersionDialog, toggleAddScriptVersionDialog] =
        useToggle(false);

    const [showDeleteScriptDialog, toggleDeleteScriptDialog] = useToggle(false);
    const [showDeleteScriptVersionDialog, toggleDeleteScriptVersionDialog] = useToggle(false);

    const { id } = useParams();
    const parsedId = Number(id);
    const { data: scripts, isLoading } = useScripts(parsedId);
    const [selectedScript, setSelectedScript] = useState<Script | null>(null);
    const [selectedScriptVersion, setSelectedScriptVersion] = useState<ScriptVersion | null>(null);

    const [, setScriptNamesMap] = useLocalStorage<Record<number, string>>('script_names_map', {});

    const scriptMap = useMemo(() => createScriptNameMap(scripts), [scripts]);
    
    useEffect(() => {
        setScriptNamesMap(scriptMap);
    }, [scriptMap, isLoading]);

    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Название</div>
                <div>Создан</div>
                <div>Статус</div>
                <div></div>
            </TableHead>

            {isLoading ? (
                <AdminSkeleton />
            ) : (
                scripts &&
                scripts.data.map((script, idx) => (
                    <div key={`script-${idx}`}>
                        <ScriptRow
                            script={script}
                            index={idx + 1}
                            id={script.script_id}
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
                                onDelete={() => {
                                    setSelectedScriptVersion(version);
                                    toggleDeleteScriptVersionDialog(true);
                                }}
                            />
                        ))}
                    </div>
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

            <DialogLayout
                title="Вы уверены что хотите удалить данную версию скрипта?"
                isOpen={showDeleteScriptVersionDialog}
                closeDialog={() => toggleDeleteScriptVersionDialog(false)}
            >
                <DeleteScriptVersionDialog
                    selectedScriptVersion={selectedScriptVersion}
                    closeDialog={() => toggleDeleteScriptVersionDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}

