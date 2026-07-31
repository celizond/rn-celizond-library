import {
  StyleSheet,
  Text,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';

export type TypographyVariant = 'display' | 'title' | 'body' | 'caption';
export type TypographyTone = 'default' | 'muted' | 'danger';

export type TypographyProps = TextProps & {
  variant?: TypographyVariant;
  tone?: TypographyTone;
  style?: StyleProp<TextStyle>;
};

export function Typography({
  variant = 'body',
  tone = 'default',
  style,
  ...textProps
}: TypographyProps) {
  return (
    <Text
      style={[styles.base, variantStyles[variant], toneStyles[tone], style]}
      {...textProps}
    />
  );
}

const styles = StyleSheet.create({
  base: { color: '#111827' },
  display: { fontSize: 32, fontWeight: '700', lineHeight: 38 },
  title: { fontSize: 20, fontWeight: '600', lineHeight: 26 },
  body: { fontSize: 16, lineHeight: 24 },
  caption: { fontSize: 13, lineHeight: 18 },
  default: { color: '#111827' },
  muted: { color: '#6b7280' },
  danger: { color: '#dc2626' },
});

const variantStyles = {
  display: styles.display,
  title: styles.title,
  body: styles.body,
  caption: styles.caption,
} satisfies Record<TypographyVariant, TextStyle>;

const toneStyles = {
  default: styles.default,
  muted: styles.muted,
  danger: styles.danger,
} satisfies Record<TypographyTone, TextStyle>;
