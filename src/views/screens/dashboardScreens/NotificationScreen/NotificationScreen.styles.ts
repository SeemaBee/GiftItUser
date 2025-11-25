import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight,
      paddingTop: moderateScale(20),
    },
    flx: {
      flex: 1,
    },
    subContainer: {
      padding: moderateScale(20),
    },
  });
};
