<template>
  <VContainer>
    <KembaliButton />
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="">
        <h3 class="text-h3 font-weight-bold">Detail Pengajuan Self Declare</h3>
      </VCol>
      <VCol cols="3">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn variant="outlined" color="error" class="px-3">
            <VIcon icon="mdi-delete" />
          </VBtn>
          <VBtn variant="outlined" append-icon="ri-pencil-fill">Ubah</VBtn>
          <VBtn>Kirim</VBtn>
        </VRow>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="8">
        <VExpansionPanels
          v-model="panelSubmission"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pengajuan Sertifikasi Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="No.ID">{{
                submissionDetail.id_reg ? submissionDetail.id_reg : "-"
              }}</InfoRow>
              <InfoRow name="Tanggal">
                {{
                  submissionDetail.tanggal_buat
                    ? submissionDetail.tanggal_buat
                    : "-"
                }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow name="No Surat Permohonan">
                {{
                  submissionDetail.no_mohon ? submissionDetail.no_mohon : "-"
                }}
              </InfoRow>
              <InfoRow name="Tanggal Permohonan">
                {{
                  submissionDetail.tgl_mohon ? submissionDetail.tgl_mohon : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Layanan">
                {{
                  submissionDetail.jenis_layanan
                    ? submissionDetail.jenis_layanan
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Jenis Produk">
                {{
                  submissionDetail.jenis_produk
                    ? submissionDetail.jenis_produk
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Merk Dagang">
                {{
                  submissionDetail.merk_dagang
                    ? submissionDetail.merk_dagang
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Area Pemasaran">
                {{
                  submissionDetail.area_pemasaran
                    ? submissionDetail.area_pemasaran
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Pendamping">
                {{
                  submissionDetail.pendamping
                    ? submissionDetail.pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Lembaga Pendamping">
                {{
                  submissionDetail.lembaga_pendamping
                    ? submissionDetail.lembaga_pendamping
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="KBLI" class="d-flex align-center">
                <VRow class="d-flex align-center">
                  <VCol cols="12">
                    <VSelect
                      :model-value="kbliData"
                      @update:model-value="
                        (v) => (submissionDetail.nama_kbli = v)
                      "
                      :items="kbliDropdown"
                      item-title="judul_kbli"
                      item-value="kbli"
                      placeholder="Pilih KBLI"
                      density="compact"
                      rounded="xl"
                      outlined
                      menu-icon="mdi-chevron-down"
                    >
                      <template #append>
                        <VBtn variant="outlined" @click="updateKbli">
                          Update
                        </VBtn>
                      </template>
                    </VSelect>
                  </VCol>
                </VRow>
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow name="Nama Perusahaan ">
                {{ submissionDetail.nama_pu ? submissionDetail.nama_pu : "-" }}
              </InfoRow>
              <InfoRow name="Alamat ">
                {{
                  submissionDetail.alamat_pu ? submissionDetail.alamat_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Kota / Kab ">
                {{ submissionDetail.kota_pu ? submissionDetail.kota_pu : "-" }}
              </InfoRow>
              <InfoRow name="Provinsi">
                {{
                  submissionDetail.provinsi_pu
                    ? submissionDetail.provinsi_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Kode Pos">
                {{
                  submissionDetail.kode_pos_pu
                    ? submissionDetail.kode_pos_pu
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Country">
                {{
                  submissionDetail.negara_pu ? submissionDetail.negara_pu : "-"
                }}
              </InfoRow>
              <InfoRow name="Telepon">
                {{ submissionDetail.telp_pu ? submissionDetail.telp_pu : "-" }}
              </InfoRow>
              <InfoRow name="Email">
                {{ submissionDetail.email ? submissionDetail.email : "-" }}
              </InfoRow>
              <ThinLine :thickness="1" />
              <InfoRow name="Jenis Badan Usaha">
                {{
                  submissionDetail.jenis_badan_usaha
                    ? submissionDetail.jenis_badan_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Skala Usaha">
                {{
                  submissionDetail.skala_usaha
                    ? submissionDetail.skala_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Tingkat Usaha">
                {{
                  submissionDetail.tingkat_usaha
                    ? submissionDetail.tingkat_usaha
                    : "-"
                }}
              </InfoRow>
              <InfoRow name="Modal Dasar">
                Rp {{ submissionDetail.modal_usaha }}
              </InfoRow>
              <InfoRow name="Asal Usaha">
                {{
                  submissionDetail.asal_usaha
                    ? submissionDetail.asal_usaha
                    : "-"
                }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelPic"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <InfoRow name="Nama">
                {{ picDetail.nama_pj ? picDetail.nama_pj : "-" }}
              </InfoRow>
              <InfoRow name="Nomor Kontak">
                {{
                  picDetail.nomor_kontak_pj ? picDetail.nomor_kontak_pj : "-"
                }}
              </InfoRow>
              <InfoRow name="Email">
                {{ picDetail.email_pj ? picDetail.email_pj : "-" }}
              </InfoRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelAspectLegal"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Aspek Legal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="aspectLegalItems.length"
                :headers="aspectLegalHeader"
                :items="aspectLegalItems"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFactory"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold"
              >Pabrik</VExpansionPanelTitle
            >
            <VExpansionPanelText>
              <VDataTable
                v-if="factoryItems.length"
                :headers="factoryHeader"
                :items="factoryItems"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelOutlet"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Outlet
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="outletItems.length"
                :headers="outletHeader"
                :items="outletItems"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSupervisor"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penyelia Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="supervisorItems.length"
                :headers="supervisorHeader"
                :items="supervisorItems"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
              <div>
                <VBtn
                  text="Download SK Penyelia"
                  append-icon="fa-download"
                  variant="outlined"
                  class="float-end mt-6"
                  :href="submissionDetail.url_sample_penyelia_sk"
                  target="_blank"
                />
              </div>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelSubstance"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Bahan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTable
                v-if="substanceItems.length"
                :headers="substanceHeader"
                :items="substanceItems"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProduct"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VDataTable
                v-if="productItems.length"
                :headers="productHeader"
                :items="productItems"
                class="elevation-1"
                fixed-header
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.foto="{ item }">
                  <VIcon color="primary" style="cursor: pointer">
                    ri-download-2-fill
                  </VIcon>
                </template>
              </VDataTable>
              <VCard v-else variant="outlined" class="py-2">
                <VRow>
                  <VCol cols="12" align="center">
                    <img src="~/assets/images/empty-data.png" alt="" />
                    <div class="pt-2 font-weight-bold">Data Kosong</div>
                  </VCol>
                </VRow>
              </VCard>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelProductionProcess"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Proses Produksi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <VTextarea
                ref="processProduction"
                placeholder="Masukkan proses produksi"
                v-model="submissionDetail.narasi"
                outlined
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels
          v-model="panelDownloadFormulir"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Formulir Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Surat Permohonan">
                <VBtn
                  :color="
                    downloadForms.surat_permohonan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Surat Pernyataan">
                <VBtn
                  :color="
                    downloadForms.surat_pernyataan ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Ikrar">
                <VBtn
                  :color="downloadForms.ikrar ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Hasil Verval">
                <VBtn
                  :color="downloadForms.hasil_verval ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Rekomendasi">
                <VBtn
                  :color="downloadForms.rekomendasi ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="SJPH">
                <VBtn
                  :color="downloadForms.sjph ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Laporan">
                <VBtn
                  :color="downloadForms.laporan ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="STTD">
                <VBtn
                  :color="downloadForms.sttd ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Sertifikasi Halal">
                <VBtn
                  :color="
                    downloadForms.sertifikasi_halal ? 'primary' : '#A09BA1'
                  "
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <br />
        <VExpansionPanels
          v-model="panelRegistration"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Daftar">
                {{
                  registrationDetail.no_daftar
                    ? registrationDetail.no_daftar
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tanggal">
                {{
                  registrationDetail.tgl_daftar
                    ? registrationDetail.tgl_daftar
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Tempat Pendaftaran">
                {{
                  registrationDetail.nama_provinsi
                    ? registrationDetail.nama_provinsi
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Jenis Pengajuan">
                {{
                  registrationDetail.jenis_pengajuan
                    ? registrationDetail.jenis_pengajuan
                    : "-"
                }}
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Status">
                <v-chip
                  style="background: #f0e9f1"
                  color="primary"
                  variant="outlined"
                  rounded="lg"
                >
                  {{
                    registrationDetail.status ? registrationDetail.status : "-"
                  }}
                </v-chip>
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-top" name="Channel Pendaftaran">
                {{
                  registrationDetail.channel ? registrationDetail.channel : "-"
                }}
              </InfoRowV2>
              <InfoRowV2 class="d-flex align-center" name="Fasilitator">
                {{
                  registrationDetail.fasilitator_name
                    ? registrationDetail.fasilitator_name
                    : "-"
                }}
              </InfoRowV2>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelFatwaHearing"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-4">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sidang Fatwa
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Penetapan"
                >-</InfoRowV2
              >
              <InfoRowV2 class="d-flex align-center" name="Tanggal Penetapan"
                >-</InfoRowV2
              >
              <InfoRowV2 class="d-flex align-center" name="Penetapan"
                >-</InfoRowV2
              >
              <InfoRowV2 class="d-flex align-center" name="Dokumen"
                >-</InfoRowV2
              >
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelHalalCertificate"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Sertifikat Halal
            </VExpansionPanelTitle>
            <VExpansionPanelText class="d-flex align-center">
              <InfoRowV2 class="d-flex align-center" name="Nomor Sertifikat"
                >-</InfoRowV2
              >
              <InfoRowV2 class="d-flex align-center" name="Tanggal Sertifikat"
                >-</InfoRowV2
              >
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <br />
        <VExpansionPanels
          v-model="panelTracking"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
        >
          <VExpansionPanel class="py-2">
            <VExpansionPanelTitle class="text-h4 font-weight-bold"
              >Melacak</VExpansionPanelTitle
            >
            <VExpansionPanelText class="d-flex align-center">
              <Melacak :data="trackingDetail" />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
import type { RouteLocationAsString } from "#vue-router";
import type { MasterBadanUsaha } from "@/server/interface/master.iface";

const route = useRoute<RouteLocationAsString>();
const submissionId = route.params?.id;

const snackbar = useSnackbar();

const panelSubmission = ref([0, 1]);
const panelPic = ref([0, 1]);
const panelAspectLegal = ref([0, 1]);
const panelFactory = ref([0, 1]);
const panelOutlet = ref([0, 1]);
const panelSupervisor = ref([0, 1]);
const panelSubstance = ref([0, 1]);
const panelProduct = ref([0, 1]);
const panelProductionProcess = ref([0, 1]);
const panelDownloadFormulir = ref([0, 1]);
const panelRegistration = ref([0, 1]);
const panelFatwaHearing = ref([0, 1]);
const panelHalalCertificate = ref([0, 1]);
const panelTracking = ref([0, 1]);

const submissionDetail = reactive({
  id_reg: "",
  tanggal_buat: "",
  no_mohon: "",
  tgl_mohon: "",
  jenis_layanan: "",
  jenis_produk: "",
  merk_dagang: "",
  area_pemasaran: "",
  pendamping: "",
  lembaga_pendamping: "",
  nama_kbli: "",
  nama_pu: "",
  alamat_pu: "",
  kota_pu: "",
  provinsi_pu: "",
  kode_pos_pu: "",
  negara_pu: "",
  telp_pu: "",
  email: "",
  jenis_badan_usaha: "",
  skala_usaha: "",
  tingkat_usaha: "",
  modal_usaha: 0,
  asal_usaha: "",
  narasi: "",
  url_sample_penyelia_sk: "",
});
const picDetail = reactive({
  nama_pj: "",
  nomor_kontak_pj: "",
  email_pj: "",
});

const kbliData = computed(() =>
  submissionDetail.nama_kbli ? submissionDetail.nama_kbli : null
);
const kbliDropdown = ref<any>([]);
const aspectLegalHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Jenis", key: "type", nowrap: true },
  { title: "No. Document", key: "documentNumber", nowrap: true },
  { title: "Tanggal", key: "date", nowrap: true },
  { title: "Masa Berlaku", key: "validDate", nowrap: true },
  { title: "Instansi Penerbit", key: "issuer", nowrap: true },
];
const aspectLegalItems = ref([
  // {
  //   no: 1,
  //   type: "SIUP",
  //   documentNumber: "2131421421411",
  //   date: "09/10/2024",
  //   validDate: "09/10/2024",
  //   issuer: "DITJEN PAJAK",
  // },
  // {
  //   no: 2,
  //   type: "NPWP",
  //   documentNumber: "2131421421411",
  //   date: "09/10/2024",
  //   validDate: "09/10/2024",
  //   issuer: "DITJEN PAJAK",
  // },
]);

const factoryHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama.", key: "name", nowrap: true },
  { title: "Alamat.", key: "address", nowrap: true },
];
const factoryItems = ref([
  // { no: 1, name: "My Drink Oke", address: "Jakarta" }
]);

const outletHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama.", key: "name", nowrap: true },
  { title: "Alamat.", key: "address", nowrap: true },
];
const outletItems = ref([
  // { no: 1, name: "Maya", address: "Jakarta" },
  // { no: 2, name: "Rahmi", address: "Bandung" },
]);

const supervisorHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama.", key: "name", nowrap: true },
  { title: "No. KTP.", key: "idNo", nowrap: true },
  { title: "No. Kontak", key: "phoneNumber", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "sertificateDate",
    nowrap: true,
  },
  { title: "No/Tgl SK", key: "skDate", nowrap: true },
];
const supervisorItems = ref([
  // {
  //   no: 1,
  //   name: "Maya",
  //   idNo: "2131421421411",
  //   phoneNumber: "0899999999",
  //   sertificateDate: "09/10/2024",
  //   skDate: "DITJEN PAJAK",
  // },
  // {
  //   no: 2,
  //   name: "Rahmi",
  //   idNo: "2131421421411",
  //   phoneNumber: "0899999999",
  //   sertificateDate: "09/10/2024",
  //   skDate: "DITJEN PAJAK",
  // },
]);

const substanceHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Jenis Bahan ", key: "type", nowrap: true },
  { title: "Nama Bahan", key: "name", nowrap: true },
  { title: "Produsen", key: "produsen", nowrap: true },
  { title: "No. Sertifikat Halal", key: "sertificateNumber", nowrap: true },
];
const substanceItems = ref([
  // {
  //   no: 1,
  //   type: "Bahan",
  //   name: "Air Matang",
  //   produsen: "PT ACEN ",
  //   sertificateNumber: "3123821093821093821",
  // },
]);

const productHeader = [
  { title: "No.", key: "no", nowrap: true },
  { title: "Nama Produk ", key: "name", nowrap: true },
  { title: "Merk ", key: "brand", nowrap: true },
  { title: "Foto", value: "foto", sortable: false, nowrap: true },
  { title: "Jumlah Bahan Digunakan", key: "totalUsage", nowrap: true },
];
const productItems = ref([
  // { no: 1, name: "Jus Mangga Rez", brand: "Rez Juice", totalUsage: "1000" },
]);

const downloadForms = reactive({
  surat_permohonan: null,
  surat_pernyataan: null,
  ikrar: null,
  hasil_verval: null,
  rekomendasi: null,
  sjph: null,
  laporan: null,
  sttd: null,
  sertifikasi_halal: null,
});

const registrationDetail = reactive({
  no_daftar: "",
  tgl_daftar: "",
  nama_provinsi: "",
  jenis_pengajuan: "",
  status: "",
  channel: "",
  fasilitator_name: "",
});
const fatwaSessionDetail = reactive({
  nomor_penetapan: "",
  tanggal_penetapan: "",
  ketetapan: "",
  dokumen: "",
});
const halalCertificateDetail = reactive({
  nomor_sertifikat: "",
  tanggal_sertifikat: "",
});
const trackingDetail = reactive([]);

const updateKbli = () => {
  snackbar.sendSnackbar("KBLI Successfully Updated", "success");
};

onMounted(async () => {
  try {
    const response: any = await $api(`/self-declare/${submissionId}/detail`, {
      method: "get",
    });

    if (response.code === 2000) {
      console.log(response.data, "< res detail");
      // data for left side
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(picDetail, response.data.penanggung_jawab);
      aspectLegalItems.value = response.data.aspek_legal;
      factoryItems.value = response.data.pabrik;
      outletItems.value = response.data.outlet;
      supervisorItems.value = response.data.penyelia_halal;
      substanceItems.value = response.data.bahan;
      productItems.value = response.data.produk;

      // data for right side
      Object.assign(registrationDetail, response.data.certificate_halal);
      Object.assign(fatwaSessionDetail, response.data.sidang_fatwa);
      Object.assign(
        halalCertificateDetail,
        response.data.sertifikat_halal_info
      );
      Object.assign(trackingDetail, response.data.tracking);
    }
  } catch (error) {
    console.log(error, "< err detail");
  }

  const response3: MasterBadanUsaha[] = await $api("/master/kbli", {
    method: "get",
  });
  kbliDropdown.value = response3;

  console.log(response3, "< res kbli");
});
</script>
