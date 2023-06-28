import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';
import * as yup from 'yup';

const phoneUtil = PhoneNumberUtil.getInstance();

// Create a Yup schema for the form
const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
});

export async function validatePhoneNumber(phoneNumber: any, countryCode: any) {
  try {
    // Validate the form data with the Yup schema
    await schema.validate({ phoneNumber, countryCode });

    if (countryCode) {
      //   const number = phoneUtil.parse(countryCode.dial_code + phoneNumber);
      const number = phoneUtil.parse(countryCode.dial_code + phoneNumber, countryCode.code);
      if (phoneUtil.isValidNumber(number)) {
        const formatted = phoneUtil.format(number, PhoneNumberFormat.INTERNATIONAL);
        return { isValid: true, formatted };
      } else {
        return { isValid: false };
      }
    }
  } catch (error) {
    return { isValid: false, error: (error as Error).message };
  }
}
