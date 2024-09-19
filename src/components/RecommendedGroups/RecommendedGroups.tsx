/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import RECOMMENDED from '@/mocks/recommended.json';
// import { useFakeLoading } from '@/hooks/useFakeLoading';
// import { SpinnerList } from '@/components/SpinnerList/SpinnerList';
import { LastItem } from '@/components/LastItem/LastItem';
import { Cell, Image, Section } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

export const RecommendedGroups: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {RECOMMENDED.data
        .map((item) => {
          return (
            <Section key={item.id}>
              <Cell
                before={<Image size={96} src={item.img} />}
                description={item.description}
                style={{ minHeight: '124px '}}
                onClick={() => {
                  navigate('/selections/recommended-groups/' + item.id);
                }}
                multiline
              >
                {item.title}
              </Cell>
            </Section>
          );
        })}

      <LastItem />
    </>
  );
};
