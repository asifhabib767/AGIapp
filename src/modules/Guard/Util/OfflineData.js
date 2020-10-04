import AsyncStorage from "@react-native-community/async-storage";

/**
 * getAsyncData()
 *
 * Get Async function data
 *
 * @param {string} async_key
 * @return the async value against a key
 */
export async function getAsyncData(async_key) {
  try {
    const value = await AsyncStorage.getItem(async_key);
    if (value !== null) {
      return value;
    }
    if (value === null) {
      if (async_key === "system_lang") {
        return "bn";
      }
    }
  } catch (error) {
    console.log("Error in getting async data: ", error);
  }
  return null;
}
