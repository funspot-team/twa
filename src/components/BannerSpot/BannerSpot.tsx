/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import './BannerSpot.css';

interface IBannerSpotProps {
  spot: any;
}

export const BannerSpot: FC<IBannerSpotProps> = ({ spot }) => {
  const navigate = useNavigate();
  const { id, mainImg, name, shortDescription } = spot;

  return (
    <Banner
      header={name}
      subheader={<span dangerouslySetInnerHTML={{ __html: shortDescription }} />}
      type="section"
      className="banerspot"
      style={{
        backgroundImage: `url(${mainImg})`,
        marginTop: '24px'
      }}
    >
      <>
        <Button size="s" onClick={() => navigate('/item/' + id)}>
          Попробовать сквош
        </Button>

        {/* <Button
          mode="plain"
          size="s"
          onClick={() => navigate('/item/' + id)}
        >
          В избранное
        </Button> */}
      </>
    </Banner>
  );
};
