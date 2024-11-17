import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const SpinnerRotateColors = () => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const ryUpperDisk = useSharedValue(30);
  const ryMiddleDiskUpper = useSharedValue(0.0001);
  const ryMiddleDiskUpperLight = useSharedValue(0.0001);
  const colorMiddleDiskUpper = useSharedValue(0);
  const ryMiddleDiskUpperInner = useSharedValue(0.0001);
  const ryMiddleDiskUpperInnerLight = useSharedValue(0.0001);
  const ryMiddleDiskLower = useSharedValue(0.0001);
  const ryMiddleDiskLowerInner = useSharedValue(0.0001);
  const ryMiddleDiskLowerInnerDark = useSharedValue(0.0001);
  const ryLowerDisk = useSharedValue(0.0001);
  const ryLowerDiskDark = useSharedValue(0.0001);

  useEffect(() => {
    startMiddleDiskUpper();
    startMiddleDiskUpperInner();
    startMiddleDiskUpperColor();
    startLowerDisk();
    startMiddleDiskLowerInner();
  }, []);

  const startMiddleDiskUpper = () => {
    ryMiddleDiskUpper.value = withSequence(
      withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskUpperLight)();
          }
        },
      ),
    );
  };

  const startMiddleDiskUpperLight = () => {
    ryMiddleDiskUpperLight.value = withSequence(
      withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskUpper)();
          }
        },
      ),
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
    ryMiddleDiskUpperInner.value = withSequence(
      withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskUpperInnerLight)();
          }
        },
      ),
    );
  };

  const startMiddleDiskUpperInnerLight = () => {
    ryMiddleDiskUpperInnerLight.value = withSequence(
      withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskUpperInner)();
          }
        },
      ),
    );
  };

  const startMiddleDiskLowerInner = () => {
    ryMiddleDiskLowerInner.value = withSequence(
      withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskLowerInnerDark)();
          }
        },
      ),
    );
  };

  const startMiddleDiskLowerInnerDark = () => {
    ryMiddleDiskLowerInnerDark.value = withSequence(
      withTiming(8, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startMiddleDiskLowerInner)();
          }
        },
      ),
    );
  };

  const startLowerDisk = () => {
    ryLowerDisk.value = withSequence(
      withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startLowerDiskDark)();
          }
        },
      ),
    );
  };

  const startLowerDiskDark = () => {
    ryLowerDiskDark.value = withSequence(
      withTiming(30, { duration: 700, easing: Easing.out(Easing.quad) }),
      withTiming(
        0.0001,
        { duration: 700, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) {
            runOnJS(startLowerDisk)();
          }
        },
      ),
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
      ['#EBE6DA', '#aaa497'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskUpperLightProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryMiddleDiskUpperLight.value} 0 1 1 60 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#FFFEFB', '#e0dac8'],
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
      ['#FFAC88', '#c76233'],
    );
    return { d, fill };
  });

  const animatedMiddleDiskUpperInnerLightProps = useAnimatedProps(() => {
    const d = `
      M 22 30
      A 8 ${ryMiddleDiskUpperInnerLight.value} 0 1 1 38 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#FFAC88', '#F28350'],
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

  const animatedMiddleDiskLowerInnerDarkProps = useAnimatedProps(() => {
    const d = `
      M 22 30
      A 8 ${ryMiddleDiskLowerInnerDark.value} 0 1 0 38 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#FFAC88', '#c76233'],
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

  const animatedLowerDiskDarkProps = useAnimatedProps(() => {
    const d = `
      M 0 30
      A 30 ${ryLowerDiskDark.value} 0 1 0 60 30
      Z
    `;
    const fill = interpolateColor(
      colorMiddleDiskUpper.value,
      [0, 30],
      ['#EBE6DA', '#7f7a74'],
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
        <AnimatedPath animatedProps={animatedMiddleDiskUpperLightProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperInnerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskUpperInnerLightProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerProps} />
        <AnimatedPath animatedProps={animatedLowerDiskDarkProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerInnerProps} />
        <AnimatedPath animatedProps={animatedMiddleDiskLowerInnerDarkProps} />
      </Svg>
    </View>
  );
};

export default SpinnerRotateColors;
