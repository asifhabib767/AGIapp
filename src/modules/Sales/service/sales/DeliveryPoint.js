import { api_delivery_points } from "../../SalesConfig.json";
import { getToken } from "../../service/tokens/TokenService";
import Axios from "axios";

import { getUserEmail, getUnit } from "../../service/auth/AuthService";
import { getUserId } from "../../../User/util/AuthData";

/**
 * getDeliveryPoints()
 *
 * Get retailer list of that assigned Sales Officer
 * @param int distributorID -> If want to see the retailers of that distributor
 * @return array retailer list
 */
export async function getDeliveryPoints(
  email = null,
  isSortByCustomer = false
) {
  let customerId = await getUserId();
  let unitId = await getUnit();

  let data = [];
  let url = `${api_delivery_points}?query=strEmailAddress="${email}"`;
  if (isSortByCustomer) {
    url = `http://iapps.akij.net/asll/public/api/v1/customer/getCustomerVsShopInfo?intUnitId=${unitId}&intCustomerId=${customerId}`;
  }

  if (api_delivery_points.length !== 0) {
    await Axios.get(url, {
      token: getToken(),
    })
      .then((res) => {
        data = res.data;
        if (isSortByCustomer) {
          data = res.data.data;
        }
      })
      .catch((err) => {
        data = [];
        console.log("err in get customer delivery points", err);
      });

    return data;
  }
}

export async function searchDeliveryPoints(searchText) {
  let data = [];
  let emailAddress = await getUserEmail();

  if (api_delivery_points.length !== 0) {
    await Axios.get(
      `${api_delivery_points}?query=strEmailAddress="${emailAddress}"`,
      {
        token: getToken(),
      }
    ).then((res) => {
      data = res.data;
    });

    return data;
  }
}
