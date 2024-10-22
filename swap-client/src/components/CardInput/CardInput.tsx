import { Card, Input, Text, useTheme } from '@ui-kitten/components';
import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

const CardInput = ({
  label,
  onChangeText,
  value,
  placeholder,
  secureTextEntry,
  autoCapitalize,
}: CardInputProps) => {
  const theme = useTheme();
  const inputRef = useRef<Input | null>(null);
  const [focused, setFocused] = React.useState(inputRef.current?.isFocused());

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme['text-basic-color'],
      borderRadius: 10,
      marginBottom: 15,
      overflow: 'visible',
      width: '75%',
    },
    focusedCard: {
      backgroundColor: theme['text-basic-color'],
      borderRadius: 10,
      marginBottom: 15,
      shadowColor: theme['text-primary-color'],
      shadowOffset: {
        width: 2,
        height: 8,
      },
      shadowOpacity: 0.3,
      shadowRadius: 9,
      elevation: 5,
      overflow: 'visible',
      width: '75%',
    },
    input: {
      backgroundColor: theme['text-basic-color'],
      borderWidth: 0,
      marginHorizontal: -20,
      marginBottom: -10,
      marginTop: -7,
      color: theme['color-basic-500'],
    },
    inputText: {
      color: theme['text-primary-color'],
      fontFamily: 'PublicSans_400Regular',
    },
    label: {
      color: theme['color-basic-500'],
      marginBottom: 5,
      marginTop: -5,
      marginLeft: -10,
    },
  });

  const onCardFocus = () => {
    inputRef.current?.focus();
    setFocused(true);
  };

  const onInputFocus = () => {
    setFocused(true);
  };

  const onInputBlur = () => {
    setFocused(false);
  };

  return (
    <Card
      appearance="filled"
      style={focused ? styles.focusedCard : styles.card}
      onPress={() => onCardFocus()}
    >
      <Text category="h6" style={styles.label}>
        {label}
      </Text>
      <Input
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        style={styles.input}
        textStyle={styles.inputText}
        ref={inputRef}
        selectionColor={theme['color-primary-500']}
        onFocus={() => onInputFocus()}
        onBlur={() => onInputBlur()}
      />
    </Card>
  );
};

interface CardInputProps {
  /**
   * Label for the Input
   */
  label: string;
  /**
   * Function to set the value
   */
  onChangeText: (text: string) => void;
  /**
   * Value of the Input
   */
  value: string;
  /**
   * Placeholder for the Input
   */
  placeholder?: string;
  /**
   * Secure Text Entry
   */
  secureTextEntry?: boolean;
  /**
   * Auto Capitalize
   */
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default CardInput;
