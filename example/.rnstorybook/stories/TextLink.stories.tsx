import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';

import { TextLink } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24, width: '100%' },
});

const meta = {
  title: 'UI/Texts/TextLink',
  component: TextLink,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    onPress: fn(),
    text: 'Ver más información',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['lightBlue', 'c14Black', 'c14Grey', 'c14Red', 'green'],
    },
    textVariant: {
      control: 'select',
      options: [
        'bodyRegularExtraSmall',
        'bodyRegularSmall',
        'bodyRegular',
        'bodyMedium',
        'bodyBold',
      ],
    },
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutUnderline: Story = {
  args: { underline: false },
};
export const Destructive: Story = {
  args: { color: 'c14Red', text: 'Eliminar elemento' },
};
export const Emphasized: Story = {
  args: { textVariant: 'bodyBold' },
};
