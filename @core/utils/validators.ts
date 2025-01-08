import { isEmpty, isEmptyArray, isNullOrUndefined } from "./helpers";

// 👉 Required Validator
export const requiredValidator = (value: unknown) => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false)
    return "Kolom ini wajib diisi";

  return !!String(value).trim().length || "Kolom ini wajib diisi";
};

// HSCODE validator
export const hsCodeValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const re = /^\d{4}\.\d{2}\.\d{2}$/;

  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) ||
      "Kolom HS Code hanya berisi angka dan titik berformat 0000.00.00"
    );

  return (
    re.test(String(value)) ||
    "Kolom HS Code hanya berisi angka dan titik berformat 0000.00.00"
  );
};
export const hsCodeDescValidator = (value: unknown) => {
  if (isEmpty(value)) return true;

  const re = /^[a-zA-Z0-9 .,]+$/;

  if (Array.isArray(value))
    return (
      value.every((val) => re.test(String(val))) ||
      "Kolom HS Code Desc hanya berisi alphanumeric, spasi, (.), (,)"
    );

  return (
    re.test(String(value)) ||
    "Kolom HS Code Desc hanya berisi alphanumeric, spasi, (.), (,)"
  );
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
  console.log("file attribute = ", value[0]);
  if (value[0].size > 2097152) {
    return "File maksimal 2MB";
  }
  return true;
};

export const fileExtensionValidator = (value: unknown) => {
  // use this reference for allowed extension: https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
  let file = value;
  if (Array.isArray(value)) {
    file = value[0];
  }
  console.log("file attribute = ", value[0].type);
  const allowedFileExtensionList = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];
  const result = useArrayIncludes(allowedFileExtensionList, file.type).value;
  // console.log("file extension match = ", result);
  if (result) {
    return true;
  }
  return "File extension not allowed";
};
export const fileExtensionTypeValidator = (
  value: unknown,
  allowed: string[] = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "application/pdf",
  ]
) => {
  // use this reference for allowed extension: https://developer.mozilla.org/en-US/docs/Web/HTTP/MIME_types/Common_types
  let file = value;
  if (Array.isArray(value)) {
    file = value[0];
  }
  console.log("file attribute = ", value[0].type);
  const result = useArrayIncludes(allowed, file.type).value;
  // console.log("file extension match = ", result);
  if (result) {
    return true;
  }
  return "File extension not allowed";
};

export const fileNameLengthValidator = (value: unknown) => {
  console.log("file attribute = ", value[0].name);
  if (value[0].name.length > 77) {
    return "File name too long";
  }
  return true;
};
