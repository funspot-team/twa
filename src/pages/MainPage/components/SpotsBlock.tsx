/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { AddFavourite } from '@/components/AddFavourite/AddFavourite';
import { SectionHeader } from '@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader';

interface ISpotsBlockProps {
  title: string;
  spots: any;
}

export const SpotsBlock: FC<ISpotsBlockProps> = ({ title, spots }) => {
  const navigate = useNavigate();

  return (
    <>
      <SectionHeader>{title}</SectionHeader>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', overflowX: 'scroll' }}>
        {spots.map(({ id, name, mainImg, shortDescription }: any) => {
          return (
            <Card key={name} style={{ minWidth: '254px' }} onClick={() => navigate('/item/' + id)}>
              <>
                <AddFavourite id={id} title={name} isCard />
                
                <img
                  alt="Dog"
                  src={mainImg}
                  style={{
                    display: 'block',
                    height: 180,
                    objectFit: 'cover',
                    width: 254
                  }}
                />

                <CardCell
                  readOnly
                  subtitle={<span dangerouslySetInnerHTML={{ __html: shortDescription }} />}
                >
                  {name}
                </CardCell>
              </>
            </Card>
          );
        })}
      </div>
    </>
  );
}
