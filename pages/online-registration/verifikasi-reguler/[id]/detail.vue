<script setup lang="ts">
interface AspekLegal {
  id_reg_legal: string;
  jenis_surat: string;
  no_surat: string;
  tanggal_surat: string;
  masa_berlaku: string;
  instansi_penerbit: string;
}

interface CertificateHalal {
  id_reg: string;
  tanggal_buat: string;
  no_mohon: string;
  tgl_mohon: string;
  jenis_layanan: string;
  id_jenis_layanan: string;
  jenis_produk: string;
  id_jenis_produk: string;
  merk_dagang: string;
  area_pemasaran: string;
  lph_id: string;
  nama_lph: string;
  pendamping: string;
  id_pendamping: string;
  lembaga_pendamping: string;
  id_lembaga_pendamping: string;
  nama_kbli: string;
  nama_pu: string;
  alamat_pu: string;
  kota_pu: string;
  negara_pu: string;
  telp_pu: string;
  jenis_badan_usaha: string;
  id_jenis_badan_usaha: string;
  tingkat_usaha: string;
  modal_usaha: number;
  provinsi_pu: string;
  kode_pos_pu: string;
  email: string;
  skala_usaha: string;
  asal_usaha: string;
  url_sample_penyelia_sk: string;
  no_daftar: string;
  tgl_daftar: string;
  nama_provinsi: string;
  jenis_pengajuan: string;
  id_jenis_pengajuan: string;
  status: string;
  channel: string;
  id_channel: string;
  fasilitator_name: string;
  narasi: string;
  lph: Lph;
}

interface Lph {
  lph_id: string;
  no_reg: string;
  nama_pimpinan: string;
  nama_lph: string;
  email: string;
  provinsi: string;
}

interface Outlet {
  id_outlet: string;
  nama_outlet: string;
  alamat_outlet: string;
  status_milik: string;
}

interface Pabrik {
  id_pabrik: string;
  nama_pabrik: string;
  alamat_pabrik: string;
  status_milik: string;
}

interface PenanggungJawab {
  nama_pj: string;
  nomor_kontak_pj: string;
  email_pj: string;
}

interface PenyeliaHalal {
  penyelia_id: string;
  penyelia_nama: string;
  no_ktp: string;
  no_kontak: string;
  no_penyelia_halal: string;
  tgl_penyelia_halal: string;
  no_sk: string;
  tanggal_sk: string;
  file_spph: string;
  file_skph: string;
  file_ktp: string;
}

interface Produk {
  id_reg_prod: string;
  reg_publish: boolean;
  nama_produk: string;
  photo: string;
  jumlah_bahan: number;
  daftar_bahan: any;
}

const tabs = ref(0);

const props = defineProps({
  tabPengajuanEditable: {
    type: Boolean,
    default: false,
  },
  tabKomitmenEditable: {
    type: Boolean,
    default: false,
  },
  tabBahanEditable: {
    type: Boolean,
    default: false,
  },
  tabProsesEditable: {
    type: Boolean,
    default: false,
  },
  tabProdukEditable: {
    type: Boolean,
    default: false,
  },
  tabPemantauanEditable: {
    type: Boolean,
    default: false,
  },
  tabDokumenEditable: {
    type: Boolean,
    default: false,
  },
  headingEditPage: {
    type: String,
    required: false,
    default: "Detail Pengajuan Reguler",
  },
});
const certHalal = ref<CertificateHalal>({
  id_reg: "",
  tanggal_buat: "",
  no_mohon: "",
  tgl_mohon: "",
  jenis_layanan: "",
  id_jenis_layanan: "",
  jenis_produk: "",
  id_jenis_produk: "",
  merk_dagang: "",
  area_pemasaran: "",
  lph_id: "",
  nama_lph: "",
  pendamping: "",
  id_pendamping: "",
  lembaga_pendamping: "",
  id_lembaga_pendamping: "",
  nama_kbli: "",
  nama_pu: "",
  alamat_pu: "",
  kota_pu: "",
  negara_pu: "",
  telp_pu: "",
  jenis_badan_usaha: "",
  id_jenis_badan_usaha: "",
  tingkat_usaha: "",
  modal_usaha: 0,
  provinsi_pu: "",
  kode_pos_pu: "-",
  email: "",
  skala_usaha: "",
  asal_usaha: "",
  url_sample_penyelia_sk: "",
  no_daftar: "",
  tgl_daftar: "",
  nama_provinsi: "",
  jenis_pengajuan: "",
  id_jenis_pengajuan: "",
  status: "",
  channel: "",
  id_channel: "",
  fasilitator_name: "",
  narasi: "",
  lph: {
    lph_id: "",
    no_reg: "",
    nama_pimpinan: "",
    nama_lph: "",
    email: "",
    provinsi: "",
  },
});
const dataDetail = ref<DetailVerifikatorReguler>({
  aspek_legal: [],
  certificate_halal: {
    id_reg: "",
    tanggal_buat: "",
    no_mohon: "",
    tgl_mohon: "",
    jenis_layanan: "",
    id_jenis_layanan: "",
    jenis_produk: "",
    id_jenis_produk: "",
    merk_dagang: "",
    area_pemasaran: "",
    lph_id: "",
    nama_lph: "",
    pendamping: "",
    id_pendamping: "",
    lembaga_pendamping: "",
    id_lembaga_pendamping: "",
    nama_kbli: "",
    nama_pu: "",
    alamat_pu: "",
    kota_pu: "",
    negara_pu: "",
    telp_pu: "",
    jenis_badan_usaha: "",
    id_jenis_badan_usaha: "",
    tingkat_usaha: "",
    modal_usaha: 0,
    provinsi_pu: "",
    kode_pos_pu: "-",
    email: "",
    skala_usaha: "",
    asal_usaha: "",
    url_sample_penyelia_sk: "",
    no_daftar: "",
    tgl_daftar: "",
    nama_provinsi: "",
    jenis_pengajuan: "",
    id_jenis_pengajuan: "",
    status: "",
    channel: "",
    id_channel: "",
    fasilitator_name: "",
    narasi: "",
    lph: {
      lph_id: "",
      no_reg: "",
      nama_pimpinan: "",
      nama_lph: "",
      email: "",
      provinsi: "",
    },
  },
  outlet: [],
  pabrik: [],
  penyelia_halal: [],
  produk: [],
});
const route = useRoute();
const getDetail = async () => {
  try {
    const response = await $api("/reguler/pelaku-usaha/detail", {
      method: "get",
      params: {
        id: route.params.id,
      },
    });
    if (response.code != 2000) {
      navigateTo("/online-registration/verifikasi-reguler");
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    // dataDetail.value = response.data;
    response.data.certificate_halal.tgl_mohon = response.data.certificate_halal.tgl_mohon != '' ?formatToISOString(
      response.data.certificate_halal.tgl_mohon : ''
    );
    useMyVerifikatorRegulerStore().setData(response.data);
  } catch (error) {
    navigateTo("/online-registration/verifikasi-reguler");
    useSnackbar().sendSnackbar("ada kesalahan", "error");
    return;
  }
};
onMounted(async () => {
  tabs.value = 0;
  await getDetail();
});
</script>
<template>
  <KembaliButton />
  <p class="text-h2 font-weight-bold mb-4">{{ props.headingEditPage }}</p>
  <VTabs v-model="tabs" align-tabs="start" class="mb-4">
    <VTab value="1">Data Pengajuan</VTab>
    <VTab value="2">Komitmen dan Tanggung Jawab </VTab>
    <VTab value="3">Bahan</VTab>
    <VTab value="4">Proses</VTab>
    <VTab value="5">Produk</VTab>
    <VTab value="6">Pemantauan dan Evaluasi</VTab>
    <VTab value="7">Dokumen</VTab>
  </VTabs>
  <VTabsWindow v-model="tabs">
    <br />
    <VTabsWindowItem value="1">
      <EditDataPengajuanRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="2">
      <EditKomitmenDanTanggungJawabRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="3">
      <EditBahanRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="4">
      <EditProsesRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="5">
      <EditProdukRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="6">
      <EditPemantauanDanEvaluasiRegulerVerifikator />
    </VTabsWindowItem>

    <VTabsWindowItem value="7">
      <EditDokumenRegulerVerifikator />
    </VTabsWindowItem>
  </VTabsWindow>
</template>
