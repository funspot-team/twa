/* eslint-disable @typescript-eslint/no-explicit-any */
import { type FC } from 'react';
import RECOMMENDED from '@/mocks/recommended.json';
import { LastItem } from '@/components/LastItem/LastItem';
import { Cell, Headline, Image, Section } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

export const RecommendedGroups: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Headline
        weight="3"
        style={{ textAlign: 'center', margin: '8px 0 0' }}
      >
        Наши подборки
      </Headline>

      <Cell
        description="Мы собрали лучшие места для вашего отдыха — от активных приключений до уютных уголков для свиданий и семейных прогулок. Найдите новые идеи для своего досуга и откройте для себя интересные места в Санкт-Петербурге."
        multiline
      />
    
      {RECOMMENDED.data
        .map((item) => {
          return (
            <Section key={item.id}>
              <Cell
                before={<Image size={96} src={item.img} />}
                description={
                  <span
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical',
                      whiteSpace: 'break-spaces',
                    }}
                  >
                    {item.description}
                  </span>
                }
                subtitle={`Спотов в подборке: ${item.spots.length}`}
                style={{ minHeight: '124px '}}
                onClick={() => {
                  navigate('/ideas/recommended-groups/' + item.id);
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
