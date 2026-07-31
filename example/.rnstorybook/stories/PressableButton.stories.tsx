import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { PressableButton, Typography } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24, width: '100%' },
  icon: { color: '#ffffff', fontSize: 20 },
});

const meta = {
  title: 'UI/Buttons/PressableButton',
  component: PressableButton,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    haptics: false,
    label: 'Continuar',
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'filledPrimary',
        'filledSecondary',
        'textPrimaryUnderline',
        'outlined',
      ],
    },
  },
} satisfies Meta<typeof PressableButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledPrimary: Story = {};
export const FilledSecondary: Story = {
  args: { variant: 'filledSecondary' },
};
export const Outlined: Story = {
  args: { variant: 'outlined' },
};
export const TextUnderline: Story = {
  args: { variant: 'textPrimaryUnderline' },
};
export const FullWidth: Story = {
  args: { fullWidth: true },
};
export const Loading: Story = {
  args: { loading: true },
};
export const Disabled: Story = {
  args: { disabled: true },
};
export const Error: Story = {
  args: { error: true, label: 'Ocurrió un error' },
};
export const WithChildren: Story = {
  args: {
    children: <Typography style={styles.icon}>＋ Agregar</Typography>,
  },
};
