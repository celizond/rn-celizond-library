import type { ColorValue, DimensionValue } from 'react-native';

import { ScrollableLabels } from './ScrollableLabels';

export interface ActiveFilterChip {
  id: string;
  label: string;
  width?: DimensionValue;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  borderColor?: ColorValue;
  removeIconColor?: ColorValue;
  removeIconSize?: number;
}

export type ActiveFilterChipsProps = {
  filters: ActiveFilterChip[];
  onRemove: (id: string) => void;
};

export function ActiveFilterChips({
  filters,
  onRemove,
}: ActiveFilterChipsProps) {
  return (
    <ScrollableLabels
      items={filters.map((filter) => ({
        id: filter.id,
        text: filter.label,
        width: filter.width ?? 'auto',
        backgroundColor: filter.backgroundColor ?? '#fff1f1',
        textColor: filter.textColor ?? '#ed1d23',
        borderColor: filter.borderColor ?? '#ed1d23',
        removeIconColor: filter.removeIconColor ?? '#ed1d23',
        removeIconSize: filter.removeIconSize ?? 22,
      }))}
      onRemove={onRemove}
    />
  );
}
