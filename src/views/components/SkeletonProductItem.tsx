import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";

const { width } = Dimensions.get("window");
const cardWidth = (width - moderateScale(60)) / 2;

const SkeletonProductItem = () => {
  return (
    <View style={styles.card}>
      <View style={styles.image} />
      <View style={styles.textLine} />
      <View style={styles.textLineSmall} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    marginBottom: moderateScale(16),
  },
  image: {
    width: "100%",
    height: cardWidth * 1.2,
    backgroundColor: colors.grey3,
    borderRadius: moderateScale(16),
    marginBottom: moderateScale(8),
  },
  textLine: {
    width: "80%",
    height: moderateScale(12),
    backgroundColor: colors.grey3,
    borderRadius: moderateScale(6),
    marginBottom: moderateScale(6),
  },
  textLineSmall: {
    width: "50%",
    height: moderateScale(12),
    backgroundColor: colors.grey3,
    borderRadius: moderateScale(6),
  },
});

export default SkeletonProductItem;
