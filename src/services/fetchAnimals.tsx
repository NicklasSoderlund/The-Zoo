import axios from "axios";
import { IApiResponse } from "../models/IApiResponse";

export async function apiCall() {
   let response = await axios.get("https://animals.azurewebsites.net/api/animals")
   return response.data as IApiResponse[]
  }

