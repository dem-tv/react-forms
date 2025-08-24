import { useAppSelector } from '../../store/hooks/useAppSelector.ts';
import { dataListSlice } from './datalist.slice.ts';
import { VerticalList } from '../../components/VerticalList/VerticalList.tsx';
import { Card } from '../../components/Card.tsx';
import type { FormModel } from '../schema.ts';
import { Typography } from '../../components/Typography/Typography.tsx';

type CardItem = FormModel & { id: number };

export function DataList() {
  const dataList = useAppSelector(dataListSlice.selectors.list);

  const renderCard = (data: CardItem) => {
    const isNewCard = Date.now() - data.id < 100;
    return (
      <Card new={isNewCard} key={data.id}>
        <Typography tagName={'p'}>
          <Typography bold tagName={'span'}>
            Name:{' '}
          </Typography>
          {data.name}
        </Typography>
        <Typography tagName={'p'}>
          <Typography bold tagName={'span'}>
            Age:{' '}
          </Typography>
          {data.age}
        </Typography>
      </Card>
    );
  };

  return (
    <VerticalList list={dataList} renderItem={renderCard} itemKey={'id'} />
  );
}
