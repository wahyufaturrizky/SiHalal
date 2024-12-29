import type { NuxtError } from "nuxt/app";

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

  const {
    page,
    size,
    selectedFilterProduk,
    selectedFilterFasilitasi,
    selectedFilterLembaga,
    selectedFilterPendamping,
    searchQuery,
    jenisPermohonan,
    statusPermohonan,
    wilayah,
    kabupaten,
    fasilitas,
    namaFasilitator,
  } = (await getQuery(event)) as {
    page: string;
    size: string;
    selectedFilterProduk: string;
    selectedFilterFasilitasi: string;
    selectedFilterLembaga: string;
    selectedFilterPendamping: string;
    searchQuery: string;
    jenisPermohonan: string;
    statusPermohonan: string;
    wilayah: string;
    kabupaten: string;
    fasilitas: string;
    namaFasilitator: string;
  };

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10))
      ? 1
      : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10))
      ? 10
      : Number.parseInt(size, 10),
  };

  if (selectedFilterProduk !== "")
    params["jenis_produk"] = selectedFilterProduk;
  if (selectedFilterLembaga !== "") params["lembaga"] = selectedFilterLembaga;
  if (selectedFilterPendamping !== "")
    params["pendamping"] = selectedFilterPendamping;
  if (selectedFilterFasilitasi !== "")
    params["fasilitas"] = selectedFilterFasilitasi;
  if (searchQuery !== "") params["keywords"] = searchQuery;
  if (jenisPermohonan !== "") params["jenisPermohonan"] = jenisPermohonan;
  if (statusPermohonan !== "") params["status_permohonan"] = statusPermohonan;
  if (wilayah !== "") params["wilayah"] = wilayah;
  if (kabupaten !== "") params["kabupaten"] = kabupaten;
  if (fasilitas !== "") params["fasilitas"] = fasilitas;
  if (namaFasilitator !== "") params["fasilitator"] = namaFasilitator;

  console.log(params);
  const data = await $fetch<any>(
    `${runtimeConfig.coreBaseUrl}/api/v1/komite/halal-certificate-reguler/self-declare/inquiry`,
    {
      method: "get",
      headers: { Authorization: authorizationHeader },
      params,
    }
  ).catch((err: NuxtError) => {
    setResponseStatus(event, 400);

    return err.data;
  });

  return data || null;
});
