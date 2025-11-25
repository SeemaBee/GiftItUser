import { ImageBackground, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../navigation/AllNavParamList';
import { CommonActions } from '@react-navigation/native';
import { colors } from '../../../utils/colors';
import { styles } from './SplashScreen.styles';
import LinearGradient from 'react-native-linear-gradient';
import { Logo } from '../../../assets/svg';
import { SplashBg } from '../../../assets/png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../../store/slices/authSlice';

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'SplashScreen'
>;

type Props = {
  navigation: NavigationProp;
};

export default function SplashScreen({ navigation }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    let data = await AsyncStorage.getItem('loggedIn');
    let loggedIn = data ? JSON.parse(data) : false;
    if (loggedIn) {
      let userDataString = await AsyncStorage.getItem('userData');

      let token = await AsyncStorage.getItem('authToken');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      if (userData) dispatch(setUser(userData));
      if (token) dispatch(setToken(token));
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Dashboard' }],
          }),
        );
      }, 3000);
    } else {
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          }),
        );
      }, 3000);
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={SplashBg}
        style={styles.image}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['#FFFFFF10', '#FFFFFF', '#FFFFFF10']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.container}
        >
          <Logo />
        </LinearGradient>
      </ImageBackground>
    </>
  );
}
