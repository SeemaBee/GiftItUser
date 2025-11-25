import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(30),
    paddingBottom: moderateScale(60),
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: moderateScale(15),
  },
  title: {
    fontSize: moderateScale(36),
    fontFamily: Fonts.SatisfyRegular,
    color: '#000000',
    marginLeft: moderateScale(15),
  },
  description: {
    width: '100%',
    fontSize: moderateScale(14),
    color: '#666666',
    marginBottom: moderateScale(40),
  },
  errorBox: {
    width: '100%',
    marginTop: moderateScale(15),
    alignItems: 'flex-end',
  },
  error: {
    fontSize: Fonts.miniText,
    color: colors.error,
  },
  resendBox: {
    flexDirection: 'row',
    marginBottom: moderateScale(30),
    marginTop: moderateScale(10),
    alignItems: 'center',
  },
  resendText: {
    fontSize: Fonts.smallText,
    color: colors.grey2,
  },
  linkText: {
    fontSize: Fonts.text,
    color: colors.secondary,
  },
});
