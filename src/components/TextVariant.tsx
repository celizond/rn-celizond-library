import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

export type TextVariantName =
  | 'title'
  | 'mediumTitle'
  | 'subtitle'
  | 'bodyRegularExtraSmall'
  | 'bodyRegularMidSmall'
  | 'bodyRegularSmall'
  | 'bodyRegular'
  | 'bodyRegularLarge'
  | 'subtitleMedium'
  | 'bodyMediumExtraSmall'
  | 'bodyMediumSmall'
  | 'bodyMedium'
  | 'bodyMediumLarge'
  | 'bodyMediumExtraLarge'
  | 'bodySemiBoldExtraSmall'
  | 'bodySemiBoldSmall'
  | 'bodySemiBoldBig'
  | 'bodyBold'
  | 'bodyBoldBig';

export type TextVariantAlign = 'left' | 'center' | 'right';

export type TextVariantColor =
  | 'white'
  | 'neutralWhite'
  | 'c14Black'
  | 'c14GreyWarehouse'
  | 'c14Grey'
  | 'c14Red'
  | 'black'
  | 'secondaryGrey'
  | 'extraWhite'
  | 'lightBlue'
  | 'green'
  | 'yellow'
  | 'orangeAlert'
  | 'redLabel'
  | 'blueLabel'
  | 'yellowLabel'
  | 'secondaryOrange'
  | 'secondaryRed'
  | 'thirtyGrey';

export type TextVariantProps = TextProps & {
  variant?: TextVariantName;
  underline?: boolean;
  align?: TextVariantAlign;
  color?: TextVariantColor;
};

export function TextVariant({
  variant = 'bodyRegular',
  underline = false,
  align = 'left',
  color = 'c14Black',
  style,
  ...textProps
}: TextVariantProps) {
  return (
    <Text
      style={[
        styles.base,
        textVariantTokens[variant],
        alignStyles[align],
        { color: textColorTokens[color] },
        underline && styles.underline,
        style,
      ]}
      {...textProps}
    />
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false },
  regular12: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  regular13: { fontSize: 13, fontWeight: '400', lineHeight: 18 },
  regular14: { fontSize: 14, fontWeight: '400', lineHeight: 20 },
  regular16: { fontSize: 16, fontWeight: '400', lineHeight: 24 },
  regular17: { fontSize: 17, fontWeight: '400', lineHeight: 24 },
  regular18: { fontSize: 18, fontWeight: '400', lineHeight: 26 },
  regular34: { fontSize: 34, fontWeight: '400', lineHeight: 41 },
  medium12: { fontSize: 12, fontWeight: '500', lineHeight: 16 },
  medium14: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  medium16: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
  medium18: { fontSize: 18, fontWeight: '500', lineHeight: 26 },
  medium20: { fontSize: 20, fontWeight: '500', lineHeight: 28 },
  medium22: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.14,
    lineHeight: 30,
  },
  semiBold12: { fontSize: 12, fontWeight: '600', lineHeight: 16 },
  semiBold14: { fontSize: 14, fontWeight: '600', lineHeight: 20 },
  semiBold24: { fontSize: 24, fontWeight: '600', lineHeight: 32 },
  bold16: { fontSize: 16, fontWeight: '700', lineHeight: 24 },
  bold24: { fontSize: 24, fontWeight: '700', lineHeight: 32 },
  left: { textAlign: 'left' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  underline: { textDecorationLine: 'underline' },
});

export const textVariantTokens = {
  title: styles.regular34,
  mediumTitle: styles.medium20,
  subtitle: styles.regular17,
  bodyRegularExtraSmall: styles.regular12,
  bodyRegularMidSmall: styles.regular13,
  bodyRegularSmall: styles.regular14,
  bodyRegular: styles.regular16,
  bodyRegularLarge: styles.regular18,
  subtitleMedium: styles.medium20,
  bodyMediumExtraSmall: styles.medium12,
  bodyMediumSmall: styles.medium14,
  bodyMedium: styles.medium16,
  bodyMediumLarge: styles.medium18,
  bodyMediumExtraLarge: styles.medium22,
  bodySemiBoldExtraSmall: styles.semiBold12,
  bodySemiBoldSmall: styles.semiBold14,
  bodySemiBoldBig: styles.semiBold24,
  bodyBold: styles.bold16,
  bodyBoldBig: styles.bold24,
} satisfies Record<TextVariantName, TextStyle>;

const alignStyles = {
  left: styles.left,
  center: styles.center,
  right: styles.right,
} satisfies Record<TextVariantAlign, TextStyle>;

export const textColorTokens = {
  white: '#ffffff',
  neutralWhite: '#f5f5f5',
  c14Black: '#111827',
  c14GreyWarehouse: '#4b5563',
  c14Grey: '#6b7280',
  c14Red: '#dc2626',
  black: '#000000',
  secondaryGrey: '#9ca3af',
  extraWhite: '#f9fafb',
  lightBlue: '#3b82f6',
  green: '#16a34a',
  yellow: '#eab308',
  orangeAlert: '#f97316',
  redLabel: '#ef4444',
  blueLabel: '#2563eb',
  yellowLabel: '#ca8a04',
  secondaryOrange: '#ea580c',
  secondaryRed: '#b91c1c',
  thirtyGrey: '#374151',
} satisfies Record<TextVariantColor, string>;
