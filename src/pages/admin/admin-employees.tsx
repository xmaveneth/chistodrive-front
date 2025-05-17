import AccountAddBtn from "@/components/atoms/account-add-btn";
import AdminSkeleton from "@/components/atoms/admin-skeleton";
import TableHead from "@/components/molecules/admin/table-head";
import WorkerRow from "@/components/molecules/admin/worker-row";
import { useCarWashWorkers } from "@/lib/hooks/workers/use-carwash-workers";
import { useParams } from "react-router-dom";

export default function AdminEmployees() {
    const { id } = useParams();
    const parsedId = Number(id);
    const { data: workers, isLoading } = useCarWashWorkers(parsedId);
    
    console.log(workers)
    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                <div>Ф.И.О.</div>
                <div>Должность</div>
                <div>Номер телефона</div>
                <div></div>
            </TableHead>

            {isLoading ? (
                <AdminSkeleton />
            ) : (
                workers &&
                workers.data.map((worker, idx) => (
                    <div key={`worker-${idx}`}>
                        <WorkerRow
                            worker={worker}
                            index={idx + 1}
                            id={worker.id}
                            onDelete={() => {
                            }}
                            onClick={() => {
                            }}
                        />

                    </div>
                ))
            )}

            <div className="py-3 mt-1 w-188 sm:w-290">
                <AccountAddBtn
                    onClick={() => {}}
                    className="sticky left-40 sm:left-52 mx-0 z-20"
                />
            </div>


        </div>
    );
}

