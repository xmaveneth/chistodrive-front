import AccountAddBtn from '@/components/atoms/account-add-btn';
import AdminSkeleton from '@/components/atoms/admin-skeleton';
import DialogLayout from '@/components/layouts/dialog-layout';
import AddBoxDialog from '@/components/molecules/admin/add-box-dialog';
import BoxRow from '@/components/molecules/admin/box-row';
import DeleteBoxDialog from '@/components/molecules/admin/delete-box-dialog';
import TableHead from '@/components/molecules/admin/table-head';
import UpdateBoxDialog from '@/components/molecules/admin/update-box-dialog';
import { useCarWashBoxes } from '@/lib/hooks/boxes/use-carwash-boxes';
import useToggle from '@/lib/hooks/utils/use-toggle';
import { Box } from '@/lib/types/boxes';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AdminBoxes() {
    const { id } = useParams();
    const parsedId = Number(id);
    const { data: boxes, isLoading } = useCarWashBoxes(parsedId);

    const [showAddBoxDialog, toggleAddBoxDialog] = useToggle(false);
    const [showUpdateBoxDialog, toggleUpdateBoxDialog] = useToggle(false);
    const [showDeleteBoxDialog, toggleDeleteBoxDialog] = useToggle(false);
    const [selectedBox, setSelectedBox] = useState<Box | null>(null);

    return (
        <div className="overflow-auto scrollbar-hidden text-xs sm:text-base">
            <TableHead gridClass="grid-cols-[60px_1fr_1fr_60px] w-180 sm:w-260">
                <div>Название бокса</div>
                <div>Дата создания</div>
                <div></div>
            </TableHead>

            {isLoading ? (
                <AdminSkeleton />
            ) : (
                boxes &&
                boxes.data.map((box, idx) => (
                    <div key={`box-${idx}`}>
                        <BoxRow
                            box={box}
                            index={idx + 1}
                            id={box.id}
                            onDelete={() => {
                                toggleDeleteBoxDialog(true);
                                setSelectedBox(box);
                            }}
                            onEdit={() => {
                                toggleUpdateBoxDialog(true);
                                setSelectedBox(box);
                            }}
                        />
                    </div>
                ))
            )}

            <div className="py-3 mt-1 w-120 sm:w-200">
                <AccountAddBtn
                    onClick={() => {
                        toggleAddBoxDialog(true);
                    }}
                    className="sticky left-40 sm:left-52 mx-0 z-20"
                />
            </div>

            <DialogLayout
                title="Добавление нового бокса"
                description="Заполните данные, чтобы добавить новый бокс"
                isOpen={showAddBoxDialog}
                closeDialog={() => toggleAddBoxDialog(false)}
            >
                <AddBoxDialog
                    closeDialog={() => toggleAddBoxDialog(false)}
                    carWashId={parsedId}
                />
            </DialogLayout>

            {selectedBox != null && (
                <DialogLayout
                    title="Обновление данных бокса"
                    description="Заполните данные, чтобы обновить данные бокса"
                    isOpen={showUpdateBoxDialog}
                    closeDialog={() => toggleUpdateBoxDialog(false)}
                >
                    <UpdateBoxDialog
                        selectedBox={selectedBox}
                        closeDialog={() => toggleUpdateBoxDialog(false)}
                        carWashId={parsedId}
                    />
                </DialogLayout>
            )}

            <DialogLayout
                title="Вы уверены что хотите удалить данный бокс?"
                isOpen={showDeleteBoxDialog}
                closeDialog={() => toggleDeleteBoxDialog(false)}
            >
                <DeleteBoxDialog
                    selectedBox={selectedBox}
                    closeDialog={() => toggleDeleteBoxDialog(false)}
                />
            </DialogLayout>
        </div>
    );
}
