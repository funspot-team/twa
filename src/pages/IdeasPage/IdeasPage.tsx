/* eslint-disable @typescript-eslint/no-explicit-any */
import { List } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';

// import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';
import { RecommendedGroups } from '@/components/RecommendedGroups/RecommendedGroups';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_NAMES } from '@/navigation/routes';

// const labels = [
//   {
//     label: 'Рекомендованное',
//     value: '/ideas/recommended-groups',
//   },
//   {
//     label: 'Мои подборки',
//     value: '/ideas/favorite-groups',
//   },
// ];

export const IdeasPage: FC = () => {
  // const location = useLocation();
  // const navigate = useNavigate();

  // {location.pathname === path}
  return (
    <List>
      {/* <TabsList>
        {labels.map(({ value, label }) => (
          <TabsItem
            key={value}
            selected={location.pathname === value}
            onClick={() => navigate(value)}
          >
            {label}
          </TabsItem>
        ))}
      </TabsList> */}

      <Routes>
        <Route path={ROUTE_NAMES.IDEAS_RECOMMENDED_LIST_ROUTE} element={<RecommendedGroups />} />
        {/* <Route path='/ideas/...' element={<FavoriteGroups />} /> */}
        <Route path={ROUTE_NAMES.IDEAS_ROUTE} element={<Navigate to={ROUTE_NAMES.IDEAS_RECOMMENDED_LIST_ROUTE}/>}/>
      </Routes>
    </List>
  );
};
