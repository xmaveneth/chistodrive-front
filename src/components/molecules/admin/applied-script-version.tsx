import ScriptBtn from "@/components/atoms/script-btn";
import ScriptVersionTableRow from "@/components/organisms/scripts/script-version-table-row";
import { ScheduleVehicleTypeSlots } from "@/lib/types/schedule";
import { useState } from "react";

type AppliedScriptVersionProps = {
    data: ScheduleVehicleTypeSlots[] 
}

export default function AppliedScriptVersion({data} : AppliedScriptVersionProps) {

    const [currentVersionInterval, setCurrentVersionInterval] = useState(0);

    const versionInfo =
        data?.map((versionSlot, idx) => ({
            slotName: versionSlot.vehicle_type_name,
            index: idx,
        })) ?? [];

    return (
            <div>
                <div className="flex items-center gap-4 my-8 flex-wrap">
                    {versionInfo.map((slot, vehicleIntervalIdx) => (
                        <ScriptBtn
                            key={`vehicle-slot-btn-${vehicleIntervalIdx}`}
                            onClick={() =>
                                setCurrentVersionInterval(vehicleIntervalIdx)
                            }
                            isAcitve={
                                currentVersionInterval === vehicleIntervalIdx
                            }
                            className="text-sm md:text-base"
                        >
                            {slot.slotName}
                        </ScriptBtn>
                    ))}
                </div>
                <div>
                    {data.length > 0 &&
                        data[currentVersionInterval].slots_data.map(
                            (serviceInterval, serviceIntervalIdx) => {
                                return (
                                    <div key={`slot-${serviceIntervalIdx}`}>
                                        <div className="my-6 md:text-lg">
                                            {
                                                serviceInterval.service_category_name
                                            }
                                        </div>
                                        {serviceInterval.service_list.map(
                                            (service, serviceIdx) => (
                                                <div
                                                    key={`service-${serviceIntervalIdx}-${serviceIdx}`}
                                                >
                                                    <div className="mt-10 mb-4">
                                                        {`${serviceIdx + 1}. ${service.service_name}`}
                                                    </div>
                                                    <ScriptVersionTableRow
                                                        workers={
                                                            service.workers
                                                        }
                                                        onDelete={(slot) => {console.log(slot)}}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
    );
}
