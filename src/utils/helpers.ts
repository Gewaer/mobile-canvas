import moment from "moment";
import localization from "moment/locale/es";
import { object } from "prop-types";

// export function dateHourFormat(date){
//     return moment(date).locale("es", localization).format("DD MMM YYYY [a las] hh:mm A")
// }

// export function dateFormat(date){
//     return moment(date).locale("es", localization).format("DD MMM YYYY")
// }

export function normalizeFile(uri: string, type: string, name: string) {
  const file = {
    uri,
    type,
    name
  };
  return file;
}

export function getPercentage(qty: number, percentage: number): number {
  const result = (qty * percentage) / 100;
  return result;
}

export const convertFormData = (object: any) =>
  Object.keys(object).reduce((formData, key) => {
    formData.append(key, object[key]);
    return formData;
  }, new FormData());

export function formatPhoneNumber(phoneNumberString: string): string {
  const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return "";
}
