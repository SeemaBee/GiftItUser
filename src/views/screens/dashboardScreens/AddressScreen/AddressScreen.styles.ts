import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../../utils/colors';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Fonts } from '../../../../utils/fonts';

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: bottomTabHeight,
    },
    content: {
      paddingHorizontal: moderateScale(20),
      paddingBottom: moderateScale(10),
    },
    contentInner: {
      width: '100%',
      gap: moderateScale(14),
      paddingTop: moderateScale(10),
    },
    section: {
      width: '100%',
      marginBottom: moderateScale(6),
    },
    sectionTitle: {
      fontSize: Fonts.largeText,
      fontFamily: Fonts.PoppinsSemiBold,
      color: colors.black,
    },
    sectionSubtitle: {
      marginTop: moderateScale(4),
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontFamily: Fonts.PoppinsRegular,
    },
    loader: {
      marginTop: moderateScale(16),
    },
    emptyStateContainer: {
      width: '100%',
      backgroundColor: colors.inputBackground,
      borderRadius: moderateScale(16),
      padding: moderateScale(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyStateTitle: {
      fontSize: Fonts.text,
      color: colors.black,
      fontFamily: Fonts.PoppinsSemiBold,
      marginBottom: moderateScale(6),
      textAlign: 'center',
    },
    emptyStateSubtitle: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontFamily: Fonts.PoppinsRegular,
      textAlign: 'center',
    },
    addressList: {
      width: '100%',
      gap: moderateScale(10),
    },
    addressCard: {
      width: '100%',
      backgroundColor: colors.inputBackground,
      borderRadius: moderateScale(16),
      padding: moderateScale(14),
      borderWidth: 1,
      borderColor: colors.border,
    },
    addressCardActive: {
      borderColor: colors.primary,
    },
    addressCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: moderateScale(8),
    },
    addressTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(6),
    },
    addressLabel: {
      fontSize: Fonts.text,
      color: colors.black,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(6),
      paddingVertical: moderateScale(6),
      paddingHorizontal: moderateScale(10),
      borderRadius: moderateScale(20),
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.transparent,
    },
    editButtonText: {
      fontSize: Fonts.miniText,
      color: colors.primary,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    addressText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontFamily: Fonts.PoppinsRegular,
    },
    addAddressButton: {
      marginTop: moderateScale(6),
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
      paddingVertical: moderateScale(10),
      paddingHorizontal: moderateScale(12),
      borderRadius: moderateScale(24),
      borderWidth: 1,
      borderColor: colors.primary,
      backgroundColor: colors.transparent,
    },
    addAddressButtonText: {
      fontSize: Fonts.smallText,
      color: colors.primary,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    formContainer: {
      width: '100%',
      marginTop: moderateScale(8),
      backgroundColor: colors.cardBackground,
      borderRadius: moderateScale(16),
      padding: moderateScale(14),
      borderWidth: 1,
      borderColor: colors.border,
    },
    formTitle: {
      fontSize: Fonts.largeText,
      color: colors.black,
      fontFamily: Fonts.PoppinsSemiBold,
      marginBottom: moderateScale(10),
    },
    cancelButton: {
      marginTop: moderateScale(10),
      alignSelf: 'center',
      paddingVertical: moderateScale(8),
      paddingHorizontal: moderateScale(14),
    },
    cancelButtonText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontFamily: Fonts.PoppinsSemiBold,
      textDecorationLine: 'underline',
    },
  });
};
