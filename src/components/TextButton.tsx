import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';
import {
  Pressable,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { Typography } from './Typography';

export type TextButtonProps = {
  label: string;
  onPress?: () => void;
  haptics?: boolean;
  chevronColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function TextButton({
  label,
  onPress,
  haptics = true,
  chevronColor = '#6b7280',
  style,
  textStyle,
}: TextButtonProps) {
  const handlePress = useCallback(() => {
    if (haptics) {
      Haptics.selectionAsync().catch(() => undefined);
    }
    onPress?.();
  }, [haptics, onPress]);

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={handlePress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed, style]}
    >
      <Typography style={textStyle}>{label}</Typography>
      <Typography
        accessibilityElementsHidden
        importantForAccessibility="no"
        style={[styles.chevron, { color: chevronColor }]}
      >
        ›
      </Typography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingVertical: 12,
    width: '100%',
  },
  pressed: { opacity: 0.6 },
  chevron: { fontSize: 30, lineHeight: 30 },
});
