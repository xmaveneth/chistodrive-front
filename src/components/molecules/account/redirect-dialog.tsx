import PrimaryBtn from '@/components/atoms/primary-btn';
import { useNavigate } from 'react-router-dom';

type RedirectDialogProps = {
    closeDialog: () => void;
};
export default function RedirectDialog({
    closeDialog,
}: RedirectDialogProps) {
    const navigate = useNavigate();

    return (
        <div className="my-10 space-y-2">
            <PrimaryBtn
                onClick={() => navigate('/search')}
                className="w-full"
            >
                Перейти
            </PrimaryBtn>
            <PrimaryBtn
                onClick={closeDialog}
                className="w-full bg-input-bg hover:bg-zinc-800"
            >
                Вернуться назад
            </PrimaryBtn>
        </div>
    );
}
