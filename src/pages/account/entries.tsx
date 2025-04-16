import { AccountEntry } from '@/components/atoms/account-entry';
import DialogLayout from '@/components/layouts/dialog-layout';
import AccountEntryDialog from '@/components/molecules/account/account-entry-dialog';
import CancelEntryDialog from '@/components/molecules/account/cancel-entry-dialog';
import { fakeUser } from '@/lib/data/account-entries';
import { Appointment } from '@/lib/types/user';
import { PlusIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export default function AccountEntries() {
    const [selectedEntry, setSelectedEntry] = useState<Appointment | null>(
        null
    );
    const [showAccountEntryDialog, setShowAccountEntryDialog] = useState(false);
    const [showCancelEntryDialog, setShowCancelEntryDialog] = useState(false);

    const user = fakeUser;
    return (
        <section className="flex flex-col gap-4 md:flex-row md:justify-between md:pt-3 md:gap-6">
            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">
                    Актуальные
                </p>

                <div className="space-y-3 mb-3.5 md:space-y-5">
                    {user.appointments.actual.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                            onClick={() => {
                                setSelectedEntry(entry);
                                setShowAccountEntryDialog(true);
                            }}
                        />
                    ))}
                </div>

                <button className="rounded-full bg-input-bg p-1 mx-auto cursor-pointer transition-all duration-200 ease-in block hover:bg-zinc-700/60 hover:scale-105 focus-within:scale-110 focus-within:bg-zinc-700/60">
                    <PlusIcon className="size-5 text-white" />
                </button>
            </div>

            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">
                    Архив
                </p>

                <div className="space-y-2 mb-3.5 md:space-y-5">
                    {user.appointments.archive.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                            onClick={() => {
                                setSelectedEntry(entry);
                                setShowAccountEntryDialog(true);
                            }}
                        />
                    ))}
                </div>
            </div>

            <DialogLayout
                isOpen={showAccountEntryDialog}
                closeDialog={() => {
                    setShowAccountEntryDialog(false);
                }}
            >
                <AccountEntryDialog
                    entry={selectedEntry}
                    onClick={() => {
                        setShowAccountEntryDialog(false);
                        setShowCancelEntryDialog(true);
                    }}
                />
            </DialogLayout>

            <DialogLayout
                title="Вы уверены что хотите отменить запись?"
                isOpen={showCancelEntryDialog}
                closeDialog={() => setShowCancelEntryDialog(false)}
            >
                <CancelEntryDialog
                    closeDialog={() => setShowCancelEntryDialog(false)}
                />
            </DialogLayout>
        </section>
    );
}
