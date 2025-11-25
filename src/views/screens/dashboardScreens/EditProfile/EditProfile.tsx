import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getStyles } from './EditProfile.styles';
import Header from '../../../components/header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Container from '../../../components/container';
import { Camera, CircleUserRound } from 'lucide-react-native';
import ImagePickerModal from '../../../components/imagePickerModal';
import CustomTextInput from '../../../components/customInput';
import CommonDropDown from '../../../components/commonDropDown';
import CommonButton from '../../../components/commonButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { phoneRegex } from '../../../../utils/regex';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { colors } from '../../../../utils/colors';
import { moderateScale } from 'react-native-size-matters';
import {
  deleteProfileImage,
  editProfileApi,
  updateProfileImage,
} from '../../../../api/profile/profileAPI';
import { userType } from '../../../../utils/constants';
import { setUser } from '../../../../store/slices/authSlice';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../components/loader';
import {
  Asset,
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { IMAGE_URL } from '../../../../api/apiUrls';

type NavigationProp = NativeStackNavigationProp<AllNavParamList, 'EditProfile'>;

type Props = {
  navigation: NavigationProp;
};

const genderData = [
  { label: 'Male', value: '1' },
  { label: 'Female', value: '2' },
  { label: 'Other', value: '3' },
];

const EditProfile = ({ navigation }: Props) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const styles = getStyles();

  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    phoneNumber: Yup.string()
      .matches(phoneRegex, 'Invalid phone number')
      .required('Required'),
    gender: Yup.string().required('Required'),
  });

  useEffect(() => {
    if (user.image?.startsWith('http')) {
      setImage(user.image);
    } else {
      let img = IMAGE_URL + user.image;
      setImage(img);
    }
  }, []);

  const onCameraOpen = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 1080,
      maxHeight: 1080,
      quality: 0.2,
      saveToPhotos: false,
    };
    const result = await launchCamera(options);
    if (result.didCancel) {
    }
    const asset: Asset | undefined = result.assets?.[0];
    if (!asset || !asset.uri) {
      return;
    }
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? asset.uri
            : asset.uri.replace('file://', ''),
        name: asset.fileName || 'profileImage.jpg',
        type: asset.type || 'image/jpeg',
      });
      setShowImagePicker(false);
      const { data } = await updateProfileImage(formData, userType);
      if (data) {
        Toast.showWithGravity('Image Updated', Toast.LONG, Toast.BOTTOM);
        setImage(IMAGE_URL + data.image);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        dispatch(setUser(data));
      }
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      console.error('Error in open camera:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const onGalleryOpen = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      maxWidth: 1080,
      maxHeight: 1080,
      quality: 0.2,
      saveToPhotos: false,
    };

    const result = await launchImageLibrary(options);
    if (result.didCancel) {
    }
    const asset: Asset | undefined = result.assets?.[0];
    if (!asset || !asset.uri) {
      return;
    }
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? asset.uri
            : asset.uri.replace('file://', ''),
        name: asset.fileName || 'profileImage.jpg',
        type: asset.type || 'image/jpeg',
      });
      setShowImagePicker(false);
      const { data } = await updateProfileImage(formData, userType);
      if (data) {
        setImage(IMAGE_URL + data.image);
        Toast.showWithGravity('Image Updated', Toast.LONG, Toast.BOTTOM);
        await AsyncStorage.setItem('userData', JSON.stringify(data));
        dispatch(setUser(data));
      }
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      console.error('Error in open gallery:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleDeletePress = async () => {
    setShowImagePicker(false);
    setShowLoader(true);
    try {
      let data = await deleteProfileImage(userType);
      if (data) {
        Toast.showWithGravity(
          'Profile Image removed',
          Toast.LONG,
          Toast.BOTTOM,
        );
        const updatedUser = {
          ...user,
          image: null,
        };
        dispatch(setUser(updatedUser));
        setImage(null);
      }
    } catch (error) {
      console.error('Error in delete profile image:', error);
    } finally {
      setShowLoader(false);
    }
  };

  const handleSubmit = async (values: any, actions: any) => {
    Keyboard.dismiss();
    setShowLoader(true);
    try {
      let data = {
        name: values.name,
        phone_no: values.phoneNumber,
        country_code: user.country_code,
        gender: values.gender,
        userType: userType,
        email: user.email,
      };
      let response = await editProfileApi(data);
      if (response) {
        Toast.showWithGravity('Profile updated', Toast.LONG, Toast.BOTTOM);
        await AsyncStorage.setItem(
          'userData',
          JSON.stringify(response.data.user_detail),
        );
        dispatch(setUser(response.data.user_detail));
        navigation.goBack();
      }
    } catch (error: any) {
      Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        label={'Edit Profile'}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={{
          name: user.name,
          phoneNumber: user.phone_no,
          gender: user.gender,
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
          values,
          errors,
          touched,
        }) => {
          return (
            <Container contentStyle={styles.contentStyle}>
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
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowImagePicker(true)}
                    style={styles.cameraIconContainer}
                  >
                    <Camera
                      size={moderateScale(16)}
                      color={colors.white}
                      strokeWidth={moderateScale(2)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <CustomTextInput
                label="Fullname"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name ? errors.name : ''}
                keyboardType="default"
              />
              <CustomTextInput
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={touched.phoneNumber ? errors.phoneNumber : ''}
                keyboardType={Platform.select({
                  ios: 'number-pad',
                  android: 'numeric',
                })}
              />
              <CommonDropDown
                label="Gender"
                data={genderData}
                initialValue={
                  genderData.find(
                    item => item.value === values.gender?.toString(),
                  ) || null
                }
                onSelect={val => setFieldValue('gender', val)}
                placeHolderText="Select your gender"
                error={touched.gender ? errors.gender : ''}
              />
              <CommonButton
                label="Save Changes"
                onPress={() => handleSubmit()}
                fullWidth={true}
              />
            </Container>
          );
        }}
      </Formik>
      {showImagePicker && (
        <ImagePickerModal
          showPicker={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          hasImage={true}
          onCameraPress={() => onCameraOpen()}
          onGalleryPress={() => onGalleryOpen()}
          onDeletePress={() => handleDeletePress()}
        />
      )}
      {showLoader && <Loader show={showLoader} />}
    </View>
  );
};

export default EditProfile;
