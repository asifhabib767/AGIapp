import {Alert} from 'react-native';
export function RequisitionValidation(
  requisitionType,
  itemName,
  quantity,
  comment,
) {
  // let errorMsg = '';

  let errorMsg = {};

  if (requisitionType === '') {
    errorMsg.requisitionType = 'Please select your Type';
  }
  if (itemName === '') {
    errorMsg.itemName = 'Please Type your Item Name';
  }
  if (quantity === '') {
    errorMsg.quantity = 'Please Type your Quntity';
  }
  if (comment === '') {
    errorMsg.comment = 'Please Type a  comment';
  }

  let requisitionerror = {
    errorMsg: errorMsg,
  };
  //console.log(errorMsg);
  return requisitionerror;
}
