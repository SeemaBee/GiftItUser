import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight - moderateScale(30),
    },
    contentStyle: {
      paddingHorizontal: moderateScale(30),
    },
  });
};
