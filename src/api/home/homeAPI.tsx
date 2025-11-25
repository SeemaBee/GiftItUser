import NetInfo from '@react-native-community/netinfo';
import apiClient from '../apiClient';
import { ENDPOINTS } from '../apiUrls';

export const formatErrorMessages = (
  errorObj: Record<string, string | string[]>,
): string => {
  if (!errorObj || typeof errorObj !== 'object') return '';

  const fields = Object.keys(errorObj);
  if (fields.length === 0) return '';

  // If there's only one error, return it as-is
  if (fields.length === 1) {
    const singleError = errorObj[fields[0]];
    return Array.isArray(singleError) ? singleError[0] : singleError;
  }

  // For multiple errors, merge into one readable message
  const firstMsg = Array.isArray(errorObj[fields[0]])
    ? (errorObj[fields[0]] as string[])[0]
    : (errorObj[fields[0]] as string);

  // Remove extra word (address, number, etc.)
  const baseMessage = firstMsg.replace(/^(This|The)\s+\w+(?:\s+\w+)?\s+/i, '');

  // Combine fields into readable string
  const formattedFields =
    fields.length === 1
      ? fields[0]
      : `${fields.slice(0, -1).join(', ')} and ${fields.slice(-1)}`;

  return `The ${formattedFields} ${baseMessage}`;
};

export const getProducts = async ({
  category_id,
  keyword,
  location,
}: {
  category_id?: number;
  keyword?: string;
  location?: string;
} = {}) => {
  const netState = await NetInfo.fetch();

  if (!netState.isConnected) {
    throw new Error('No internet connection');
  }

  const params: Record<string, any> = {};

  if (category_id) params.category_id = category_id;
  if (keyword) params.keyword = keyword;
  if (location) params.date_to = location;

  try {
    const response = await apiClient.get(ENDPOINTS.products, {
      params,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response.status === 422) {
      let errors = error?.response?.data?.errors;
      let newErr = formatErrorMessages(errors);
      throw new Error(newErr);
    } else {
      throw new Error(error?.response?.data?.message ?? 'Something went wrong');
    }
  }
};
