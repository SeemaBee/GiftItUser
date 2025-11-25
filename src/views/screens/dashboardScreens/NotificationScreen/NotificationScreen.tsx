import { View, Text } from 'react-native';
import React from 'react';
import { getStyles } from './NotificationScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Header from '../../../components/header';

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'NotificationScreen'
>;

type Props = {
  navigation: NavigationProp;
};

const NotificationScreen = ({ navigation }: Props) => {
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        showNotification={false}
        label={'Notifications'}
        onBackPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default NotificationScreen;
