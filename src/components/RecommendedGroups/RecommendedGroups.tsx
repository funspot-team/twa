/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import { LastItem } from '@/components/LastItem/LastItem';
import { Cell } from '@telegram-apps/telegram-ui';
import { $recommended } from '@/pages/RecommendedGroupsPage/model';
import { useUnit } from 'effector-react';
import { RecommendedBlock } from '@/pages/MainPageNew/components/RecommendedBlock';
import { Header } from '@/pages/MainPageNew/components/Header';

export const RecommendedGroups: FC = () => {
  const recommended = useUnit($recommended);

  return (
    <>
      <Header title="Подборки" />

      <Cell
        subhead="Мы собрали лучшие места для вашего отдыха — от активных приключений до уютных уголков для свиданий и семейных прогулок. Найдите новые идеи для своего досуга и откройте для себя интересные места в Санкт-Петербурге."
        multiline
        style={{ padding: 0 }}
      />
    
      <RecommendedBlock recommended={recommended} />

      <LastItem />
    </>
  );
};
