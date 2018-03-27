import React from 'react';
import {
  WebView,
  View,
  Dimensions
} from 'react-native';

const screenDims = Dimensions.get('window');

const dims = {
  width: 0.7 * screenDims.width,
  height: 0.7 * screenDims.height,
};

const YouTube = ({ video }) => (
  <View style={{ height: dims.height }}>
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${video}?rel=0&autoplay=0&showinfo=0&controls=0` }}
      javascriptEnabled
      scalesPageToFit
      style={dims}
    />
  </View>
);

YouTube.videos = {
  stayingAlive: 'KnwxN24E2yY'
};

export default YouTube;
