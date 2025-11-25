import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';

const height = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(30),
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: moderateScale(15),
  },
  title: {
    fontSize: Fonts.titleMedium,
    fontFamily: Fonts.SatisfyRegular,
  },
  description: {
    fontSize: moderateScale(14),
    color: '#666666',
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(40),
  },
  inputContainer: {
    marginBottom: moderateScale(30),
  },
  label: {
    fontSize: moderateScale(14),
    color: '#000000',
    marginBottom: 8,
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(14),
    fontSize: moderateScale(14),
    color: '#000000',
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#E8C5D1',
    borderRadius: 30,
    paddingVertical: moderateScale(16),
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    fontSize: moderateScale(16),
    color: '#6B5548',
    fontWeight: '600',
  },
});
