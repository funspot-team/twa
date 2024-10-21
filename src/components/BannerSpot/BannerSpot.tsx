/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { onChangeSpotVisible } from '@/pages/ItemPage/model';

import './BannerSpot.css';

interface IBannerSpotProps {
  spot: any;
}

export const BannerSpot: FC<IBannerSpotProps> = ({ spot }) => {
  const { id, mainImg, name, shortDescription } = spot;

  const goToSpot = () => {
    onChangeSpotVisible(id);
  }

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
        <Button size="s" onClick={goToSpot}>
          Попробовать сквош
        </Button>
      </>
    </Banner>
  );
};
