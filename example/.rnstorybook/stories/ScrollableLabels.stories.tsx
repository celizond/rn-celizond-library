import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import {
  ScrollableLabels,
  type ScrollableLabelItem,
  type ScrollableLabelsProps,
} from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 620, padding: 24, width: '100%' },
});

type ScrollableLabelsStoryProps = Partial<
  Pick<
    ScrollableLabelsProps,
    'className' | 'contentContainerStyle' | 'items' | 'maxWidth' | 'style'
  >
>;

function ScrollableLabelsStory({
  items = [],
  className = '',
  maxWidth = '100%',
  style,
  contentContainerStyle,
}: ScrollableLabelsStoryProps) {
  return (
    <ScrollableLabels
      className={className}
      contentContainerStyle={contentContainerStyle}
      items={items}
      maxWidth={maxWidth}
      style={style}
    />
  );
}

function RemovableLabelsStory({
  items = [],
  className = '',
  maxWidth = '100%',
  style,
  contentContainerStyle,
}: ScrollableLabelsStoryProps) {
  const [visibleItems, setVisibleItems] = useState(items);

  useEffect(() => {
    setVisibleItems(items);
  }, [items]);

  return (
    <ScrollableLabels
      className={className}
      contentContainerStyle={contentContainerStyle}
      items={visibleItems}
      maxWidth={maxWidth}
      onRemove={(id) =>
        setVisibleItems((current) => current.filter((item) => item.id !== id))
      }
      style={style}
    />
  );
}

const defaultItems: ScrollableLabelItem[] = [
  { id: '1', text: 'Disponible' },
  { id: '2', text: 'Stock bajo' },
  { id: '3', text: 'Depósito central' },
];

const meta = {
  title: 'UI/Labels/ScrollableLabels',
  component: ScrollableLabelsStory,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    className: '',
    contentContainerStyle: {},
    items: defaultItems,
    maxWidth: '100%',
    style: {},
  },
  argTypes: {
    className: {
      control: 'text',
      description:
        'Clases procesadas por NativeWind en el proyecto consumidor.',
    },
    contentContainerStyle: {
      control: 'object',
      description: 'Estilos del contenido interno del ScrollView.',
    },
    items: {
      control: 'object',
      description: 'Labels que se muestran dentro del scroll horizontal.',
    },
    maxWidth: {
      control: 'text',
      description: 'Ancho máximo disponible antes de habilitar el scroll.',
    },
    style: {
      control: 'object',
      description: 'Estilos del contenedor exterior.',
    },
  },
} satisfies Meta<typeof ScrollableLabelsStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DifferentColors: Story = {
  args: {
    items: [
      {
        id: 'success',
        text: 'Disponible',
        backgroundColor: '#f0fdf4',
        borderColor: '#16a34a',
        textColor: '#16a34a',
      },
      {
        id: 'warning',
        text: 'Stock bajo',
        backgroundColor: '#fefce8',
        borderColor: '#ca8a04',
        textColor: '#ca8a04',
      },
      {
        id: 'danger',
        text: 'Sin stock',
        backgroundColor: '#fff1f1',
        borderColor: '#ed1d23',
        textColor: '#ed1d23',
      },
    ],
  },
};

export const Overflow: Story = {
  args: {
    maxWidth: 340,
    items: [
      ...defaultItems,
      { id: '4', text: 'Categoría: Bebidas' },
      { id: '5', text: 'Actualizado hoy' },
    ],
  },
};

export const Removable: Story = {
  args: {
    items: defaultItems.map((item) => ({
      ...item,
      backgroundColor: '#fff1f1',
      borderColor: '#ed1d23',
      textColor: '#ed1d23',
      removeIconColor: '#ed1d23',
      removeIconSize: 22,
    })),
  },
  parameters: {
    code: {
      callbacks: {
        onRemove: "(id) => console.log('Label eliminado', id)",
      },
    },
  },
  render: (args) => <RemovableLabelsStory {...args} />,
};

export const CustomProps: Story = {
  args: {
    className: 'custom-scrollable-labels',
    contentContainerStyle: {
      gap: 16,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    items: defaultItems,
    maxWidth: 420,
    style: {
      backgroundColor: '#eff6ff',
      borderColor: '#93c5fd',
      borderRadius: 16,
      borderWidth: 1,
      padding: 8,
    },
  },
};

export const Empty: Story = {
  args: { items: [] },
};
