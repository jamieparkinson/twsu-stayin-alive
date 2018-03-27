import React from 'react';
import {
  WebView,
  Dimensions
} from 'react-native';

const screenDims = Dimensions.get('window');

const webViewStyle = {
  width: 0.7 * screenDims.width,
  height: 0.7 * screenDims.height,
};

const YouTube = ({ video = '3Mj1h2j9-g0' }) => (
  <WebView
    source={{ uri: `https://www.youtube.com/embed/${video}?rel=0&autoplay=0&showinfo=0&controls=0` }}
    javascriptEnabled
    scalesPageToFit
    style={webViewStyle}
  />
);

export default YouTube;
