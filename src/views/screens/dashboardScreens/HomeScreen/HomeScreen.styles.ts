import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { Fonts } from '../../../../utils/fonts';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');
const cardWidth = (width - moderateScale(60)) / 2;

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight,
    },
    header: {
      borderBottomLeftRadius: moderateScale(24),
      borderBottomRightRadius: moderateScale(24),
    },
    box: {
      paddingTop: moderateScale(20),
      paddingBottom: moderateScale(24),
      paddingHorizontal: moderateScale(24),
    },
    greeting: {
      fontSize: Fonts.text,
      color: colors.white,
      opacity: 0.9,
      marginBottom: 4,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      gap: 6,
    },
    locationText: {
      fontSize: 18,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(30),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(5),
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 15,
      color: '#000000',
    },
    content: {
      flex: 1,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: moderateScale(24),
      paddingBottom: moderateScale(16),
      paddingHorizontal: moderateScale(24),
    },
    sectionTitle: {
      fontSize: 22,
      fontFamily: Fonts.SatisfyRegular,
      color: '#000000',
    },
    seeAllText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: '500',
    },
    categoriesContainer: {
      marginBottom: moderateScale(20),
    },
    categoriesContent: {
      paddingHorizontal: moderateScale(24),
      gap: moderateScale(10),
    },
    categoryChip: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(20),
      backgroundColor: colors.white,
      borderWidth: moderateScale(1),
      borderColor: colors.grey4,
    },
    categoryChipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontWeight: '500',
    },
    categoryTextActive: {
      color: colors.white,
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      paddingHorizontal: moderateScale(24),
    },
    productCard: {
      width: cardWidth,
      marginBottom: 20,
    },
    imageContainer: {
      position: 'relative',
      backgroundColor: colors.grey3,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 8,
    },
    productImage: {
      width: '100%',
      height: cardWidth * 1.2,
      resizeMode: 'cover',
    },
    wishlistButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      width: 36,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productName: {
      fontSize: Fonts.smallText,
      fontWeight: '500',
      marginBottom: moderateScale(4),
    },
    productPrice: {
      fontSize: Fonts.smallText,
      fontWeight: '700',
    },
  });
};
