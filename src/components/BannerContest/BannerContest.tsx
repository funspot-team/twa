/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banner, Button } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';

import './BannerContest.css';
import { initUtils, useInitData, useMiniApp } from '@telegram-apps/sdk-react';

export const BannerContest: FC = () => {
  const utils = initUtils();
  const initData = useInitData();
  const miniApp = useMiniApp();

  const mainImg = '/twa/images/contest.png';
  const name = 'Призы за лучшие идеи';
  const shortDescription = 'Предложите классную идею<br />по улучшению Funspot!<br />А за лучшие идеи мы подарим<br />головоломки Wuzl!';
  const url = 'https://t.me/+INJJi1d5O8QzOGVi';

  const onClick = () => {
    // @ts-ignore
    ym(97751698,'reachGoal','btn-click-contest-idea');

    if (initData?.chatInstance) {
      utils.openTelegramLink('https://t.me/fun_spot_official_bot');
    }
    miniApp.close();
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
        <Button
          mode="plain"
          size="s"
          onClick={() => {
            // @ts-ignore
            ym(97751698,'reachGoal','btn-click-contest-about');
            utils.openTelegramLink(url);
          }}
        >
          О конкурсе
        </Button>

        <Button
          size="s"
          onClick={onClick}
        >
          Предложить идею
        </Button>
      </>
    </Banner>
  );
};
