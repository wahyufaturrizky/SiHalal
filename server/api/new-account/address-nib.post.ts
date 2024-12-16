import { NuxtError } from "nuxt/app";
const runtimeConfig = useRuntimeConfig();
export default defineEventHandler(async (event) => {
  const authorizationHeader = getRequestHeader(event, "Authorization");
  if (typeof authorizationHeader === "undefined") {
    throw createError({
      statusCode: 403,
      statusMessage:
        "Need to pass valid Bearer-authorization header to access this endpoint",
    });
  }
  const { daerahId } = await readBody<{ daerahId: string }>(event);
  if (daerahId == "") {
    return {
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
    };
  }
  const province = daerahId.slice(0, 2);
  const district = daerahId.slice(0, 4);
  const subDistrict = daerahId.slice(0, 6);
  const { data } = await $fetch<{ data: RegionData[] }>(
    `${runtimeConfig.coreBaseUrl}/api/list/provinsi`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  const codeProvince = data.find((prov) => prov.code == province);
  const { data: districtData } = await $fetch<{ data: RegionData[] }>(
    `${runtimeConfig.coreBaseUrl}/api/list/provinsi/${province}/kabupaten`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  const codeDistrict = districtData.find((kab) => kab.code == district);
  const { data: subDistrictData } = await $fetch<{ data: RegionData[] }>(
    `${runtimeConfig.coreBaseUrl}/api/list/kabupaten/${district}/kecamatan`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
    }
  ).catch((err: NuxtError) => {
    throw createError({
      statusCode: err.statusCode,
      statusMessage: JSON.stringify(err.data),
    });
  });
  const codeSubDistrict = subDistrictData.find(
    (kec) => kec.code == subDistrict
  );

  return {
    provinsi: codeProvince?.name,
    kabupaten: codeDistrict?.name,
    kecamatan: codeSubDistrict?.name,
  };
});

interface Response {
  code: string;
  message: string;
  data: RegionData[];
}
interface RegionData {
  code: string;
  name: string;
}
