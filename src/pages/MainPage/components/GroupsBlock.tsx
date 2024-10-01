/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card } from '@telegram-apps/telegram-ui';
import { type FC } from 'react';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';

import { useNavigate } from 'react-router-dom';
import { SectionHeader } from '@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader';

interface IGroupsBlockProps {
  title: string;
  groups: any;
}

export const GroupsBlock: FC<IGroupsBlockProps> = ({ title, groups }) => {
  const navigate = useNavigate();

  return (
    <>
      <SectionHeader>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '16px',
        }}>
          {title}
          <Button size="s" mode="plain" onClick={() => navigate('/ideas/recommended-groups')}>
            Смотреть все
          </Button>
        </div>
      </SectionHeader>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', overflowX: 'scroll' }}>
        {groups.map(({ id, title, img, description }: any) => {
          return (
            <Card key={id} style={{ minWidth: '254px' }} onClick={() => navigate('/ideas/recommended-groups/' + id)}>
              <>                
                <img
                  alt="Dog"
                  src={img}
                  style={{
                    display: 'block',
                    height: 180,
                    objectFit: 'cover',
                    width: 254
                  }}
                />

                <CardCell
                  readOnly
                  subtitle={<span dangerouslySetInnerHTML={{ __html: description }} />}
                >
                  {title}
                </CardCell>
              </>
            </Card>
          );
        })}
      </div>
    </>
  );
}
