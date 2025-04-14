import { Address } from '@/lib/types/address';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'images/leaflet/marker-icon-2x.png',
    iconUrl: 'images/leaflet/marker-icon.png',
    shadowUrl: 'images/leaflet/marker-shadow.png',
});

type AddressMapProps = {
    addresses: Address[];
};

export default function AddressMap({ addresses }: AddressMapProps) {
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
