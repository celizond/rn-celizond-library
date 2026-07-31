import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = Omit<
  PressableProps,
  'children' | 'disabled' | 'style'
> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function Button({
  label,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  leadingIcon,
  style,
  textStyle,
  accessibilityLabel = label,
  ...pressableProps
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: isDisabled }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        pressed && !isDisabled && variantStyle.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyle.indicator}
          size={sizeStyle.indicatorSize}
        />
      ) : (
        leadingIcon
      )}
      <Text
        numberOfLines={1}
        style={[styles.label, variantStyle.text, sizeStyle.text, textStyle]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 10,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#2563eb',
  },
  primaryPressed: {
    backgroundColor: '#1d4ed8',
  },
  secondary: {
    backgroundColor: '#ffffff',
    borderColor: '#2563eb',
    borderWidth: 1,
  },
  secondaryPressed: {
    backgroundColor: '#eff6ff',
  },
  danger: {
    backgroundColor: '#dc2626',
  },
  dangerPressed: {
    backgroundColor: '#b91c1c',
  },
  disabled: {
    opacity: 0.45,
  },
  small: {
    minHeight: 34,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  medium: {
    minHeight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  large: {
    minHeight: 50,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  label: {
    fontWeight: '600',
  },
  lightText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#2563eb',
  },
  smallText: {
    fontSize: 13,
    lineHeight: 18,
  },
  mediumText: {
    fontSize: 15,
    lineHeight: 20,
  },
  largeText: {
    fontSize: 17,
    lineHeight: 22,
  },
});

const variantStyles = {
  primary: {
    container: styles.primary,
    pressed: styles.primaryPressed,
    text: styles.lightText,
    indicator: '#ffffff',
  },
  secondary: {
    container: styles.secondary,
    pressed: styles.secondaryPressed,
    text: styles.secondaryText,
    indicator: '#2563eb',
  },
  danger: {
    container: styles.danger,
    pressed: styles.dangerPressed,
    text: styles.lightText,
    indicator: '#ffffff',
  },
} satisfies Record<
  ButtonVariant,
  {
    container: ViewStyle;
    pressed: ViewStyle;
    text: TextStyle;
    indicator: string;
  }
>;

const sizeStyles = {
  small: {
    container: styles.small,
    text: styles.smallText,
    indicatorSize: 14,
  },
  medium: {
    container: styles.medium,
    text: styles.mediumText,
    indicatorSize: 16,
  },
  large: {
    container: styles.large,
    text: styles.largeText,
    indicatorSize: 18,
  },
} satisfies Record<
  ButtonSize,
  { container: ViewStyle; text: TextStyle; indicatorSize: number }
>;
