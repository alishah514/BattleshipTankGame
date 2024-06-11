import React from 'react';
import {View, StyleSheet} from 'react-native';

const Blast = ({position}) => {
  return (
    <View
      style={[
        styles.blast,
        {
          left: position.x - 25, // Adjust to center the blast on the position
          top: position.y - 25,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  blast: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    opacity: 0.8,
  },
});

export default Blast;
