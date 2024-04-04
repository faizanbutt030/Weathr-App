import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_KEY = 'userLocationStatus';

export const saveLocationStatus = async (status) => {
  try {
    await AsyncStorage.setItem(LOCATION_KEY, JSON.stringify(status));
  } catch (error) {
    console.error('Error saving location status:', error);
  }
};

export const getLocationStatus = async () => {
  try {
    const status = await AsyncStorage.getItem(LOCATION_KEY);
    return JSON.parse(status);
  } catch (error) {
    console.error('Error getting location status:', error);
    return null;
  }
};

export default { saveLocationStatus, getLocationStatus };
