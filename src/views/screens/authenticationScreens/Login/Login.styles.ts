import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(35),
  },
  title: {
    width: '100%',
    fontFamily: Fonts.SatisfyRegular,
    fontSize: Fonts.headingMedium,
    textAlign: 'left',
    marginBottom: moderateScale(45),
  },
  optionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(8),
    marginBottom: moderateScale(24),
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(5),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8),
  },
  checkboxChecked: {
    backgroundColor: colors.secondary,
  },
  checkmark: {
    color: colors.white,
    fontSize: Fonts.smallText,
  },
  rememberMeText: {
    fontSize: Fonts.extraSmallText,
    color: colors.black,
  },
  forgotPassword: {
    fontSize: Fonts.extraSmallText,
    color: colors.primary,
  },
  registerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: moderateScale(20),
  },
  registerText: {
    fontSize: Fonts.smallText,
    color: colors.secondaryLight,
  },
  registerLink: {
    fontSize: Fonts.smallText,
    color: colors.secondary,
    fontWeight: '600',
  },
});
