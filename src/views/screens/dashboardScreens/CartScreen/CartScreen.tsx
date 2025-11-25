import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { getStyles } from './CartScreen.styles';
import CommonText from '../../../components/commonText';
import {
  Calendar,
  ChevronUp,
  Clock,
  MapPin,
  Minus,
  Plus,
} from 'lucide-react-native';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import { useState } from 'react';
import CheckBox from '../../../components/checkBox';
import CommonButton from '../../../components/commonButton';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Header from '../../../components/header';

type NavigationProp = BottomTabNavigationProp<AllNavParamList, 'CartScreen'>;

type Props = {
  navigation: NavigationProp;
};

const CartScreen = ({ navigation }: Props) => {
  const [addGiftPacking, setAddGiftPacking] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState<'takeaway' | 'delivery'>(
    'takeaway',
  );
  const [showDetails, setShowDetails] = useState(true);

  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header
        showBackButton={false}
        showNotification={true}
        label={'My Cart'}
        onNotificationPress={() => navigation.navigate('NotificationScreen')}
      />
      <ScrollView style={styles.flx} showsVerticalScrollIndicator={false}>
        <View style={styles.subContainer}>
          <View style={styles.cartItem}>
            <View style={styles.itemImageContainer}>
              <Image
                source={{
                  uri: 'https://t3.ftcdn.net/jpg/16/39/73/78/240_F_1639737832_TlnFAUBrbDJYIYTwYuCM2EV843kgXab5.jpg',
                }}
                style={styles.itemImage}
                resizeMode="contain"
              />
            </View>

            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>Floral Fiona</Text>

              <View style={styles.priceRow}>
                <Text style={styles.discountedPrice}>$40.00</Text>
                <Text style={styles.actualPrice}>$50.00</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>20% OFF</Text>
                </View>
              </View>

              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={moderateScale(20)} color={colors.primary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Plus size={moderateScale(20)} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Status</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setDeliveryOption('takeaway')}
              >
                <View style={styles.radioOuter}>
                  {deliveryOption === 'takeaway' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Take away</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.radioOption}
                onPress={() => setDeliveryOption('delivery')}
              >
                <View style={styles.radioOuter}>
                  {deliveryOption === 'delivery' && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>Delivery</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CommonText style={styles.selectDateText}>
            Select Date & Time for Delivery
          </CommonText>
          <View style={styles.row}>
            <Clock color={colors.primary} size={moderateScale(15)} />
            <CommonText style={styles.dateTimeText}>10:00 AM</CommonText>
            <Calendar color={colors.primary} size={moderateScale(15)} />
            <CommonText style={styles.dateTimeText}>15/07/2025</CommonText>
          </View>
          <View style={styles.divider} />
          <CheckBox
            isSelected={addGiftPacking}
            onChange={() => setAddGiftPacking(!addGiftPacking)}
            label="Add Gift Packing"
          />
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.upIconBox}
            onPress={() => setShowDetails(!showDetails)}
          >
            <ChevronUp />
          </TouchableOpacity>
        </View>
        <View style={styles.detailCard}>
          <View style={styles.addressBox}>
            <CommonText style={styles.addressHeader}>
              Delivery Address
            </CommonText>
            <View style={styles.addressCard}>
              <MapPin color={colors.primary} />
              <View style={styles.flx}>
                <CommonText style={styles.addressTitle}>Home</CommonText>
                <CommonText style={styles.address}>
                  1234 Elm Street, Springfield, IL 62704, USA
                </CommonText>
              </View>
              <TouchableOpacity
                style={styles.changeBox}
                onPress={() =>
                  navigation.navigate('AddressScreen', {
                    addressId: '1',
                    addressLabel: 'Home',
                    streetAddress: '1234 Elm Street',
                    city: 'Springfield',
                    state: 'IL',
                    zipCode: '62704',
                    country: 'USA',
                  })
                }
              >
                <CommonText style={styles.changeText}>Change</CommonText>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.dashDivider} />
          <View style={styles.chargeBox}>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>Sub-Total</CommonText>
              <CommonText style={styles.chargeValue}>$100.00</CommonText>
            </View>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>
                Delivery Charge
              </CommonText>
              <CommonText style={styles.chargeValue}>$6.00</CommonText>
            </View>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>Tax</CommonText>
              <CommonText style={styles.chargeValue}>$4.00</CommonText>
            </View>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>Platform Fee</CommonText>
              <CommonText style={styles.chargeValue}>$2</CommonText>
            </View>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>Discount</CommonText>
              <CommonText style={styles.chargeValue}>-$10</CommonText>
            </View>
          </View>
          <View style={styles.dashDivider} />
          <View style={styles.chargeBox}>
            <View style={styles.chargeRow}>
              <CommonText style={styles.chargeLable}>Total Cost</CommonText>
              <CommonText style={styles.cost}>$120</CommonText>
            </View>
            <CommonButton
              fullWidth={true}
              onPress={() => navigation.navigate('PaymentScreen')}
              label="Proceed to Checkout"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CartScreen;
