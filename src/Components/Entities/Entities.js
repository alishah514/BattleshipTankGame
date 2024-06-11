import Matter from 'matter-js';
import React from 'react';
import Tank from './Tank';
import Projectile from './Projectile';
import Blast from './Blast';

const createTank = (world, label, pos, size, color, scaleX = 1) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: label,
    isStatic: false,
    render: {
      fillStyle: color,
    },
  });

  // Flip tank horizontally if scaleX is -1
  if (scaleX === -1) {
    Matter.Body.scale(body, -1, 1);
  }

  Matter.World.add(world, [body]);

  return {
    body,
    size,
    color,
    scaleX,
    renderer: <Tank scaleX={scaleX} />, // Pass scaleX to the Tank component
  };
};

const createProjectile = (world, label, pos, size, velocity, type) => {
  const body = Matter.Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: label,
    isStatic: false,
    render: {
      fillStyle: type === 'bullet' ? 'black' : 'red', // Adjust fillStyle based on type
    },
  });
  Matter.Body.setVelocity(body, velocity);
  Matter.World.add(world, [body]);

  return {
    body,
    size,
    type, // Add type property to specify the type of projectile
    renderer: <Projectile />, // This should use the Projectile component
  };
};

const createBlast = position => {
  return {
    id: `blast_${Date.now()}`,
    type: 'blast',
    position: position,
    renderer: <Blast position={position} />, // Create a Blast component for rendering
  };
};

export {createTank, createProjectile, createBlast};
