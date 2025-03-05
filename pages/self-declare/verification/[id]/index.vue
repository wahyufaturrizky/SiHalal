<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const route = useRoute();
const router = useRouter();

const selfDeclareId = (route.params as any).id;

const detailData = ref();
const listPendamping = ref([]);
const isFasilitator = ref<boolean>(false);
const loadingAll = ref(true);
const loadingTandaiOK = ref(false);
const loadingTandaiNotOK = ref(false);
const loadingLihatLaporan = ref(false);
const itemsPabrik = ref([]);
const itemsOutlet = ref([]);
const listKodeDaftarFasilitasi = ref([]);
const listFasilitasi = ref([]);

const handleGetFasilitator = async () => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-fasilitator",
      {
        method: "get",
        query: {
          reg_id: selfDeclareId,
          lokasi: "Kabupaten",
        },
      }
    );

    if (response.code === 2000) {
      listFasilitasi.value = response.data;
      listFasilitasi.value.push({
        id: "Lainnya",
        name: "Lainnya",
      });
      return response;
    }
  } catch (error) {}
};

const tabs = ref([
  { text: "Pelaku Usaha", value: "pelaku_usaha" },
  { text: "Pengajuan", value: "pengajuan" },
  { text: "Pabrik & Outlet", value: "pabrik" },
  { text: "Bahan", value: "bahan" },
  { text: "Produk", value: "produk" },
  { text: "Melacak", value: "melacak" },
  { text: "Proses", value: "proses" },
  { text: "Pernyataan", value: "pernyataan" },
]);

const tab = ref("pelaku_usaha"); // Default selected tab

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const showTimeline = ref(true);
const showDetail = ref(true);
const loadingBahan = ref(false);
const loadingTableProduk = ref(false);

const itemPerPageBahan = ref(10);
const totalItemsBahan = ref(0);
const pageBahan = ref(1);

const itemPerPageTableProduk = ref(10);
const totalItemsTableProduk = ref(0);
const pageTableProduk = ref(1);

const itemPerPagePabrik = ref(10);
const totalItemsPabrik = ref(0);
const pagePabrik = ref(1);
const loadingPabrik = ref(false);

const itemPerPageOutlet = ref(10);
const totalItemsOutlet = ref(0);
const pageOutlet = ref(1);
const loadingOutlet = ref(false);
const lembagaPendamping = ref([]);

const itemPerPageAspekLegal = ref(10);
const totalItemsAspekLegal = ref(0);
const loadingAspekLegal = ref(false);
const pageAspekLegal = ref(1);

const itemPerPagePenyelia = ref(10);
const totalItemsPenyelia = ref(0);
const loadingPenyelia = ref(false);
const pagePenyelia = ref(1);

const dataPengajuanSertifikasiHalal = ref();
const jenisBadanUsahaPenanggungJawab = ref();
const namaPenanggungJawab = ref();
const dataPengajuan = ref();
const dataFormPengajuan = ref();
const nomorKontakPenanggungJawab = ref();
const emailPenanggungJawab = ref();
const aspekLegal = ref();
const penyeliaHalal = ref();
const dokumen = ref();
const listAgama = ref();
const listJenisPendaftaran = ref();
const listJenisLayanan = ref([]);
const listProduk = ref([]);
const dataTracking = ref([]);
const listBahan = ref([]);
const listTableProduk = ref([]);

const defaultStatus = { color: "error", desc: "Unknown Status" };

const statusItem: any = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
    OF11: { color: "success", desc: "Verification" },
    OF50: { color: "success", desc: "Dikirim ke LPH" },
    OF300: { color: "success", desc: "Halal Certified Issued" },
    OF285: { color: "success", desc: "Dikembalikan Oleh Fatwa" },
    OF74: { color: "success", desc: "Sent to Komite Fatwa" },
    OF280: { color: "success", desc: "Dikembalikan Ke PU" },
    OF100: { color: "success", desc: "Selesai Sidang Fatwa" },
    OF120: { color: "success", desc: "Certificate Issued" },
    OF900: { color: "error", desc: "Dibatalkan" },
    OF56: { color: "success", desc: "Pembayaran" },
    OF72: { color: "success", desc: "Verifikasi LP3H" },
    OF71: { color: "success", desc: "Selesai P3H" },
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const formData = reactive({
  id_reg: selfDeclareId,
  jenis_pendaftaran: null,
  id_jenis_pengajuan: null,
  kode_daftar: null,
  no_mohon: null,
  tgl_surat_permohonan: null,
  tgl_mohon: null,
  jenis_layanan: null,
  jenis_produk: null,
  id_jenis_layanan: null,
  id_jenis_produk: null,
  id_fasilitator: null,
  nama_pu: null,
  area_pemasaran: null,
  lokasi_pendamping: "Provinsi",
  lembaga_pendamping: null,
  id_lembaga_pendamping: null,
  pendamping: null,
  id_pendamping: null,
});

const responseType = computed(() => {
  return responseMessage.value == "Kode Fasilitasi dapat digunakan"
    ? "success"
    : "error";
});

const responseColor = computed(() => {
  return responseMessage.value == "Kode Fasilitasi dapat digunakan"
    ? "#5CB338"
    : "#FB4141";
});

const loadItemPabrik = async (
  pageParamPabrik: number,
  sizeParamPabrik: number
) => {
  try {
    loadingPabrik.value = true;

    const response: any = await $api(
      `/self-declare/verificator/pabrik-outlet/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page: pageParamPabrik,
          size: sizeParamPabrik,
          fas_id: "FAPAB",
        },
      }
    );

    if (response.code === 2000) {
      itemsPabrik.value = response?.data || [];
      totalItemsPabrik.value = response?.total_item || 0;
      loadingPabrik.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingPabrik.value = false;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingPabrik.value = false;
  }
};

const loadItemOutlet = async (
  pageParamOutlet: number,
  sizeParamOutlet: number
) => {
  try {
    loadingOutlet.value = true;

    const response: any = await $api(
      `/self-declare/verificator/pabrik-outlet/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page: pageParamOutlet,
          size: sizeParamOutlet,
          fas_id: "FAOUT",
        },
      }
    );
    console.log("@response", response);

    if (response.code === 2000) {
      itemsOutlet.value = response.data || [];
      totalItemsOutlet.value = response.total_item || 0;
      loadingOutlet.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingOutlet.value = false;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingOutlet.value = false;
  }
};

const loadItemAspekLegalById = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  loadingAspekLegal.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/aspek-legal/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      aspekLegal.value = response.data || [];
      totalItemsAspekLegal.value = response.total || 0;
      loadingAspekLegal.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingAspekLegal.value = false;
    }
  } catch (error) {
    loadingAspekLegal.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemPenyeliaById = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  loadingPenyelia.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/penyelia/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      penyeliaHalal.value = response.data || [];
      totalItemsPenyelia.value = response.total || 0;
      loadingPenyelia.value = false;
      return response;
    } else {
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
      loadingPenyelia.value = false;
    }
  } catch (error) {
    loadingPenyelia.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemProdukById = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  loadingTableProduk.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/produk/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      listTableProduk.value = response.data || [];
      totalItemsTableProduk.value = response.total || 0;
      loadingTableProduk.value = false;
      return response;
    } else {
      loadingTableProduk.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loadingTableProduk.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemBahanById = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  loadingBahan.value = true;
  try {
    const response: any = await $api(
      `/self-declare/verificator/bahan/${selfDeclareId}`,
      {
        method: "get",
        params: {
          page,
          size,
        },
      }
    );

    if (response.code === 2000) {
      listBahan.value = response.data || [];
      totalItemsBahan.value = response.total || 0;
      loadingBahan.value = false;
      return response;
    } else {
      loadingBahan.value = false;
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    loadingBahan.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemById = async () => {
  try {
    const response: any = await $api(
      `/self-declare/verificator/${selfDeclareId}`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      const { data } = response || {};
      const {
        certificate_halal,
        penanggung_jawab,
        tracking,
        bahan,
        outlet,
        pabrik,
      } = data || {};
      const { nama_pj, nomor_kontak_pj, email_pj } = penanggung_jawab || {};
      const {
        nama_pu,
        alamat_pu,
        jenis_badan_usaha,
        skala_usaha,
        no_mohon,
        tgl_mohon,
        jenis_pengajuan,
        jenis_layanan,
        jenis_produk,
        area_pemasaran,
        lembaga_pendamping,
        pendamping,
        jenis_daftar,
        fac_id,
        id_channel,
      } = certificate_halal || {};

      dataTracking.value = tracking || [];
      formData.id_fasilitator = response.data.fac_id;

      dataFormPengajuan.value = {
        jenisPendaftaran: jenis_daftar,
        kodeDaftarFasilitasi: fac_id,
        idChannel: id_channel,
        nomorSuratPermohonan: no_mohon,
        jenisLayanan: jenis_layanan,
        jenisProduk: jenis_produk,
        jenisUsaha: jenis_badan_usaha,
        areaPemasaran: area_pemasaran,
        lokasiPendamping: "",
        lembagaPendamping: lembaga_pendamping,
        pendamping: pendamping,
        namaPenanggungJawab: nama_pj,
        tanggalSuratPermohon: formatToISOString(
          tgl_mohon || new Date(new Date().setDate(new Date().getDate() + 1))
        ),
      };

      dataPengajuan.value = [
        // {
        //   label: "No. ID",
        //   value: no_mohon,
        // },
        {
          label: "Tanggal",
          value: formatDate(tgl_mohon),
        },
        {
          label: "Jenis Pengajuan",
          value: jenis_pengajuan,
        },
      ];

      // listBahan.value = bahan || [];

      itemsPabrik.value = pabrik || [];
      totalItemsPabrik.value = pabrik.length || 0;

      itemsOutlet.value = outlet || [];
      totalItemsOutlet.value = outlet.length || 0;

      jenisBadanUsahaPenanggungJawab.value = jenis_badan_usaha;
      namaPenanggungJawab.value = nama_pj;
      nomorKontakPenanggungJawab.value = nomor_kontak_pj;
      emailPenanggungJawab.value = email_pj;

      dataPengajuanSertifikasiHalal.value = [
        {
          label: "Nama",
          value: nama_pu,
        },
        {
          label: "Alamat",
          value: alamat_pu,
        },
        {
          label: "Jenis Badan Usaha",
          value: jenis_badan_usaha,
        },
        {
          label: "Skala Usaha",
          value: skala_usaha,
        },
        {
          label: "Penanggung Jawab",
          value: nama_pj,
        },
      ];

      detailData.value = response.data;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    console.log("@error", error);

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadDocument = async () => {
  try {
    const response: any = await $api("/master/dokumen", {
      method: "get",
    });

    if (response.length > 0) {
      dokumen.value = response;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadAgama = async () => {
  try {
    const response: any = await $api("/master/agama", {
      method: "get",
    });

    if (response.length > 0) {
      listAgama.value = response;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadJenisPendaftaran = async () => {
  try {
    const response: any = await $api("/master/jenis-pendaftaran", {
      method: "get",
    });

    if (response.length > 0) {
      listJenisPendaftaran.value = response;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadJenisLayanan = async () => {
  try {
    const response: any = await $api("/master/jenis-layanan", {
      method: "get",
    });

    if (response.length > 0) {
      listJenisLayanan.value = response;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadJenisProduk = async () => {
  try {
    const response: any = await $api("/master/products", {
      method: "get",
    });

    if (response.length > 0) {
      listProduk.value = response;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadListFasilitasi = async () => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-fasilitator",
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      listKodeDaftarFasilitasi.value = response.data || [];
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleGetLembagaPendampingInitial = async (lokasi: string) => {
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-lembaga-pendamping",
      {
        method: "get",
        query: {
          id_reg: self,
          lokasi,
        },
      }
    );

    if (response.code === 2000) {
      lembagaPendamping.value = response.data;
      return response;
    }
  } catch (error) {
    useSnackbar().sendSnackbar(
      error?.errors?.list_error[0] || "Ada kesalahan",
      "error"
    );
  }
};

const handleGetPendamping = async (idLembaga: string | null) => {
  if (!idLembaga) return;
  try {
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-pendamping",
      {
        method: "get",
        query: {
          id_lembaga: idLembaga,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) listPendamping.value = response.data;
    }

    return response;
  } catch (error) {}
};

const handleGetLembagaPendamping = async (lokasi: string) => {
  try {
    formData.id_lembaga_pendamping = null;
    lembagaPendamping.value = [];
    const response: any = await $api(
      "/self-declare/business-actor/submission/list-lembaga-pendamping",
      {
        method: "get",
        query: {
          id_reg: selfDeclareId,
          lokasi,
        },
      }
    );

    if (response.code === 2000) {
      if (response.data !== null) lembagaPendamping.value = response.data;
    }

    return response;
  } catch (error) {}
};

const loadDataPendamping = async (lokasi: string | null) => {
  if (lokasi) await handleGetLembagaPendamping(lokasi);
};

onMounted(async () => {
  const res: any = await Promise.all([
    loadItemById(),
    loadDocument(),
    handleGetLembagaPendampingInitial(formData.lokasi_pendamping),
    loadAgama(),
    handleGetFasilitator(),
    loadJenisPendaftaran(),
    handleGetPendamping(formData.id_lembaga_pendamping),
    loadJenisLayanan(),
    loadJenisProduk(),
    loadListFasilitasi(),

    onSearchFasilitator(),
  ]);

  if (
    formData.id_fasilitator !== null &&
    !listFasilitasi.value.some(
      (item) => (item as any).id == formData.id_fasilitator
    )
  ) {
    formData.id_fasilitator = "Lainnya";
    onSelectFasilitator("Lainnya");
    onSearchFasilitator();
  }

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) {
    loadingAll.value = false;
  } else {
    loadingAll.value = false;
  }
});

const headersProduk = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "Jumlah Bahan", key: "jumlah_bahan" },
  { title: "Merek", key: "merek" },
  { title: "Verified", key: "verified" },
  // { title: "Action", key: "action" },
];

const bahanTableHeader = [
  { title: "No", key: "no" },
  { title: "Jenis Bahan", key: "jenis_bahan" },
  { title: "Nama Bahan", key: "nama_bahan" },
  { title: "Produsen", key: "produsen" },
  { title: "Tanggal Berlaku", key: "tanggal_berlaku" },
  // { title: "Action", key: "action" },
];

const outletTableHeader = [
  { title: "No", key: "no" },
  // { title: "Jenis Bahan", key: "jenis_outlet" },
  { title: "Nama Bahan", key: "nama" },
  { title: "Alamat", key: "alamat" },
  // { title: "Status", key: "status_milik" },
  // { title: "Action", key: "action" },
];

const pabrikTableHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "Alamat", key: "alamat" },
  // { title: "Status", key: "status_milik" },
  // { title: "Action", key: "action" },
];

const legalTableHeader = [
  { title: "No", key: "no" },
  { title: "Jenis", key: "jenis_surat" },
  { title: "No. Dokumen", key: "no_surat" },
  { title: "Tanggal", key: "tanggal_surat" },
  { title: "Masa Berlaku", key: "masa_berlaku" },
  { title: "Instansi Penerbit", key: "instansi_penerbit" },
];

const penyeliaTableHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "No. Kontak", key: "no_kontak" },
  { title: "Tgl SK", key: "tgl_sk" },
  { title: "No Sertifikat", key: "no_sertikat" },
  { title: "Action", key: "action" },
];

const tandaiOK = async () => {
  try {
    loadingTandaiOK.value = true;

    const res: any = await $api(
      `/self-declare/verificator/tandai-ok/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingTandaiOK.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingTandaiOK.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTandaiOK.value = false;
  }
};

const lihatLaporan = async () => {
  try {
    loadingLihatLaporan.value = true;

    const res: any = await $api(
      `/self-declare/verificator/lihat-laporan-download/${selfDeclareId}`,
      {
        method: "get",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingLihatLaporan.value = false;

      setTimeout(async () => {
        await downloadDocument(res?.data?.file);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingLihatLaporan.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingLihatLaporan.value = false;
  }
};

const batalkanStatusHijau = async () => {
  try {
    loadingTandaiNotOK.value = true;

    const res: any = await $api(
      `/self-declare/verificator/tandai-not-ok/${selfDeclareId}`,
      {
        method: "put",
      }
    );

    if (res?.code === 2000) {
      useSnackbar().sendSnackbar("Success", "success");
      loadingTandaiNotOK.value = false;

      setTimeout(() => {
        router.go(-1);
      }, 1000);
    } else {
      useSnackbar().sendSnackbar(res.errors.list_error.join(", "), "error");
      loadingTandaiNotOK.value = false;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loadingTandaiNotOK.value = false;
  }
};

const lokasiPendamping = ref([
  { title: "Kabupaten", value: "Kabupaten" },
  { title: "Provinsi", value: "Provinsi" },
]);

const querySearch = ref("");
const facName = ref("");
const isKodeFound = ref<boolean>(false);
const isKodeNotFound = ref<boolean>(false);
const responseMessage = ref("");
const responseId = ref("");

const onSearchFasilitator = async () => {
  try {
    facName.value = "";
    const kode = querySearch.value;

    const response: any = await $api("/self-declare/submission/kode", {
      method: "post",
      body: {
        kode,
        id_reg: selfDeclareId,
      },
    });

    if (response.message === "Kode Fasilitasi dapat digunakan") {
      isKodeFound.value = true;
      isKodeNotFound.value = false;
      responseMessage.value = "";
      responseId.value = response.data[0].id;
      facName.value = response.data[0].name;
      console.log("ressponde id", response.data[0].id);
      console.log("responseId ", responseId);
      // formData.id_fasilitator = responseId.value;
      console.log("id fasilitator ", formData.id_fasilitator);
    } else {
      responseMessage.value = response.message;
      isKodeFound.value = false;
      isKodeNotFound.value = true;
    }
    return response;
  } catch (error) {}
};

const onSelectFasilitator = (selectedId: string) => {
  if ((isFasilitator.value = selectedId === "Lainnya")) {
    onSearchFasilitator();
    return;
  }
  isKodeFound.value = false;
};
</script>

<template>
  <VContainer v-if="!loadingAll" class="pa-0">
    <KembaliButton />
    <!-- Title and Buttons Row -->
    <VRow>
      <VCol>
        <p class="text-h4">Detail Pengajuan</p>
      </VCol>
      <VCol class="d-flex justify-end align-center" cols="4" md="5">
        <VBtn
          :loading="loadingLihatLaporan"
          @click="lihatLaporan"
          variant="outlined"
          class="mx-2"
        >
          Lihat Laporan
        </VBtn>
        <VBtn
          :loading="loadingTandaiOK"
          @click="tandaiOK"
          color="#49A84C"
          class="mx-2"
        >
          Tandai OK
        </VBtn>
        <VBtn
          :loading="loadingTandaiNotOK"
          @click="batalkanStatusHijau"
          variant="outlined"
          color="error"
          class="mx-2"
        >
          Batalkan Status Hijau
        </VBtn>
        <!-- <VBtn
          :loading="loadingPengembalian"
          @click="pengembalian"
          variant="outlined"
          class="mx-2"
        >
          Pengembalian
        </VBtn> -->
        <ModalPengembalianSelfDecVer
          :modal-type="'return'"
        ></ModalPengembalianSelfDecVer>
        <ModalPengembalianSelfDecVer
          :modal-type="'reject'"
        ></ModalPengembalianSelfDecVer>
        <!-- <VBtn
          :loading="loadingDibatalkan"
          @click="dibatalkan"
          color="#E1442E"
          class="mx-2"
        >
          Dibatalkan
        </VBtn> -->
      </VCol>
    </VRow>

    <!-- Tabs -->
    <VRow>
      <VCol>
        <VTabs v-model="tab" align-tabs="start" height="60">
          <VTab v-for="item in tabs" :key="item.value" :value="item.value">
            {{ item.text }}
          </VTab>
        </VTabs>
      </VCol>
    </VRow>

    <!-- Tab Content Pelaku Usaha -->
    <VContainer v-if="tab === 'pelaku_usaha'">
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <div
              class="d-flex justify-space-between align-center"
              @click="showDetail = !showDetail"
            >
              <p class="text-h4" style="font-weight: bold">
                Pengajuan Sertifikasi Halal
              </p>
              <VIcon
                :icon="showDetail ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              />
            </div>
            <VExpandTransition>
              <div v-if="showDetail">
                <VCardText>
                  <div class="d-flex flex-column">
                    <!-- Static Details -->
                    <VRow>
                      <VCol
                        v-for="(item, index) in dataPengajuanSertifikasiHalal"
                        :key="index"
                        cols="12"
                      >
                        <div class="info-row">
                          <span class="label">{{ item.label }}</span>
                          <span class="colon">:</span>
                          <span class="value">{{ item.value }}</span>
                        </div>
                      </VCol>
                    </VRow>
                  </div>
                </VCardText>
              </div>
            </VExpandTransition>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <p class="text-h4" style="font-weight: bold">Penanggung Jawab</p>
            <!-- Nama Usaha -->
            <!-- <VCol cols="12">
              <VLabel class="required"> Jenis Badan Usaha </VLabel>
              <VTextField
                v-model="jenisBadanUsahaPenanggungJawab"
                required
                placeholder="Jenis Badan Usaha"
              />
            </VCol> -->
            <VCol cols="12">
              <VLabel class="required"> Nama </VLabel>
              <VTextField
                v-model="namaPenanggungJawab"
                required
                placeholder="Nama"
                disabled
              />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Nomor Kontak </VLabel>
              <VTextField
                v-model="nomorKontakPenanggungJawab"
                required
                placeholder="Nomor Kontak"
                disabled
              />
            </VCol>
            <VCol cols="12">
              <VLabel class="required"> Email </VLabel>
              <VTextField
                v-model="emailPenanggungJawab"
                required
                placeholder="Email"
                disabled
              />
            </VCol>
          </VCard>
        </VCol>
      </VRow>
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Aspek Legal</p>
              </VCol>
              <!-- <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahDataAspekLegal
                  mode="add"
                  :dokumen="dokumen"
                  @refresh="
                    loadItemAspekLegalById({
                      page: pageAspekLegal,
                      size: itemPerPageAspekLegal,
                    })
                  "
                />
              </VCol> -->
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPageAspekLegal"
                  v-model:page="pageAspekLegal"
                  :headers="legalTableHeader"
                  :items="aspekLegal"
                  :loading="loadingAspekLegal"
                  :items-length="totalItemsAspekLegal"
                  loading-text="Loading..."
                  @update:options="
                    loadItemAspekLegalById({
                      page: pageAspekLegal,
                      size: itemPerPageAspekLegal,
                    })
                  "
                >
                  <template #item.no="{ index }">
                    {{
                      index + 1 + (pageAspekLegal - 1) * itemPerPageAspekLegal
                    }}
                  </template>
                  <template #item.tanggal_surat="{ item }">
                    {{ formatDate((item as any).tanggal_surat) }}
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Penyelia Halal</p>
              </VCol>
              <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <!-- <TambahDataPenyeliaHalal
                  @refresh="
                    loadItemPenyeliaById({
                      page: pagePenyelia,
                      size: itemPerPagePenyelia,
                    })
                  "
                  mode="add"
                  :listagama="listAgama"
                /> -->
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPagePenyelia"
                  v-model:page="pagePenyelia"
                  :headers="penyeliaTableHeader"
                  :items="penyeliaHalal"
                  :loading="loadingPenyelia"
                  :items-length="totalItemsPenyelia"
                  loading-text="Loading..."
                  @update:options="
                    loadItemPenyeliaById({
                      page: pagePenyelia,
                      size: itemPerPagePenyelia,
                    })
                  "
                >
                  <template #item.no="{ index }">
                    {{ index + 1 + (pagePenyelia - 1) * itemPerPagePenyelia }}
                  </template>
                  <template #item.tgl_sk="{ item }">
                    {{ formatDate((item as any).tgl_sk) }}
                  </template>
                  <!-- <template #item.action="{ item }">
                    <div class="d-flex gap-1">
                      <VBtn variant="text" elevation="0">
                        <VIcon
                          mode="edit"
                          icon="ri-delete-bin-fill"
                          color="#E1442E"
                        />
                      </VBtn>
                    </div>
                  </template> -->
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
      <!-- <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <h3 class="text-h4 font-weight-bold">
                  Dokumen Persyaratan Fasilitas
                </h3>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VRow>
                  <VCol>
                    <VAlert
                      type="warning"
                      variant="tonal"
                      color="#652672"
                      density="compact"
                    >
                      <p>
                        File yang digunakan dengan extention XLSX, PDF, PNG dan
                        Maksimal 50mb
                      </p>
                    </VAlert>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  :headers="headersDokumenPersyaratanFasilitas"
                  :items="itemsDokumenPersyaratanFasilitas"
                  :loading="loading"
                  :hide-default-footer="true"
                  loading-text="Loading..."
                  items-per-page="2"
                  page="1"
                  :items-length="2"
                >
                  <template #item.id="{ index }">
                    {{ index + 1 + (page - 1) * itemPerPage }}
                  </template>
                  <template #item.nama="{ item }">
                    {{ item.nama }}
                  </template>
                  <template #item.doc="{ item }">
                    <div>
                      <HalalFileInput />
                    </div>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow> -->
    </VContainer>

    <!-- Tab Content Pengajuan -->
    <PengajuanMainSelfDeclareVerifikator
      :hide-kode-fasilitasi="dataFormPengajuan?.idChannel === 'CH004'"
      v-if="tab === 'pengajuan'"
    />

    <!-- Tab Content Pabrik dan Outlet -->
    <VContainer v-if="tab === 'pabrik'">
      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Pabrik</p>
              </VCol>
              <!-- <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahPabrikOutlet mode="add" />
              </VCol> -->
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPagePabrik"
                  v-model:page="pagePabrik"
                  :headers="pabrikTableHeader"
                  :items="itemsPabrik"
                  :items-length="totalItemsPabrik"
                  :hide-default-footer="true"
                  :loading="loadingPabrik"
                  loading-text="Loading..."
                  @update:options="
                    loadItemPabrik(pagePabrik, itemPerPagePabrik)
                  "
                >
                  <template #item.no="{ index }">
                    {{ index + 1 + (pagePabrik - 1) * itemPerPagePabrik }}
                  </template>
                  <template #item.action="{ item }">
                    <div class="d-flex gap-1">
                      <VBtn variant="text" elevation="0">
                        <VIcon
                          mode="edit"
                          icon="ri-delete-bin-fill"
                          color="#E1442E"
                        />
                      </VBtn>
                    </div>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VCard variant="flat" class="pa-4">
            <VRow>
              <VCol>
                <p class="text-h3">Outlet</p>
              </VCol>
              <!-- <VCol class="d-flex justify-end align-center" cols="6" md="2">
                <TambahOutlet mode="add" />
              </VCol> -->
            </VRow>
            <VRow>
              <VCol>
                <VDataTableServer
                  v-model:items-per-page="itemPerPageOutlet"
                  v-model:page="pageOutlet"
                  :headers="outletTableHeader"
                  :items="itemsOutlet"
                  :items-length="totalItemsOutlet"
                  :hide-default-footer="true"
                  @update:options="
                    loadItemOutlet(pageOutlet, itemPerPageOutlet)
                  "
                  loading-text="Loading..."
                  :loading="loadingOutlet"
                >
                  <template #item.no="{ index }">
                    {{ index + 1 + (pageOutlet - 1) * totalItemsOutlet }}
                  </template>
                  <template #item.action="{ item }">
                    <div class="d-flex gap-1">
                      <VBtn variant="text" elevation="0">
                        <VIcon
                          mode="edit"
                          icon="ri-delete-bin-fill"
                          color="#E1442E"
                        />
                      </VBtn>
                    </div>
                  </template>
                </VDataTableServer>
              </VCol>
            </VRow>
          </VCard>
        </VCol>
      </VRow>
    </VContainer>

    <!-- Tab Content Bahan -->
    <VContainer v-if="tab === 'bahan'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
            </VCol>
            <VCol class="d-flex justify-end align-center" cols="0" md="2">
              <!-- <TambahBahanModalHalal
                @refresh="
                  loadItemBahanById({ page: pageBahan, size: itemPerPageBahan })
                "
                mode="add"
              /> -->
              <!-- <VContainer>
                <VBtn
                  color="primary"
                  variant="outlined"
                  class="d-flex align-center"
                  @click="triggerFileInputClick"
                >
                  <VIcon size="20"> ri-upload-line </VIcon>
                  <span class="ml-2">Upload File</span>
                </VBtn>

                <input
                  ref="fileInputRef"
                  type="file"
                  style="display: none"
                  accept=".pdf,.doc,.docx"
                  @change="handleFileUpload"
                />
              </VContainer> -->
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VAlert type="warning" variant="tonal" color="#652672">
                <ol>
                  <li>
                    1. Termasuk isikan bahan dengan kategori cleaning agent
                    seperti: Air, Sabun Pencuci, Detergent, dll
                  </li>
                  <li>
                    2. Isikan nama kemasan produk, contoh: Alumunium foil,
                    standing pouch, plastik, dll
                  </li>
                </ol>
              </VAlert>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                v-model:items-per-page="itemPerPageBahan"
                v-model:page="pageBahan"
                :headers="bahanTableHeader"
                :items="listBahan"
                :loading="loadingBahan"
                :items-length="totalItemsBahan"
                loading-text="Loading..."
                @update:options="
                  loadItemBahanById({ page: pageBahan, size: itemPerPageBahan })
                "
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (pageBahan - 1) * itemPerPageBahan }}
                </template>
                <template #item.jenis_bahan="{ item }">
                  {{
                    (item as any).jenis_bahan.replace(
                      /(uncertified|certified)\|/,
                      ""
                    )
                  }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <UbahBahanModalHalal />
                  </div>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VContainer>

    <!-- Tab Content Produk -->
    <VContainer v-if="tab === 'produk'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <VRow>
            <VCol>
              <p class="text-h3">Daftar Nama Bahan dan Kemasan</p>
              <ol>
                <li>
                  Termasuk isikan bahan dengan kategori cleaning agent seperti:
                  Air, Sabun Pencuci, Detergent, dll
                </li>
                <li>
                  Isikan nama kemasan produk, contoh: Alumunium foil, standing
                  pouch, plastik, dll
                </li>
              </ol>
            </VCol>
            <!-- <VCol class="d-flex justify-end align-center" cols="6" md="2">
              <TambahProdukSelfDeclareVerifikator
                @refresh="
                  loadItemProdukById({
                    page: pageTableProduk,
                    size: itemPerPageTableProduk,
                  })
                "
                mode="add"
              />
            </VCol> -->
          </VRow>
          <VRow>
            <VCol>
              <VDataTableServer
                v-model:items-per-page="itemPerPageTableProduk"
                v-model:page="pageTableProduk"
                :headers="headersProduk"
                :items="listTableProduk"
                :loading="loadingTableProduk"
                :items-length="totalItemsTableProduk"
                loading-text="Loading..."
                @update:options="
                  loadItemProdukById({
                    page: pageTableProduk,
                    size: itemPerPageTableProduk,
                  })
                "
              >
                <template #item.no="{ index }">
                  {{
                    index + 1 + (pageTableProduk - 1) * itemPerPageTableProduk
                  }}
                </template>
                <template #item.verified="{ item }">
                  {{ (item as any).verified ? "Sudah" : "Belum" }}
                </template>
                <template #item.action="{ item }">
                  <div class="d-flex gap-1">
                    <UbahProduk
                      mode="edit"
                      icon="ri-pencil-fill"
                      :show-label="false"
                      color="#652672"
                    />
                  </div>
                </template>
              </VDataTableServer>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VContainer>

    <!-- Tab Content Melacak -->
    <VContainer v-if="tab === 'melacak'">
      <VCol>
        <VCard variant="flat" class="pa-4">
          <div
            class="d-flex justify-space-between align-center"
            @click="showTimeline = !showTimeline"
          >
            <p class="text-h4">Pengajuan Sertifikasi Halal</p>
            <VIcon
              :icon="showTimeline ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            />
          </div>
          <VExpandTransition>
            <div v-if="showTimeline">
              <VTimeline
                side="end"
                align="start"
                line-inset="9"
                truncate-line="start"
                density="compact"
                class="v-timeline--variant-outlined"
              >
                <VTimelineItem
                  v-for="(
                    { status, username, tanggal, comment }, i
                  ) in dataTracking"
                  :key="i"
                  dot-color="rgb(var(--v-theme-surface))"
                  size="x-small"
                >
                  <template #icon>
                    <VIcon icon="ri-circle-line" color="primary" size="16" />
                  </template>
                  <div
                    class="d-flex justify-space-between align-center gap-2 flex-wrap mb-2"
                  >
                    <span class="app-timeline-title">
                      {{ statusItem[status].desc }}
                    </span>
                    <span class="app-timeline-meta">{{
                      formatDate(tanggal)
                    }}</span>
                  </div>
                  <div class="app-timeline-text mt-1">
                    {{ username }}
                  </div>
                  <div v-if="comment" class="app-timeline-text mt-1">
                    {{
                      (comment as any).length > 38
                        ? (comment as any).slice(0, 38) + "..."
                        : (comment as any)
                    }}
                  </div>
                </VTimelineItem>
              </VTimeline>
            </div>
          </VExpandTransition>
        </VCard>
      </VCol>
    </VContainer>

    <VContainer v-if="tab === 'proses'">
      <EditProsesProdukHalalSelfDeclareSubmission :is-verificator="true" />
    </VContainer>

    <VContainer v-if="tab === 'pernyataan'">
      <EditPernyataanSelfDeclareSubmision :is-verificator="true" />
    </VContainer>
  </VContainer>

  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />
</template>

<style lang="scss">
.custom-file-input {
  .v-field--append {
    padding-inline-end: 0 !important;
  }
}
</style>

<style scoped>
.v-card {
  border: none !important;
  box-shadow: none !important;
}

.v-timeline {
  padding-inline-start: 0;
}

:deep(.v-timeline-item__body) {
  padding-block: 12px;
  padding-inline: 0;
}

:deep(.v-timeline-item__dot) {
  margin-inline-end: 16px;
}

.info-row {
  display: flex;
  align-items: center;
}

.label {
  min-width: 300px; /* Adjust this value based on the longest label */
  font-weight: 500;
}

.colon {
  margin: 0 8px; /* Space between colon and value */
}

.value {
  flex: 1;
  text-align: left;
}

.required::after {
  color: red;
  content: "*";
}

:deep .choose-file {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-right: 0;
  scroll-margin-inline-end: 0;
}
</style>
