import React from 'react';
import {View, Image} from 'react-native';

const Tank = props => {
  const width = props.size.width;
  const height = props.size.height;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  const scaleX = props.scaleX || 1;

  // Choose the appropriate image based on the tank's scaleX
  const tankImage =
    scaleX === 1
      ? require('../../../Assets/Icons/tank.png')
      : require('../../../Assets/Icons/tank-right.png');

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={tankImage}
        style={{width: width, height: height}}
        resizeMode="contain"
      />
    </View>
  );
};

export default Tank;
