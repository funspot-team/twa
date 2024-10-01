import type { ComponentType, JSX } from 'react';

import { MainPage } from '@/pages/MainPage/MainPage';
import { PartnerPage } from '@/pages/PartnerPage/PartnerPage';
import { ItemPage } from '@/pages/ItemPage/ItemPage';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { SpotMapPage } from '@/pages/SpotMapPage/SpotMapPage';
import { RecommendedGroupsPage } from '@/pages/RecommendedGroupsPage/RecommendedGroupsPage';
import { IdeasPage } from '@/pages/IdeasPage/IdeasPage';
import { FavoriteGroupsPage } from '@/pages/FavoriteGroupsPage/FavoriteGroupsPage';
import { FavouritesPage } from '@/pages/FavouritesPage/FavouritesPage';

export const ROUTE_NAMES = {
  MAIN_ROUTE: '/',
  CATALOGUE_ROUTE: '/catalog',
  IDEAS_ROUTE: '/ideas/*',
  IDEAS_RECOMMENDED_LIST_ROUTE: '/ideas/recommended-groups',
  IDEAS_RECOMMENDED_ITEM_ROUTE: '/ideas/recommended-groups/:id',
  FAVOURITE_GROUPS_ROUTE: '/favourite-groups',
  FAVOURITE_GROUP_ROUTE: '/favourite-groups/:id',
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
  { path: ROUTE_NAMES.IDEAS_ROUTE, Component: IdeasPage, title: 'Идеи' },
  { path: ROUTE_NAMES.IDEAS_RECOMMENDED_ITEM_ROUTE, Component: RecommendedGroupsPage, title: 'Рекомендованное' },
  { path: ROUTE_NAMES.FAVOURITE_GROUPS_ROUTE, Component: FavoriteGroupsPage, title: 'Избранное' },
  { path: ROUTE_NAMES.FAVOURITE_GROUP_ROUTE, Component: FavouritesPage, title: 'Избранное' },
  { path: ROUTE_NAMES.PARTNER_ROUTE, Component: PartnerPage, title: 'Стать партнером' },
  { path: ROUTE_NAMES.ITEM_ROUTE, Component: ItemPage },
  { path: ROUTE_NAMES.SPOT_MAP_ROUTE, Component: SpotMapPage },
];
