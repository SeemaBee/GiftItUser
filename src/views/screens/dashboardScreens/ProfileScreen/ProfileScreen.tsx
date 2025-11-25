import { View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { getStyles } from './ProfileScreen.styles';
import CommonText from '../../../components/commonText';
import CommonButton from '../../../components/commonButton';
import CommonOutlineButton from '../../../components/outlineButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../../../store/slices/authSlice';
import { CommonActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import { logoutApi } from '../../../../api/auth/authAPI';
import { RootState } from '../../../../store/store';
import { IMAGE_URL } from '../../../../api/apiUrls';
import { CircleUserRound } from 'lucide-react-native';
import { moderateScale } from 'react-native-size-matters';
import Loader from '../../../components/loader';

type NavigationProp = BottomTabNavigationProp<AllNavParamList, 'ProfileScreen'>;

type Props = {
  navigation: NavigationProp;
};

const ProfileScreen = ({ navigation }: Props) => {
  const styles = getStyles();
  const [showLoader, setShowLoader] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [gender, setGender] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      if (user.image?.startsWith('http')) {
        setImage(user.image);
      } else {
        let img = IMAGE_URL + user.image;
        setImage(img);
      }
      switch (user.gender?.toString()) {
        case '1':
          setGender('Male');
          break;
        case '2':
          setGender('Female');
          break;
        case '3':
          setGender('Other');
          break;
        default:
          setGender('Not Selected');
          break;
      }
    }
  }, [user]);

  const onLogoutPress = () => {
    Alert.alert('Gift It', 'Are you sure you want to logout?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => handleLogout() },
    ]);
  };

  const handleLogout = async () => {
    setShowLoader(true);
    try {
      await logoutApi();
      dispatch(logout());
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key !== 'loginDetails');
      if (keysToRemove.length > 0) {
        await AsyncStorage.multiRemove(keysToRemove);
      }
      Toast.showWithGravity('Logged out', Toast.LONG, Toast.BOTTOM);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        }),
      );
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <CommonText style={styles.headerTitle}> My Profile</CommonText>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            {image == null ? (
              <CircleUserRound
                size={moderateScale(140)}
                strokeWidth={moderateScale(1)}
              />
            ) : (
              <Image
                source={{
                  uri: image,
                }}
                style={styles.profileImage}
              />
            )}
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Full Name:</CommonText>
          <CommonText style={styles.value}>{user.name}</CommonText>
        </View>
        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Email Address:</CommonText>
          <View>
            <CommonText style={styles.value}>{user.email}</CommonText>
            <CommonText style={styles.link}>Change Email Address</CommonText>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Password:</CommonText>
          <View>
            <CommonText style={styles.value}>XXXXXXXXXX</CommonText>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <CommonText style={styles.link}>Change Password</CommonText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Phone Number:</CommonText>
          <CommonText style={styles.value}>
            {user.country_code} {user.phone_no}
          </CommonText>
        </View>

        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Gender:</CommonText>
          <CommonText style={styles.value}>{gender}</CommonText>
        </View>

        <View style={styles.fieldContainer}>
          <CommonText style={styles.label}>Unique ID:</CommonText>
          <CommonText style={styles.value}>{user.user_name}</CommonText>
        </View>

        <CommonButton
          label="Edit Profile"
          fullWidth={true}
          onPress={() => navigation.navigate('EditProfile')}
        />
        <CommonOutlineButton
          label="Logout"
          fullWidth={true}
          onPress={() => onLogoutPress()}
        />
        <View style={styles.footer}>
          <TouchableOpacity>
            <CommonText style={styles.footerLink}>Privacy Policy</CommonText>
          </TouchableOpacity>
          <CommonText style={styles.footerSeparator}>|</CommonText>
          <TouchableOpacity>
            <CommonText style={styles.footerLink}>
              Terms & Conditions
            </CommonText>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {showLoader && <Loader show={showLoader} />}
    </View>
  );
};

export default ProfileScreen;
