import {
  Pressable,
  StyleSheet,
  View,
  type ColorValue,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { TextVariant } from './TextVariant';

export type LabelProps = {
  text: string;
  width?: DimensionValue;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  borderColor?: ColorValue;
  removeIconColor?: ColorValue;
  removeIconSize?: number;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Label({
  text,
  width = 'auto',
  backgroundColor = '#f3f4f6',
  textColor = '#374151',
  borderColor = '#d1d5db',
  removeIconColor = textColor,
  removeIconSize = 22,
  onRemove,
  style,
}: LabelProps) {
  return (
    <View
      style={[styles.container, { backgroundColor, borderColor, width }, style]}
    >
      <TextVariant style={{ color: textColor }} variant="bodyRegularSmall">
        {text}
      </TextVariant>
      {onRemove ? (
        <Pressable
          accessibilityLabel={`Eliminar ${text}`}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onRemove}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <TextVariant
            style={[
              styles.removeIcon,
              { color: removeIconColor, fontSize: removeIconSize },
            ]}
          >
            ×
          </TextVariant>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    minHeight: 36,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 6,
  },
  pressed: { opacity: 0.55 },
  removeIcon: { lineHeight: 22, textAlign: 'center' },
});
