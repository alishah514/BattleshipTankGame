// src/Components/Entities/Projectile.js
import React from 'react';
import {View} from 'react-native';

const Projectile = props => {
  const width = 10; // Set a fixed width for the bullet or bomb
  const height = props.size.height;
  const x = props.body.position.x - width / 2;
  const y = props.body.position.y - height / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: width,
        height: height,
        backgroundColor: 'black', // Adjust color as needed
        borderRadius: 5, // Optional: Add border radius for a rounded appearance
      }}
    />
  );
};

export default Projectile;
