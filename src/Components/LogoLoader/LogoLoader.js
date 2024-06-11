import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import CommonStyles from '../../Common/CommonStyles';

const LogoLoader = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotationAnimation = Animated.timing(rotation, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      easing: Easing.linear, // Linear easing for smooth rotation
      useNativeDriver: true, // Required for performance
    });

    Animated.loop(rotationAnimation).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={CommonStyles.loader}>
      <View style={CommonStyles.logoContainer}>
        <Animated.Image
          source={require('../../../Assets/Icons/tank.png')}
          style={[CommonStyles.logoContainer, {transform: [{rotate: spin}]}]}
        />
      </View>
    </View>
  );
};

export default LogoLoader;
