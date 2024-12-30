<script setup lang="ts">
import { ref } from "vue";
import { VDataTableServer } from "vuetify/components";

const route = useRoute();
const id = (route?.params as any)?.id;

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
  },
  {
    get(target: any, prop: any) {
      return prop in target ? target[prop] : defaultStatus;
    },
  }
);

const dialogToggle = ref(false);
const loadingModal = ref(false);
const titleDialog = ref("");
const labelSaveBtn = ref("");
const inputValueReturn = ref("");

const loadingAll = ref(true);

const panelSubmission = ref([0, 1]);
const panelPic = ref([0, 1]);
const panelAspectLegal = ref([0, 1]);
const panelOutlet = ref([0, 1]);
const panelSupervisor = ref([0, 1]);
const panelDownloadFormulir = ref([0, 1]);
const panelRegistration = ref([0, 1]);
const panelTracking = ref([0, 1]);
const panelPayment = ref([0, 1]);

const detailSubmission = ref();
const dataPengajuan = ref();

const itemPerPageProduk = ref(10);
const pageProduk = ref(1);
const totalItemsProduk = ref(0);

const itemPerPageAuditor = ref(10);
const pageAuditor = ref(1);
const totalItemsAuditor = ref(0);

const aspectLegalHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama Produk", key: "nama_produk", nowrap: true },
  { title: "Jumlah Bahan", key: "jumlah_bahan", nowrap: true },
  { title: "Publikasi", key: "reg_publish", nowrap: true },
];

const supervisorHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama", key: "name", nowrap: true },
  { title: "Tanggal Lahir", key: "tanggal_lahir", nowrap: true },
  { title: "JK", key: "jk", nowrap: true },
  { title: "No. Pendaftaran", key: "no_daftar", nowrap: true },
];

const supervisorItems = ref();

const toggle = (type: string) => {
  dialogToggle.value = true;
  titleDialog.value =
    type === "add" ? "Mengirim Pengajuan" : "Pengembalian Dokumen";
  labelSaveBtn.value = type === "add" ? "Ya, Kirim" : "Kembalikan";
};

const handleReturn = async () => {
  loadingModal.value = true;
  try {
    const response: any = await $api(`/reguler/lph/return`, {
      method: "put",
      body: {
        keterangan: inputValueReturn.value,
        id_reg: id,
      },
    });

    if (response.code === 2000) {
      loadingModal.value = false;
      useSnackbar().sendSnackbar("Berhasil Mengembalikan", "success");
      dialogToggle.value = false;
    } else {
      loadingModal.value = false;
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    loadingModal.value = false;

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const handleSend = async () => {
  loadingModal.value = true;
  try {
    const response: any = await $api(`/reguler/lph/kirim`, {
      method: "put",
      body: {
        keterangan: "Kirim",
        id_reg: id,
      },
    });

    if (response.code === 2000) {
      loadingModal.value = false;
      useSnackbar().sendSnackbar("Berhasil Mengembalikan", "success");
      dialogToggle.value = false;
    } else {
      loadingModal.value = false;
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(", "),
        "error"
      );
    }
  } catch (error) {
    loadingModal.value = false;

    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const loadItemById = async () => {
  try {
    const response: any = await $api(`/reguler/lph/${id}`, {
      method: "get",
    });

    if (response.code === 2000) {
      const { certificate_halal, produk, auditor } = response.data || {};

      const {
        id_reg,
        status,
        tanggal_buat,
        nama_pu,
        alamat_pu,
        kota_pu,
        provinsi_pu,
        kode_pos_pu,
        negara_pu,
        telp_pu,
        email,
        jenis_badan_usaha,
        skala_usaha,
      } = certificate_halal || {};

      totalItemsProduk.value = produk.length;
      totalItemsAuditor.value = auditor.length;

      supervisorItems.value = auditor;

      dataPengajuan.value = [
        {
          label: "No.ID",
          value: id_reg,
        },
        {
          label: "Status",
          value: status,
        },
        {
          label: "Tanggal",
          value: tanggal_buat,
        },
        {
          label: "Nama Perusahaan",
          value: nama_pu,
        },
        {
          label: "Alamat",
          value: alamat_pu,
        },
        {
          label: "Kota/Kab",
          value: kota_pu,
        },
        {
          label: "Provinsi",
          value: provinsi_pu,
        },
        {
          label: "Kode Pos",
          value: kode_pos_pu,
        },
        {
          label: "Negara",
          value: negara_pu || "Indonesia",
        },
        {
          label: "Telepon",
          value: telp_pu,
        },
        {
          label: "Email",
          value: email,
        },
        {
          label: "Jenis Badan Usaha",
          value: jenis_badan_usaha,
        },
        {
          label: "Skala Usaha",
          value: skala_usaha,
        },
      ];

      detailSubmission.value = response.data;
      return response;
    } else {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

onMounted(async () => {
  const res: any = await Promise.all([loadItemById()]);

  const checkResIfUndefined = res.every((item: any) => {
    return item !== undefined;
  });

  if (checkResIfUndefined) loadingAll.value = false;
  else loadingAll.value = false;
});
</script>

<template>
  <VContainer v-if="!loadingAll">
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3 font-weight-bold">Detail Daftar Ajuan</h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            color="#E1442E"
            style="border-color: #e1442e"
            @click="() => toggle('return')"
          >
            Pengembalian
          </VBtn>
          <!-- <VBtn variant="outlined"> Lihat Draft Sertif </VBtn> -->
          <VBtn
            @click="
              navigateTo({
                path: `/sh-domestic/submission/reguler/${id}/edit`,
                query: {
                  isViewOnly: true,
                },
              })
            "
            variant="outlined"
          >
            Cek Data
          </VBtn>
          <VBtn @click="() => toggle('add')"> Kirim </VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelSubmission">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <template v-for="(item, index) in dataPengajuan" :key="index">
                <InfoRow
                  cols-name="5"
                  cols-separator="1"
                  cols-value="6"
                  :name="(item as any)?.label"
                >
                  {{ (item as any)?.value }}
                </InfoRow>

                <ThinLine
                  v-if="(item as any)?.label === 'Tanggal' || (item as any)?.label === 'Email'"
                  :thickness="1"
                />
              </template>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelPic">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                v-for="item in [
                  {
                    label: 'No / Tanggal Permohonan',
                    value: `${detailSubmission.certificate_halal.no_mohon} - ${detailSubmission.certificate_halal.tgl_mohon}`,
                  },
                  {
                    label: 'Jenis Layanan',
                    value: detailSubmission.certificate_halal.jenis_layanan,
                  },
                  {
                    label: 'Jenis Pengajuan',
                    value: detailSubmission.certificate_halal.jenis_pengajuan,
                  },
                  {
                    label: 'Jenis Produk',
                    value: detailSubmission.certificate_halal.jenis_produk,
                  },
                  {
                    label: 'Merek Dagang',
                    value: detailSubmission.certificate_halal.merk_dagang,
                  },
                  {
                    label: 'Area Pemasaran',
                    value: detailSubmission.certificate_halal.area_pemasaran,
                  },
                ]"
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                :name="(item as any).label"
              >
                {{ (item as any).value }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelAspectLegal">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                :headers="aspectLegalHeader"
                :items="detailSubmission.produk.map(({
                  id_reg_prod,
                  reg_publish,
                  nama_produk,
                  photo,
                  jumlah_bahan,
                  daftar_bahan,

                }: any) => ({
                  id_reg_prod,
                  reg_publish,
                  nama_produk,
                  photo,
                  jumlah_bahan,
                  daftar_bahan,
                }))"
                :items-per-page="itemPerPageProduk"
                :page="pageProduk"
                :items-length="totalItemsProduk"
                class="border rounded"
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (pageProduk - 1) * itemPerPageProduk }}
                </template>
                <template #item.reg_publish="{ item }">
                  <VCheckbox v-model="(item as any).reg_publish" />
                </template>
              </VDataTable>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Mulai"
              >
                {{ formatDate(detailSubmission.jadwal_audit.jadwal_awal) }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai"
              >
                {{ formatDate(detailSubmission.jadwal_audit.jadwal_akhir) }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels v-model="panelSupervisor">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTableServer
                :headers="supervisorHeader"
                :items="supervisorItems"
                :items-per-page="itemPerPageAuditor"
                :page="pageAuditor"
                :items-length="totalItemsAuditor"
                class="border rounded"
              >
                <template #item.no="{ index }">
                  {{ index + 1 + (pageProduk - 1) * itemPerPageProduk }}
                </template>
                <template #item.name="{ item }">
                  {{ (item as any).Auditor.nama }}
                </template>
                <template #item.tanggal_lahir="{ item }">
                  {{ (item as any).Auditor.tgl_lahir }}
                </template>
                <template #item.jk="{ item }">
                  {{ (item as any).Auditor.jenkel }}
                </template>
                <template #item.no_daftar="{ item }">
                  {{ (item as any).Auditor.no_registrasi }}
                </template>
              </VDataTableServer>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelOutlet">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Tanggal Selesai LPH"
              >
                {{ formatDate(detailSubmission.hasil_audit.tanggal_selesai) }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Hasil"
              >
                {{ detailSubmission.hasil_audit.hasil_audit }}
              </InfoRow>
              <InfoRow
                cols-name="5"
                cols-separator="1"
                cols-value="6"
                name="Dokumen"
              >
                <VBtn
                  append-icon="fa-download"
                  variant="plain"
                  style="align-content: start"
                  @click="
                    downloadDocument(
                      detailSubmission.hasil_audit.Dokumen.filename
                    )
                  "
                />
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4" class="pr-0">
        <VExpansionPanels v-model="panelRegistration">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">
                {{ detailSubmission.certificate_halal.no_daftar }}
              </p>
              <p class="font-weight-bold text-black">
                {{ formatDate(detailSubmission.certificate_halal.tgl_daftar) }}
              </p>
              <p class="font-weight-bold text-black">
                {{ detailSubmission.certificate_halal.nama_provinsi }}
              </p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelPayment">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <p class="font-weight-bold text-black">Rp 7.000.000</p>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelDownloadFormulir">
          <VExpansionPanel class="pa-5">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRow
                cols-name="8"
                cols-separator="1"
                cols-value="3"
                name="Hasil Unduhan"
              >
                <VBtn
                  append-icon="fa-download"
                  variant="plain"
                  style="align-content: start"
                  @click="downloadDocument(detailSubmission.dokumen.sjph)"
                />
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels v-model="panelTracking">
          <VExpansionPanel class="pa-4">
            <VExpansionPanelTitle class="text-h4">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <HalalTimeLine
                :event="
                  detailSubmission.tracking.map(
                    ({ status, username, tanggal, comment } : any) => ({
                      status: statusItem[status].desc ,
                      created_at: formatDate(tanggal),
                      username,
                      comment,
                    })
                  )
                "
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>

  <VSkeletonLoader
    v-else
    type="table-heading, list-item-two-line, image, table-tfoot"
  />

  <DialogWithAction
    :title="titleDialog"
    :is-open="dialogToggle"
    :toggle="() => (dialogToggle = false)"
    :on-save="
      () =>
        titleDialog === 'Mengirim Pengajuan' ? handleSend() : handleReturn()
    "
    :label-save-btn="labelSaveBtn"
    :loadingmodal="loadingModal"
  >
    <template #content>
      <div v-if="titleDialog === 'Mengirim Pengajuan'">
        <p>
          Pastikan dokumen persyaratan lengkap dan semua biaya pemeriksaan sudah
          dimasukkan
        </p>
      </div>
      <div v-else>
        <label>Masukan Keterangan Pengembalian (Max. 1000 Karakter)</label>
        <VTextarea
          v-model="inputValueReturn"
          placeholder="Masukkan keterangan pengembalian"
          clearable
          auto-grow
          dense
          outlined
          :style="{ maxWidth: '100%' }"
        />
      </div>
    </template>
  </DialogWithAction>
</template>

<style lang="scss" scoped>
.mw-170 {
  max-width: 170px;
  overflow: hidden;
  white-space: nowrap;
  text-wrap: wrap;
}
</style>
