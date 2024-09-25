/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L, { CRS } from 'leaflet';
import { FC } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import './SpotSmallMap.css';

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker2.svg',
  iconSize: new L.Point(40, 40),
});

interface ISpotSmallMapProps {
  center: L.LatLngExpression;
}

export const SpotSmallMap: FC<ISpotSmallMapProps> = ({ center }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        mode="filled"
        size="s"
        style={{ zIndex: 10, position: 'absolute', margin: '5%' }}
        // @ts-ignore
        onClick={() => navigate('/spot/map/' + center[0] + '/' + center[1])}
      >
        Открыть
      </Button>

      <MapContainer crs={CRS.EPSG3395} center={center} attributionControl={false} zoom={14} scrollWheelZoom={false} zoomControl={false} dragging={false} className='small-map'>
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer url="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=24.09.23-4-b240906182700&x={x}&y={y}&z={z}&scale=1&lang=ru_RU&apikey=33547b10-f284-4c4e-8e66-e6c96affaddf" />

        <Marker position={center} icon={customIcon}/>        
      </MapContainer>
    </>
  );
};
