import { isEmpty, isEmptyArray, isNullOrUndefined } from "./helpers";

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return "Kolom ini wajib diisi";

  return !!String(value).trim().length || "Kolom ini wajib diisi";
};

// 👉 Email Validator
export const emailValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) ||
      "Kolom Email harus berisi email yang valid"
    );

  return re.test(String(value)) || "Kolom Email harus berisi email yang valid";
};

// 👉 Password Validator
export const passwordValidator = (password: string) => {
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/;

  const validPassword = regExp.test(password);

  return (
    validPassword ||
    "Kolom harus mengandung minimal satu huruf besar, satu huruf kecil, satu karakter khusus, dan satu angka, dengan panjang minimal 8 karakter"
  );
};

// 👉 Confirm Password Validator
export const confirmedValidator = (value: string, target: string) =>
  value === target || "Konfirmasi Kata Sandi tidak sesuai";

// 👉 Between Validator
export const betweenValidator = (value: unknown, min: number, max: number) => {
  const valueAsNumber = Number(value);

  return (
    (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) ||
    `Masukkan angka antara ${min} dan ${max}`
  );
};

// 👉 Integer Validator
export const integerValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  if (Array.isArray(value))
    return (
      value.every((val) => /^-?[0-9]+$/.test(String(val))) ||
      "Kolom ini harus berupa angka"
    );

  return /^-?[0-9]+$/.test(String(value)) || "Kolom ini harus berupa angka";
};

// 👉 Regex Validator
export const regexValidator = (
  value: unknown,
  regex: RegExp | string,
  message: string
): string | boolean => {
  if (isEmpty(value)) return true;

  let regeX = regex;
  if (typeof regeX === "string") regeX = new RegExp(regeX);

  if (Array.isArray(value))
    return value.every((val) => regexValidator(val, regeX));

  return regeX.test(String(value)) || "Format kolom Regex tidak valid";
};
export const phoneNumberIdValidator = (value: unknown): string | boolean => {
  if (isEmpty(value)) return true;

  let regeX = /^08\d{8,11}$/;
  if (typeof regeX === "string") regeX = new RegExp(regeX);

  return (
    regeX.test(String(value)) ||
    "Nomor Hp harus diawali 08 dan diantara 10-13 digit"
  );
};

// 👉 Alpha Validator
export const alphaValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  return (
    /^[A-Z]*$/i.test(String(value)) ||
    "Kolom Alpha hanya boleh berisi karakter alfabet"
  );
};

// 👉 URL Validator
export const urlValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const re = /^(https?):\/\/[^\s$.?#].[^\s]*$/;

  return re.test(String(value)) || "URL tidak valid";
};

// 👉 Length Validator
export const lengthValidator = (value: unknown, length: number) => {
  if (isEmpty(value)) return true;

  return (
    String(value).length === length ||
    `Kolom Minimal Karakter harus memiliki ${length} karakter`
  );
};

// 👉 Alpha-dash Validator
export const alphaDashValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const valueAsString = String(value);

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || "Semua karakter tidak valid";
};

// 👉 File Size Validator
export const fileSizeValidator = (value: unknown) => {
  return !value || value.size > 2_097_152 || "File maksimal 2MB";
};
