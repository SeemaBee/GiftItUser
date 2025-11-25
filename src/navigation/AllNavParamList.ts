export type AllNavParamList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyOtp: { from: string; email: string };
  ResetPassword: { email: string };
  Dashboard: undefined;
  HomeStack: undefined;
  HomeScreen: undefined;
  ProductDetailScreen: undefined;
  OrderDetailScreen: undefined;
  WishlistScreen: undefined;
  ProfileStack: undefined;
  ProfileScreen: undefined;
  ChangePassword: undefined;
  EditProfile: undefined;
  CartStack: undefined;
  CartScreen: undefined;
  PaymentScreen: undefined;
  NotificationScreen: undefined;
  AddressScreen:
    | {
        addressId?: string;
        addressLabel?: string;
        streetAddress?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
      }
    | undefined;
};
