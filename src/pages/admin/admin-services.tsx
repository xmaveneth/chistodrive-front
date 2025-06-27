import AccountAddBtn from "@/components/atoms/account-add-btn";
import TableHead from "@/components/molecules/admin/table-head";
import { useCarwashServices } from "@/lib/hooks/services/use-carwash-services";
import { formatDateForScripts } from "@/lib/utils/format-date";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { TrashIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export default function AdminServices() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useCarwashServices(Number(id));

    if (isLoading) return <div>Loading...</div>;

    if (data == null) return null;

    console.log(data.data);
    return (

        <div>
            {data.data.length > 0 &&
                data.data.map(
                    (service, idx) => {
                        return (
                            <div key={`service-${idx}`} className="scrollbar-hidden overflow-x-auto">
                                <div className="my-6 md:text-lg">
                                    {service.service_category_ru_name}
                                </div>
                                <TableHead gridClass="grid-cols-[60px_1fr_1fr_1fr_60px]">
                                    <div>Название</div>
                                    <div>Описание</div>
                                    <div>Дата добавления</div>
                                    <div></div>
                                </TableHead>

                                {service.service_list.map(
                                    (item, itemIdx) => (
                                        <div
                                            key={`service-${itemIdx}`}
                                        >

                                            <div
                                                className="w-180 sm:w-282 grid grid-cols-[60px_1fr_1fr_1fr_60px] divide-x-1 mx-4 divide-white/20 border-y border-white/20 text-sm sm:text-base"
                                            >
                                                <button className="py-3 cursor-pointer sticky left-0 z-10 flex items-center gap-2 justify-center bg-background text-btn-bg">
                                                    <PencilSquareIcon className="size-4" />
                                                    {itemIdx + 1}
                                                </button>
                                                <div className="p-3 flex text-center text-balance items-center justify-center">
                                                    {item.service_name}
                                                </div>
                                                <div className="p-3 flex items-center justify-center">
                                                    {item.description}
                                                </div>
                                                <div className="p-3 flex items-center justify-center">
                                                    {formatDateForScripts(item.created_at)}
                                                </div>
                                                <div className="p-3 flex items-center justify-center border-l border-white/20">
                                                    {' '}
                                                    <button className="cursor-pointer">
                                                        <TrashIcon className="text-btn-bg size-4 mx-auto" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                                <div className="py-3 mt-1 w-188 sm:w-290">
                                    <AccountAddBtn
                                        onClick={() => { }
                                        }
                                        className="sticky left-40 sm:left-52 mx-0 z-20 ml-40"
                                    />
                                </div>
                            </div>
                        );
                    }
                )}
        </div>
    )
}


