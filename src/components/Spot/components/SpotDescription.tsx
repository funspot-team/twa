/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Cell, Divider, Section } from '@telegram-apps/telegram-ui';
import { useState, type FC } from 'react';
import { Icon16ChevronRight } from '@/icons/chevronRight';

interface ICatalogItemProps {
  description: string;
  youtube?: string;
}

export const SpotDescription: FC<ICatalogItemProps> = ({
  description,
  youtube,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return youtube ? (
    <Section header="Описание">
      <Cell
        after={<Icon16ChevronRight />}
        subtitle="Открыть обзор"
        onClick={() => {
          // @ts-ignore
          ym(97751698,'reachGoal','btn-click-youtube');
          window.open(youtube, '_blank');
        }}
      >
        Youtube
      </Cell>

      <Divider />

      <Cell
        multiline
        subtitle={
          <>
            <div style={{
                maxHeight: isExpanded ? 'none' : '200px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                marginBottom: '-8px',
              }}
            >
              <Button size="s" mode="plain" onClick={() => {
                // @ts-ignore
                ym(97751698,'reachGoal','btn-click-description');
                setIsExpanded(!isExpanded);
              }}>
                {!isExpanded ? 'Раскрыть' : 'Свернуть'}
              </Button>
            </div>
          </>
        }
      />
    </Section>
  ) : (
    <Section header="Описание">
      <Cell
        multiline
        subtitle={
          <>
            <div style={{
                maxHeight: isExpanded ? 'none' : '200px',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                marginBottom: '-8px',
              }}
            >
              <Button size="s" mode="plain" onClick={() => {
                // @ts-ignore
                ym(97751698,'reachGoal','btn-click-description');
                setIsExpanded(!isExpanded);
              }}>
                {!isExpanded ? 'Раскрыть' : 'Свернуть'}
              </Button>
            </div>
          </>
        }
      />
    </Section>
  )
};
