import Matter from 'matter-js';
import {createProjectile, createBlast} from '../Entities/Entities';

const Physics = (entities, {time, dispatch}) => {
  let engine = entities['physics'].engine;
  engine.world.gravity.y = 0; // Disable gravity
  Matter.Engine.update(engine, time.delta);

  // Detect collisions
  Matter.Events.on(engine, 'collisionStart', event => {
    const pairs = event.pairs;

    pairs.forEach(pair => {
      const {bodyA, bodyB} = pair;
      const entityA = entities[bodyA.label];
      const entityB = entities[bodyB.label];

      if (entityA && entityB) {
        if (
          (entityA.type === 'projectile' && entityB.type === 'tank') ||
          (entityB.type === 'projectile' && entityA.type === 'tank')
        ) {
          // Handle collision
          const tank = entityA.type === 'tank' ? entityA : entityB;
          const projectile = entityA.type === 'projectile' ? entityA : entityB;

          // Add blast animation
          const blast = createBlast(tank.body.position);
          entities[`blast_${Date.now()}`] = blast;

          // Remove projectile
          Matter.World.remove(engine.world, projectile.body);
          delete entities[projectile.body.label];

          // Set timeout to remove blast animation
          setTimeout(() => {
            delete entities[blast.id];
          }, 500); // Adjust blast duration as needed
        }
      }
    });
  });

  return entities;
};

const MoveTank = (entities, {time, direction}) => {
  const moveSpeed = 10; // Speed at which the tank moves

  if (direction?.tank1) {
    let tank1 = entities['tank1'];
    console.log(`Moving tank1 ${direction?.tank1}`);

    if (direction?.tank1 === 'left') {
      Matter.Body.translate(tank1.body, {x: -moveSpeed, y: 0});
    } else if (direction?.tank1 === 'right') {
      Matter.Body.translate(tank1.body, {x: moveSpeed, y: 0});
    } else if (direction?.tank1 === 'fire') {
      console.log('Tank1 is firing');
      entities = FireTank1(entities, tank1);
    }

    console.log(
      `tank1 position: ${tank1.body.position.x}, ${tank1.body.position.y}`,
    );
  }

  if (direction?.tank2) {
    let tank2 = entities['tank2'];
    console.log(`Moving tank2 ${direction?.tank2}`);

    if (direction?.tank2 === 'left') {
      Matter.Body.translate(tank2.body, {x: -moveSpeed, y: 0});
    } else if (direction?.tank2 === 'right') {
      Matter.Body.translate(tank2.body, {x: moveSpeed, y: 0});
    } else if (direction?.tank2 === 'fire') {
      console.log('Tank2 is firing');
      entities = FireTank2(entities, tank2);
    }

    console.log(
      `tank2 position: ${tank2.body.position.x}, ${tank2.body.position.y}`,
    );
  }

  return entities;
};

const FireTank1 = (entities, tank1) => {
  const projectile = createProjectile(
    entities['physics'].world,
    'projectile',
    {x: tank1.body.position.x + 50, y: tank1.body.position.y},
    {width: 10, height: 10},
    {x: 10, y: 0},
    'bullet', // Specify the type of projectile (e.g., bullet or bomb)
  );

  return {...entities, [`projectile_${Date.now()}`]: projectile};
};

const FireTank2 = (entities, tank2) => {
  const projectile = createProjectile(
    entities['physics'].world,
    'projectile',
    {x: tank2.body.position.x - 50, y: tank2.body.position.y}, // Adjusted starting position
    {width: 10, height: 10},
    {x: -10, y: 0}, // Velocity set to move left
    'bullet', // Specify the type of projectile (e.g., bullet or bomb)
  );

  return {...entities, [`projectile_${Date.now()}`]: projectile};
};

export {Physics, MoveTank};
