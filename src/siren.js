import Sound from 'react-native-sound';

Sound.setCategory('Playback');

const siren = new Sound('siren.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log(error);
  }
});

export default siren;
