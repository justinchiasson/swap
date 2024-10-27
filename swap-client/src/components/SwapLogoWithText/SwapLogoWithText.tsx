import { Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import SwapLogo from '../SwapLogo/SwapLogo';

const SwapLogoWithText = () => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '30%',
    },
    text: {
      fontSize: 48,
      marginLeft: 10,
      marginBottom: 10,
    },
  });

  return (
    <View style={styles.container}>
      <SwapLogo />
      <Text category="h1" style={styles.text}>
        swap
      </Text>
    </View>
  );
};

export default SwapLogoWithText;
