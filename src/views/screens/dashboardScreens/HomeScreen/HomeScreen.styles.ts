import { StyleSheet } from "react-native";
import { colors } from "../../../../utils/colors";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../../../../utils/fonts";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

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
      fontFamily: Fonts.SatisfyRegular,
      marginBottom: moderateScale(5),
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: moderateScale(20),
      gap: moderateScale(6),
    },
    locationText: {
      fontSize: Fonts.largeText,
      color: colors.white,
    },
    searchContainer: {
      height: moderateScale(50),
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.white,
      borderRadius: moderateScale(30),
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(5),
    },
    searchIcon: {
      marginRight: moderateScale(10),
    },
    searchInput: {
      flex: 1,
      fontSize: Fonts.smallText,
      color: colors.black,
    },
    content: { flex: 1 },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: moderateScale(24),
      paddingBottom: moderateScale(16),
      paddingHorizontal: moderateScale(24),
    },
    sectionTitle: {
      fontSize: Fonts.title,
      fontFamily: Fonts.SatisfyRegular,
      color: colors.black,
    },
    seeAllText: {
      fontSize: Fonts.smallText,
      color: colors.primary,
      fontFamily: Fonts.PoppinsMedium,
    },
    categoriesContainer: {
      height: moderateScale(80),
      backgroundColor: colors.white,
    },
    categoriesContent: {
      alignItems: "center",
      paddingHorizontal: moderateScale(20),
    },
    categoryChip: {
      paddingHorizontal: moderateScale(20),
      paddingVertical: moderateScale(8),
      borderRadius: moderateScale(20),
      backgroundColor: colors.white,
      borderWidth: moderateScale(1),
      borderColor: colors.grey4,
      marginRight: moderateScale(10),
    },
    categoryChipActive: {
      borderColor: colors.primary,
      backgroundColor: colors.primary,
    },
    categoryText: {
      fontSize: Fonts.smallText,
      color: colors.grey2,
      fontFamily: Fonts.PoppinsMedium,
    },
    categoryTextActive: {
      color: colors.white,
    },
    categorySkeleton: {
      width: moderateScale(75),
      height: moderateScale(34),
      backgroundColor: colors.grey3,
      borderRadius: moderateScale(20),
      marginRight: moderateScale(10),
    },
    emptyBox: {
      width: "100%",
      height: moderateScale(300),
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
