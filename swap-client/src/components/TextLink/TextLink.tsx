import { Text } from '@ui-kitten/components';
import React from 'react';

const TextLink = ({ text, onPress, style }: TextLinkProps) => {
  return (
    <Text category="s1" style={style} onPress={() => onPress()}>
      {text}
    </Text>
  );
};

interface TextLinkProps {
  /**
   * Text to display
   */
  text: string;
  /**
   * Function to call on press
   */
  onPress: () => void;
  /**
   * Style passed to the component
   * @default {}
   */
  style?: any;
}

export default TextLink;
