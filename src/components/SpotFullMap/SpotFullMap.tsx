import { type FC } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L, { CRS } from 'leaflet';
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

      <MapContainer crs={CRS.EPSG3395} center={center} attributionControl={false} zoom={14} scrollWheelZoom={false} zoomControl={false} className='spot-map'>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer url="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=24.09.23-4-b240906182700&x={x}&y={y}&z={z}&scale=1&lang=ru_RU&apikey=33547b10-f284-4c4e-8e66-e6c96affaddf" />

        <Marker position={center} icon={customIcon}/>        
      </MapContainer>
    </>
  );
};
