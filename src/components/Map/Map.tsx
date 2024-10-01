/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L, { CRS } from 'leaflet';
import { useState, type FC } from 'react';
import { useUnit } from "effector-react";
import { Banner, Button, Image, Modal } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useNavigate } from 'react-router-dom';
import { $childrenFilter, $mainFilters, $priceFilter, $searchFilter } from '../Filters/model';
import { $catalog } from '../Layout/model';
import { LastItem } from '../LastItem/LastItem';
import { getSpotsByFilters } from '../Filters/helpers/filtersHelpers';
import { AddFavourite } from '../AddFavourite/AddFavourite';
import { MapMyPosition } from './components/MapMyPosition';
import { $mapCenter, $mapZoom, onChangeMapCenter, onChangeMapZoom } from './model';

import './Map.css';

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker2.svg',
  iconSize: new L.Point(40, 40),
});

// @ts-ignore
const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  });
};

function HandlerContainer() {
  const map = useMapEvents({
    zoomend: () => {
      onChangeMapZoom(map.getZoom());
  },
    moveend: () => {
      const { lat, lng } = map.getCenter();
      onChangeMapCenter([lat, lng]);
    },
  })
  return null;
}

export const Map: FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  
  const zoom = useUnit($mapZoom);
  const center = useUnit($mapCenter);
  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);
  const searchFilter = useUnit($searchFilter);
  const spots = useUnit($catalog);

  const markers = getSpotsByFilters(spots, filters, childrenFilter, priceFilter, searchFilter);

  return (
    <>
      <MapContainer center={center} attributionControl zoom={zoom} scrollWheelZoom zoomControl={false} crs={CRS.EPSG3395}>
        <HandlerContainer />
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
        <TileLayer url="https://core-renderer-tiles.maps.yandex.net/tiles?l=map&v=24.09.23-4-b240906182700&x={x}&y={y}&z={z}&scale=1&lang=ru_RU&apikey=33547b10-f284-4c4e-8e66-e6c96affaddf" />

        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={40}
          spiderfyOnMaxZoom={true}
          showCoverageOnHover={true}
        >
          {markers
            .map((spot: any) => {
              return (
                <Marker key={spot.id} position={spot.coords} icon={customIcon} eventHandlers={{
                  click: () => {
                    setData(spot);
                    setIsOpen(true);
                  },
                }} />
              );
            })
          }
        </MarkerClusterGroup>
        <MapMyPosition />
      </MapContainer>
      
      <Modal
        header={<ModalHeader />}
        open={isOpen}
        onOpenChange={setIsOpen}
        style={{ zIndex: 30 }}
      >
        {data && (
          <Banner
            before={<Image size={96} src={data.mainImg} />}
            header={data.name}
            subheader={<span dangerouslySetInnerHTML={{ __html: data.description }} />}
            type="section"
            onClick={() => navigate('/item/' + data.id)}
          >
            <>
              <Button size="s" onClick={() => navigate('/item/' + data.id)}>
                Подробнее
              </Button>

              <AddFavourite id={data.id} title={data.name} withPadding />
            </>
          </Banner>
        )}

        <LastItem />
      </Modal>
    </>
  );
};
