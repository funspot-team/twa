/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useState, type FC } from 'react';
import { useUnit } from "effector-react";

import { Banner, Button, Image, Modal } from '@telegram-apps/telegram-ui';
import { ModalHeader } from '@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader';
import { useNavigate } from 'react-router-dom';
import { Icon28Heart } from '@/icons/heart';
import { $mapCenter, $mapZoom, onChangeMapCenter, onChangeMapZoom } from '@/pages/MapPage/model';
import { $childrenFilter, $mainFilters, $priceFilter } from '../Filters/model';
import { Filters } from '../Filters/components/Filters';
import { SpinnerList } from '../SpinnerList/SpinnerList';
import { useFakeLoading } from '@/hooks/useFakeLoading';
import { LastItem } from '../LastItem/LastItem';
import { getSpotsByFilters } from '../Filters/helpers/filtersHelpers';
import { Icon28HeartFill } from '@/icons/heartFill';
import SPOTS from '../../mocks/catalog.json';

import './Map.css';

// https://street-map.gosur.com/?ll=60.03975637586652,30.313518537422397&z=17.264217556471927&t=streets

const customIcon = new L.Icon({
  iconUrl: '/twa/images/marker2.svg',
  iconSize: new L.Point(40, 40),
})

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
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isAdd, setIsAdd] = useState(false);
  const navigate = useNavigate();
  
  const zoom = useUnit($mapZoom);
  const center = useUnit($mapCenter);
  const filters = useUnit($mainFilters);
  const childrenFilter = useUnit($childrenFilter);
  const priceFilter = useUnit($priceFilter);

  const { loading } = useFakeLoading(500, [filters, childrenFilter, priceFilter]);
  const markers = getSpotsByFilters(SPOTS.data, filters, childrenFilter, priceFilter);

  return (
    <>
      <Filters isMap />

      {loading && <SpinnerList />}

      <MapContainer center={center} attributionControl zoom={zoom} scrollWheelZoom={false} zoomControl={false}>
        <HandlerContainer />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {/* https://www.npmjs.com/package/react-leaflet-cluster */}
        {!loading && <MarkerClusterGroup
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
        </MarkerClusterGroup>}
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
            subheader={data.description}
            type="section"
            onClick={() => navigate('/item/' + data.id)}
          >
            <>
              <Button size="s" onClick={() => navigate('/item/' + data.id)}>
                Подробнее
              </Button>

              <Button
                mode="plain"
                size="s"
                before={isAdd ? <Icon28HeartFill /> : <Icon28Heart />}
                onClick={(e: any) => {
                  e.stopPropagation();
                  setIsAdd(!isAdd)
                }}
              >
                В избранное
              </Button>
            </>
          </Banner>
        )}

        <LastItem />
      </Modal>
    </>
  );
};
