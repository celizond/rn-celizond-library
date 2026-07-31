import {
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Typography } from './Typography';

export type InputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string;
  helperText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export function Input({
  label,
  error,
  helperText,
  containerStyle,
  inputStyle,
  editable = true,
  ...textInputProps
}: InputProps) {
  const supportingText = error ?? helperText;

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Typography variant="caption">{label}</Typography> : null}
      <TextInput
        accessibilityLabel={textInputProps.accessibilityLabel ?? label}
        editable={editable}
        placeholderTextColor="#9ca3af"
        style={[
          styles.input,
          error && styles.inputError,
          !editable && styles.disabled,
          inputStyle,
        ]}
        {...textInputProps}
      />
      {supportingText ? (
        <Typography tone={error ? 'danger' : 'muted'} variant="caption">
          {supportingText}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6, width: '100%' },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 10,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: { borderColor: '#dc2626' },
  disabled: { backgroundColor: '#f3f4f6', opacity: 0.65 },
});
