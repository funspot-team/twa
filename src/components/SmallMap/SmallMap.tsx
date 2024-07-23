/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { FC } from 'react';

import './SmallMap.css';

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker.svg',
  iconSize: new L.Point(40, 40),
});

interface ISmallMapProps {
  center: L.LatLngExpression;
}

export const SmallMap: FC<ISmallMapProps> = ({ center }) => {
  return (
    <>
      <MapContainer center={center} attributionControl={false} zoom={14} scrollWheelZoom={false} zoomControl={false} dragging={false} className='small-map'>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker position={center} icon={customIcon}/>        
      </MapContainer>
    </>
  );
};
