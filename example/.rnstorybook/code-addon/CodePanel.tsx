import { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { STORY_ARGS_UPDATED } from 'storybook/internal/core-events';
import type { API } from 'storybook/manager-api';

type CodePanelProps = {
  active: boolean;
  api: API;
};

type ArgsUpdated = {
  storyId: string;
  args: Record<string, unknown>;
};

function isSerializable(value: unknown): boolean {
  if (value === null) {
    return true;
  }

  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(isSerializable);
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return (
      !('$$typeof' in record) && Object.values(record).every(isSerializable)
    );
  }

  return false;
}

function serializeProp(name: string, value: unknown): string | undefined {
  if (typeof value === 'function') {
    if (name === 'onNoteAdded') {
      return `${name}={(note) => console.log('Nota agregada', note)}`;
    }

    return `${name}={() => {}}`;
  }

  if (!isSerializable(value)) {
    return undefined;
  }

  if (typeof value === 'string') {
    return `${name}=${JSON.stringify(value)}`;
  }

  if (value === true) {
    return name;
  }

  return `${name}={${JSON.stringify(value)}}`;
}

function createCode(
  componentName: string,
  args: Record<string, unknown>,
  callbacks: Record<string, string>
) {
  const children =
    typeof args.children === 'string' ? args.children : undefined;
  const props = Object.entries(args)
    .filter(([name]) => name !== 'children')
    .map(([name, value]) => serializeProp(name, value))
    .filter((value): value is string => Boolean(value));

  if (componentName === 'AddNote' && !('onNoteAdded' in args)) {
    props.push("onNoteAdded={(note) => console.log('Nota agregada', note)}");
  }

  for (const [name, callback] of Object.entries(callbacks)) {
    if (!(name in args)) {
      props.push(`${name}={${callback}}`);
    }
  }

  const propsCode = props.length > 0 ? `\n  ${props.join('\n  ')}\n` : '';

  if (children) {
    return `<${componentName}${propsCode}>\n  ${children}\n</${componentName}>`;
  }

  return `<${componentName}${propsCode}/>`;
}

export function CodePanel({ active, api }: CodePanelProps) {
  const store = api.store();
  const storyId = store.getSelection()?.storyId;
  const story = storyId ? store.fromId(storyId) : undefined;
  const [args, setArgs] = useState<Record<string, unknown>>(
    () => story?.args ?? {}
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setArgs(story?.args ?? {});
    setCopied(false);

    const handleArgsUpdated = (event: ArgsUpdated) => {
      if (event.storyId === storyId) {
        setArgs(event.args);
        setCopied(false);
      }
    };

    store._channel.on(STORY_ARGS_UPDATED, handleArgsUpdated);
    return () => store._channel.off(STORY_ARGS_UPDATED, handleArgsUpdated);
  }, [store, story?.args, storyId]);

  const componentName = story?.title?.split('/').at(-1) ?? 'Component';
  const codeParameters = story?.parameters?.code as
    { callbacks?: Record<string, string> } | undefined;
  const code = createCode(componentName, args, codeParameters?.callbacks ?? {});

  const copyCode = async () => {
    await Clipboard.setStringAsync(code);
    setCopied(true);
  };

  if (!active) {
    return null;
  }

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>Código para usar</Text>
        <Pressable
          accessibilityLabel="Copiar código del componente"
          accessibilityRole="button"
          onPress={copyCode}
          style={({ pressed }) => [
            styles.copyButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.copyButtonText}>
            {copied ? 'Copiado' : 'Copiar'}
          </Text>
        </Pressable>
      </View>

      <ScrollView horizontal style={styles.codeContainer}>
        <Text selectable style={styles.code}>
          {code}
        </Text>
      </ScrollView>

      <Text style={styles.hint}>
        Las funciones se exportan como ejemplos editables. Los elementos React
        personalizados no se incluyen automáticamente.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: '#111827',
    flex: 1,
    gap: 12,
    padding: 16,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: { color: '#ffffff', fontSize: 15, fontWeight: '600' },
  copyButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  pressed: { opacity: 0.7 },
  copyButtonText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  codeContainer: {
    backgroundColor: '#030712',
    borderRadius: 8,
    padding: 12,
  },
  code: {
    color: '#d1fae5',
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  hint: { color: '#9ca3af', fontSize: 12, lineHeight: 17 },
});
