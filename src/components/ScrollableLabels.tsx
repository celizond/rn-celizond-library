import { useRef, useState, type ComponentType } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type ColorValue,
  type DimensionValue,
  type ScrollViewProps,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import { Label } from './Label';

type ScrollViewHandle = {
  scrollTo: (options: { animated?: boolean; x?: number; y?: number }) => void;
};

export type ScrollableLabelItem = {
  id?: string;
  text: string;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  borderColor?: ColorValue;
  width?: DimensionValue;
  removeIconColor?: ColorValue;
  removeIconSize?: number;
};

export type ScrollableLabelsProps = {
  items: ScrollableLabelItem[];
  className?: string;
  maxWidth?: ViewStyle['maxWidth'];
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  onRemove?: (id: string) => void;
};

export function ScrollableLabels({
  items,
  className = '',
  maxWidth = '100%',
  style,
  contentContainerStyle,
  onRemove,
}: ScrollableLabelsProps) {
  const scrollViewRef = useRef<ScrollViewHandle | null>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const hasOverflow = contentWidth > viewportWidth + 2;
  const canScrollLeft = hasOverflow && scrollX > 4;
  const canScrollRight =
    hasOverflow && scrollX < contentWidth - viewportWidth - 4;

  const scrollByViewport = (direction: -1 | 1) => {
    const maximumX = Math.max(0, contentWidth - viewportWidth);
    const distance = Math.max(120, viewportWidth * 0.75);
    const nextX = Math.min(
      maximumX,
      Math.max(0, scrollX + direction * distance)
    );

    scrollViewRef.current?.scrollTo({ animated: true, x: nextX });
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <ClassNameView
      className={className}
      onLayout={(event) => setViewportWidth(event.nativeEvent.layout.width)}
      style={[styles.container, { maxWidth }, style]}
    >
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        horizontal
        onContentSizeChange={(width) => setContentWidth(width)}
        onScroll={(event) => setScrollX(event.nativeEvent.contentOffset.x)}
        ref={(instance) => {
          scrollViewRef.current =
            instance as unknown as ScrollViewHandle | null;
        }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {items.map((item, index) => (
          <Label
            key={item.id ?? `${item.text}-${index}`}
            backgroundColor={item.backgroundColor}
            borderColor={item.borderColor}
            onRemove={
              item.id && onRemove
                ? () => onRemove(item.id as string)
                : undefined
            }
            removeIconColor={item.removeIconColor}
            removeIconSize={item.removeIconSize}
            text={item.text}
            textColor={item.textColor}
            width={item.width}
          />
        ))}
      </ScrollView>

      {canScrollLeft ? (
        <View style={[styles.indicator, styles.left]}>
          <Pressable
            accessibilityLabel="Desplazar labels hacia la izquierda"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => scrollByViewport(-1)}
            style={({ pressed }) => [
              styles.indicatorBubble,
              pressed && styles.indicatorPressed,
            ]}
          >
            <Ionicons color="#ffffff" name="chevron-back" size={16} />
          </Pressable>
        </View>
      ) : null}

      {canScrollRight ? (
        <View style={[styles.indicator, styles.right]}>
          <Pressable
            accessibilityLabel="Desplazar labels hacia la derecha"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => scrollByViewport(1)}
            style={({ pressed }) => [
              styles.indicatorBubble,
              pressed && styles.indicatorPressed,
            ]}
          >
            <Ionicons color="#ffffff" name="chevron-forward" size={16} />
          </Pressable>
        </View>
      ) : null}
    </ClassNameView>
  );
}

const ClassNameView = View as ComponentType<ViewProps & { className?: string }>;

const styles = StyleSheet.create({
  container: { flexGrow: 0, position: 'relative' },
  content: { alignItems: 'center', gap: 8 },
  indicator: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
  },
  left: { left: 0 },
  right: { right: 0 },
  indicatorBubble: {
    alignItems: 'center',
    backgroundColor: '#4b5563',
    borderRadius: 999,
    height: 28,
    justifyContent: 'center',
    marginHorizontal: 4,
    shadowColor: '#000000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: 28,
  },
  indicatorPressed: { opacity: 0.7, transform: [{ scale: 0.94 }] },
});
