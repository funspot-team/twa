/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpotFullMap } from '@/components/SpotFullMap/SpotFullMap';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';

export const SpotMapPage: FC = () => {
  const { lat, lng } = useParams();

  return (
    <SpotFullMap center={[lat, lng] as any} />
  );
};