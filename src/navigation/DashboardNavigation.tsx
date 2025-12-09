import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AllNavParamList } from "./AllNavParamList";
import { Heart, Home, ShoppingCart, User } from "lucide-react-native";
import HomeScreen from "../views/screens/dashboardScreens/HomeScreen/HomeScreen";
import WishlistScreen from "../views/screens/dashboardScreens/WishlistScreen/WishlistScreen";
import ProfileScreen from "../views/screens/dashboardScreens/ProfileScreen/ProfileScreen";
import CartScreen from "../views/screens/dashboardScreens/CartScreen/CartScreen";
import { colors } from "../utils/colors";
import { moderateScale } from "react-native-size-matters";
import { Fonts } from "../utils/fonts";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductDetailScreen from "../views/screens/dashboardScreens/ProductDetailScreen/ProductDetailScreen";
import PaymentScreen from "../views/screens/dashboardScreens/PaymentScreen/PaymentScreen";
import OrderDetailScreen from "../views/screens/dashboardScreens/OrderDetailScreen/OrderDetailScreen";
import NotificationScreen from "../views/screens/dashboardScreens/NotificationScreen/NotificationScreen";
import AddressScreen from "../views/screens/dashboardScreens/AddressScreen/AddressScreen";
import ChangePassword from "../views/screens/dashboardScreens/ChangePassword/ChangePassword";
import EditProfile from "../views/screens/dashboardScreens/EditProfile/EditProfile";

const Tab = createBottomTabNavigator<AllNavParamList>();
const Stack = createNativeStackNavigator<AllNavParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
    </Stack.Navigator>
  );
};

const WishlistStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="AddressScreen" component={AddressScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

function DashboardNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactiveTabColor,
        freezeOnBlur: true,
        popToTopOnBlur: true,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: moderateScale(80),
          borderTopLeftRadius: moderateScale(20),
          borderTopRightRadius: moderateScale(20),
          position: "absolute",
          overflow: "hidden",
          paddingBottom: 0,
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: Fonts.extraSmallText,
          fontWeight: "500",
          marginTop: moderateScale(15),
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ size, color, focused }) => (
            <>
              {focused ? (
                <View style={[styles.tab, styles.focused]} />
              ) : (
                <View style={styles.tab} />
              )}
              <Home size={size} color={color} strokeWidth={2} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="WishlistStack"
        component={WishlistStack}
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ size, color, focused }) => (
            <>
              {focused ? (
                <View style={[styles.tab, styles.focused]} />
              ) : (
                <View style={styles.tab} />
              )}
              <Heart size={size} color={color} strokeWidth={2} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color, focused }) => (
            <>
              {focused ? (
                <View style={[styles.tab, styles.focused]} />
              ) : (
                <View style={styles.tab} />
              )}
              <User size={size} color={color} strokeWidth={2} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          title: "Cart",
          tabBarIcon: ({ size, color, focused }) => (
            <>
              {focused ? (
                <View style={[styles.tab, styles.focused]} />
              ) : (
                <View style={styles.tab} />
              )}
              <ShoppingCart size={size} color={color} strokeWidth={2} />
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    width: moderateScale(30),
    height: moderateScale(15),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  focused: {
    backgroundColor: colors.primary,
  },
});

export default DashboardNavigation;
