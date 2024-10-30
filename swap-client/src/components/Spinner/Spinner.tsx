import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Spinner = () => {
  const value = 30;
  return (
    <View>
      <Svg height={60} width={60}>
        <Path d={`M 0 30 A 30 ${value} 0 1 1 60 30 Z`} fill="#EBE6DA" />
        <Path d="M 0 30 A 30 30 0 1 0 60 30 Z" fill="#AFA9A1" />
        <Path d="M 0 30 A 30 15 0 1 1 60 30 Z" fill="#D0CBBE" />
        <Path d="M 0 30 A 30 15 0 1 0 60 30 Z" fill="#FFFEFB" />
        <Path d="M 22 30 A 8 4 0 1 1 38 30 Z" fill="#F28350" />
        <Path d="M 22 30 A 8 4 0 1 0 38 30 Z" fill="#FFAC88" />
      </Svg>
    </View>
  );
};

export default Spinner;
