import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import Sound from 'react-native-sound';
import {useSelector} from 'react-redux';

const MusicPlayer = () => {
  const isPlaying = useSelector(state => state.music.isPlaying);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const newSound = new Sound('music.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      if (isPlaying && AppState.currentState === 'active') {
        newSound.play();
      }
    });
    setSound(newSound);

    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active' && isPlaying) {
        newSound.play();
      } else {
        newSound.pause();
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      if (subscription) {
        subscription.remove();
      }
      if (newSound) {
        newSound.stop();
        newSound.release();
      }
    };
  }, []);

  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        sound.play(success => {
          if (!success) {
            console.log('Sound did not play successfully');
          }
        });
      } else {
        sound.pause();
      }
    }
  }, [isPlaying, sound]);

  return null;
};

export default MusicPlayer;
