import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import CommonStyles from '../../Common/CommonStyles';
import {Colors} from '../../constants/Colors';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';

export default function Menu({navigation}) {
  const [menuModal, setMenuModal] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setMenuModal(true);
      return () => {
        // Cleanup logic here if needed
      };
    }, []),
  );

  const openGame = () => {
    setMenuModal(false);
    navigation.navigate('Games');
  };
  const openSettings = () => {
    setMenuModal(false);
    navigation.navigate('Settings');
  };

  return (
    <View style={CommonStyles.container}>
      <ImageBackground
        source={require('../../../Assets/Background/Jungle.jpeg')}
        style={styles.background}
        resizeMode="cover">
        <Modal
          animationType="slide"
          transparent={true}
          visible={menuModal}
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={() => setMenuModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.button} onPress={openGame}>
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={openSettings}>
                <Text style={styles.buttonText}>Settings</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: wp('50%'),
    height: wp('20%'),
    backgroundColor: '#4CAF50', // Green shade background
    borderRadius: wp('3%'),
    justifyContent: 'center',
  },
  button: {
    marginVertical: wp('1%'),
    width: wp('30%'),
    height: wp('6%'),
    backgroundColor: '#388E3C', // Green shade background
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#1B5E20', // Dark green border color
  },
  buttonText: {
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color
    textTransform: 'uppercase', // Convert text to uppercase
  },
});
