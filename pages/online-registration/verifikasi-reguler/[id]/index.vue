<script lang="ts" setup>
import AspekLegal from "@/components/selfDeclare/verifikasi/AspekLegal.vue";
import DaftarNamaProdukSelfDeclare from "@/components/selfDeclare/verifikasi/DaftarNamaProdukSelfDeclare.vue";
import PenanggungJawabUsaha from "@/components/selfDeclare/verifikasi/PenanggungJawabUsaha.vue";
import Penyelia from "@/components/selfDeclare/verifikasi/Penyelia.vue";
import ProfilPengajuan from "@/components/selfDeclare/verifikasi/ProfilPengajuan.vue";
import SertifikatHalal from "@/components/selfDeclare/verifikasi/SertifikatHalal.vue";
import SHLNVerfikasiLayout from "@/layouts/SHLNVerfikasiLayout.vue";

interface DetailVerifikatorReguler {
  aspek_legal: AspekLegal[];
  melacak: any[];
  outlet: Outlet;
  pabrik: Pabrik;
  pemeriksaan: Pemeriksaan;
  penanggung_jawab: PenanggungJawab;
  s;
  pendaftaran: Pendaftaran;
  penyelia: Penyelia[];
  produk: Produk[];
  sertifikasi_halal: SertifikasiHalal;
  sertifikat: Sertifikat;
  sidang_fatwa: SidangFatwa;
}
interface AspekLegal {
  instansi_penerbit: string;
  jenis: string;
  masa_berlaku: any;
  no_dokumen: string;
  tanggal: string;
}
interface Penyelia {
  nama: string;
  no_kontak: string;
  no_ktp: string;
  no_sertifikat: string;
  no_sk: string;
  tgl_sertifikat: string;
  tgl_sk: string;
}
interface Produk {
  jenis_produk: string;
  kelas_produk: string;
  layanan_produk: string;
  nama_produk: string;
  publikasi: boolean;
  rincian_prooduk: string;
}

interface Outlet {
  id_pabrik: string;
  id_reg: string;
  id_fas: string;
  fasil_id: string;
  nama: string;
  kab_kota: string;
  provinsi: string;
  negara: string;
  kode_pos: string;
  alamat: string;
  status_milik: string;
}

interface Pabrik {
  id_pabrik: string;
  id_reg: string;
  id_fas: string;
  fasil_id: string;
  nama: string;
  kab_kota: string;
  provinsi: string;
  negara: string;
  kode_pos: string;
  alamat: string;
  status_milik: string;
}

interface Pemeriksaan {
  dokumen: string;
  hasil: string;
  lph: string;
  tgl_selesai_lph: string;
}

interface PenanggungJawab {
  email_pj: string;
  nama_pj: string;
  no_kontak_pj: string;
}

interface Pendaftaran {
  channel_pendaftaran: string;
  fasilitator: string;
  jenis_pengajuan: string;
  kode_fac: string;
  nomor_daftar: string;
  status: string;
  tanggal: string;
  tempat_pendaftaran: string;
}

interface SertifikasiHalal {
  alamat_pu: string;
  area_pemasaran: string;
  asal_usaha: string;
  email: string;
  id_reg: string;
  jenis_layanan: string;
  jenis_produk: string;
  jenis_usaha: string;
  kode_pos_pu: string;
  kota_pu: string;
  merek_dagang: string;
  modal_usaha: number;
  nama_kbli: string;
  nama_pu: string;
  "nama_pu_sh ": string;
  negara_pu: string;
  no_mohon: string;
  no_telp: string;
  prov_pu: string;
  skala_usaha: string;
  tanggal: string;
  tgl_daftar: string;
  tingkat_usaha: string;
}

interface Sertifikat {
  no_sertifikat: string;
  tgl_sertifikat: string;
}

interface SidangFatwa {
  dokumen: string;
  nomor_penetapan: string;
  penetapan: string;
  tanggal_penetapan: string;
}

const panelOpenPengajuan = ref(0);
const panelOpenPenanggungJawab = ref(0);
const panelOpenAspekLegal = ref(0);
const panelOpenPabrik = ref(0);
const panelOpenOutlet = ref(0);
const panelOpenPenyelia = ref(0);
const panelOpenProduk = ref(0);

const openPanelRegisterData = ref(0);
const loading = ref(false);
const loadingTracking = ref(false);
const loadingDetailRegistration = ref(false);
const data = ref();
const dataDetailRegistration = ref();
const dataTracking = ref();

const showConfirmation = ref(false);
const showReturn = ref(false);
const returnNote = ref("");

const openConfirmation = () => (showConfirmation.value = true);
const closeConfirmation = () => (showConfirmation.value = false);

const openReturn = () => (showReturn.value = true);
const closeReturn = () => (showReturn.value = false);

const submitData = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/approve", {
      method: "post",
      body: {
        id_reg: route.params.id,
        keterangan: "",
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan", "error");
      return;
    }
    closeConfirmation();
    navigateTo("/online-registration/verifikasi-reguler");
    useSnackbar().sendSnackbar("Berhasil memverifikasi data", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan", "error");
  }
};
const router = useRouter();
const route = useRoute();
const navigateAction = () => navigateTo(`${route.path}/detail`);
const returnDocument = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/decline", {
      method: "post",
      body: {
        id_reg: route.params.id,
        keterangan: returnNote.value,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan", "error");
      return;
    }
    closeReturn();
    navigateTo("/online-registration/verifikasi-reguler");
    useSnackbar().sendSnackbar("Berhasil mengembalikan data", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan", "error");
  }
};
const refVForm = ref<VForm>();
const rejectSubmission = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) returnDocument();
  });
};

const dataDetail = ref<DetailVerifikatorReguler>({
  aspek_legal: [],
  melacak: [],
  outlet: [],
  pabrik: [],
  pemeriksaan: {
    dokumen: "",
    hasil: "",
    lph: "",
    tgl_selesai_lph: "",
  },
  penanggung_jawab: {
    email_pj: "",
    nama_pj: "",
    no_kontak_pj: "",
  },
  pendaftaran: {
    channel_pendaftaran: "",
    fasilitator: "",
    jenis_pengajuan: "",
    kode_fac: "",
    nomor_daftar: "",
    status: "",
    tanggal: "",
    tempat_pendaftaran: "",
  },
  penyelia: [],
  produk: [],
  sertifikasi_halal: {
    alamat_pu: "",
    area_pemasaran: "",
    asal_usaha: "",
    email: "",
    id_reg: "",
    jenis_layanan: "",
    jenis_produk: "",
    jenis_usaha: "",
    kode_pos_pu: "-",
    kota_pu: "",
    merek_dagang: "",
    modal_usaha: 0,
    nama_kbli: "",
    nama_pu: "",
    "nama_pu_sh ": "",
    negara_pu: "",
    no_mohon: "",
    no_telp: "",
    prov_pu: "",
    skala_usaha: "",
    tanggal: "",
    tgl_daftar: "",
    tingkat_usaha: "",
  },
  sertifikat: {
    no_sertifikat: "",
    tgl_sertifikat: "",
  },
  sidang_fatwa: {
    dokumen: "",
    nomor_penetapan: "",
    penetapan: "",
    tanggal_penetapan: "",
  },
});
const getDetail = async () => {
  try {
    loading.value = true;
    const response = await $api("/reguler/verifikator/detail", {
      method: "post",
      body: {
        id_reg: route.params.id,
      },
    });
    if (response.code != 2000) {
      navigateTo("/online-registration/verifikasi-reguler");
      useSnackbar().sendSnackbar("ada kesalahan", "error");
      return;
    }
    dataDetail.value = response.data;
  } catch (error) {
    navigateTo("/online-registration/verifikasi-reguler");
    useSnackbar().sendSnackbar("ada kesalahan", "error");
    return;
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  await getDetail();
});
</script>

<template>
  <SHLNVerfikasiLayout v-if="!loading">
    <template #pageTitle>
      <VRow>
        <VCol style="display: flex; justify-content: start"
          ><h2>Verifikasi Dokumen Pengajuan: Detail</h2></VCol
        >
        <VCol class="d-flex justify-end ga-4">
          <VBtn text="Pengembalian" color="#e1442e" @click="openReturn" />
          <VBtn
            variant="outlined"
            text="Cek Detail"
            color="primary"
            @click="navigateAction"
          />
          <VBtn text="Verifikasi" @click="openConfirmation" />
        </VCol>
      </VRow>
    </template>

    <!-- left content -->
    <template #leftContent>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPengajuan">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Profil Pengajuan</h2>
              </VExpansionPanelTitle>

              <VExpansionPanelText>
                <ProfilPengajuan :data="dataDetail.sertifikasi_halal" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPenanggungJawab">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Penanggung Jawab</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <PenanggungJawabUsaha :data="dataDetail.penanggung_jawab" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenAspekLegal">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Aspek Legal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <AspekLegal :data="dataDetail.aspek_legal" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPabrik">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pabrik</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pabrik :data="dataDetail.pabrik" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenOutlet">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Outlet</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Outlet :data="dataDetail.outlet" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenPenyelia">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Penyelia Halal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Penyelia :data="dataDetail.penyelia" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol cols="12">
          <VExpansionPanels v-model="panelOpenProduk">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Daftar Nama Produk</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <DaftarNamaProdukSelfDeclare :data="dataDetail.produk" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </template>

    <!-- right content -->
    <template #rightContent>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Formulir Unduhan</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VRow>
                  <VCol cols="3"> STTD </VCol>
                  <VCol cols="1"> : </VCol>
                  <VCol cols="8">
                    <VBtn
                      icon="ri-download-fill"
                      class="rounded"
                      variant="flat"
                      density="compact"
                    />
                  </VCol>
                </VRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pendaftaran</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pendaftaran :data="dataDetail.pendaftaran" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Sertifikat Halal</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <SertifikatHalal :data="dataDetail.sertifikat" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Pemeriksaan</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <Pemeriksaan :data="dataDetail.pemeriksaan" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
      <VRow>
        <VCol :cols="12">
          <VExpansionPanels v-model="openPanelRegisterData">
            <VExpansionPanel>
              <VExpansionPanelTitle>
                <h2>Sidang Fatwa</h2>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <SidangFatwa :data="dataDetail.sidang_fatwa" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>

      <VRow>
        <VCol :cols="12">
          <VCard>
            <VCardTitle><h3>Melacak</h3></VCardTitle>
            <VCardText>
              <Melacak :data="dataDetail.melacak" />
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </SHLNVerfikasiLayout>
  <VDialog v-model="showConfirmation" max-width="600px">
    <VCard>
      <VCardTitle class="font-weight-bold d-flex justify-space-between"
        ><h3>Konfirmasi</h3>
        <VBtn icon variant="plain" @click="closeConfirmation">
          <VIcon style="color: black">mdi-close</VIcon>
        </VBtn>
      </VCardTitle>
      <VCardText
        >Data akan dikirim ke LPH, pastikan dokumen telah memenuhi
        persyaratan!</VCardText
      >
      <VCardActions class="d-flex justify-end">
        <VBtn color="primary" variant="outlined" @click="closeConfirmation"
          >Batal</VBtn
        >
        <VBtn color="primary" variant="flat" @click="submitData">Kirim</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Document Return Modal -->
  <VDialog v-model="showReturn" max-width="600px">
    <VForm ref="refVForm" @submit.prevent="rejectSubmission">
      <VCard>
        <VCardTitle class="font-weight-bold d-flex justify-space-between"
          ><h3>Pengembalian Dokumen</h3>
          <VBtn icon variant="plain" @click="closeReturn">
            <VIcon style="color: black">mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <div class="mb-3 font-weight-medium text-caption text-grey">
            <span style="color: black"
              ><b>Masukan Keterangan Pengembalian</b></span
            >(Max. 1000 Karakter)
          </div>
          <VTextarea
            label="Masukan Keterangan Pengembalian (Max. 1000 Karakter)"
            v-model="returnNote"
            :rules="[requiredValidator]"
            rows="4"
            outlined
          />
        </VCardText>
        <VCardActions class="d-flex justify-end">
          <VBtn color="primary" variant="outlined" @click="closeReturn"
            >Batal</VBtn
          >
          <VBtn type="submit" color="primary" variant="flat">Kembalikan</VBtn>
        </VCardActions>
      </VCard>
    </VForm>
  </VDialog>
</template>
