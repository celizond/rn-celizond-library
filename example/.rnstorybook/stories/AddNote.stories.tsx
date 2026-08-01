import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View } from 'react-native';

import { AddNote, type AddNoteProps } from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { maxWidth: 520, padding: 24, width: '100%' },
});

type AddNoteStoryProps = Pick<
  AddNoteProps,
  'initialNotes' | 'placeholder' | 'title'
>;

function AddNoteStory(props: AddNoteStoryProps) {
  return <AddNote {...props} />;
}

const meta = {
  title: 'Components/AddNote',
  component: AddNoteStory,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    initialNotes: [],
    placeholder: 'Escribí acá tu nota de revisión',
    title: 'Notas de revisión',
  },
  argTypes: {
    initialNotes: {
      control: 'object',
      description: 'Listado de notas cargadas inicialmente.',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de ayuda del campo de nota.',
    },
    title: {
      control: 'text',
      description: 'Título opcional del componente.',
    },
  },
} satisfies Meta<typeof AddNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    initialNotes: [
      {
        titulo: 'Nota de Usuario',
        descripcion: 'Esta nota inicial se puede modificar desde Controls.',
      },
    ],
  },
};

export const Basic: Story = {
  args: { title: undefined },
};

export const WithTitleEmpty: Story = {};

export const WithTitleAndNotes: Story = {
  args: {
    initialNotes: [
      {
        titulo: 'Nota de Usuario',
        descripcion: 'Verificar el stock antes de confirmar el movimiento.',
      },
      {
        titulo: 'Nota de Usuario',
        descripcion: 'La caja presenta una etiqueta dañada.',
      },
    ],
  },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Escribí una observación' },
};
