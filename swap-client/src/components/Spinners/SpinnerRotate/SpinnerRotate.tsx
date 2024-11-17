import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const SpinnerRotate = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const ryUpperDisk = useSharedValue(30);
  const ryMiddleDiskUpper = useSharedValue(0.0001);
  const colorMiddleDiskUpper = useSharedValue(0);
  const ryMiddleDiskUpperInner = useSharedValue(0.0001);
  const ryMiddleDiskLower = useSharedValue(0.0001);
  const ryMiddleDiskLowerInner = useSharedValue(0.0001);
  const ryLowerDisk = useSharedValue(0.0001);

  useEffect(() => {
    startMiddleDiskUpper();
    startMiddleDiskUpperInner();
    startMiddleDiskUpperColor();
    startLowerDisk();
    startMiddleDiskLowerInner();
  }, []);

  const startMiddleDiskUpper = () => {
    ryMiddleDiskUpper.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(0.0001, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
    );
  };

  const startMiddleDiskUpperColor = () => {
    colorMiddleDiskUpper.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(30, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
    );
  };

  const startMiddleDiskUpperInner = () => {
    ryMiddleDiskUpperInner.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(0.0001, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
    );
  };

  const startMiddleDiskLowerInner = () => {
    ryMiddleDiskLowerInner.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(0.0001, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
    );
  };

  const startLowerDisk = () => {
    ryLowerDisk.value = withRepeat(
      withSequence(
        withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(0.0001, { duration: 700, easing: Easing.in(Easing.quad) }),
      ),
      -1,
    );
  };

  const animatedUpperDiskProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryUpperDisk.value} 0 1 1 60 30
      Z
    `;
    const fill = interpolateColor(
      -ryUpperDisk.value,
      [-30, -15],
      ['#EBE6DA', '#D0CBBE'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskUpperProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryMiddleDiskUpper.value} 0 1 1 60 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#EBE6DA', '#7f7a74'],
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
      [0, 30],
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
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#F28350', '#FFAC88'],
    );
    return { d, fill };
  });

  const animatedLowerDiskProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryLowerDisk.value} 0 1 0 60 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#FFFEFB', '#e0dac8'],
    );
    return { d, fill };
  });

  return (
    <View>
      <Svg height={60} width={60}>
        <Path d="M 0 30 A 30 30 0 1 1 60 30 Z" fill="#EBE6DA" />
        <AnimatedPath animatedProps={animatedUpperDiskProps} />
        <AnimatedPath d="M 0 30 A 30 30 0 1 0 60 30 Z" fill="#AFA9A1" />
        <AnimatedPath animatedProps={animatedLowerDiskProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperInnerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerInnerProps} />
      </Svg>
    </View>
  );
};

export default SpinnerRotate;
