/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Card } from '@telegram-apps/telegram-ui';
import { CardCell } from '@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IRecommendedBlockProps {
  recommended: any;
}
export const RecommendedBlock: FC<IRecommendedBlockProps> = ({ recommended }) => {
  const navigate = useNavigate();

  return (
    <>
      {recommended.map(({ id, img, title, description, spots }: any) => {
        return (
          <Card key={id} style={{ width: '100%' }} onClick={() => navigate('/ideas/recommended-groups/' + id)}>
            <>                
              <img
                alt="Dog"
                src={img}
                style={{
                  display: 'block',
                  height: 170,
                  objectFit: 'cover',
                  width: '100%'
                }}
              />

              <Badge
                type="number"
                large
                style={{ position: 'absolute', bottom: 85, right: 12, zIndex: 1 }}
              >
                {spots.length}
              </Badge>

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
    </>
  );
}
