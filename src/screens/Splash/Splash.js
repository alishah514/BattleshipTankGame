import {SafeAreaView, ImageBackground, View, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CommonStyles from '../../Common/CommonStyles';
import LogoLoader from '../../Components/LogoLoader/LogoLoader';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';

export default function Splash() {
  const navigation = useNavigation();
  const isPlaying = useSelector(state => state.music.isPlaying);

  console.log('isPlaying:', isPlaying);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Menu');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const getImageSource = () => {
    if (Platform.OS === 'ios') {
      return require('../../../Assets/Background/Jungle.jpg');
    } else {
      return require('../../../Assets/Background/Jungle.jpeg');
    }
  };

  return (
    <View style={CommonStyles.container}>
      <LogoLoader />
      <ImageBackground
        source={getImageSource()}
        style={CommonStyles.container}
        resizeMode="cover"
      />
      {isPlaying && <MusicPlayer />}
    </View>
  );
}
