import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import CommonText from '../../../components/commonText';
import Header from '../../../components/header';
import { getStyles } from './OrderDetailScreen.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AllNavParamList } from '../../../../navigation/AllNavParamList';
import OrderProgressTimeline from '../../../components/orderProgressTimeline';

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  'OrderDetailScreen'
>;

type Props = {
  navigation: NavigationProp;
};

const OrderDetailScreen = ({ navigation }: Props) => {
  const [activeTab, setActiveTab] = useState('active');
  const styles = getStyles();
  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        showNotification={true}
        label={'Orders'}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'active' ? styles.activeTab : styles.inactiveTab,
          ]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('active')}
        >
          <CommonText
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active
          </CommonText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'completed' ? styles.activeTab : styles.inactiveTab,
          ]}
          activeOpacity={0.8}
          onPress={() => setActiveTab('completed')}
        >
          <CommonText
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </CommonText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.flx}
        contentContainerStyle={styles.subContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'active' ? (
          <View style={styles.card}>
            <View style={styles.productBox}>
              <Image
                source={{
                  uri: 'https://t3.ftcdn.net/jpg/16/39/73/78/240_F_1639737832_TlnFAUBrbDJYIYTwYuCM2EV843kgXab5.jpg',
                }}
                style={styles.img}
                resizeMode="contain"
              />
              <View>
                <CommonText style={styles.productName}>Floral Fiona</CommonText>
                <CommonText style={styles.orderIDText}>
                  Order ID: A25FX
                </CommonText>
                <View style={styles.priceRow}>
                  <CommonText style={styles.discountedPrice}>$40.00</CommonText>
                  <CommonText style={styles.actualPrice}>$50.00</CommonText>
                  <View style={styles.trackBox}>
                    <CommonText style={styles.trackText}>
                      Track Order
                    </CommonText>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.buyerBox}>
              <CommonText style={styles.buyerTitle}>Buyer Details</CommonText>
              <View style={styles.buyerRow}>
                <CommonText style={styles.buyerLabel}>Buyer Name:</CommonText>
                <CommonText style={styles.buyerValue}>
                  Fragrance Gift Shop
                </CommonText>
              </View>
              <View style={styles.buyerRow}>
                <CommonText style={styles.buyerLabel}>Tracking ID:</CommonText>
                <CommonText style={styles.buyerValue}>TRK45268492</CommonText>
              </View>
              <View style={styles.buyerRow}>
                <CommonText style={styles.buyerLabel}>
                  Address Details:
                </CommonText>
                <CommonText style={styles.buyerValue}>
                  1234 Elm Street, Springfield, IL 62704, USA
                </CommonText>
              </View>
            </View>
            <View style={styles.divider} />
            <OrderProgressTimeline />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default OrderDetailScreen;
