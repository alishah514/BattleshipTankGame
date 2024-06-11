import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';
import CommonStyles from '../../Common/CommonStyles';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {playMusic, stopMusic} from '../../redux/musicSlice';
import {Colors} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Settings({navigation}) {
  const [menuModal, setMenuModal] = useState(false);
  const isPlaying = useSelector(state => state.music.isPlaying);
  const dispatch = useDispatch();

  const toggleMusic = () => {
    if (isPlaying) {
      console.log('stopMusic');
      dispatch(stopMusic());
    } else {
      dispatch(playMusic());
    }
  };

  useEffect(() => {
    setMenuModal(true);
  }, []);

  const goBack = () => {
    setMenuModal(false);
    navigation.goBack();
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
              <TouchableOpacity
                onPress={goBack}
                style={{position: 'absolute', top: 10, left: 10}}>
                <AntDesign
                  name={'left'}
                  color={Colors.blackColor}
                  size={wp('4%')}
                />
              </TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Turn Music</Text>
                <Switch value={isPlaying} onValueChange={toggleMusic} />
              </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('2%'),
  },
  buttonText: {
    fontSize: wp('2.5%'),
    fontWeight: 'bold',
    color: '#FFFFFF', // Text color
    textTransform: 'uppercase', // Convert text to uppercase
  },
});
