import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: moderateScale(10),
      paddingBottom: bottomTabHeight,
    },
  });
};
