import { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { MapPin, Search, Heart, ChevronDown } from 'lucide-react-native';
import { getStyles } from './HomeScreen.styles';
import CommonText from '../../../components/commonText';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../../utils/colors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import { getProducts } from '../../../../api/home/homeAPI';

const PRODUCTS = [
  {
    id: 1,
    name: 'Floral Fiona',
    price: 35.0,
    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg',
  },
  {
    id: 2,
    name: 'Peacelily Plant W...',
    price: 52.3,
    image: 'https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg',
  },
  {
    id: 3,
    name: 'Luxury Pink Perfu...',
    price: 123.0,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
  },
  {
    id: 4,
    name: 'Brown Matel Lamp',
    price: 255.99,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
  },
  {
    id: 5,
    name: 'Rose Bouquet',
    price: 45.0,
    image: 'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg',
  },
  {
    id: 6,
    name: 'Green Plant',
    price: 38.5,
    image: 'https://images.pexels.com/photos/6912845/pexels-photo-6912845.jpeg',
  },
];

const CATEGORIES = ['All', 'Bouquet', 'Flower', 'Perfume', 'Lamp'];

type NavigationProp = BottomTabNavigationProp<AllNavParamList, 'HomeScreen'>;

type Props = {
  navigation: NavigationProp;
};

const HomeScreen = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const styles = getStyles();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await getProducts();
    console.log('response - ', response);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F3D2DD', '#E0A1B6']} style={styles.header}>
        <View style={styles.box}>
          <CommonText style={styles.greeting}>Location</CommonText>
          <TouchableOpacity
            style={styles.locationContainer}
            onPress={() => navigation.navigate('AddressScreen')}
            activeOpacity={0.8}
          >
            <MapPin size={18} color="#FFFFFF" />
            <CommonText style={styles.locationText}>New York, USA</CommonText>
            <ChevronDown size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <Search
              size={20}
              color={colors.primary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#999999"
            />
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <CommonText style={styles.sectionTitle}>
            Recommended For You
          </CommonText>
          <TouchableOpacity>
            <CommonText style={styles.seeAllText}>See All</CommonText>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <CommonText
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </CommonText>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {PRODUCTS.map(product => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ProductDetailScreen')}
              key={product.id}
              style={styles.productCard}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: product.image }}
                  style={styles.productImage}
                />
                <TouchableOpacity
                  style={styles.wishlistButton}
                  onPress={() => toggleWishlist(product.id)}
                >
                  <Heart
                    size={20}
                    color={
                      wishlist.includes(product.id)
                        ? colors.primary
                        : colors.grey5
                    }
                    fill={
                      wishlist.includes(product.id)
                        ? colors.primary
                        : colors.grey5
                    }
                  />
                </TouchableOpacity>
              </View>
              <CommonText style={styles.productName} numberOfLines={1}>
                {product.name}
              </CommonText>
              <CommonText style={styles.productPrice}>
                ${product.price.toFixed(2)}
              </CommonText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
