import { useEffect, useMemo, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from "react-native";
import { MapPin, Search, ChevronDown } from "lucide-react-native";
import { getStyles } from "./HomeScreen.styles";
import CommonText from "../../../components/commonText";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../../../../utils/colors";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import { getCategoriesData, getProducts } from "../../../../api/home/homeAPI";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../../store/slices/categorySlice";
import { RootState } from "../../../../store/store";
import {
  appendProducts,
  ProductItem as ProductItemType,
  setProducts,
  setSelectedProduct,
} from "../../../../store/slices/productSlice";
import SkeletonProductItem from "../../../components/SkeletonProductItem";
import { addRemoveWishlistApi } from "../../../../api/wishlist/wishlistAPI";
import Toast from "react-native-simple-toast";
import {
  removeFromWishList,
  updateWishlist,
  WishlistItem,
} from "../../../../store/slices/wishlist";
import debounce from "../../../../utils/functions";
import { moderateScale } from "react-native-size-matters";
import ProductItem from "../../../components/productItem";

type NavigationProp = BottomTabNavigationProp<AllNavParamList, "HomeScreen">;

type Props = { navigation: NavigationProp };

const HomeScreen = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const products = useSelector((state: RootState) => state.product.products);
  const wishlistData = useSelector(
    (state: RootState) => state.wishlist.wishlist
  );

  const styles = getStyles();

  useEffect(() => {
    const wishlistIds = wishlistData.map((w: WishlistItem) => w.product_id);
    setWishlist(wishlistIds);
  }, [wishlistData]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    await Promise.all([getCategories(), getProductList({})]);
  };

  const getCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await getCategoriesData();
      if (response?.success) {
        const updated = response.data;
        dispatch(setCategories(updated));
      }
    } catch (error) {
    } finally {
      setLoadingCategories(false);
    }
  };

  const getProductList = async ({
    category_id,
    text,
  }: {
    category_id?: number;
    text?: string;
  }) => {
    setLoadingProducts(true);
    try {
      const response = await getProducts({
        category_id: category_id,
        keyword: text || searchText,
        page: currentPage,
      });
      if (response?.success) {
        const data = response.data.data;
        if (response.data.current_page === 1) {
          dispatch(setProducts(data));
        } else {
          dispatch(appendProducts(data));
        }
        if (data.last_page > currentPage) {
          setHasMore(true);
          setCurrentPage(currentPage + 1);
        }
        const wishlistIds = data
          .filter((p: ProductItemType) => p.is_wishlist)
          .map((p: ProductItemType) => p.id);
        setWishlist(wishlistIds);
      }
    } catch (error) {
    } finally {
      setLoadingProducts(false);
    }
  };

  const addWishlist = async (item: any) => {
    try {
      let response = await addRemoveWishlistApi(item.id);
      if (response.success) {
        Toast.showWithGravity(response.message, Toast.SHORT, Toast.BOTTOM);
        setWishlist((prev) =>
          prev.includes(item.id)
            ? prev.filter((id: number) => id !== item.id)
            : [...prev, item.id]
        );
        if (response.action == "added") {
          dispatch(updateWishlist(response.data));
        } else {
          dispatch(removeFromWishList(item.id));
        }
      }
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    debouncedChange(text);
  };

  const debouncedChange = useMemo(
    () => debounce((text) => getProductList({ text: text }), 500),
    []
  );

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  const handleEndReached = () => {
    if (hasMore) {
      getProductList({});
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={colors.primaryDark}
      />
      <LinearGradient colors={colors.gradient} style={styles.header}>
        <View style={styles.box}>
          <CommonText style={styles.greeting}>Location</CommonText>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => navigation.navigate("AddressScreen")}
            activeOpacity={0.8}
          >
            <MapPin size={18} color={colors.white} />
            <CommonText style={styles.locationText}>New York, USA</CommonText>
            <ChevronDown size={18} color={colors.white} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Search
              size={moderateScale(20)}
              color={colors.primary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              value={searchText}
              placeholder="Search"
              placeholderTextColor={colors.placeholderText}
              onChangeText={(text) => handleTextChange(text)}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.content}>
        {/* <View style={styles.sectionHeader}>
          <CommonText style={styles.sectionTitle}>
            Recommended For You
          </CommonText>
          <TouchableOpacity>
            <CommonText style={styles.seeAllText}>See All</CommonText>
          </TouchableOpacity>
        </View> */}
        <FlatList
          data={loadingCategories ? new Array(8).fill({}) : categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
          keyExtractor={(item, index) =>
            item?.id?.toString() ?? index.toString()
          }
          renderItem={({ item, index }) =>
            loadingCategories ? (
              <View style={styles.categorySkeleton} />
            ) : (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.8}
                style={[
                  styles.categoryChip,
                  selectedCategory?.id === item.id && styles.categoryChipActive,
                ]}
                onPress={() => {
                  setSelectedCategory(item);
                  getProductList({ category_id: item.id });
                }}
              >
                <CommonText
                  style={[
                    styles.categoryText,
                    selectedCategory?.id === item.id &&
                      styles.categoryTextActive,
                  ]}
                >
                  {item.name}
                </CommonText>
              </TouchableOpacity>
            )
          }
        />
        <FlatList
          data={loadingProducts ? new Array(6).fill({}) : products}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(16),
            paddingVertical: moderateScale(15),
          }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item, index) =>
            item?.id?.toString() ?? index.toString()
          }
          onEndReachedThreshold={0.8}
          onEndReached={() => handleEndReached()}
          renderItem={({ item }) =>
            loadingProducts ? (
              <SkeletonProductItem />
            ) : (
              <ProductItem
                data={item}
                onPress={() => {
                  dispatch(setSelectedProduct(item));
                  navigation.navigate("ProductDetailScreen");
                }}
                onWhishlistPress={() => addWishlist(item)}
                isAddedToWishlist={wishlist.includes(item.id)}
              />
            )
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyBox}>
              <CommonText>No Product to show for this location</CommonText>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
