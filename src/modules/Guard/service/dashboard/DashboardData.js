import { api_target_data } from "../../config.json";
import { getToken } from "../../service/tokens/TokenService";
import Axios from "axios";
import { getUserEmail } from "../../service/auth/AuthService";

export async function getTargetData(fromDate, toDate) {
  let email = await getUserEmail();
  let data = [];

  if (api_target_data.length !== 0) {
    await Axios.get(
      `${api_target_data}?dteFormDateDelivery=${fromDate}&dteToDateForDelivery=${toDate}&strEmailAddress=${email}`,
      {
        token: getToken(),
      }
    ).then((res) => {
      data = res.data;
    });
    return data;
  }
}
