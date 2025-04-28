import ScriptTableHeadItem from '@/components/atoms/script-table-head-item';
import ScriptTableHead from '@/components/molecules/scripts/script-table-head';
import { useGetScriptServiceParams } from '@/lib/hooks/scripts/use-get-script-service-params';
import useMediaQuery from '@/lib/hooks/utils/use-media-query';
import {
    calculateTableWidth,
    generateColumnClass,
} from '@/lib/utils/generate-column-class';
import { useParams } from 'react-router-dom';

export default function ScriptServices() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetScriptServiceParams(Number(id));
    const isMobile = useMediaQuery('(max-width: 640px)');

    if (isLoading) return <p>Loading...</p>;

    if (data == null) return null;

    return (
        <div>
            {data.data.map((serviceCategory, serviceCategoryIndex) => {
                const serviceCount = serviceCategory.services.length;
                const serviceParamsCount = serviceCount > 0
                    ? serviceCategory.services[0].service_params.length
                    : 0;

                const columns = serviceParamsCount + 2; 
                const columnClass = generateColumnClass(columns);
                const tableWidth = calculateTableWidth(columns) * (isMobile ? 0.65 : 1);

                return (
                    <div key={`script-category-${serviceCategoryIndex}`} className="overflow-auto">
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
                                            vehicleName={serviceParam.vehicle_type_name}
                                        />
                                    )
                                )}
                            <div></div>
                        </ScriptTableHead>
                    </div>
                );
            })}
        </div>
    );
}
