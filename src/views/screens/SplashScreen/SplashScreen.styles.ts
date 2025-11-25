import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../utils/fonts';

export const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    height: moderateScale(350),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: Fonts.titleLarge,
    color: colors.white,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  subTitle: {
    fontSize: Fonts.extraLargeText,
    color: colors.white,
  },
});
