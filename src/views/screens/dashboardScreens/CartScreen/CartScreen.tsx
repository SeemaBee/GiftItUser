import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { getStyles } from "./CartScreen.styles";
import CommonText from "../../../components/commonText";
import {
  Calendar,
  ChevronUp,
  Clock,
  MapPin,
  Minus,
  Plus,
  Trash2,
} from "lucide-react-native";
import { colors } from "../../../../utils/colors";
import { moderateScale } from "react-native-size-matters";
import { useState } from "react";
import CheckBox from "../../../components/checkBox";
import CommonButton from "../../../components/commonButton";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import Header from "../../../components/header";
import DatePicker from "react-native-date-picker";
import {
  discountedPrice,
  formatDate,
  formatTime,
} from "../../../../utils/functions";
import Chip from "../../../components/chip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  removeCartProduct,
  updateCartItem,
} from "../../../../store/slices/cartSlice";
import Toast from "react-native-simple-toast";

type NavigationProp = BottomTabNavigationProp<AllNavParamList, "CartScreen">;

type Props = {
  navigation: NavigationProp;
};

type Mode = "time" | "date" | "datetime";

const CartScreen = ({ navigation }: Props) => {
  const [addGiftPacking, setAddGiftPacking] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"takeaway" | "delivery">(
    "takeaway"
  );
  const [showDetails, setShowDetails] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<Mode>("date");
  const cartData = useSelector((state: RootState) => state.cartSlice.cartItem);

  const dispatch = useDispatch();

  const styles = getStyles();

  const showMode = (currentMode: Mode) => {
    setOpen(true);
    setMode(currentMode);
  };
  return (
    <View style={styles.container}>
      <Header
        showBackButton={false}
        showNotification={true}
        label={"My Cart"}
        onNotificationPress={() => navigation.navigate("NotificationScreen")}
      />
      <ScrollView style={styles.flx} showsVerticalScrollIndicator={false}>
        <FlatList
          data={cartData}
          renderItem={({ item }) => (
            <View style={styles.subContainer}>
              <View style={styles.cartItem}>
                <View style={styles.itemImageContainer}>
                  <Image
                    source={{
                      uri: item.product.files[0].url,
                    }}
                    style={styles.itemImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.itemDetails}>
                  <CommonText style={styles.itemName}>
                    {item.product.title}
                  </CommonText>
                  <View style={styles.priceRow}>
                    <CommonText style={styles.discountedPrice}>
                      {Number(item.product.discount) > 0
                        ? discountedPrice(
                            item.product.price,
                            item.product.discount
                          )
                        : item.product.price}
                    </CommonText>
                    {Number(item.product.discount) > 0 && (
                      <CommonText style={styles.actualPrice}>
                        {item.product.price}
                      </CommonText>
                    )}
                    {Number(item.product.discount) > 0 && (
                      <Chip label={item.product.discount} />
                    )}
                  </View>

                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        if (item.count > 1) {
                          dispatch(
                            updateCartItem({
                              product: item.product,
                              count: item.count - 1,
                            })
                          );
                        } else {
                          dispatch(removeCartProduct(item.product.id));
                          Toast.showWithGravity(
                            "Item removed from Cart",
                            Toast.LONG,
                            Toast.BOTTOM
                          );
                        }
                      }}
                    >
                      {item.count === 1 ? (
                        <Trash2
                          size={moderateScale(15)}
                          color={colors.primary}
                        />
                      ) : (
                        <Minus
                          size={moderateScale(15)}
                          color={colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                    <CommonText style={styles.quantityText}>
                      {item.count}
                    </CommonText>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        dispatch(
                          updateCartItem({
                            product: item.product,
                            count: item.count + 1,
                          })
                        )
                      }
                    >
                      <Plus size={moderateScale(15)} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.section}>
                <CommonText style={styles.sectionTitle}>
                  Delivery Status
                </CommonText>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setDeliveryOption("takeaway")}
                  >
                    <View style={styles.radioOuter}>
                      {deliveryOption === "takeaway" && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <CommonText style={styles.radioLabel}>Take away</CommonText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setDeliveryOption("delivery")}
                  >
                    <View style={styles.radioOuter}>
                      {deliveryOption === "delivery" && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <CommonText style={styles.radioLabel}>Delivery</CommonText>
                  </TouchableOpacity>
                </View>
              </View>
              <CommonText style={styles.selectDateText}>
                Select Date & Time for Delivery
              </CommonText>
              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.row}
                  activeOpacity={0.8}
                  onPress={() => showMode("date")}
                >
                  <Calendar color={colors.primary} size={moderateScale(15)} />
                  <CommonText style={styles.dateTimeText}>
                    {formatDate(date)}
                  </CommonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row}
                  activeOpacity={0.8}
                  onPress={() => showMode("time")}
                >
                  <Clock color={colors.primary} size={moderateScale(15)} />
                  <CommonText style={styles.dateTimeText}>
                    {formatTime(time)}
                  </CommonText>
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <CheckBox
                isSelected={addGiftPacking}
                onChange={() => setAddGiftPacking(!addGiftPacking)}
                label="Add Gift Packing"
              />
            </View>
          )}
        />
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
                onPress={() => navigation.navigate("AddressScreen")}
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
              onPress={() => navigation.navigate("PaymentScreen")}
              label="Proceed to Checkout"
            />
          </View>
        </View>
      </ScrollView>
      <DatePicker
        modal
        open={open}
        mode={mode}
        date={date}
        minimumDate={new Date()}
        is24hourSource="locale"
        onConfirm={(date) => {
          setOpen(false);
          if (mode == "date") {
            setDate(date);
          } else {
            setTime(date);
          }
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default CartScreen;
