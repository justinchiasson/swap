import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const Spinner = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const ryMiddleDiskUpper = useSharedValue(15);
  const colorMiddleDiskUpper = useSharedValue(0);
  const ryMiddleDiskUpperInner = useSharedValue(4);
  const ryMiddleDiskLower = useSharedValue(0.0001);
  const ryMiddleDiskLowerInner = useSharedValue(0.0001);

  useEffect(() => {
    startMiddleDiskUpper();
    startMiddleDiskUpperInner();
    startMiddleDiskUpperColor();
  }, []);

  const startMiddleDiskUpper = () => {
    ryMiddleDiskUpper.value = withSequence(
      withTiming(30, { duration: 500 }),
      withTiming(
        0.0001,
        { duration: 500, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskLower)();
            runOnJS(startMiddleDiskLowerInner)();
          }
        },
      ),
    );
  };

  const startMiddleDiskUpperColor = () => {
    colorMiddleDiskUpper.value = withSequence(
      withTiming(15, { duration: 500 }),
      withTiming(45, { duration: 500, easing: Easing.in(Easing.quad) }),
    );
  };

  const startMiddleDiskUpperInner = () => {
    ryMiddleDiskUpperInner.value = withSequence(
      withTiming(8, { duration: 500 }),
      withTiming(
        0.0001,
        { duration: 500, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
          }
        },
      ),
    );
  };

  const startMiddleDiskLower = () => {
    ryMiddleDiskUpper.value = 15;
    ryMiddleDiskUpperInner.value = 4;
    colorMiddleDiskUpper.value = 0;
    ryMiddleDiskLower.value = withTiming(
      15,
      { duration: 250, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskLower.value = 0.0001;
          runOnJS(startMiddleDiskUpper)();
          runOnJS(startMiddleDiskUpperInner)();
          runOnJS(startMiddleDiskUpperColor)();
        }
      },
    );
  };

  const startMiddleDiskLowerInner = () => {
    ryMiddleDiskLowerInner.value = withTiming(
      4,
      { duration: 250, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskLowerInner.value = 0.0001;
        }
      },
    );
  };

  const animatedMiddleDiskUpperProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryMiddleDiskUpper.value} 0 1 1 60 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 45],
      ['#D0CBBE', '#7f7a74'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskUpperInnerProps = useAnimatedProps(() => {
    const d = `
      M 22 30
      A 8 ${ryMiddleDiskUpperInner.value} 0 1 1 38 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 45],
      ['#F28350', '#96573c'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskLowerProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryMiddleDiskLower.value} 0 1 0 60 30
      Z
    `;
    const fill = interpolateColor(
      ryMiddleDiskLower.value,
      [-15, 15],
      ['#D0CBBE', '#FFFEFB'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskLowerInnerProps = useAnimatedProps(() => {
    const d = `
      M 22 30
      A 8 ${ryMiddleDiskLowerInner.value} 0 1 0 38 30
      Z
    `;
    const fill = interpolateColor(
      ryMiddleDiskLowerInner.value,
      [-4, 4],
      ['#F28350', '#FFAC88'],
    );
    return { d, fill };
  });

  return (
    <View>
      <Svg height={60} width={60}>
        <Path d="M 0 30 A 30 30 0 1 1 60 30 Z" fill="#EBE6DA" />
        <AnimatedPath d="M 0 30 A 30 30 0 1 0 60 30 Z" fill="#AFA9A1" />
        <Path d="M 0 30 A 30 15 0 1 1 60 30 Z" fill="#D0CBBE" />
        <Path d="M 0 30 A 30 15 0 1 0 60 30 Z" fill="#FFFEFB" />
        <Path d="M 22 30 A 8 4 0 1 1 38 30 Z" fill="#F28350" />
        <Path d="M 22 30 A 8 4 0 1 0 38 30 Z" fill="#FFAC88" />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperInnerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerInnerProps} />
      </Svg>
    </View>
  );
};

export default Spinner;
