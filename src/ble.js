import { BleManager } from 'react-native-ble-plx';

const createManager = () => {
  let manager = null;
  let device = null;

  return {
    init: () => {
      manager = new BleManager();

      return new Promise((resolve) => {
        const subscription = manager.onStateChange((state) => {
          if (state === 'PoweredOn') {
            console.log('[BLE] initialised BLE manager');

            subscription.remove();
            resolve();
          }
        }, true);
      });
    },
    connect: async (deviceName) => {
      return new Promise((resolve, reject) => {
        manager.startDeviceScan(null, null, async (error, scannedDevice) => {
          if (error) {
            reject(error);
          }

          console.log(`[BLE]: Found device '${scannedDevice.name}'`);
          if (scannedDevice.name === deviceName) {
            manager.stopDeviceScan();

            const connectedDevice = await scannedDevice.connect();
            device = await connectedDevice.discoverAllServicesAndCharacteristics();

            resolve(device);
          }
        })
      });
    },
    destroy: async () => {
      if (device) {
        await device.cancelConnection();
      }
      if (manager) {
        manager.destroy();
      }
    }
  };
};

export default createManager;
