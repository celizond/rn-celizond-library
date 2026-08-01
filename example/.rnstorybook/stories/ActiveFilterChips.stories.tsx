import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import {
  ActiveFilterChips,
  type ActiveFilterChip,
} from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 620, padding: 24, width: '100%' },
});

type ActiveFilterChipsStoryProps = {
  filters?: ActiveFilterChip[];
};

function ActiveFilterChipsStory({ filters = [] }: ActiveFilterChipsStoryProps) {
  const [visibleFilters, setVisibleFilters] = useState(filters);

  useEffect(() => {
    setVisibleFilters(filters);
  }, [filters]);

  return (
    <ActiveFilterChips
      filters={visibleFilters}
      onRemove={(id) =>
        setVisibleFilters((current) =>
          current.filter((filter) => filter.id !== id)
        )
      }
    />
  );
}

const meta = {
  title: 'Components/ActiveFilterChips',
  component: ActiveFilterChipsStory,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    filters: [
      { id: 'category', label: 'Categoría: Bebidas' },
      { id: 'status', label: 'Estado: Disponible' },
      { id: 'createdAt', label: '20 jul 2026' },
      { id: 'warehouse', label: 'Depósito central' },
    ],
  },
  argTypes: {
    filters: {
      control: 'object',
      description: 'Filtros activos del caso de negocio.',
    },
  },
  parameters: {
    code: {
      callbacks: {
        onRemove: "(id) => console.log('Filtro eliminado', id)",
      },
    },
  },
} satisfies Meta<typeof ActiveFilterChipsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomFilter: Story = {
  args: {
    filters: [
      {
        id: 'custom-filter',
        label: 'Filtro personalizado',
        width: 'auto',
        backgroundColor: '#c3efb8',
        textColor: '#2dad0d',
        borderColor: '#2dad0d',
        removeIconColor: '#2dad0d',
        removeIconSize: 22,
      },
      {
        id: 'custom-filter-blue',
        label: 'Filtro azul',
        width: 'auto',
        backgroundColor: '#dbeafe',
        textColor: '#2563eb',
        borderColor: '#2563eb',
        removeIconColor: '#2563eb',
        removeIconSize: 22,
      },
    ],
  },
};
