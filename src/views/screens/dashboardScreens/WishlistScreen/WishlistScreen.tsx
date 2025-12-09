import { View, FlatList } from "react-native";
import { getStyles } from "./WishlistScreen.styles";
import Header from "../../../components/header";
import { useEffect, useState } from "react";
import {
  addRemoveWishlistApi,
  getWishlistApi,
} from "../../../../api/wishlist/wishlistAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import SkeletonProductItem from "../../../components/SkeletonProductItem";
import ProductItem from "../../../components/productItem";
import CommonText from "../../../components/commonText";
import {
  removeFromWishList,
  setWishlist,
} from "../../../../store/slices/wishlist";
import Toast from "react-native-simple-toast";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import { setSelectedProduct } from "../../../../store/slices/productSlice";

type NavigationProp = BottomTabNavigationProp<
  AllNavParamList,
  "WishlistScreen"
>;

type Props = {
  navigation: NavigationProp;
};

const WishlistScreen = ({ navigation }: Props) => {
  const [loadingProducts, setLoadingProducts] = useState(true);
  const dispatch = useDispatch();
  const styles = getStyles();
  const wishlistData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoadingProducts(true);
    try {
      const response = await getWishlistApi();
      if (response?.success) {
        dispatch(setWishlist(response.data.data));
      }
    } catch (error) {
    } finally {
      setLoadingProducts(false);
    }
  };

  const addWishlist = async (item: any) => {
    let response = await addRemoveWishlistApi(item.product_id);
    if (response.success) {
      Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
      dispatch(removeFromWishList(item.product_id));
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label={"Wishlist"}
        showBackButton={false}
        showNotification={true}
        onNotificationPress={() => navigation.navigate("NotificationScreen")}
      />
      <View style={styles.subContainer}>
        <FlatList
          data={loadingProducts ? new Array(6).fill({}) : wishlistData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item, index) =>
            item?.id?.toString() ?? index.toString()
          }
          renderItem={({ item }) =>
            loadingProducts ? (
              <SkeletonProductItem />
            ) : (
              <ProductItem
                data={item.product}
                onPress={() => {
                  dispatch(setSelectedProduct(item.product));
                  navigation.navigate("ProductDetailScreen");
                }}
                onWhishlistPress={() => addWishlist(item)}
                isAddedToWishlist={true}
              />
            )
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyBox}>
              <CommonText>No Product added to Wishlist</CommonText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default WishlistScreen;
