import type { Meta, StoryObj } from '@storybook/react-native';

import { StyleSheet, Text, View } from 'react-native';
import { fn } from 'storybook/test';

import { Button } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  lightText: {
    color: '#ffffff',
  },
});

const meta = {
  title: 'UI/Buttons/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    label: 'Continuar',
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Danger: Story = {
  args: {
    label: 'Eliminar',
    variant: 'danger',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    leadingIcon: <Text style={styles.lightText}>＋</Text>,
  },
};
