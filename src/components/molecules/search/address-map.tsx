import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useSearchServicesContext } from '@/lib/hooks/useSearchServicesContext';
import { convertToAddresses } from '@/lib/utils/get-filter-options';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'images/leaflet/marker-icon-2x.png',
    iconUrl: 'images/leaflet/marker-icon.png',
    shadowUrl: 'images/leaflet/marker-shadow.png',
});

export default function AddressMap() {
    const { servicesData } = useSearchServicesContext();

    if (servicesData == null) return <div className='bg-gray-200/50 h-[500px] animate-pulse'></div>;

    const addresses = convertToAddresses(servicesData?.data);

    if (addresses.length === 0) return null;

    return (
        <MapContainer
            center={[addresses[0].lat, addresses[0].lng]}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '500px', width: '100%', zIndex: '0' }}
        >
            <TileLayer
                /*   attribution='&copy; <a href="https://osm.org">OpenStreetMap</a>' */
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {addresses.map((addr, idx) => (
                <Marker key={idx} position={[addr.lat, addr.lng]}>
                    <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                        {addr.name}
                    </Tooltip>
                </Marker>
            ))}
        </MapContainer>
    );
}

