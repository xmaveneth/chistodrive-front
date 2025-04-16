import { AccountEntry } from '@/components/atoms/account-entry';
import { fakeUser } from '@/lib/data/account-entries';
import { PlusIcon } from '@heroicons/react/16/solid';

export default function AccountEntries() {
    const user = fakeUser;
    return (
        <section className="flex flex-col gap-4 md:flex-row md:justify-between md:pt-3 md:gap-6">
            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">Актуальные</p>

                <ul className="space-y-3 mb-3.5 md:space-y-5">
                    {user.appointments.actual.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                        />
                    ))}
                </ul>

                <button className="rounded-full bg-input-bg p-1 mx-auto cursor-pointer block">
                    <PlusIcon className="size-5 text-white" />
                </button>
            </div>

            <div className="md:flex-1">
                <p className="mb-3.5 text-sm sm:text-base md:text-lg md:mb-4.5">Архив</p>

                <ul className="space-y-2 mb-3.5 md:space-y-5">
                    {user.appointments.archive.map((entry, idx) => (
                        <AccountEntry
                            key={`${entry.appointment_id}-${idx}`}
                            entry={entry}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
