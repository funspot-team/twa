import { List, Banner, Image } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const FavouritesPage: FC = () => {
  const navigate = useNavigate();

  return (
    <List>
      <Banner
        before={<Image size={96} src='/twa/images/sup-board.png' />}
        header="Сплав на sup по реке Оредеж"
        subheader="Лучший загородный маршрут для начинающих сёрферов"
        type="section"
        onClick={() => navigate('/item')}
      />

      <Banner
        before={<Image size={96} src='/twa/images/bbq-boats.png' />}
        header="BBQ Boats"
        subheader="Прогулка на лодке со вкусом барбекю"
        type="section"
        onClick={() => navigate('/item')}
      />

      <Banner
        before={<Image size={96} src='/twa/images/enduro.png' />}
        header="Прокат эндуро и питбайков в СПБ"
        subheader="Поможем подобрать тур в зависимости от ваших навыков и пожеланий"
        type="section"
        onClick={() => navigate('/item')}
      />

      <Banner
        before={<Image size={96} src='/twa/images/rafting.png' />}
        header="Рафтинг в Лосево"
        subheader="Хотите ярких эмоций и море позитива? Выйти сухим из воды не получится!"
        type="section"
        onClick={() => navigate('/item')}
      />
    </List>
  );
};
