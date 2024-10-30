import { Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const TextButton = ({
  text,
  onPress,
  appearance = 'dark',
  style = {},
  enabled = true,
}: TextButtonProps) => {
  const theme = useTheme();

  // Set background colour based on appearance and enabled
  let backgroundColor;
  if (appearance === 'light') {
    backgroundColor = enabled
      ? theme['color-primary-500']
      : theme['color-primary-300'];
  } else {
    backgroundColor = enabled
      ? theme['color-info-500']
      : theme['color-info-300'];
  }

  const styles = StyleSheet.create({
    card: {
      backgroundColor,
      borderRadius: 7,
      marginBottom: 8,
      width: '33%',
      height: 50,
      justifyContent: 'center',
      ...style,
    },
    text: {
      color:
        appearance === 'light'
          ? theme['text-basic-color']
          : theme['color-basic-500'],
      textAlign: 'center',
      marginTop: appearance === 'light' ? 0 : -1,
    },
  });

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress()}
      activeOpacity={0.75}
      disabled={!enabled}
    >
      <Text category="s2" style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

interface TextButtonProps {
  /**
   * Text to display
   */
  text: string;
  /**
   * Function to call on press
   */
  onPress: () => void;
  /**
   * Card is light or dark
   * @default 'dark'
   */
  appearance?: 'light' | 'dark';
  /**
   * Style passed to the component
   * @default {}
   */
  style?: any;
  /**
   * If the button is enabled
   * @default true
   */
  enabled?: boolean;
}

export default TextButton;
