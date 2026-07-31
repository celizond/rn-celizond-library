import type { Meta, StoryObj } from '@storybook/react-native';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import {
  TextVariant,
  textColorTokens,
  textVariantTokens,
  type TextVariantName,
  type TextVariantProps,
} from 'react-native-ui-library';

const styles = StyleSheet.create({
  canvas: { backgroundColor: '#f5f5f5', width: 500, padding: 24 },
  preview: { gap: 24 },
  stack: { gap: 32 },
  scaleItem: { gap: 12 },
  tokenPanel: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
    padding: 16,
  },
  tokenRow: { flexDirection: 'row', justifyContent: 'space-between' },
  tokenLabel: { color: '#6b7280' },
  tokenValue: { color: '#111827', fontWeight: '600' },
  colorValue: { alignItems: 'center', flexDirection: 'row', gap: 8 },
  swatch: {
    borderColor: '#d1d5db',
    borderRadius: 4,
    borderWidth: 1,
    height: 18,
    width: 18,
  },
  header: {
    backgroundColor: "#ED1D23"
  },
  headerTitle: { flex: 1, marginLeft: 16 },
});

type TokenRowProps = {
  label: string;
  value: string | number | undefined;
};

function TokenRow({ label, value }: TokenRowProps) {
  return (
    <View style={styles.tokenRow}>
      <TextVariant style={styles.tokenLabel} variant="bodyRegularSmall">
        {label}
      </TextVariant>
      <TextVariant style={styles.tokenValue} variant="bodyRegularSmall">
        {value ?? '—'}
      </TextVariant>
    </View>
  );
}

function getSwatchStyle(backgroundColor: string): ViewStyle {
  return { backgroundColor };
}

function TokenPanel({
  variant = 'bodyRegular',
  color = 'c14Black',
  align = 'left',
  underline = false,
  numberOfLines,
}: TextVariantProps) {
  const token = textVariantTokens[variant];
  const colorCode = textColorTokens[color];

  return (
    <View style={styles.tokenPanel}>
      <TokenRow label="Variant" value={variant} />
      <View style={styles.tokenRow}>
        <TextVariant style={styles.tokenLabel} variant="bodyRegularSmall">
          Color
        </TextVariant>
        <View style={styles.colorValue}>
          <View style={[styles.swatch, getSwatchStyle(colorCode)]} />
          <TextVariant style={styles.tokenValue} variant="bodyRegularSmall">
            {`${color} · ${colorCode}`}
          </TextVariant>
        </View>
      </View>
      <TokenRow label="Font size" value={token.fontSize} />
      <TokenRow label="Line height" value={token.lineHeight} />
      <TokenRow label="Font weight" value={token.fontWeight} />
      <TokenRow label="Letter spacing" value={token.letterSpacing} />
      <TokenRow label="Align" value={align} />
      <TokenRow label="Underline" value={underline ? 'true' : 'false'} />
      <TokenRow label="Number of lines" value={numberOfLines} />
    </View>
  );
}

function TextPreview(props: TextVariantProps) {
  return (
    <View style={styles.preview}>
      <TextVariant {...props} />
      <TokenPanel {...props} />
    </View>
  );
}

function ScaleItem({
  label,
  variant,
}: {
  label: string;
  variant: TextVariantName;
}) {
  return (
    <View style={styles.scaleItem}>
      <TextVariant variant={variant}>{label}</TextVariant>
      <TokenPanel variant={variant} />
    </View>
  );
}

const meta = {
  title: 'UI/Texts/TextVariant',
  component: TextVariant,
  decorators: [
    (Story) => (
      <View style={styles.canvas}>
        <Story />
      </View>
    ),
  ],
  args: {
    children: 'Texto de ejemplo',
    color: 'c14Black',
    variant: 'bodyRegular',
  },
  render: (args) => <TextPreview {...args} />,
  argTypes: {
    align: { control: 'select', options: ['left', 'center', 'right'] },
    color: {
      control: 'select',
      options: [
        'white',
        'neutralWhite',
        'c14Black',
        'c14GreyWarehouse',
        'c14Grey',
        'c14Red',
        'black',
        'secondaryGrey',
        'extraWhite',
        'lightBlue',
        'green',
        'yellow',
        'orangeAlert',
        'redLabel',
        'blueLabel',
        'yellowLabel',
        'secondaryOrange',
        'secondaryRed',
        'thirtyGrey',
      ],
    },
    variant: {
      control: 'select',
      options: [
        'title',
        'mediumTitle',
        'subtitle',
        'bodyRegularExtraSmall',
        'bodyRegularMidSmall',
        'bodyRegularSmall',
        'bodyRegular',
        'bodyRegularLarge',
        'subtitleMedium',
        'bodyMediumExtraSmall',
        'bodyMediumSmall',
        'bodyMedium',
        'bodyMediumLarge',
        'bodyMediumExtraLarge',
        'bodySemiBoldExtraSmall',
        'bodySemiBoldSmall',
        'bodySemiBoldBig',
        'bodyBold',
        'bodyBoldBig',
      ],
    },
  },
} satisfies Meta<typeof TextVariant>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Title: Story = {
  args: { children: 'Título principal', variant: 'title' },
};
export const Body: Story = {
  args: { children: 'Contenido regular para lectura.', variant: 'bodyRegular' },
};
export const Bold: Story = {
  args: { children: 'Texto destacado', variant: 'bodyBold' },
};
export const SemanticColor: Story = {
  args: { children: 'Acción requerida', color: 'c14Red' },
};
export const HeaderTitle: Story = {
  args: {
    children: 'Título del encabezado',
    color: 'white',
    numberOfLines: 1,
    variant: 'mediumTitle',
  },
  render: (args) => (
    <View style={styles.preview}>
      <View style={styles.header}>
        <TextVariant {...args} style={[styles.headerTitle, args.style]} />
      </View>
      <TokenPanel {...args} />
    </View>
  ),
};
export const Scale: Story = {
  render: () => (
    <View style={styles.stack}>
      <ScaleItem label="Title" variant="title" />
      <ScaleItem label="Medium title" variant="mediumTitle" />
      <ScaleItem label="Subtitle" variant="subtitle" />
      <ScaleItem label="Body regular" variant="bodyRegular" />
      <ScaleItem label="Body medium" variant="bodyMedium" />
      <ScaleItem label="Body bold" variant="bodyBold" />
    </View>
  ),
};
