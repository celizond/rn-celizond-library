import type { ReactNode } from 'react';
import * as Haptics from 'expo-haptics';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Typography } from './Typography';

export type PressableButtonVariant =
  'filledPrimary' | 'filledSecondary' | 'textPrimaryUnderline' | 'outlined';

export type PressableButtonProps = Omit<
  PressableProps,
  'children' | 'disabled' | 'onPress' | 'style'
> & {
  children?: ReactNode;
  label?: ReactNode;
  variant?: PressableButtonVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  underline?: boolean;
  haptics?: boolean;
  textProps?: TextProps;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

export function PressableButton({
  children,
  label,
  variant = 'filledPrimary',
  fullWidth = false,
  disabled = false,
  loading = false,
  error = false,
  underline = false,
  haptics = true,
  textProps,
  textStyle,
  style,
  onPress,
  accessibilityLabel,
  ...pressableProps
}: PressableButtonProps) {
  const isDisabled = disabled || loading || error;

  const handlePress = (event: GestureResponderEvent) => {
    if (haptics) {
      Haptics.selectionAsync().catch(() => undefined);
    }
    onPress?.(event);
  };

  return (
    <Pressable
      accessibilityLabel={
        accessibilityLabel ?? (typeof label === 'string' ? label : undefined)
      }
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
      disabled={isDisabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant].container,
        fullWidth ? styles.fullWidth : styles.fitContent,
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        error && styles.error,
        style,
      ]}
      {...pressableProps}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={variantStyles[variant].text.color}
            size="small"
          />
        ) : children ? (
          children
        ) : (
          <Typography
            {...textProps}
            style={[
              styles.label,
              variantStyles[variant].text,
              (underline || variant === 'textPrimaryUnderline') &&
                styles.underline,
              error && styles.errorText,
              textStyle,
            ]}
          >
            {label}
          </Typography>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  fullWidth: { alignSelf: 'stretch', width: '100%' },
  fitContent: { alignSelf: 'flex-start' },
  pressed: { opacity: 0.78 },
  disabled: { opacity: 0.55 },
  primary: {
    backgroundColor: '#111827',
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: { height: 4, width: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  secondary: { backgroundColor: '#dc2626' },
  text: {
    backgroundColor: 'transparent',
    minHeight: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  outlined: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderWidth: 1,
  },
  label: { fontWeight: '700' },
  lightText: { color: '#ffffff' },
  darkText: { color: '#111827' },
  underline: { textDecorationLine: 'underline' },
  error: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  errorText: { color: '#dc2626' },
});

const variantStyles = {
  filledPrimary: { container: styles.primary, text: styles.lightText },
  filledSecondary: { container: styles.secondary, text: styles.lightText },
  textPrimaryUnderline: { container: styles.text, text: styles.darkText },
  outlined: { container: styles.outlined, text: styles.darkText },
} satisfies Record<
  PressableButtonVariant,
  { container: ViewStyle; text: TextStyle }
>;
