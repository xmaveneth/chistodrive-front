import ScriptTableHeadItem from '@/components/atoms/script-table-head-item';
import ScriptServiceRow from '@/components/molecules/scripts/script-service-row';
import ScriptTableHead from '@/components/molecules/scripts/script-table-head';
import { useGetScriptServiceParams } from '@/lib/hooks/scripts/use-get-script-service-params';
import useMediaQuery from '@/lib/hooks/utils/use-media-query';
import {
    calculateTableWidth,
    generateColumnClass,
} from '@/lib/utils/generate-column-class';
import { range } from '@/lib/utils/range';
import { useParams } from 'react-router-dom';

export default function ScriptServices() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetScriptServiceParams(Number(id));
    const isMobile = useMediaQuery('(max-width: 640px)');

    if (isLoading) return <Skeleton />;

    if (data == null) return null;

    return (
        <div>
            {data.data.map((serviceCategory, serviceCategoryIndex) => {
                const serviceCount = serviceCategory.services.length;
                const serviceParamsCount =
                    serviceCount > 0
                        ? serviceCategory.services[0].service_params.length
                        : 0;

                const columns = serviceParamsCount + 2;
                const columnClass = generateColumnClass(columns);
                const tableWidth =
                    calculateTableWidth(columns) * (isMobile ? 0.65 : 1);

                return (
                    <div
                        key={`script-category-${serviceCategoryIndex}`}
                        className="overflow-auto scrollbar-hidden"
                    >
                        <div className="my-6 md:text-lg sticky left-0 z-20">
                            {serviceCategory.service_category_name}
                        </div>

                        <ScriptTableHead
                            columns={columnClass}
                            width={tableWidth}
                        >
                            <div className="flex items-center justify-center md:text-lg">
                                Название
                            </div>
                            <div className="flex items-center justify-center md:text-lg">
                                Тип услуги
                            </div>

                            {serviceCategory.services.length > 0 &&
                                serviceCategory.services[0].service_params.map(
                                    (serviceParam, serviceParamIndex) => (
                                        <ScriptTableHeadItem
                                            key={`service-param-${serviceCategoryIndex}-${serviceParamIndex}`}
                                            vehicleName={
                                                serviceParam.vehicle_type_name
                                            }
                                        />
                                    )
                                )}
                            <div></div>
                        </ScriptTableHead>
                        {serviceCategory.services.map(
                            (service, serviceIndex) => (
                                <ScriptServiceRow
                                    columns={columnClass}
                                    width={tableWidth - 30}
                                    index={serviceIndex + 1}
                                    serviceType={service.service_type_name}
                                    scriptName={service.service_name}
                                    onDelete={() => {}}
                                >
                                    {service.service_params.map(
                                        (parameter, parameterIndex) => (
                                            <div
                                                key={`parameter-${parameterIndex}-${serviceIndex}-${serviceCategoryIndex}`}
                                                className="flex divide-x-1 divide-white/20"
                                            >
                                                <div className="flex-1 flex items-center justify-center">
                                                    {parameter.price} ₽
                                                </div>
                                                <div className="flex-1 flex items-center justify-center">
                                                    {parameter.duration} мин
                                                </div>
                                            </div>
                                        )
                                    )}
                                </ScriptServiceRow>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function Skeleton() {
    return (
        <div>
            {range(1, 3).map((skeleton) => (
                <div
                    key={`skeleton-item-${skeleton}`}
                    className="overflow-auto scrollbar-hidden"
                >
                    <div className="my-6 md:text-lg text-transparent w-max bg-gray-200 animate-pulse rounded-sm">
                        loading loading
                    </div>

                    <TableHeadSkeleton />

                    {range(1, 3).map((index) => (
                        <TableRowSkeleton key={`table-row-skeleton-${index}`} />
                    ))}
                </div>
            ))}
        </div>
    );
}

function TableHeadSkeleton() {
    return (
        <div className="mb-4 bg-gray-200 text-transparent rounded-full h-20 sm:h-22 w-full animate-pulse">
            Loading
        </div>
    );
}

function TableRowSkeleton() {
    return (
        <div className="mx-auto mb-2 text-sm md:text-base py-2 bg-gray-200 text-transparent rounded-sm w-[calc(100%-32px)] animate-pulse">
            Loading
        </div>
    );
}
