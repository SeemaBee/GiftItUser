import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getStyles } from "./ProductDetailScreen.styles";
import CommonText from "../../../components/commonText";
import { ChevronLeft, Heart, Minus, Plus, Star } from "lucide-react-native";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../../../utils/colors";
import CommonButton from "../../../components/commonButton";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Chip from "../../../components/chip";
import { discountedPrice } from "../../../../utils/functions";
import { addRemoveWishlistApi } from "../../../../api/wishlist/wishlistAPI";
import Toast from "react-native-simple-toast";
import {
  removeFromWishList,
  updateWishlist,
} from "../../../../store/slices/wishlist";
import Loader from "../../../components/loader";
import {
  appendCartProducts,
  removeCartProduct,
  updateCartItem,
} from "../../../../store/slices/cartSlice";

type NavigationProp = BottomTabNavigationProp<
  AllNavParamList,
  "ProductDetailScreen"
>;

type Props = {
  navigation: NavigationProp;
};

const ProductDetailScreen = ({ navigation }: Props) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const styles = getStyles();
  const dispatch = useDispatch();

  const wishlistData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );

  const cartData = useSelector((state: RootState) => state.cartSlice.cartItem);

  const productDetail = useSelector(
    (state: RootState) => state.product.selectedProduct
  );

  useEffect(() => {
    let is_wishlist = wishlistData.find(
      (item) => item.product_id == productDetail.id
    );
    setWishlist(is_wishlist == undefined ? false : true);
  }, []);

  useEffect(() => {
    let isIncluded = cartData.find(
      (item) => item.product.id === productDetail.id
    );
    if (isIncluded) {
      setAddedToCart(true);
      setCount(isIncluded.count);
    } else {
      setAddedToCart(false);
      setCount(1);
    }
  }, [cartData]);

  const toggleWishlist = async (productId: number) => {
    setLoading(true);
    try {
      let response = await addRemoveWishlistApi(productId);
      if (response.success) {
        Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
        setWishlist(!wishlist);
        if (response.action == "added") {
          dispatch(updateWishlist(response.data));
        } else {
          dispatch(removeFromWishList(productId));
        }
      }
    } catch (error) {
      console.log("Wishlist error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imagesContainer}>
        <View style={styles.imageRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <ChevronLeft />
          </TouchableOpacity>
          <Image
            source={{
              uri: productDetail.files[selectedImage].url,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleWishlist(productDetail.id)}
            style={styles.heartBox}
          >
            <Heart
              size={20}
              color={wishlist ? colors.primary : colors.grey5}
              fill={wishlist ? colors.primary : colors.grey5}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.thumbnailContainer}>
          {productDetail.files.map((file, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(index)}
              style={[
                styles.thumbnail,
                selectedImage == index && styles.selectedThumbnail,
              ]}
            >
              <Image
                source={{ uri: file.url }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.row}>
          <CommonText style={styles.productName}>
            {productDetail.title}
          </CommonText>
          <View style={styles.simpleRow}>
            <Star
              size={moderateScale(20)}
              fill={colors.rating}
              strokeWidth={0}
            />
            <CommonText style={styles.ratingText}>4.9</CommonText>
          </View>
        </View>
        <View style={styles.simpleRow}>
          <CommonText style={styles.discountedPrice}>
            {Number(productDetail.discount) > 0
              ? discountedPrice(productDetail.price, productDetail.discount)
              : productDetail.price}
          </CommonText>
          {Number(productDetail.discount) > 0 && (
            <CommonText style={styles.actualPrice}>
              {productDetail.price}
            </CommonText>
          )}
          {Number(productDetail.discount) > 0 && (
            <Chip label={productDetail.discount} />
          )}
        </View>
        <View style={styles.divider} />
        {productDetail.colors.length > 0 && (
          <View style={styles.simpleRow}>
            <CommonText style={styles.selectColorText}>
              Select Color:
            </CommonText>
            {productDetail.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() => setSelectedColor(index)}
                style={[
                  styles.colorDot,
                  {
                    backgroundColor: color.name.startsWith("#")
                      ? color.name
                      : color.name.toLowerCase(),
                  },
                ]}
              >
                <View
                  style={selectedColor == index && styles.selectedColorDot}
                />
              </TouchableOpacity>
            ))}
          </View>
        )}
        {productDetail.description && (
          <CommonText style={styles.colorDescText}>
            {productDetail.description}
          </CommonText>
        )}
        <View style={styles.divider} />
        <View style={styles.row}>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (count > 1) {
                  if (addedToCart) {
                    dispatch(
                      updateCartItem({
                        product: productDetail,
                        count: count - 1,
                      })
                    );
                  } else {
                    setCount(count - 1);
                  }
                }
              }}
            >
              <Minus size={moderateScale(20)} color={colors.primary} />
            </TouchableOpacity>
            <CommonText style={styles.countText}>{count}</CommonText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (addedToCart) {
                  dispatch(
                    updateCartItem({ product: productDetail, count: count + 1 })
                  );
                } else {
                  setCount(count + 1);
                }
              }}
            >
              <Plus size={moderateScale(20)} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <CommonButton
            label={addedToCart ? "Remove from Cart" : "Add to Cart"}
            fullWidth={false}
            onPress={() => {
              if (addedToCart) {
                dispatch(removeCartProduct(productDetail.id));
                Toast.showWithGravity(
                  "Item removed from Cart",
                  Toast.LONG,
                  Toast.BOTTOM
                );
              } else {
                dispatch(
                  appendCartProducts({
                    product: productDetail,
                    count: count,
                    selectedColor: selectedColor,
                  })
                );
                Toast.showWithGravity(
                  "Item added to Cart",
                  Toast.LONG,
                  Toast.BOTTOM
                );
                navigation.navigate("CartStack");
              }
            }}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
      {loading && <Loader show={loading} />}
    </ScrollView>
  );
};

export default ProductDetailScreen;
