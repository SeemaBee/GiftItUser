import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { getStyles } from './ProductDetailScreen.styles';
import CommonText from '../../../components/commonText';
import {
  Calendar,
  ChevronLeft,
  Clock,
  Heart,
  Minus,
  Plus,
  Star,
} from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../../../../utils/colors';
import CommonButton from '../../../components/commonButton';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';

type NavigationProp = BottomTabNavigationProp<
  AllNavParamList,
  'ProductDetailScreen'
>;

type Props = {
  navigation: NavigationProp;
};

const thumbnails = [
  'https://t4.ftcdn.net/jpg/15/65/09/13/240_F_1565091394_yMFlZN4NjysFiaQTP7z13GK9unIeOmGS.jpg',
  'https://t3.ftcdn.net/jpg/06/90/13/26/240_F_690132659_2GhSdP6EB2bxsr9LKshtpIDjZUmW200w.jpg',
  'https://t3.ftcdn.net/jpg/16/39/73/78/240_F_1639737832_TlnFAUBrbDJYIYTwYuCM2EV843kgXab5.jpg',
];

const colorsArr = ['#FF86AE', '#DA4FCB', '#ED7D5E'];

const ProductDetailScreen = ({ navigation }: Props) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const styles = getStyles();

  const toggleWishlist = (productId: number) => {
    setWishlist(!wishlist);
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
              uri: thumbnails[selectedImage],
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => toggleWishlist(selectedImage)}
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
          {thumbnails.map((thumb, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(index)}
              style={[
                styles.thumbnail,
                selectedImage == index && styles.selectedThumbnail,
              ]}
            >
              <Image
                source={{ uri: thumb }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.row}>
          <CommonText style={styles.productName}>Floral Fiona</CommonText>
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
          <CommonText style={styles.discountedPrice}>$40.00</CommonText>
          <CommonText style={styles.actualPrice}>$50.00</CommonText>
        </View>
        <View style={styles.divider} />
        <View style={styles.simpleRow}>
          <CommonText style={styles.selectColorText}>Select Color:</CommonText>
          {colorsArr.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedColor(index)}
              style={[styles.colorDot, { backgroundColor: item }]}
            >
              <View style={selectedColor == index && styles.selectedColorDot} />
            </TouchableOpacity>
          ))}
        </View>
        <CommonText style={styles.colorDescText}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form.
        </CommonText>
        <View style={styles.divider} />
        <CommonText style={styles.selectDateText}>
          Select Date & Time for Delivery
        </CommonText>
        <View style={styles.simpleRow}>
          <Clock color={colors.primary} size={moderateScale(15)} />
          <CommonText style={styles.dateTimeText}>10:00 AM</CommonText>
          <Calendar color={colors.primary} size={moderateScale(15)} />
          <CommonText style={styles.dateTimeText}>15/07/2025</CommonText>
        </View>
        <View style={[styles.row, { marginTop: moderateScale(20) }]}>
          <View style={styles.counterContainer}>
            <TouchableOpacity>
              <Minus size={moderateScale(20)} color={colors.primary} />
            </TouchableOpacity>
            <CommonText style={styles.countText}>1</CommonText>
            <TouchableOpacity>
              <Plus size={moderateScale(20)} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <CommonButton
            label="Add to Cart"
            fullWidth={false}
            onPress={() => navigation.navigate('CartStack')}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
