import {Alert} from 'react-native';
export function fuelEntryValidation(
  vehileId,
  fromDate,
  fuelTypeId,
  qty,
  meDetails,
  price,
  fuelTypeItem,
) {
  console.log('fuel type item', typeof fuelTypeId);
  console.log('fuel type id', fuelTypeItem);
  if (vehileId == '') {
    Alert.alert('Error', ' জাহাজের নাম লিখুন');
    return false;
  } else if (fromDate == '') {
    Alert.alert('Error', 'তারিখ লিখুন');
    return false;
  } else if (Object.keys(fuelTypeItem).length === 0) {
    Alert.alert('Error', 'জ্বালানির ধরণ নির্বাচন করুন');
    return false;
  } else if (qty == '') {
    Alert.alert('Error', 'জ্বালানির পরিমান লিখুন');
    return false;
  }
  return true;
}
