import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { Button, Card, Typography } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24, width: '100%' },
  media: {
    alignItems: 'center',
    backgroundColor: '#dbeafe',
    flex: 1,
    justifyContent: 'center',
    minHeight: 140,
  },
});

const meta = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: 'Inventario actualizado',
    description:
      'Revisá el stock disponible y los últimos movimientos del depósito.',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithBadge: Story = {
  args: { badge: 'Nuevo' },
};

export const WithMedia: Story = {
  args: {
    badge: 'Destacado',
    media: (
      <View style={styles.media}>
        <Typography tone="muted">Área para imagen o contenido</Typography>
      </View>
    ),
  },
};

export const WithAction: Story = {
  args: {
    footer: <Button label="Ver inventario" size="small" />,
  },
};

export const Interactive: Story = {
  args: {
    badge: '12 productos',
    onPress: fn(),
  },
};
