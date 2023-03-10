import { getExampleNumber } from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";
import { countryCode } from "./mobile.js";
//Function to validate email
export let ValidateEmail = (email) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};

//Function to check wheather the 'e' is number key event or not based on 'isNumber' key 
export let IsNumberKey = (e, isNumber) => {
  if (isNumber) {
    if (e.target.value.length <= 10) {
      if (!(e.which >= 48 && e.which <= 57)) e.preventDefault();
    }
  }
};

//Function to check wheather the 'e' is number key event and is down or not.
export let IsNumberKeyDown = (e, isNumber) => {
  if (isNumber) {
    if (e.target.value.length <= 10) {
      if (e.which === 38 || e.which === 40) e.preventDefault();
    }
  }
};

//Function to check wheather the 'e' is text key event or not.
export let IsTextKeyDown = (event, isOnlyText) => {
  var inputValue = event.which;

  if (isOnlyText) {
    if (!((inputValue >= 65 && inputValue <= 90) || (inputValue >= 97 && inputValue <= 122)) && inputValue !== 32 && inputValue !== 0) {
      event.preventDefault();
    }
  }

};
export const changeMobileLimitBasedOnCC = (
  country_dial_code,
  isReturnValueNeeded
) => {
  const selectedCountry = countryCode?.filter(
    (cc) => cc.dial_code === country_dial_code
  );
  const ISO2Code = selectedCountry?.[0]?.code;
  const phoneNumber = getExampleNumber(ISO2Code, examples);
  const limit = phoneNumber?.nationalNumber?.length ?? 10;
  if (isReturnValueNeeded) {
    return limit;
  }
};
export function getMobileLimitBasedOnCC(selectedCountryValue) {
  let mobileNumberLimitBasedOnCC = changeMobileLimitBasedOnCC(
    selectedCountryValue,
    true
  );
  return mobileNumberLimitBasedOnCC;
}                                                       