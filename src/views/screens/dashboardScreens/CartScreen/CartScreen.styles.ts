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
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: moderateScale(20),
    },
    title: {
      fontFamily: Fonts.SatisfyRegular,
      fontSize: Fonts.headingSmall,
    },
    notificationBox: {
      width: moderateScale(50),
      height: moderateScale(50),
      borderRadius: moderateScale(25),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primaryLight,
    },
    flx: {
      flex: 1,
    },
    subContainer: {
      padding: moderateScale(20),
    },
    cartItem: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 20,
    },
    itemImageContainer: {
      width: moderateScale(100),
      height: moderateScale(100),
      backgroundColor: colors.inputBackground,
      borderRadius: moderateScale(16),
      padding: moderateScale(5),
    },
    itemImage: {
      width: '100%',
      height: '100%',
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'space-between',
    },
    itemName: {
      fontSize: Fonts.title,
      fontFamily: Fonts.SatisfyRegular,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    discountedPrice: {
      fontSize: Fonts.largeText,
      color: colors.black,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    actualPrice: {
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsMedium,
      textDecorationLine: 'line-through',
      color: colors.grey6,
    },
    discountBadge: {
      backgroundColor: colors.topTabColor,
      paddingHorizontal: moderateScale(8),
      paddingVertical: moderateScale(4),
      borderRadius: moderateScale(50),
    },
    discountText: {
      fontSize: Fonts.miniText,
    },
    quantityContainer: {
      width: '60%',
      height: moderateScale(50),
      borderRadius: moderateScale(50),
      backgroundColor: colors.inputBackground,
      paddingHorizontal: moderateScale(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    quantityButton: {
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      fontSize: 20,
      fontWeight: '400',
      color: '#D4A5C8',
    },
    quantityText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2C2C2C',
      minWidth: 24,
      textAlign: 'center',
    },
    divider: {
      width: '100%',
      height: moderateScale(1),
      backgroundColor: colors.grey7,
      marginVertical: moderateScale(15),
    },
    section: {
      marginBottom: moderateScale(24),
    },
    sectionTitle: {
      fontSize: Fonts.text,
      marginBottom: moderateScale(12),
    },
    radioGroup: {
      flexDirection: 'row',
      gap: moderateScale(15),
      alignItems: 'center',
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: moderateScale(8),
    },
    radioOuter: {
      width: moderateScale(20),
      height: moderateScale(20),
      borderRadius: moderateScale(10),
      borderWidth: moderateScale(2),
      borderColor: colors.inactiveTabColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    radioInner: {
      width: moderateScale(10),
      height: moderateScale(10),
      borderRadius: moderateScale(5),
      backgroundColor: colors.primary,
    },
    radioLabel: {
      fontSize: Fonts.smallText,
    },
    selectDateText: {
      fontFamily: Fonts.PoppinsMedium,
      fontSize: Fonts.smallText,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dateTimeText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      marginRight: moderateScale(20),
      marginLeft: moderateScale(5),
    },
    iconContainer: {
      width: '100%',
      alignItems: 'center',
    },
    upIconBox: {
      width: moderateScale(40),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.inputBackground,
      borderTopLeftRadius: moderateScale(50),
      borderTopRightRadius: moderateScale(50),
    },
    detailCard: {
      borderTopLeftRadius: moderateScale(30),
      borderTopRightRadius: moderateScale(30),
      backgroundColor: colors.inputBackground,
      paddingBottom: moderateScale(10),
    },
    addressBox: {
      padding: moderateScale(20),
    },
    addressHeader: {
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsMedium,
    },
    addressCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    addressTitle: {
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    address: {
      fontSize: Fonts.smallText,
      fontFamily: Fonts.PoppinsRegular,
    },
    changeBox: {
      borderWidth: moderateScale(1),
      borderColor: colors.primary,
      borderRadius: moderateScale(20),
      paddingVertical: moderateScale(5),
      paddingHorizontal: moderateScale(12),
    },
    changeText: {
      fontSize: Fonts.smallText,
      color: colors.primary,
      fontFamily: Fonts.PoppinsSemiBold,
    },
    dashDivider: {
      width: '100%',
      borderBottomWidth: moderateScale(1),
      borderStyle: 'dashed',
      borderColor: colors.grey7,
    },
    chargeBox: {
      paddingHorizontal: moderateScale(20),
    },
    chargeLable: {
      fontFamily: Fonts.PoppinsRegular,
      color: colors.grey2,
    },
    chargeValue: {
      fontFamily: Fonts.PoppinsMedium,
      color: colors.grey2,
    },
    cost: {
      fontFamily: Fonts.PoppinsSemiBold,
    },
    chargeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: moderateScale(5),
    },
  });
};
