import { BleManager } from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const BLE_CONFIG = {
  SERVICE_UUID: '6e400001-b5a3-f393-e0a9-e50e24dcca9e',
  TX_CHARACTERISTIC_UUID: '6e400003-b5a3-f393-e0a9-e50e24dcca9e',
  RX_CHARACTERISTIC_UUID: '6e400002-b5a3-f393-e0a9-e50e24dcca9e'
};

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
    connect: async () => {
      return new Promise((resolve, reject) => {
        manager.startDeviceScan(null, null, async (error, scannedDevice) => {
          if (error) {
            reject(error);
          }

          console.log(`[BLE]: Found device '${scannedDevice.name}'`);
          const uuids = scannedDevice.serviceUUIDs;
          if (uuids && uuids.includes(BLE_CONFIG.SERVICE_UUID)) {
            console.log('[BLE] Connecting to device...');
            manager.stopDeviceScan();

            const isConnected = await scannedDevice.isConnected();
            const connectedDevice = isConnected ? scannedDevice : await scannedDevice.connect();
            device = await connectedDevice.discoverAllServicesAndCharacteristics();
            console.log('[BLE] Connected:', device);

            resolve(device);
          }
        })
      });
    },
    listen: (handleUpdate) => {
      device.monitorCharacteristicForService(
        BLE_CONFIG.SERVICE_UUID,
        BLE_CONFIG.TX_CHARACTERISTIC_UUID,
        (error, characteristic) => {
          if (error) {
            console.log('[BLE] Listener error', error);
            return;
          }

          const b64value = characteristic.value;
          const bufferValue = new Buffer(b64value, 'base64');
          const value = bufferValue.toString();

          console.log('[BLE] Received value: ', value);

          return handleUpdate(value)
        }
      );
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
