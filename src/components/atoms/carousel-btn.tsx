type CarouselBtnProps = {
    onClick: () => void;
    children: React.ReactNode;
};

export default function CarouselBtn({ onClick, children }: CarouselBtnProps) {
    return (
        <button className="size-9 sm:size-11 cursor-pointer rounded-lg border border-btn-bg p-2 transition-colors duration-200 ease-in hover:bg-btn-bg/75" onClick={onClick}>
            {children}
        </button>
    );
}
