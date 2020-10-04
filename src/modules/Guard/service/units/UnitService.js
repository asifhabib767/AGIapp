import { api_get_units } from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUnit } from "../auth/AuthService.js";

export async function getUnitData() {
  let data = {};
  let unitId = await getUnit();

  if (api_get_units.length !== 0) {
    await Axios.get(`${api_get_units}?id=${unitId}`)
      .then((res) => {
        data = res.data.unit;
      })
      .catch((error) => {
        console.log("Unit data error: ", error);
      });
  }
  return data;
}
