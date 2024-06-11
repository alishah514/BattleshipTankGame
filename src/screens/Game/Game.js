import React, {useState, useEffect} from 'react';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createTank} from '../../Components/Entities/Entities';
import {MoveTank, Physics} from '../../Components/Systems/Systems';
import CommonStyles from '../../Common/CommonStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../constants/Colors';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Game() {
  const engine = Matter.Engine.create({enableSleeping: false});
  const world = engine.world;

  const [focusedTank, setFocusedTank] = useState('tank1'); // Initially focus on tank1
  const [direction, setDirection] = useState(null);
  const [canFire, setCanFire] = useState(true); // Control firing cooldown

  useEffect(() => {
    const interval = setInterval(() => {
      setCanFire(true); // Reset firing cooldown after a certain period
    }, 1000); // Adjust cooldown period as needed

    return () => clearInterval(interval);
  }, []);

  const tank1 = createTank(
    world,
    'tank1',
    {x: 200, y: 300},
    {width: 100, height: 100},
    'blue', // Tank color
  );
  const tank2 = createTank(
    world,
    'tank2',
    {x: 500, y: 300},
    {width: 100, height: 100},
    'red', // Tank color
    -1,
  );

  const handleMove = dir => {
    setDirection(dir);
  };

  const handleFire = () => {
    if (canFire) {
      setCanFire(false);
      setDirection('fire');
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCanFire(true);
      setDirection(null);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleRelease = () => {
    setDirection(null);
  };

  const handleTankPress = tankId => {
    setFocusedTank(tankId);
  };

  return (
    <View style={CommonStyles.container}>
      <ImageBackground
        source={require('../../../Assets/Background/Jungle.jpeg')}
        style={styles.background}
        resizeMode="cover">
        <GameEngine
          style={styles.container}
          systems={[
            Physics,
            (entities, {time}) =>
              MoveTank(entities, {
                time,
                direction: {[focusedTank]: direction},
              }),
          ]}
          entities={{
            physics: {engine: engine, world: world},
            tank1: tank1,
            tank2: tank2,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: wp('5%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: wp('70%'),
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={[
              styles.iconView,
              {
                backgroundColor:
                  focusedTank === 'tank1' ? Colors.redColor : Colors.whiteColor,
              },
            ]}
            onPress={() => handleTankPress('tank1')}>
            <Text>Tank 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.iconView,
              {
                backgroundColor:
                  focusedTank === 'tank2' ? Colors.redColor : Colors.whiteColor,
              },
            ]}
            onPress={() => handleTankPress('tank2')}>
            <Text>Tank 2</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => handleMove('left')}
            onPressOut={handleRelease}>
            <AntDesign
              name={'leftcircle'}
              color={Colors.blackColor}
              size={wp('5%')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => handleMove('right')}
            onPressOut={handleRelease}>
            <AntDesign
              name={'rightcircle'}
              color={Colors.blackColor}
              size={wp('5%')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.fireButton}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'yellow'}]}
            onPress={handleFire}>
            <Text style={styles.buttonText}>Fire</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  fireButton: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls2: {
    position: 'absolute',
    right: 10,
    bottom: 100,
    flexDirection: 'row',
  },
  button2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconView: {
    width: wp('30%'),
    height: wp('5%'),
    borderColor: Colors.blackColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
