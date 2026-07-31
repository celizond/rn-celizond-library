import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { Input } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 420, padding: 24, width: '100%' },
});

const meta = {
  title: 'UI/Input',
  component: Input,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    label: 'Correo electrónico',
    placeholder: 'nombre@empresa.com',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHelper: Story = {
  args: { helperText: 'Nunca compartiremos tu correo.' },
};
export const WithError: Story = {
  args: { error: 'Ingresá un correo válido.', value: 'correo-invalido' },
};
export const Disabled: Story = {
  args: { editable: false, value: 'usuario@empresa.com' },
};
export const Password: Story = {
  args: {
    label: 'Contraseña',
    placeholder: 'Ingresá tu contraseña',
    secureTextEntry: true,
  },
};
