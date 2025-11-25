import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { getStyles } from './PaymentScreen.styles';
import Header from '../../../components/header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import Container from '../../../components/container';
import CustomTextInput from '../../../components/customInput';
import CheckBox from '../../../components/checkBox';
import CommonButton from '../../../components/commonButton';

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'PaymentScreen'
>;

type Props = {
  navigation: NavigationProp;
};

const PaymentScreen = ({ navigation }: Props) => {
  const [saveCard, setSaveCard] = useState(false);
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        showNotification={false}
        label={'Payment Method'}
        onBackPress={() => navigation.pop()}
        onNotificationPress={() => navigation.navigate('NotificationScreen')}
      />
      <Container contentStyle={styles.subContainer}>
        <CustomTextInput label="Card Holder Name" value="" />
        <CustomTextInput label="Card Number" value="" />
        <View style={styles.row}>
          <CustomTextInput
            label="Expiry Date"
            value=""
            boxStyle={{ width: '45%' }}
          />
          <CustomTextInput label="CVV" value="" boxStyle={{ width: '45%' }} />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            isSelected={saveCard}
            onChange={() => setSaveCard(!saveCard)}
            label="Save Card"
          />
        </View>
        <CommonButton
          label="Confirm Payment"
          onPress={() => navigation.navigate('OrderDetailScreen')}
          fullWidth={true}
        />
      </Container>
    </View>
  );
};

export default PaymentScreen;
