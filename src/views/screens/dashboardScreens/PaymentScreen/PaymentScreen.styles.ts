import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight,
      paddingTop: moderateScale(20),
    },
    subContainer: {
      padding: moderateScale(20),
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    checkboxContainer: {
      width: '100%',
      marginTop: moderateScale(10),
      marginBottom: moderateScale(20),
    },
  });
};
