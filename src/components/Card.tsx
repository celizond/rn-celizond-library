import type { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { Typography } from './Typography';

export type CardProps = {
  title: string;
  description?: string;
  media?: ReactNode;
  footer?: ReactNode;
  badge?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function Card({
  title,
  description,
  media,
  footer,
  badge,
  onPress,
  style,
}: CardProps) {
  const content = (
    <>
      {media ? <View style={styles.media}>{media}</View> : null}
      <View style={styles.content}>
        {badge ? (
          <View style={styles.badge}>
            <Typography style={styles.badgeText} variant="caption">
              {badge}
            </Typography>
          </View>
        ) : null}
        <Typography variant="title">{title}</Typography>
        {description ? (
          <Typography tone="muted">{description}</Typography>
        ) : null}
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{content}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    width: '100%',
  },
  pressed: { opacity: 0.82 },
  media: { backgroundColor: '#eff6ff', minHeight: 120 },
  content: { gap: 10, padding: 16 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  badgeText: { color: '#1d4ed8', fontWeight: '600' },
  footer: { marginTop: 4 },
});
