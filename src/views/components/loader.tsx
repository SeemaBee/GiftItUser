import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import CommonText from './commonText';
import { colors } from '../../utils/colors';

type Props = {
  show: boolean;
  text?: string;
};
const Loader = ({ show, text = 'Loading...' }: Props) => {
  return (
    <ReactNativeModal
      isVisible={show}
      hasBackdrop={true}
      onBackdropPress={() => {}}
      onBackButtonPress={() => {}}
      style={{ margin: 0 }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View
          style={{
            padding: moderateScale(10),
            borderRadius: moderateScale(5),
            backgroundColor: colors.white,
          }}
        >
          <ActivityIndicator size={'large'} color={colors.black} />
          <CommonText style={{ marginTop: moderateScale(10) }}>
            {text}
          </CommonText>
        </View>
      </View>
    </ReactNativeModal>
  );
};

export default Loader;
