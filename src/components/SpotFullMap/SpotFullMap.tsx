import { type FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker2.svg',
  iconSize: new L.Point(40, 40),
});

interface ISpotFullMapProps {
  center: L.LatLngExpression;
}

export const SpotFullMap: FC<ISpotFullMapProps> = ({ center }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        mode="filled"
        size="s"
        style={{ zIndex: 10, position: 'absolute', margin: '5%' }}
        onClick={() => navigate(-1)}
      >
        Закрыть
      </Button>

      <MapContainer center={center} attributionControl={false} zoom={14} scrollWheelZoom={false} zoomControl={false} className='spot-map'>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker position={center} icon={customIcon}/>        
      </MapContainer>
    </>
  );
};
