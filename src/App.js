import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import YouTube from "./YouTube";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class App extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <YouTube />
      </View>
    );
  }
}

export default App;
