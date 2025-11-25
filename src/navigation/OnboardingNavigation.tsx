import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllNavParamList } from './AllNavParamList';
import Login from '../views/screens/authenticationScreens/Login/Login';
import SignUp from '../views/screens/authenticationScreens/SignUp/SignUp';
import ForgotPassword from '../views/screens/authenticationScreens/ForgotPassword/ForgotPassword';
import VerifyOtp from '../views/screens/authenticationScreens/VerifyOtp/VerifyOtp';
import ResetPassword from '../views/screens/authenticationScreens/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator<AllNavParamList>();

export default () => {
  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};
