import {
  api_post_requisition,
  api_get_requisitions,
  api_get_requisition_items,
} from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUnit, getEmployeeID } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";
import { Actions } from "react-native-router-flux";
import { Alert } from "react-native";

export async function postRequisition(
  strRequisitionType,
  strItem,
  numQuantity,
  strPromotionItemImagePath,
  strComments,
  outlet,
  itemData
) {
  // console.log('Parameter value: ',strRequisitionType, strItem, numQuantity, strPromotionItemImagePath, strComments)
  let outletResponse = "";
  let intRequisitionType;
  let intOutletID = outlet.intOutletID;
  let strOutletName = outlet.strOutletName;
  let intItem = 0;
  if (itemData.length > 0) {
    intItem = itemData.intID;
  } else {
    intItem = 0;
  }

  let intInsertBy = await getEmployeeID();
  let intUnitID = await getUnit();

  if (strRequisitionType == "Company") {
    intRequisitionType = 1;
  } else {
    intRequisitionType = 2;
  }

  if (strPromotionItemImagePath.length == 0) {
    strPromotionItemImagePath = "test";
  }

  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    "Content-Type": "application/json",
  };

  let url = `${api_post_requisition}?intRequisitionType=${intRequisitionType}&strRequisitionType=${strRequisitionType}&intOutletID=${intOutletID}&strOutletName=${strOutletName}&intItem=${intItem}&strItem=${strItem}&numQuantity=${numQuantity}&strPromotionItemImagePath=${strPromotionItemImagePath}&strComments=${strComments}&intInsertBy=${intInsertBy}&intUnitID=${intUnitID}`;
  await Axios.post(url, {}, { headers: headersData })

    .then((response) => {
      outletResponse = response.data;
      if (outletResponse.length != 0) {
        Alert.alert("Success", "Requisition Added !");
        Actions.ContactList({ page: "Requisition" });
      } else {
        // Alert.alert('Error', 'Please fill all the data and try again !');
      }
    })
    .catch((error) => {
      console.log("url", url);
    });

  return outletResponse;
}

export async function getRequisitions(intOutletID) {
  // console.log('Parameter value: ',strRequisitionType, strItem, numQuantity, strPromotionItemImagePath, strComments)
  let outletResponse = "";

  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    "Content-Type": "application/json",
  };

  let url = `${api_get_requisitions}?intUnitID=${intOutletID}`;
  await Axios.get(url, { headers: headersData })

    .then((response) => {
      outletResponse = response.data;
    })
    .catch((error) => {
      console.log("url", url);
    });

  return outletResponse;
}

export async function getRequisitionItems() {
  let requisitionItemResponse = "";
  let intUnitID = await getUnit();

  let headersData = {
    Authorization: `bearer ${await getToken()}`,
    "Content-Type": "application/json",
  };

  // return [{"intID":1,"strName":"Shop Sign"},{"intID":2,"strName":"Dashboard"},{"intID":3,"strName":"LED Shop Sign"},{"intID":4,"strName":"Refrigerator"}];

  let url = `${api_get_requisition_items}?intID=${intUnitID}`;
  await Axios.get(url, { headers: headersData })

    .then((response) => {
      requisitionItemResponse = response.data;
    })
    .catch((error) => {
      console.log("url", url);
    });

  return requisitionItemResponse;
}
