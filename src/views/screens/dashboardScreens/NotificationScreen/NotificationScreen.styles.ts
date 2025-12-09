import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../../../utils/colors";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../../../../utils/fonts";

const height = Dimensions.get("window").height;

export const getStyles = () => {
  const bottomTabHeight = useBottomTabBarHeight();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingBottom: bottomTabHeight,
    },
    flx: {
      flex: 1,
    },
    subContainer: {
      padding: moderateScale(20),
    },
    emptyBox: {
      width: "100%",
      height: height - moderateScale(200),
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
