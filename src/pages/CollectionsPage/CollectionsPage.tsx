/* eslint-disable @typescript-eslint/no-explicit-any */
import { List, TabsList } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';

import { TabsItem } from '@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem';
import { FavoriteGroups } from '@/components/FavoriteGroups/FavoriteGroups';
import { RecommendedGroups } from '@/components/RecommendedGroups/RecommendedGroups';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const labels = [
  {
    label: 'Рекомендованное',
    value: '/selections/recommended-groups',
  },
  {
    label: 'Мои подборки',
    value: '/selections/favorite-groups',
  },
];

export const CollectionsPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // {location.pathname === path}
  return (
    <List>
      <TabsList>
        {labels.map(({ value, label }) => (
          <TabsItem
            key={value}
            selected={location.pathname === value}
            onClick={() => navigate(value)}
          >
            {label}
          </TabsItem>
        ))}
      </TabsList>

      <Routes>
        <Route path='/selections/recommended-groups' element={<RecommendedGroups />} />
        <Route path='/selections/favorite-groups' element={<FavoriteGroups />} />
        <Route path='/selections/*' element={<Navigate to='/selections/recommended-groups'/>}/>
      </Routes>
    </List>
  );
};
