import { Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const TextDivider = ({ text, style }: TextWithDividerProps) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    },
    text: {
      fontSize: 16,
      marginHorizontal: 10,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme['text-basic-color'],
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <Text category="s2" style={styles.text}>
        {text}
      </Text>
      <View style={styles.divider} />
    </View>
  );
};

interface TextWithDividerProps {
  /**
   * Text to display
   */
  text: string;
  /**
   * Style passed to the component
   * @default {}
   */
  style?: any;
}

export default TextDivider;
