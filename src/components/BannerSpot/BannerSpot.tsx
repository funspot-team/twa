/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { useOpenSpot } from '@/hooks/useOpenSpot';

import './BannerSpot.css';

interface IBannerSpotProps {
  spot: any;
}

export const BannerSpot: FC<IBannerSpotProps> = ({ spot }) => {
  const { id, mainImg, name, shortDescription } = spot;
  const { openSpot } = useOpenSpot();

  return (
    <Banner
      header={name}
      subheader={<span dangerouslySetInnerHTML={{ __html: shortDescription }} />}
      type="section"
      className="banerspot"
      style={{
        backgroundImage: `url(${mainImg})`,
      }}
    >
      <>
        <Button size="s" onClick={() => openSpot(id)}>
          Попробовать
        </Button>
      </>
    </Banner>
  );
};
