import React from 'react';
import {
  WebView,
  View,
  Dimensions
} from 'react-native';

const screenDims = Dimensions.get('window');

const YouTube = ({ video }) => (
  <View style={{ height: screenDims.height }}>
    <WebView
      source={{ uri: `https://www.youtube.com/embed/${video}?rel=0&autoplay=0&showinfo=0&controls=0&enablejsapi=1` }}
      javascriptEnabled
      scalesPageToFit
      style={{ width:
        screenDims.width,
        height: screenDims.height
      }}
    />
  </View>
);

YouTube.videos = {
  stayingAlive: 'KnwxN24E2yY'
};

export default YouTube;
