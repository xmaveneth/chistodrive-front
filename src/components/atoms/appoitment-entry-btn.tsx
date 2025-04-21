import PrimaryBtn from '@/components/atoms/primary-btn';
import SelectField from '@/components/forms/select-field';
import { SelectCarType } from '@/lib/types/filters';

type AppoitmentBtnProps = {
    userCars: SelectCarType[];
    handleChange: (carId: number) => void;
    handleSubmit: () => void;
    disabled: boolean;
    selectedCar: SelectCarType | null;
    showShow: boolean;
};
export default function AppoitmentEntryBtn({
    userCars,
    handleChange,
    handleSubmit,
    disabled,
    selectedCar,
    showShow
}: AppoitmentBtnProps) {
    return showShow ? (
        <>
            <p className="text-balance mb-4 text-center">
                Для записи необходимо добавить авто в личном кабинете
            </p>
            <PrimaryBtn route="/account/cars" type="button" className="w-full">
                Перейти в аккаунт
            </PrimaryBtn>
        </>
    ) : (
        <>
            <SelectField
                values={userCars}
                value={selectedCar || userCars[0]}
                onChange={handleChange}
                className="w-full"
            />

            <PrimaryBtn
                disabled={disabled}
                onClick={handleSubmit}
                type="button"
                className="w-full"
            >
                Записаться
            </PrimaryBtn>
        </>
    );
}
