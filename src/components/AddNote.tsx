import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { TextVariant } from './TextVariant';

export interface Note {
  titulo: string;
  descripcion: string;
}

export type AddNoteProps = {
  title?: string;
  initialNotes?: Note[];
  onNoteAdded?: (note: Note) => void;
  placeholder?: string;
};

export function AddNote({
  title,
  initialNotes = [],
  onNoteAdded,
  placeholder = 'Escribí acá tu nota de revisión',
}: AddNoteProps) {
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => initialNotes);

  const handleAddNote = () => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      return;
    }

    const newNote: Note = {
      titulo: 'Nota de Usuario',
      descripcion: trimmedDescription,
    };

    setNotes((currentNotes) => [...currentNotes, newNote]);
    setDescription('');
    onNoteAdded?.(newNote);
  };

  return (
    <View style={styles.container}>
      {title ? (
        <TextVariant color="c14Black" variant="bodyMediumLarge">
          {title}
        </TextVariant>
      ) : null}

      {notes.map((note, index) => (
        <View style={styles.note} key={`${note.titulo}-${index}`}>
          <TextVariant color="c14Black" variant="bodyMediumSmall">
            {note.titulo}
          </TextVariant>
          <TextVariant color="c14GreyWarehouse" variant="bodyRegularSmall">
            {note.descripcion}
          </TextVariant>
        </View>
      ))}

      <View style={styles.form}>
        <TextVariant color="c14Black" variant="bodyMedium">
          Agregar nota
        </TextVariant>
        <TextInput
          accessibilityLabel="Descripción de la nota"
          multiline
          onChangeText={setDescription}
          onSubmitEditing={handleAddNote}
          placeholder={placeholder}
          placeholderTextColor="#606062"
          returnKeyType="done"
          style={styles.input}
          submitBehavior="submit"
          value={description}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d1d1',
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
    padding: 16,
    width: '100%',
  },
  note: { gap: 4 },
  form: { gap: 8 },
  input: {
    borderColor: '#cac4d0',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    minHeight: 104,
    padding: 12,
    textAlignVertical: 'top',
  },
});
