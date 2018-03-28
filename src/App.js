import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import YouTube from "./YouTube";
import createBleManager from './ble';
import siren from './siren';

import warning from './warning.png';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning: {
    flex: 1,
    backgroundColor: '#FF5550'
  },
  warningImage: {
    flex: 1
  }
});

const ble = createBleManager();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connected: false,
      alert: false
    };
  }

  handleNotification(time) {
    const nTime = parseInt(time);
    if (isNaN(nTime)) {
      return;
    }

    if (nTime <= 2) {
      this.setState({ alert: true })
    }

    if (this.state.alert && nTime >= 7) {
      this.setState({ alert: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.alert && this.state.alert) {
      siren.play();
    }

    if (prevState.alert && !this.state.alert) {
      siren.stop();
    }
  }

  async componentDidMount() {
    await ble.init();
    await ble.connect();

    this.setState({ connected: true });

    ble.listen(this.handleNotification.bind(this));
  }

  componentWillUnmount() {
    siren.release();
    ble.destroy();
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.state.alert ? (
          <View style={styles.warning}>
            <Image
              source={warning}
              style={styles.warningImage}
            />
          </View>
        ) : (
          <YouTube video={YouTube.videos.stayingAlive} />
        )}
      </View>
    );
  }
}

export default App;
