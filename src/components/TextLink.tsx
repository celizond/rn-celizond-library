import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type TextStyle,
} from 'react-native';

import {
  TextVariant,
  type TextVariantColor,
  type TextVariantName,
} from './TextVariant';

export type TextLinkProps = Omit<PressableProps, 'children'> & {
  text: string;
  textVariant?: TextVariantName;
  color?: TextVariantColor;
  underline?: boolean;
  textStyle?: StyleProp<TextStyle>;
};

export function TextLink({
  text,
  textVariant = 'bodyRegularSmall',
  color = 'lightBlue',
  underline = true,
  textStyle,
  accessibilityLabel = text,
  ...pressableProps
}: TextLinkProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="link"
      {...pressableProps}
    >
      {({ pressed }) => (
        <TextVariant
          color={color}
          style={[pressed && styles.pressed, textStyle]}
          underline={underline}
          variant={textVariant}
        >
          {text}
        </TextVariant>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.65 },
});
