type ScriptTableHeadItemProps = {
    vehicleName: string;
};

export default function ScriptTableHeadItem({
    vehicleName,
}: ScriptTableHeadItemProps) {
    return (
        <div>
            <div className="py-1 text-xs md:text-sm">{vehicleName}</div>
            <div className="flex items-center divide-x-1 justify-center divide-white/20 border-t border-white/20">
                <div className="flex-1 py-1 text-xs md:text-sm">Цена, ₽</div>
                <div className="flex-1 py-1 text-xs md:text-sm">Время, ч</div>
            </div>
        </div>
    );
}
