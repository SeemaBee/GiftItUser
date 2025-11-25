import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';
import { colors } from '../../../../utils/colors';

export const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: moderateScale(30),
    paddingTop: moderateScale(30),
  },
  title: {
    width: '100%',
    fontFamily: Fonts.SatisfyRegular,
    fontSize: Fonts.headingMedium,
    textAlign: 'left',
    marginBottom: moderateScale(45),
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: moderateScale(30),
    position: 'relative',
  },
  avatar: {
    width: moderateScale(140),
    height: moderateScale(140),
    borderRadius: moderateScale(70),
    backgroundColor: colors.grey1,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.grey4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: moderateScale(2),
    borderColor: colors.white,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(20),
  },
  loginText: {
    fontSize: Fonts.smallText,
    color: colors.secondaryLight,
  },
  loginLink: {
    fontSize: Fonts.smallText,
    color: colors.secondary,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});
