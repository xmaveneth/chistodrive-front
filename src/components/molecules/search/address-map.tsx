import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCityContext } from '@/lib/hooks/context/use-city-context';
import useMediaQuery from '@/lib/hooks/utils/use-media-query';
import { Address } from '@/lib/types/address';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
    iconUrl: '/images/leaflet/marker-icon.png',
    shadowUrl: '/images/leaflet/marker-shadow.png',
});

type AddressMapProps = {
    isLoading: boolean;
    addresses: Address[]; 
}

export default function AddressMap({isLoading, addresses}: AddressMapProps) {
    const { currentCity } = useCityContext();
    const isMobile = useMediaQuery('(max-width: 640px)');

    if (isLoading)
        return <div className="bg-gray-200/50 h-[500px] animate-pulse"></div>;

    const mapHeight = isMobile ? '250px' : '500px';

    return (
        <div className='h-[250px] md:h-[500px]'>
            <MapContainer
                center={
                    addresses.length > 0
                        ? [addresses[0].lat, addresses[0].lng]
                        : [parseFloat(currentCity.lat), parseFloat(currentCity.lng)]
                }
                zoom={12}
                scrollWheelZoom={true}
                style={{ height: mapHeight, width: '100%', zIndex: '0' }}
            >
                <TileLayer
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
        </div>
    );
}
