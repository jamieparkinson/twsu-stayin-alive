import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import YouTube from "./YouTube";
import createBleManager from './ble';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const ble = createBleManager();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false
    };
  }

  async componentDidMount() {
    await ble.init();
    await ble.connect();

    this.setState({ connected: true });
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <Text>
          {this.state.connected ? 'Bluetooth Connected': 'Connecting to bluetooth device...'}
        </Text>
        <YouTube video={YouTube.videos.stayingAlive} />
      </View>
    );
  }
}

export default App;
