import ScriptRow from '@/components/molecules/admin/script-row';
import ScriptVersionRow from '@/components/molecules/admin/script-version-row';
import TableHead from '@/components/molecules/admin/table-head';
import { dummyScripts } from '@/lib/data/scripts';

export default function AdminScripts() {
    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Название</div>
                <div>Создан</div>
                <div>Статус</div>
                <div></div>
            </TableHead>

            {dummyScripts.data.map((script, idx) => (
                <>
                    <ScriptRow
                        key={`script-${idx}`}
                        script={script}
                        index={idx + 1}
                    />

                    {script.versions.map((version, version_idx) => (
                        <ScriptVersionRow
                            key={`script-version-${idx}-${version_idx}`}
                            version={version}
                            order={`${idx + 1}.${version_idx + 1}`}
                        />
                    ))}
                </>
            ))}
        </div>
    );
}
