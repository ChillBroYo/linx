import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const wp = dimension => {
  return wp2dp((dimension / 375) * 100 + '%');
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * 375, 812 - design were made using this scale
 * @param dimension directly taken from design wireframes
 * @returns {string} percentage string e.g. '25%'
 */
export const hp = dimension => {
  return hp2dp((dimension / 812) * 100 + '%');
};
