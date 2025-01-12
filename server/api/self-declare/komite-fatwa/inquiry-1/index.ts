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
    filterBy,
    searchQuery,
    jenisPermohonan,
    statusPermohonan,
    wilayah,
    kabupaten,
    fasilitas,
    namaFasilitator,
    download
  } = (await getQuery(event)) as {
    page: string;
    size: string;
    selectedFilterProduk: string;
    selectedFilterFasilitasi: string;
    selectedFilterLembaga: string;
    selectedFilterPendamping: string;
    filterBy: string;
    searchQuery: string;
    jenisPermohonan: string;
    statusPermohonan: string;
    wilayah: string;
    kabupaten: string;
    fasilitas: string;
    namaFasilitator: string;
    download : boolean;
  };

  const params: any = {
    page: Number.isNaN(Number.parseInt(page, 10))
      ? 1
      : Number.parseInt(page, 10),
    size: Number.isNaN(Number.parseInt(size, 10))
      ? 10
      : Number.parseInt(size, 10),
    filter_by: "nama_pu",
  };

  if (selectedFilterProduk !== "")
    params["jenis_produk"] = selectedFilterProduk;
  if (selectedFilterLembaga !== "") params["lembaga"] = selectedFilterLembaga;
  if (selectedFilterPendamping !== "")
    params["pendamping"] = selectedFilterPendamping;
  if (selectedFilterFasilitasi !== "")
    params["fasilitas"] = selectedFilterFasilitasi;
  if (searchQuery !== "") params["filter_value"] = searchQuery;
  if (jenisPermohonan !== "") params["jenisPermohonan"] = jenisPermohonan;
  if (statusPermohonan !== "") params["status_permohonan"] = statusPermohonan;
  if (wilayah !== "" && wilayah !== undefined)
    params["wilayah"] = wilayah.toUpperCase();
  if (kabupaten !== "" && kabupaten !== undefined)
    params["kabupaten"] = kabupaten.toUpperCase();
  if (fasilitas !== "") params["fasilitas"] = fasilitas;
  if (namaFasilitator !== "") params["fasilitator"] = namaFasilitator;
  if (filterBy !== undefined) params["filter_by"] = filterBy;
  if (download) params['download'] = download;

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
