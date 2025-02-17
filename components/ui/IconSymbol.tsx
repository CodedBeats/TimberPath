import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Mapping SF Symbols to MaterialIcons
const MAPPING: Record<string, React.ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'tag.fill': 'tag',
  "camera.fill": "camera",
  "star.fill": "star",
  "book.fill": "book",
}

export type IconSymbolName = keyof typeof MAPPING

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  // if provided name not mapped use fallback icon ('help-outline') instead
  const iconName = MAPPING[name] ?? "help-outline"

  return <MaterialIcons color={color} size={size} name={iconName} style={style as StyleProp<TextStyle>} />
}