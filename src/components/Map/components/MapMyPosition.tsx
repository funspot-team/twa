import { FC, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import { Button } from '@telegram-apps/telegram-ui';
import { MapControl } from './MapControl';
import L, { LatLng } from 'leaflet';
import { Icon28Location } from '@/icons/location';

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker1.svg',
  iconSize: new L.Point(40, 40),
});

export const MapMyPosition: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<LatLng | null>(null);

  const map = useMapEvents({
    locationfound(e) {
      map.flyTo(e.latlng, 15, { duration: 2});
      setPosition(e.latlng);
      setIsLoading(false);
    }
  });

  return (
    <MapControl position={'bottomright'}>
      <Button
        before={<Icon28Location />}
        mode="filled"
        disabled={isLoading}
        size="m"
        style={{
          gap: 0,
          padding: 0,
          borderRadius: '22px',
        }}
        onClick={() => {
          setIsLoading(true);
          map.locate();
        }}
      />

      {position === null ? null : (
        <Marker position={position} icon={customIcon} />
      )}
    </MapControl>
  );
}