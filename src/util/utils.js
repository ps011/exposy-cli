import { homedir } from 'os';

import nodeMachineId from 'node-machine-id';
import fsExtra, { ensureFileSync } from 'fs-extra';

const { existsSync, readJsonSync, writeJsonSync } = fsExtra;

const getMachineId = async () => {
  const { machineId } = nodeMachineId;
  const id = await machineId();
  return id;
};

const getHomeDirectory = () => homedir();

const getConfigLocation = () => `${getHomeDirectory()}/.exposy/config.json`;

const getConfig = () => {
  const CONFIG_LOCATION = getConfigLocation();

  if (!existsSync(CONFIG_LOCATION)) {
    // TODO use some fancy & friendly CLI messages
    console.warn(
      'Exposy configuration is missing! Please run following command to configure:\n exposy config'
    );
    process.exit(0);
  }
  console.log('Reading global configuration: ', CONFIG_LOCATION);
  const config = readJsonSync(CONFIG_LOCATION);
  return config;
};

const saveConfig = (config) => {
  const CONFIG_LOCATION = getConfigLocation();
  ensureFileSync(CONFIG_LOCATION);
  console.log('Saving global configuration: ', CONFIG_LOCATION);
  writeJsonSync(CONFIG_LOCATION, config);
};

export { getMachineId, getHomeDirectory, getConfigLocation, getConfig, saveConfig };
