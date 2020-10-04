import {Alert} from 'react-native';
export function MarketInsightValidation(
    itemType,
    itemName,
    comment,
    tags,
) {
  // let errorMsg = '';

  let errorMsg = {};

  if (itemType.value == "") {
    errorMsg.itemType = 'Please select your Type';
  }
  if (itemName === '') {
    errorMsg.itemName = 'Please Type your Item Name';
  }
  if (comment === '') {
    errorMsg.comment = 'Please Type a  comment';
  }
  if (tags === '') {
    errorMsg.tags = 'Please Type your Tag';
  }

  let requisitionerror = {
    errorMsg: errorMsg,
  };
  //console.log(errorMsg);
  return requisitionerror;
}
