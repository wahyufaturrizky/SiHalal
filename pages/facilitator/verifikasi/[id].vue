<script setup lang="ts">
interface FasilitatorData {
  fasilitasi: Fasilitasi;
  lembaga: Lembaga[];
  status_registrasi: StatusRegistrasi;
  tracking: any[];
}

interface Fasilitasi {
  nama: string;
  nama_program: string;
  fac_description: string;
  penanggung_jawab: string;
  phone_penanggung_jawab: string;
  tahun: number;
  lingkup_wilayah_fasilitas: string;
  tgl_mulai: string;
  tgl_selesai: string;
  jenis_fasilitasi: string;
  sumber_pembiayaan: string;
  kuota: number;
  is_locked_lembaga: boolean;
}

interface Lembaga {
  id: string;
  fac_id: string;
  nama_pic_lembaga: string;
  nomor_pic_lembaga: string;
  lp_id?: string;
  lph_id?: string;
  created_by: string;
  created_on: string;
}

interface StatusRegistrasi {
  status: string;
  kode_fasilitasi: string;
}

const panelFasilitasi = ref([0, 1]);
const panelInstitution = ref([0, 1]);
const panelTracking = ref([0, 1]);
const panelStatus = ref([0, 1]);

const route = useRoute();
const shlnId = route.params.id;
const detail = ref<FasilitatorData>({
  fasilitasi: {
    nama: "",
    nama_program: "",
    fac_description: "",
    penanggung_jawab: "",
    phone_penanggung_jawab: "",
    tahun: null,
    lingkup_wilayah_fasilitas: "",
    tgl_mulai: "",
    tgl_selesai: "",
    jenis_fasilitasi: "",
    sumber_pembiayaan: "",
    kuota: null,
    is_locked_lembaga: null,
  },
  lembaga: [],
  status_registrasi: {
    status: "",
    kode_fasilitasi: "",
  },
  tracking: [],
});
const getDetail = async () => {
  try {
    const response = await $api("/facilitate/verifikator/detail", {
      method: "post",
      body: {
        id: shlnId,
      },
    });

    if (response.code != 2000) {
      navigateTo("/facilitator/verifikasi");
    }
    detail.value = response.data.fasilitator;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const defaultStatus = { color: "error", desc: "Unknown Status" };
const statusItem = new Proxy(
  {
    OF1: { color: "grey-300", desc: "Draft" },
    OF10: { color: "success", desc: "Submitted" },
    OF15: { color: "success", desc: "Verified" },
    OF2: { color: "error", desc: "Returned" },
    OF290: { color: "error", desc: "Rejected" },
    OF5: { color: "success", desc: "Invoice issued" },
    OF320: { color: "success", desc: "Code Issued" },
  },
  {
    get(target, prop) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const returnHandler = async (message: string) => {
  try {
    const res = await $api("/facilitate/verifikator/return", {
      method: "post",
      body: {
        id: route.params.id,
        keterangan: message,
      },
    });
    if (res.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan!", "error");
      return;
    }
    navigateTo("/facilitator/verifikasi");
    useSnackbar().sendSnackbar("Data berhasil di return", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan!", "error");
  }
  // window.location.href = "/login";
};

const rejectHandler = (message: string) => {
  try {
    const res = await $api("/facilitate/verifikator/reject", {
      method: "post",
      body: {
        id: route.params.id,
        keterangan: message,
      },
    });
    if (res.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan!", "error");
      return;
    }
    navigateTo("/facilitator/verifikasi");
    useSnackbar().sendSnackbar("Data berhasil di return", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan!", "error");
  }
};

const approveHandler = (message: string) => {
  try {
    const res = await $api("/facilitate/verifikator/approve", {
      method: "post",
      body: {
        id: route.params.id,
      },
    });
    if (res.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan!", "error");
      return;
    }
    navigateTo("/facilitator/verifikasi");
    useSnackbar().sendSnackbar("Data berhasil di return", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan!", "error");
  }
};
onMounted(async () => {
  await Promise.allSettled([getDetail()]);
});

const institutionHeader = [
  { title: "No", key: "index" },
  { title: "Nama LPH / LP3H", key: "lph" },
  { title: "Nama Penanggung Jawab", key: "nama_pic_lembaga" },
  { title: "Nomor Penanggung Jawab", key: "nomor_pic_lembaga" },
];
</script>

<template>
  <VContainer>
    <KembaliButton />
    <VRow class="d-flex justify-start align-center">
      <h2 class="text-h2">Detail Pengajuan Verifikasi</h2>
    </VRow>
    <VRow class="d-flex justify-end align-center">
      <VerifikatorFasilitatorReturnConfirm @confirm="returnHandler" />
      <VerifikatorFasilitatorRejectConfirm @confirm="rejectHandler" />
      <VerifikatorFasilitatorApproveConfirm @confirm="approveHandler" />
    </VRow>
    <VRow>
      <VCol cols="8">
        <VExpansionPanels v-model="panelFasilitasi">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4"
              >Fasilitasi</VExpansionPanelTitle
            >
            <VExpansionPanelText>
              <InfoRow name="Nama Fasilitator">{{
                detail.fasilitasi.nama
              }}</InfoRow>
              <InfoRow name="Nama Program Fasilitasi">{{
                detail.fasilitasi.nama_program
              }}</InfoRow>
              <InfoRow name="Nama Penanggung Jawab Program">{{
                detail.fasilitasi.penanggung_jawab
              }}</InfoRow>
              <InfoRow name="Nomor Penanggung Jawab Program">{{
                detail.fasilitasi.phone_penanggung_jawab
              }}</InfoRow>
              <InfoRow name="Tahun">{{ detail.fasilitasi.tahun }}</InfoRow>
              <InfoRow name="Lingkup Wilayah Fasilitasi">{{
                detail.fasilitasi.lingkup_wilayah_fasilitas
              }}</InfoRow>
              <InfoRow name="Tgl. Mulai ">{{
                detail.fasilitasi.tgl_mulai != ""
                  ? new Date(detail.fasilitasi.tgl_mulai)
                  : ""
              }}</InfoRow>
              <InfoRow name="Tgl. Selesai">{{
                detail.fasilitasi.tgl_selesai != ""
                  ? new Date(detail.fasilitasi.tgl_selesai)
                  : ""
              }}</InfoRow>
              <InfoRow name="Jenis Fasilitasi">{{
                detail.fasilitasi.jenis_fasilitasi
              }}</InfoRow>
              <InfoRow name="Sumber Pembiayaan">{{
                detail.fasilitasi.sumber_pembiayaan
              }}</InfoRow>
              <InfoRow name="Kuota">{{ detail.fasilitasi.kuota }}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />

        <VExpansionPanels v-model="panelInstitution">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">Lembaga</VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable :headers="institutionHeader" :items="detail.lembaga">
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.lph="{ item }">
                  {{ item.lp_id != null ? item.lp_id : item.lph_id }}
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels v-model="panelStatus">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4"
              >Status Registrasi</VExpansionPanelTitle
            >
            <VExpansionPanelText>
              <InfoRow name="Status" separator="" class="d-flex align-center"
                ><v-chip class="ma-2" label>{{
                  detail.status_registrasi.status
                }}</v-chip></InfoRow
              >
              <InfoRow name="Kode Fasilitasi" separator="">{{
                detail.status_registrasi.kode_fasilitasi
              }}</InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4"
              >Tracking</VExpansionPanelTitle
            >
            <VExpansionPanelText>
              <HalalTimeLine :event="detail.tracking" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss"></style>
