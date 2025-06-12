
import { ArchivedAppointment } from '@/lib/types/user';
import { MapPinIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import DialogLayout from '../layouts/dialog-layout';
import AddReviewDialog from '../molecules/account/add-review-dialog';
import ShowReviewDialog from '../molecules/account/show-review-dialog';

type AccountAcrhivedProps = {
    entry: ArchivedAppointment;
    onClick: () => void;
};

export function AccountAcrhived({ entry, onClick }: AccountAcrhivedProps) {
    const [showLeaveReviewModal, setShowLeaveReviewModal] = useState(false);
    const [showSeeReviewModal, setShowSeeReviewModal] = useState(false);

    const hasReview = entry.is_review_exist;

    return (
        <div
            className="w-full relative text-left px-3 py-3 pl-6 bg-input-bg flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-5  rounded-2xl"
        >
            <div className="flex-1 break-all">
                <div className="mb-1 md:text-lg text-center xs:text-left flex items-center flex-wrap gap-2">
                    {entry.car_wash_name}
                    <div className='text-[0.6rem] border border-white px-1 py-0.5 w-max shrink-0 rounded-sm'>{entry.status}</div>
                </div>
                <p className="flex items-start gap-1 mb-2.5 text-xs sm:text-sm text-white/70 break-all">
                    <MapPinIcon className="size-4 shrink-0 text-btn-bg xs:mt-1" />
                    {entry.location && entry.location}
                </p>
            </div>

            <button className='absolute z-0 inset-0 cursor-pointer transition-colors duration-200 ease-in hover:bg-zinc-700/30 rounded-2xl' onClick={onClick}></button>
            <button onClick={() => { hasReview ? setShowSeeReviewModal(true) : setShowLeaveReviewModal(true) }} className="z-10 relative cursor-pointer flex items-start gap-1 flex-wrap text-xs sm:text-sm hover:text-white/70 text-text-muted md:justify-end pr-5">
                {hasReview ? 'Посмотреть отзыв' : 'Оставить отзыв'}
                <span className='absolute -inset-3'></span>
            </button>

            {hasReview ? <DialogLayout
                isOpen={showSeeReviewModal}
                closeDialog={() => {
                    setShowSeeReviewModal(false);
                }}
                title="Ваш комментарий"
            >
                <ShowReviewDialog
                    entry={entry}
                    closeDialog={() => { setShowSeeReviewModal(false) }}
                />
            </DialogLayout> : <DialogLayout
                isOpen={showLeaveReviewModal}
                closeDialog={() => {
                    setShowLeaveReviewModal(false);
                }}
                title="Как вам это место?"
                description="Напишите комментарий, чтобы оставить отзыв"
            >
                <AddReviewDialog
                    entry={entry}
                    closeDialog={() => { setShowLeaveReviewModal(false) }}
                />
            </DialogLayout>}

        </div>
    );
}
