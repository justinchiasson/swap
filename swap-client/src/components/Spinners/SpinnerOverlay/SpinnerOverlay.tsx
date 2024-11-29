import { useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import Spinner from '../Spinner/Spinner';

const SpinnerOverlay = ({ visible }: SpinnerOverlayProps) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(visible);
  const opacity = useSharedValue(0);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    overlay: {
      backgroundColor: theme['text-basic-color-transparent'],
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      width: 100,
      borderRadius: 15,
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    toggleVisibility(visible);
  }, [visible]);

  const toggleVisibility = (newVisibility: boolean) => {
    setIsVisible(newVisibility);
    if (!isVisible && newVisibility) {
      opacity.value = withTiming(1, { duration: 200 });
    } else if (isVisible && !newVisibility) {
      opacity.value = withTiming(0, { duration: 200 });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.overlay, animatedStyles]}>
        <Spinner />
      </Animated.View>
    </SafeAreaView>
  );
};

interface SpinnerOverlayProps {
  visible: boolean;
}

export default SpinnerOverlay;
