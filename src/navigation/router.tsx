import { MainPageNew } from '@/pages/MainPageNew/MainPageNew';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { RecommendedGroupsPage } from '@/pages/RecommendedGroupsPage/RecommendedGroupsPage';
import { FavoriteGroupsPage } from '@/pages/FavoriteGroupsPage/FavoriteGroupsPage';
import { FavouritesPage } from '@/pages/FavouritesPage/FavouritesPage';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { ROUTE_NAMES } from './routes';
import { RecommendedGroups } from '@/components/RecommendedGroups/RecommendedGroups';

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPageNew /> },
      { path: ROUTE_NAMES.CATALOGUE_ROUTE, element: <CatalogPage /> },
      { path: ROUTE_NAMES.IDEAS_RECOMMENDED_LIST_ROUTE, element: <RecommendedGroups /> },
      { path: ROUTE_NAMES.IDEAS_RECOMMENDED_ITEM_ROUTE, element: <RecommendedGroupsPage /> },
      { path: ROUTE_NAMES.FAVOURITE_GROUPS_ROUTE, element: <FavoriteGroupsPage /> },
      { path: ROUTE_NAMES.FAVOURITE_GROUP_ROUTE, element: <FavouritesPage /> },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router}/>
