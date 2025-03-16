<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const id = route?.params?.id;
const panelSubmission = ref([0, 1]);
const panelPic = ref([0, 1]);
const panelAspectLegal = ref([0, 1]);
const panelFactory = ref([0, 1]);
const panelOutlet = ref([0, 1]);
const panelProduk = ref([0, 1]);
const panelSupervisor = ref([0, 1]);
const panelDownloadFormulir = ref([0, 1]);
const panelRegister = ref([0, 1]);
const panelHalal = ref([0, 1]);
const panelTracking = ref([0, 1]);
const data = ref<any>({});
const dialogKirim = ref(false);
const dialogData = ref<any>({});
const loading = ref(false);

const aspectLegalHeader = [
  { title: "No.", key: "id_reg_legal", nowrap: true },
  {
    title: "pengajuan-reguler.reguler-detail-legal-jenis",
    key: "jenis_surat",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-legal-nodok",
    key: "no_surat",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-legal-tanggal",
    key: "tanggal_surat",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-legal-expired",
    key: "masa_berlaku",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-legal-issuer",
    key: "instansi_penerbit",
    nowrap: true,
  },
];

const factoryHeader = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: "pengajuan-reguler.reguler-detail-fac-nama",
    key: "nama_pabrik",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-fac-alamat",
    key: "alamat_pabrik",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-fac-status",
    key: "status_milik",
    nowrap: true,
  },
];

const outletHeader = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: "pengajuan-reguler.reguler-detail-out-nama",
    key: "nama_outlet",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-out-alamat",
    key: "alamat_outlet",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-out-status",
    key: "status_milik",
    nowrap: true,
  },
];

const produkHeader = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: "pengajuan-reguler.reguler-detail-produk-nama",
    key: "nama_produk",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-produk-publikasi",
    key: "reg_publish",
    nowrap: true,
  },
];

const penyeliaHalalHeaders = [
  { title: "No.", key: "no", nowrap: true },
  {
    title: "pengajuan-reguler.reguler-detail-ph-nama",
    key: "penyelia_nama",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-ph-ktp",
    key: "no_ktp",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-ph-telp",
    key: "no_kontak",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-ph-sertif",
    key: "tgl_penyelia_halal",
    nowrap: true,
  },
  {
    title: "pengajuan-reguler.reguler-detail-ph-sk",
    key: "tanggal_sk",
    nowrap: true,
  },
];

const downloadForms = reactive({
  sttd: "",
  sertifikasi_halal: "",
}) as Record<string, string>;

const getChipColor = (status: string) => {
  if (status === "Draf") return "primary";
  else if (status === "Micre") return "success";

  return "success";
};

const getDetailData = async () => {
  try {
    const response: any = await $api("/reguler/pelaku-usaha/detail", {
      method: "get",
      params: { id },
    });

    if (response?.code === 2000) data.value = response.data;
    else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleKirim = (type: string) => {
  if (type === "kirim") {
    dialogData.value = {
      title: "Mengirim Pengajuan",
      description: "Apakah yakin ingin mengirimkan pengajuan data ini?",
      label: "Ya, Kirim",
    };
  } else if (type === "delete") {
    dialogData.value = {
      title: "Menghapus Pengajuan",
      description: "Apakah yakin ingin menghapus pengajuan data ini?",
      label: "Ya, Hapus",
    };
  }
  dialogKirim.value = true;
};

const dialogDecision = async (type: string) => {
  try {
    let url = "";
    let method = "";
    if (type === "Hapus") {
      url = "/reguler/pelaku-usaha/delete-data";
      method = "delete";
    } else {
      url = "/reguler/pelaku-usaha/submit";
      method = "post";
    }

    const response: any = await $api(url, {
      method,
      body: { id_reg: id },
    });

    dialogKirim.value = false;

    if (response?.code === 2000) {
      useSnackbar().sendSnackbar(
        `Berhasil ${
          type === "Hapus" ? "menghapus" : "mengirim"
        } pengajuan data`,
        "success"
      );
      setTimeout(() => {
        router.push("/sh-domestic/submission/reguler");
      }, 500);
    } else {
      if (response.errors?.list_error)
        useSnackbar().sendSnackbar(response.errors.list_error[0], "error");
      else useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    dialogKirim.value = false;
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const getDownloadForm = async (docName: string, propName: string) => {
  const result: any = await $api(`/self-declare/submission/${id}/file`, {
    method: "get",
    query: {
      document: docName,
    },
  });

  if (result?.code === 2000) downloadForms[propName] = result?.data?.file || "";
};

const handleDownloadForm = async (fileName: string, param?: string) => {
  return await downloadDocument(fileName, param);
};

onMounted(async () => {
  loading.value = true;
  await Promise.allSettled([
    getDetailData(),
    getDownloadForm("sttd", "sttd"),
    getDownloadForm("setifikasi-halal", "setifikasi_halal"),
  ]);
  loading.value = false;
});
</script>

<template>
  <div v-if="!loading">
    <VDialog v-model="dialogKirim">
      <VCard>
        <VCardTitle class="font-weight-bold">
          {{ dialogData?.title }}
        </VCardTitle>
        <VCardText>
          <div
            v-if="dialogData.title === 'Mengirim Pengajuan'"
            style="color: black; text-wrap: wrap;"
          >
            <p style="font-weight: bolder;">Disclaimer</p>
            <p>Dengan sungguh-sungguh menyatakan bahwa:</p>
            <ul style="padding-left: 20px;">
              <li>
                Seluruh pernyataan data dan informasi beserta seluruh dokumen yang saya lampirkan dalam berkas pendaftaran adalah benar.
              </li>
              <li>
                Apabila dikemudian ditemukan bahwa data/dokumen yang saya sampaikan tidak benar dan/atau ada pemalsuan, maka seluruh keputusan yang telah ditetapkan berdasarkan berkas batal berdasarkan hukum dan saya bersedia dikenakan sanksi sesuai ketentuan peraturan perundang-undangan yang berlaku.
              </li>
            </ul>
          </div>
          <p v-else>
            {{ dialogData?.description }}
          </p>
        </VCardText>
        <VCardActions>
          <VBtn color="primary" variant="outlined" @click="dialogKirim = false">
            Batal
          </VBtn>
          <VBtn
            text
            variant="elevated"
            :color="dialogData?.label.includes('Hapus') ? '#E1442E' : 'primary'"
            @click="
              () =>
                dialogDecision(
                  dialogData?.label.includes('Hapus') ? 'Hapus' : 'Kirim'
                )
            "
          >
            {{ dialogData?.label }}
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VContainer>
      <VRow>
        <KembaliButton />
      </VRow>
      <VRow class="d-flex justify-space-between align-center">
        <VCol class="">
          <h3 class="text-h3">
            {{ t("pengajuan-reguler.reguler-detail-header-title") }}
          </h3>
        </VCol>
        <VCol cols="6">
          <VRow class="d-flex justify-end align-center ga-2">
            <VBtn
              variant="outlined"
              color="#E1442E"
              class="delete-container"
              @click="() => handleKirim('delete')"
            >
              <VIcon color="red"> fa-trash </VIcon>
            </VBtn>
            <VBtn
              variant="outlined"
              append-icon="ri-edit-line"
              @click="navigateTo(`/sh-domestic/submission/reguler/${id}/edit`)"
            >
              {{ t("pengajuan-reguler.reguler-detail-header-act-edt") }}
            </VBtn>
            <VBtn
              append-icon="fa-paper-plane"
              @click="() => handleKirim('kirim')"
            >
              {{ t("pengajuan-reguler.reguler-detail-header-act-send") }}
            </VBtn>
          </VRow>
        </VCol>
      </VRow>

      <VRow class="d-flex justify-space-between">
        <VCol cols="8">
          <VExpansionPanels v-model="panelSubmission">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-pengajuan-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-noid`)"
                >
                  {{ data?.certificate_halal?.id_reg || "-" }}
                </InfoRow>
                <InfoRow
                  v-if="data?.certificate_halal?.tanggal_buat"
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-tgl`)"
                >
                  {{
                    formatDateIntl(
                      new Date(data?.certificate_halal?.tanggal_buat)
                    ) || "-"
                  }}
                </InfoRow>
                <ThinLine :thickness="1" />
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-nomohon`)
                  "
                >
                  {{ data?.certificate_halal?.no_mohon || "-" }}
                </InfoRow>
                <div>
                  <InfoRow
                    v-if="data?.certificate_halal?.tgl_mohon"
                    cols-name="5"
                    cols-separator="1"
                    cols-value="6"
                    :name="
                      t(`pengajuan-reguler.reguler-detail-pengajuan-tglmohon`)
                    "
                  >
                    {{
                      formatDateIntl(
                        new Date(data?.certificate_halal?.tgl_mohon)
                      ) || "-"
                    }}
                  </InfoRow>
                  <InfoRow
                    v-else
                    cols-name="5"
                    cols-separator="1"
                    cols-value="6"
                    :name="
                      t(`pengajuan-reguler.reguler-detail-pengajuan-tglmohon`)
                    "
                  >
                    -
                  </InfoRow>
                </div>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-jnslay`)"
                >
                  {{ data?.certificate_halal?.jenis_layanan || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-jnsprod`)
                  "
                >
                  {{ data?.certificate_halal?.jenis_produk || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-merk`)"
                >
                  {{ data?.certificate_halal?.merk_dagang || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-area`)"
                >
                  {{ data?.certificate_halal?.area_pemasaran || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-lph`)"
                >
                  {{ data?.certificate_halal?.nama_lph || "-" }}
                </InfoRow>
                <ThinLine :thickness="1" />
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-namapu`)"
                >
                  {{ data?.certificate_halal?.nama_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-namapush`)
                  "
                >
                  {{ data?.certificate_halal?.nama_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-namakbli`)
                  "
                >
                  {{ data?.certificate_halal?.nama_kbli || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-address`)
                  "
                >
                  {{ data?.certificate_halal?.alamat_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-city`)"
                >
                  {{ data?.certificate_halal?.kota_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-province`)
                  "
                >
                  {{ data?.certificate_halal?.provinsi_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-kodepos`)
                  "
                >
                  {{ data?.certificate_halal?.kode_pos_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-negara`)"
                >
                  {{ data?.certificate_halal?.negara_pu || "Indonesia" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-telp`)"
                >
                  {{ data?.certificate_halal?.telp_pu || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-email`)"
                >
                  {{ data?.certificate_halal?.email || "-" }}
                </InfoRow>
                <ThinLine :thickness="1" />
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-jnsbu`)"
                >
                  {{ data?.certificate_halal?.jenis_badan_usaha || "PT" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-skala`)"
                >
                  {{ data?.certificate_halal?.skala_usaha || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-tingkatusaha`)
                  "
                >
                  {{ data?.certificate_halal?.tingkat_usaha || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pengajuan-modal`)"
                >
                  {{ data?.certificate_halal?.modal_usaha || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="
                    t(`pengajuan-reguler.reguler-detail-pengajuan-asalusaha`)
                  "
                >
                  {{ data?.certificate_halal?.asal_usaha || "-" }}
                </InfoRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <br />
          <VExpansionPanels v-model="panelPic">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-pic-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pic-nama`)"
                >
                  {{ data?.penanggung_jawab?.nama_pj || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pic-telp`)"
                >
                  {{ data?.penanggung_jawab?.nomor_kontak_pj || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="t(`pengajuan-reguler.reguler-detail-pic-email`)"
                >
                  {{ data?.penanggung_jawab?.email_pj || "-" }}
                </InfoRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <br />
          <VExpansionPanels v-model="panelAspectLegal">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-legal-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="aspectLegalHeader"
                  :items="data?.aspek_legal"
                  class="border rounded"
                  hide-default-footer
                >
                  <template #header.jenis_surat="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.no_surat="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.tanggal_surat="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.masa_berlaku="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.instansi_penerbit="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.productType="{ item }">
                    <div class="mw-170">
                      {{ item.productType }}
                    </div>
                  </template>
                  <template #item.productName="{ item }">
                    <div class="mw-170">
                      {{ item.productName }}
                    </div>
                  </template>
                  <template #item.id_reg_legal="{ index }">
                    <div class="mw-170">
                      {{ index + 1 }}
                    </div>
                  </template>
                </VDataTable>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <br />
          <VExpansionPanels v-model="panelFactory">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-fac-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="factoryHeader"
                  :items="data?.pabrik"
                  hide-default-footer
                  class="border rounded"
                >
                  <template #header.nama_pabrik="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.alamat_pabrik="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.status_milik="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    <div class="mw-170">
                      {{ index + 1 }}
                    </div>
                  </template>
                </VDataTable>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <br />
          <VExpansionPanels v-model="panelOutlet">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-out-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <div class="border rounded w-100" style="justify-items: center">
                  <!--                  <div -->
                  <!--                    v-if="data?.outlet?.length === 0" -->
                  <!--                    class="pt-2" -->
                  <!--                  > -->
                  <!--                    <img -->
                  <!--                      src="~/assets/images/empty-data.png" -->
                  <!--                      alt="empty_data" -->
                  <!--                    > -->
                  <!--                    <div class="pt-2 pb-2 font-weight-bold"> -->
                  <!--                      Data Kosong -->
                  <!--                    </div> -->
                  <!--                  </div> -->
                  <VDataTable
                    :headers="outletHeader"
                    :items="data?.outlet"
                    hide-default-footer
                    class="border rounded"
                  >
                    <template #header.nama_outlet="{ column }">
                      <div class="mw-170">
                        {{ t(column.title) }}
                      </div>
                    </template>

                    <template #header.alamat_outlet="{ column }">
                      <div class="mw-170">
                        {{ t(column.title) }}
                      </div>
                    </template>

                    <template #header.status_milik="{ column }">
                      <div class="mw-170">
                        {{ t(column.title) }}
                      </div>
                    </template>

                    <template #item.no="{ index }">
                      <div class="mw-170">
                        {{ index + 1 }}
                      </div>
                    </template>
                  </VDataTable>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>

          <br />
          <VExpansionPanels v-model="panelSupervisor">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-ph-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="penyeliaHalalHeaders"
                  :items="data?.penyelia_halal"
                  hide-default-footer
                  class="border rounded"
                >
                  <template #header.penyelia_nama="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>
                  <template #header.no_ktp="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.no_kontak="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>
                  <template #header.tgl_penyelia_halal="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>
                  <template #header.tanggal_sk="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    <div class="mw-170">
                      {{ index + 1 }}
                    </div>
                  </template>
                </VDataTable>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
          <br />
          <VExpansionPanels v-model="panelProduk">
            <VExpansionPanel class="pa-4">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-produk-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <VDataTable
                  :headers="produkHeader"
                  :items="data?.produk"
                  hide-default-footer
                  class="border rounded"
                >
                  <template #header.nama_produk="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #header.reg_publish="{ column }">
                    <div class="mw-170">
                      {{ t(column.title) }}
                    </div>
                  </template>

                  <template #item.no="{ index }">
                    <div class="mw-170">
                      {{ index + 1 }}
                    </div>
                  </template>
                </VDataTable>
                <!--                <div -->
                <!--                  class="border rounded w-100" -->
                <!--                  style="justify-items: center" -->
                <!--                > -->
                <!--                  <div -->
                <!--                    v-if="data?.produk?.length === 0" -->
                <!--                    class="pt-2" -->
                <!--                  > -->
                <!--                    <img -->
                <!--                      src="~/assets/images/empty-data.png" -->
                <!--                      alt="empty_data" -->
                <!--                    > -->
                <!--                    <div class="pt-2 pb-2 font-weight-bold"> -->
                <!--                      Data Kosong -->
                <!--                    </div> -->
                <!--                  </div> -->
                <!--                </div> -->
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
        <VCol cols="4" class="zero-padding">
          <VExpansionPanels v-model="panelDownloadFormulir">
            <VExpansionPanels
              v-model="panelDownloadFormulir"
              expand-icon="fa-chevron-down"
              collapse-icon="fa-chevron-up"
            >
              <VExpansionPanel class="py-2">
                <VExpansionPanelTitle class="text-h4 font-weight-bold">
                  {{ t("pengajuan-reguler.reguler-detail-form-title") }}
                </VExpansionPanelTitle>
                <VExpansionPanelText class="d-flex align-center">
                  <InfoRowV2
                    class="d-flex align-center"
                    :name="t(`pengajuan-reguler.reguler-detail-form-sttd`)"
                    :style="{ fontWeight: '600' }"
                  >
                    <VBtn
                      :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
                      density="compact"
                      class="px-2"
                      @click="
                        downloadForms.sttd
                          ? handleDownloadForm(downloadForms.sttd, 'FILES')
                          : null
                      "
                    >
                      <template #default>
                        <VIcon icon="fa-download" />
                      </template>
                    </VBtn>
                  </InfoRowV2>
                  <InfoRowV2
                    class="d-flex align-center"
                    :name="t(`pengajuan-reguler.reguler-detail-form-sh`)"
                    :style="{ fontWeight: '600' }"
                  >
                    <VBtn
                      :color="
                        downloadForms.sertifikasi_halal ? 'primary' : '#A09BA1'
                      "
                      density="compact"
                      class="px-2"
                      @click="
                        downloadForms.sertifikasi_halal
                          ? handleDownloadForm(
                              downloadForms.sertifikasi_halal,
                              'SERT'
                            )
                          : null
                      "
                    >
                      <template #default>
                        <VIcon icon="fa-download" />
                      </template>
                    </VBtn>
                  </InfoRowV2>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VExpansionPanels>
          <br />
          <VExpansionPanels v-model="panelRegister">
            <VExpansionPanel class="pa-5">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-reg-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText class="d-flex align-center">
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-nodaftar`)"
                >
                  {{ data?.certificate_halal?.no_daftar || "-" }}
                </InfoRow>
                <div>
                  <InfoRow
                    v-if="data?.certificate_halal?.tgl_daftar"
                    cols-name="4"
                    cols-separator="1"
                    cols-value="7"
                    :name="t(`pengajuan-reguler.reguler-detail-reg-tanggal`)"
                  >
                    {{
                      formatDateIntl(
                        new Date(data?.certificate_halal?.tgl_daftar)
                      ) || "-"
                    }}
                  </InfoRow>
                  <InfoRow
                    v-else
                    cols-name="4"
                    cols-separator="1"
                    cols-value="7"
                    :name="t(`pengajuan-reguler.reguler-detail-reg-tanggal`)"
                  >
                    -
                  </InfoRow>
                </div>
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-tempatdaftar`)"
                >
                  {{ data?.certificate_halal?.no_daftar || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-jnsdaftar`)"
                >
                  {{ data?.certificate_halal?.jenis_pengajuan || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-status`)"
                >
                  <VChip
                    :color="
                      getChipColor(data?.certificate_halal?.status || '-')
                    "
                    label
                    class="ma-1"
                  >
                    {{ data?.certificate_halal?.status || "-" }}
                  </VChip>
                </InfoRow>
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-channel`)"
                >
                  {{ data?.certificate_halal?.channel || "-" }}
                </InfoRow>
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-reg-fasilitator`)"
                >
                  {{ data?.certificate_halal?.fasilitator_name || "-" }}
                </InfoRow>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
          <br />
          <VExpansionPanels v-model="panelHalal">
            <VExpansionPanel class="pa-5">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-sh-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText class="d-flex align-center">
                <InfoRow
                  cols-name="4"
                  cols-separator="1"
                  cols-value="7"
                  :name="t(`pengajuan-reguler.reguler-detail-sh-nosert`)"
                >
                  {{ data?.sertifikat_halal_info?.nomor_sertifikat || "-" }}
                </InfoRow>
                <div>
                  <InfoRow
                    v-if="data?.sertifikat_halal_info?.tanggal_sertifikat"
                    cols-name="4"
                    cols-separator="1"
                    cols-value="7"
                    :name="t(`pengajuan-reguler.reguler-detail-sh-tglsert`)"
                  >
                    {{
                      formatDateIntl(
                        new Date(
                          data?.sertifikat_halal_info?.tanggal_sertifikat
                        )
                      ) || "-"
                    }}
                  </InfoRow>
                  <InfoRow
                    v-else
                    cols-name="4"
                    cols-separator="1"
                    cols-value="7"
                    :name="t(`pengajuan-reguler.reguler-detail-sh-tglsert`)"
                  >
                    -
                  </InfoRow>
                </div>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
          <br />

          <br />
          <VExpansionPanels v-model="panelTracking">
            <VExpansionPanel class="pa-5">
              <VExpansionPanelTitle class="text-h4 font-weight-bold">
                {{ t("pengajuan-reguler.reguler-detail-track-title") }}
              </VExpansionPanelTitle>
              <VExpansionPanelText class="d-flex align-center">
                <PanelTrackingPu :data="data?.tracking" />
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style lang="scss" scoped>
.mw-170 {
  overflow: hidden;
  max-inline-size: 170px;
  text-wrap: wrap;
  white-space: nowrap;
}

.delete-container {
  border-color: #e1442e !important;
}

.zero-padding {
  padding-inline-end: 0 !important;
}
</style>
