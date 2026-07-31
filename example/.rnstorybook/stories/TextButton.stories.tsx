import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { TextButton } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24, width: '100%' },
});

const meta = {
  title: 'UI/Buttons/TextButton',
  component: TextButton,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    haptics: false,
    label: 'Ver todos los productos',
    onPress: fn(),
  },
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomChevron: Story = {
  args: { chevronColor: '#dc2626' },
};
