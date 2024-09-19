import type { ComponentType, JSX } from 'react';

import { MainPage } from '@/pages/MainPage/MainPage';
import { PartnerPage } from '@/pages/PartnerPage/PartnerPage';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { MapPage } from '@/pages/MapPage/MapPage';
import { SpotMapPage } from '@/pages/SpotMapPage/SpotMapPage';
import { CollectionsPage } from '@/pages/CollectionsPage/CollectionsPage';
import { SelectionPage } from '@/pages/SelectionPage/SelectionPage';
import { Favourites } from '@/components/Favourites/Favourites';

export const ROUTE_NAMES = {
  MAIN_ROUTE: '/',
  CATALOGUE_ROUTE: '/catalog',
  MAP_ROUTE: '/map',
  SELECTIONS_ROUTE: '/selections/*',
  SELECTION_ROUTE: '/selections/recommended-groups/:id',
  FAVOURITES_ROUTE: '/selections/favourite-groups/:id',
  USER_ROUTE: '/user',
  PARTNER_ROUTE: '/partner',
  ITEM_ROUTE: '/item/:id',
  SPOT_MAP_ROUTE: '/spot/map/:lat/:lng'
}

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: ROUTE_NAMES.MAIN_ROUTE, Component: MainPage, title: 'Главная' },
  { path: ROUTE_NAMES.CATALOGUE_ROUTE, Component: CatalogPage, title: 'Каталог' },
  { path: ROUTE_NAMES.MAP_ROUTE, Component: MapPage, title: 'Карта' },
  { path: ROUTE_NAMES.SELECTIONS_ROUTE, Component: CollectionsPage, title: 'Подборки' },
  { path: ROUTE_NAMES.SELECTION_ROUTE, Component: SelectionPage, title: 'Рекомендованное' },
  { path: ROUTE_NAMES.FAVOURITES_ROUTE, Component: Favourites, title: 'Избранное' },
  { path: ROUTE_NAMES.PARTNER_ROUTE, Component: PartnerPage, title: 'Стать партнером' },
  { path: ROUTE_NAMES.ITEM_ROUTE, Component: ItemPage },
  { path: ROUTE_NAMES.SPOT_MAP_ROUTE, Component: SpotMapPage },
];
