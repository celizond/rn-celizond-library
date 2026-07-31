import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { Typography } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24 },
});

const meta = {
  title: 'UI/Typography',
  component: Typography,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    children: 'Texto de ejemplo',
    tone: 'default',
    variant: 'body',
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'muted', 'danger'] },
    variant: {
      control: 'select',
      options: ['display', 'title', 'body', 'caption'],
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Display: Story = {
  args: { children: 'Título principal', variant: 'display' },
};
export const Title: Story = {
  args: { children: 'Título de sección', variant: 'title' },
};
export const Muted: Story = {
  args: { children: 'Información secundaria', tone: 'muted' },
};
