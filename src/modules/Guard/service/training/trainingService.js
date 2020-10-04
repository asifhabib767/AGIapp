import { api_get_training } from "../../config.json";
import { getToken } from "../tokens/TokenService";
import Axios from "axios";
import { getUserEmail, getUnit } from "../auth/AuthService.js";
import AsyncStorage from "@react-native-community/async-storage";

export async function getTraining() {
  let data = [];
  let unitId = await getUnit();
  try {
    if (api_get_training.length !== 0) {
      await Axios.get(`${api_get_training}`).then((res) => {
        data = res.data.videos;
        console.log("Training data: ", data);
      });
    }
  } catch (error) {
    console.log("Error enter: ", error);
  }
  return data;
}
