import { Dimensions, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../../../../utils/fonts";
import { colors } from "../../../../utils/colors";

const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  contentStyle: {
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(30),
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: moderateScale(15),
  },
  title: {
    fontSize: Fonts.titleMedium,
    fontFamily: Fonts.SatisfyRegular,
  },
  description: {
    fontSize: moderateScale(14),
    color: colors.grey2,
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(40),
  },
});
