import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import CommonText from "./commonText";
import { Heart } from "lucide-react-native";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../utils/colors";
import { ProductItem as ProductItemSlice } from "../../store/slices/productSlice";
import { IMAGE_URL } from "../../api/apiUrls";
import { Fonts } from "../../utils/fonts";

const { width } = Dimensions.get("window");
const cardWidth = (width - moderateScale(60)) / 2;

type Props = {
  data: ProductItemSlice;
  onPress: () => void;
  onWhishlistPress: () => void;
  isAddedToWishlist: boolean;
};

const ProductItem = ({
  data,
  onPress,
  onWhishlistPress,
  isAddedToWishlist,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      key={data.id}
      style={styles.productCard}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: data.files[0].url }}
          style={styles.productImage}
        />
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => onWhishlistPress()}
        >
          <Heart
            size={20}
            color={isAddedToWishlist ? colors.primary : colors.grey5}
            fill={isAddedToWishlist ? colors.primary : colors.grey5}
          />
        </TouchableOpacity>
      </View>
      <CommonText style={styles.productName} numberOfLines={1}>
        {data.title}
      </CommonText>
      <CommonText style={styles.productPrice}>${data.price}</CommonText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: cardWidth,
    marginBottom: moderateScale(10),
  },
  imageContainer: {
    position: "relative",
    backgroundColor: colors.grey3,
    borderRadius: moderateScale(16),
    overflow: "hidden",
    marginBottom: moderateScale(8),
  },
  productImage: {
    width: "100%",
    height: cardWidth * 1.2,
    resizeMode: "cover",
  },
  wishlistButton: {
    position: "absolute",
    top: moderateScale(10),
    right: moderateScale(10),
    backgroundColor: colors.white,
    borderRadius: moderateScale(20),
    width: moderateScale(36),
    height: moderateScale(36),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.black,
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
    marginBottom: moderateScale(4),
  },
  productPrice: {
    fontSize: Fonts.smallText,
    fontFamily: Fonts.PoppinsSemiBold,
  },
});

export default ProductItem;
