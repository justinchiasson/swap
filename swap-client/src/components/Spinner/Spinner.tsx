import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const Spinner = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const ryUpperDisk = useSharedValue(30);
  const ryMiddleDiskUpper = useSharedValue(15);
  const ryMiddleDiskUpperInner = useSharedValue(4);
  const ryMiddleDiskLower = useSharedValue(0.0001);
  const ryMiddleDiskLowerInner = useSharedValue(0.0001);
  const ryLowerDisk = useSharedValue(15);

  useEffect(() => {
    startUpperDisk();
  }, []);

  const startUpperDisk = () => {
    ryUpperDisk.value = withTiming(15, { duration: 1000 }, (finished) => {
      if (finished) {
        ryUpperDisk.value = 30;
        runOnJS(startMiddleDiskUpper)();
        runOnJS(startMiddleDiskUpperInner)();
      }
    });
  };

  const startMiddleDiskUpper = () => {
    ryMiddleDiskUpper.value = withTiming(
      0,
      { duration: 500, easing: Easing.in(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskUpper.value = 15;
          runOnJS(startMiddleDiskLower)();
          runOnJS(startMiddleDiskLowerInner)();
        }
      },
    );
  };

  const startMiddleDiskUpperInner = () => {
    ryMiddleDiskUpperInner.value = withTiming(
      0,
      { duration: 500, easing: Easing.in(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskUpperInner.value = 4;
        }
      },
    );
  };

  const startMiddleDiskLower = () => {
    ryMiddleDiskLower.value = withTiming(
      15,
      { duration: 500, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskLower.value = 0.0001;
          runOnJS(startLowerDisk)();
        }
      },
    );
  };

  const startMiddleDiskLowerInner = () => {
    ryMiddleDiskLowerInner.value = withTiming(
      4,
      { duration: 500, easing: Easing.out(Easing.quad) },
      (finished) => {
        if (finished) {
          ryMiddleDiskLowerInner.value = 0.0001;
        }
      },
    );
  };

  const startLowerDisk = () => {
    ryLowerDisk.value = withTiming(30, { duration: 1000 }, (finished) => {
      if (finished) {
        ryLowerDisk.value = 15;
        runOnJS(startUpperDisk)();
      }
    });
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
      -ryMiddleDiskUpper.value,
      [-15, 15],
      ['#D0CBBE', '#FFFEFB'],
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
      -ryMiddleDiskUpperInner.value,
      [-4, 4],
      ['#F28350', '#FFAC88'],
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

  const animatedLowerDiskProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryLowerDisk.value} 0 1 0 60 30
      Z
    `;
    const fill = interpolateColor(
      ryLowerDisk.value,
      [15, 30],
      ['#454544', '#AFA9A1'],
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
