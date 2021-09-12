import axios from "axios";
import { QuoteType } from "../interfaces/QuoteInterface"

export const fetchQuotes = async (): Promise<QuoteType[]> => {
  return axios
    .get('https://type.fit/api/quotes')
    .then(res => {
      return res.data;
    });
}