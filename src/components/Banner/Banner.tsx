/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, Button, Image } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface IBannerSpotProps {
  spot: any;
}

export const BannerSpot: FC<IBannerSpotProps> = ({ spot }) => {
  const navigate = useNavigate();
  const { id, mainImg, name, description } = spot;

  return (
    <Banner
      before={<Image size={48} src={mainImg} />}
      header={name}
      subheader={description}
      type="section"
    >
      <>
        <Button size="s" onClick={() => navigate('/item/' + id)}>
          Бронировать
        </Button>

        <Button
          mode="plain"
          size="s"
          onClick={() => navigate('/item/' + id)}
        >
          В избранное
        </Button>
      </>
    </Banner>
  );
};
