import { Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const TextButton = ({ text, onPress, appearance, style }: TextButtonProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor:
        appearance === 'light'
          ? theme['color-primary-500']
          : theme['color-info-500'],
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
}

export default TextButton;
