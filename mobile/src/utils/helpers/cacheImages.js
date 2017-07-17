/**
 * Cache the images use for the app for get perf improve
 */

import { Asset } from 'expo';

export function cacheImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync());
}

export const images = [
  require('../../../assets/images/login_bg.png'),
];
