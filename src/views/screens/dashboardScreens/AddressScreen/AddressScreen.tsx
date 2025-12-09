import { useState, useRef, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapPin, Pencil, Plus } from "lucide-react-native";
import { AllNavParamList } from "../../../../navigation/AllNavParamList";
import { getStyles } from "./AddressScreen.styles";
import Header from "../../../components/header";
import CustomTextInput from "../../../components/customInput";
import CommonButton from "../../../components/commonButton";
import CommonText from "../../../components/commonText";
import Container from "../../../components/container";
import { colors } from "../../../../utils/colors";

type NavigationProp = NativeStackNavigationProp<
  AllNavParamList,
  "AddressScreen"
>;
type AddressRouteProp = RouteProp<AllNavParamList, "AddressScreen">;

type Props = {
  navigation: NavigationProp;
  route: AddressRouteProp;
};

type Address = {
  id: string;
  addressLabel: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const STORAGE_KEY = "@gifit:user-addresses";

const AddressScreen = ({ navigation, route }: Props) => {
  const params = route.params;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [addressLabel, setAddressLabel] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const streetAddressRef = useRef<TextInput | null>(null);
  const cityRef = useRef<TextInput | null>(null);
  const stateRef = useRef<TextInput | null>(null);
  const zipCodeRef = useRef<TextInput | null>(null);
  const countryRef = useRef<TextInput | null>(null);

  const styles = getStyles();
  const hasPrefilledFromParams = useRef<boolean>(false);

  const resetForm = useCallback((address?: Address) => {
    setAddressLabel(address?.addressLabel ?? "");
    setStreetAddress(address?.streetAddress ?? "");
    setCity(address?.city ?? "");
    setState(address?.state ?? "");
    setZipCode(address?.zipCode ?? "");
    setCountry(address?.country ?? "");
  }, []);

  const loadAddresses = useCallback(async () => {
    setIsLoadingAddresses(true);
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAddresses(parsed);
        } else {
          setAddresses([]);
        }
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.log("Failed to load saved addresses", error);
      setAddresses([]);
    } finally {
      setIsLoadingAddresses(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadAddresses();
    }, [loadAddresses])
  );

  useEffect(() => {
    if (!isLoadingAddresses && addresses.length === 0) {
      setShowForm(true);
    }
  }, [addresses.length, isLoadingAddresses]);

  useEffect(() => {
    if (isLoadingAddresses || hasPrefilledFromParams.current) {
      return;
    }

    if (params?.addressId) {
      hasPrefilledFromParams.current = true;
      const existingAddress = addresses.find(
        (address) => address.id === params.addressId
      );

      const incomingData: Address = {
        id: params.addressId,
        addressLabel:
          params.addressLabel ?? existingAddress?.addressLabel ?? "",
        streetAddress:
          params.streetAddress ?? existingAddress?.streetAddress ?? "",
        city: params.city ?? existingAddress?.city ?? "",
        state: params.state ?? existingAddress?.state ?? "",
        zipCode: params.zipCode ?? existingAddress?.zipCode ?? "",
        country: params.country ?? existingAddress?.country ?? "",
      };

      setEditingAddressId(incomingData.id);
      resetForm(incomingData);
      setShowForm(true);
    }
  }, [params, addresses, isLoadingAddresses, resetForm]);

  const isFormValid = useCallback(() => {
    return (
      addressLabel.trim() !== "" &&
      streetAddress.trim() !== "" &&
      city.trim() !== "" &&
      state.trim() !== "" &&
      zipCode.trim() !== "" &&
      country.trim() !== ""
    );
  }, [addressLabel, streetAddress, city, state, zipCode, country]);

  const handleAddNew = useCallback(() => {
    setEditingAddressId(null);
    resetForm();
    setShowForm(true);
    hasPrefilledFromParams.current = false;
  }, [resetForm]);

  const handleEdit = useCallback(
    (address: Address) => {
      setEditingAddressId(address.id);
      resetForm(address);
      setShowForm(true);
    },
    [resetForm]
  );

  const handleCancel = useCallback(() => {
    resetForm();
    setEditingAddressId(null);
    if (addresses.length === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [addresses.length, resetForm]);

  const handleSave = useCallback(async () => {
    if (!isFormValid()) {
      return;
    }

    const normalizedAddress: Address = {
      id: editingAddressId ?? params?.addressId ?? Date.now().toString(),
      addressLabel: addressLabel.trim(),
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zipCode.trim(),
      country: country.trim(),
    };

    const hasExistingAddress = addresses.some(
      (address) => address.id === normalizedAddress.id
    );

    const updatedAddresses = hasExistingAddress
      ? addresses.map((address) =>
          address.id === normalizedAddress.id ? normalizedAddress : address
        )
      : [...addresses, normalizedAddress];

    setAddresses(updatedAddresses);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAddresses));
    } catch (error) {
      console.log("Failed to save address", error);
    }

    setEditingAddressId(null);
    resetForm();

    if (updatedAddresses.length === 0) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  }, [
    addresses,
    addressLabel,
    city,
    country,
    editingAddressId,
    isFormValid,
    params?.addressId,
    resetForm,
    state,
    streetAddress,
    zipCode,
  ]);

  return (
    <View style={styles.container}>
      <Header
        label={editingAddressId ? "Edit Address" : "Manage Addresses"}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      <Container contentStyle={styles.content}>
        <View style={styles.contentInner}>
          <View style={styles.section}>
            <CommonText style={styles.sectionTitle}>Saved Addresses</CommonText>
            <CommonText style={styles.sectionSubtitle}>
              Select an address to update it or add a new location.
            </CommonText>
          </View>

          {isLoadingAddresses ? (
            <ActivityIndicator
              color={colors.primary}
              style={styles.loader}
              size="small"
            />
          ) : addresses.length === 0 ? (
            <View style={styles.emptyStateContainer}>
              <CommonText style={styles.emptyStateTitle}>
                No saved addresses yet
              </CommonText>
              <CommonText style={styles.emptyStateSubtitle}>
                Add your first address to make checkout faster.
              </CommonText>
            </View>
          ) : (
            <View style={styles.addressList}>
              {addresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  activeOpacity={0.85}
                  onPress={() => handleEdit(address)}
                  style={[
                    styles.addressCard,
                    editingAddressId === address.id && styles.addressCardActive,
                  ]}
                >
                  <View style={styles.addressCardHeader}>
                    <View style={styles.addressTitleRow}>
                      <MapPin size={18} color={colors.primary} />
                      <CommonText style={styles.addressLabel}>
                        {address.addressLabel || "Untitled"}
                      </CommonText>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleEdit(address)}
                      style={styles.editButton}
                    >
                      <Pencil size={16} color={colors.primary} />
                      <CommonText style={styles.editButtonText}>
                        Edit
                      </CommonText>
                    </TouchableOpacity>
                  </View>

                  <CommonText style={styles.addressText}>
                    {address.streetAddress}
                  </CommonText>
                  <CommonText style={styles.addressText}>
                    {address.city}, {address.state} {address.zipCode}
                  </CommonText>
                  <CommonText style={styles.addressText}>
                    {address.country}
                  </CommonText>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {!isLoadingAddresses && addresses.length > 0 && !showForm && (
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleAddNew}
              style={styles.addAddressButton}
            >
              <Plus size={18} color={colors.primary} />
              <CommonText style={styles.addAddressButtonText}>
                Add New Address
              </CommonText>
            </TouchableOpacity>
          )}

          {showForm && (
            <View style={styles.formContainer}>
              <CommonText style={styles.formTitle}>
                {editingAddressId ? "Update Address" : "Add New Address"}
              </CommonText>

              <CustomTextInput
                label="Address Label"
                placeholder="e.g., Home, Work, Office"
                value={addressLabel}
                onChangeText={setAddressLabel}
                autoCapitalize="words"
                onSubmitEditing={() => streetAddressRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />

              <CustomTextInput
                ref={streetAddressRef}
                label="Street Address"
                placeholder="Enter street address"
                value={streetAddress}
                onChangeText={setStreetAddress}
                autoCapitalize="words"
                autoComplete="street-address"
                multiline={true}
                numberOfLines={3}
                onSubmitEditing={() => cityRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />

              <CustomTextInput
                ref={cityRef}
                label="City"
                placeholder="Enter city"
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
                autoComplete="off"
                onSubmitEditing={() => stateRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />

              <CustomTextInput
                ref={stateRef}
                label="State/Province"
                placeholder="Enter state or province"
                value={state}
                onChangeText={setState}
                autoCapitalize="words"
                autoComplete="off"
                onSubmitEditing={() => zipCodeRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />

              <CustomTextInput
                ref={zipCodeRef}
                label="Zip/Postal Code"
                placeholder="Enter zip or postal code"
                value={zipCode}
                onChangeText={setZipCode}
                keyboardType="numeric"
                autoComplete="postal-code"
                onSubmitEditing={() => countryRef.current?.focus()}
                returnKeyType="next"
                submitBehavior="submit"
              />

              <CustomTextInput
                ref={countryRef}
                label="Country"
                placeholder="Enter country"
                value={country}
                onChangeText={setCountry}
                autoCapitalize="words"
                autoComplete="off"
                returnKeyType="done"
              />

              <CommonButton
                label={editingAddressId ? "Update Address" : "Save Address"}
                fullWidth={true}
                onPress={handleSave}
                disabled={!isFormValid()}
              />

              {addresses.length > 0 && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={handleCancel}
                  style={styles.cancelButton}
                >
                  <CommonText style={styles.cancelButtonText}>
                    Cancel
                  </CommonText>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </Container>
    </View>
  );
};

export default AddressScreen;
