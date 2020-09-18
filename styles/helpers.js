import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

export const stdWidth = 375;

export const sdtHeight = 812;

/**
 * Width-Percentage
 * Converts width dimension to percentage
 * @param dimension directly taken from Figma designs
 * @returns percentage string e.g. '25%'
 */
export const wp = dimension => {
  return wp2dp((dimension / stdWidth) * 100 + '%');
};

/**
 * Height-Percentage
 * Converts width dimension to percentage
 * @param dimension directly taken from Figma designs
 * @returns percentage string e.g. '25%'
 */
export const hp = dimension => {
  return hp2dp((dimension / sdtHeight) * 100 + '%');
};
