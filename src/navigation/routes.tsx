import type { ComponentType, JSX } from 'react';

import { MainPage } from '@/pages/MainPage/MainPage';
import { PartnerPage } from '@/pages/PartnerPage/PartnerPage';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { FavouritesPage } from '@/pages/FavouritesPage/FavouritesPage';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { MapPage } from '@/pages/MapPage/MapPage';

export const ROUTE_NAMES = {
  MAIN_ROUTE: '/',
  CATALOGUE_ROUTE: '/catalog',
  MAP_ROUTE: '/map',
  FAVOURITES_ROUTE: '/favourites',
  USER_ROUTE: '/user',
  PARTNER_ROUTE: '/partner',
  ITEM_ROUTE: '/item/:id',
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
  { path: ROUTE_NAMES.FAVOURITES_ROUTE, Component: FavouritesPage, title: 'Избранное' },
  { path: ROUTE_NAMES.PARTNER_ROUTE, Component: PartnerPage, title: 'Стать партнером' },
  { path: ROUTE_NAMES.ITEM_ROUTE, Component: ItemPage },
];
