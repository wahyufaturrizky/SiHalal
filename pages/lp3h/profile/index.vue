<script setup lang="ts">
import type {
  MasterDistrict,
  MasterSubDistrict,
} from "@/server/interface/master.iface";

const panelProfile = ref([0, 1]);
const panelPenanggungJawab = ref([0, 1]);
const panelDataPendamping = ref([0, 1]);
const panelDataRegistrasi = ref([0, 1]);
const panelDokumenPersyaratan = ref([0, 1]);
const panelDataRekeningBankDanNpwp = ref([0, 1]);

const itemPerPage = ref(10);
const totalItems = ref(0);
const page = ref(1);
const loading = ref(true);

const dataProfilePendamping = ref([
  { label: "Nama Lembaga", value: "-" },
  { label: "Jenis Lembaga", value: "-" },
  { label: "Alamat", value: "-" },
  { label: "Kecamatan", value: "-" },
  { label: "Kode Pos", value: "-" },
  { label: "Kota/Kab", value: "-" },
  { label: "Provinsi", value: "-" },
  { label: "Email", value: "-" },
]);

const dataNamaPenanggungJawab = ref([
  { label: "Nama Pimpinan", value: "-" },
  { label: "No. HP Pimpinan", value: "-" },
]);

const dataKontakPenanggungJawab = ref([
  { label: "Nama Kontak", value: "-" },
  { label: "No. HP Kontak", value: "-" },
]);

const dataPendampingHeader = [
  { title: "No", key: "no" },
  { title: "NIK", key: "nik" },
  { title: "Pendidikan", key: "pendidikan" },
  { title: "Ijazah", key: "ijazah" },
  { title: "KTP", key: "ktp" },
  { title: "No. Register", key: "noRegister", nowrap: true },
  { title: "Tanggal Berlaku", key: "tanggalBerlaku", nowrap: true },
  { title: "Status Registrasi", key: "status", nowrap: true },

  // { title: "Action", key: "action"}
];

const dataPendampingItem = ref([]);

// const downloadFile = async (filename: string, params: string) => {
//   return await downloadDocument(filename, params);
// };

const loadItem = async (page: number, size: number) => {
  try {
    loading.value = true;

    const response = await $api("/lp3h/list-pendamping", {
      method: "get",
      params: {
        page,
        size,
      },
    });

    const data = response.data;

    if (data != null) {
      dataPendampingItem.value = data.map((i) => ({
        nik: i.nik,
        pendidikan: i.pendidikan,
        noRegister: i.idx_daftar,
        tanggalBerlaku: i.tgl_berlaku,
        status: i.status,
        ijazah: i.fotoijazah,
        ktp: i.fotoktp,
      }));
    }

    // console.log("DATA PENDAMPING : {} ", dataPendampingItem)

    totalItems.value = response.total_item;
    loading.value = false;
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
    loading.value = false;
  }
};

const loadProvince = async () => {
  const response: MasterProvince[] = await $api("/master/province", {
    method: "get",
  });

  province.value = response.map((i) => ({
    title: i.name,
    value: i.code,
  }));
};

const getDistrict = async () => {
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: dataProfilePendamping.value.provinsi,
    },
  });

  kabKota.value = response.map((i) => ({
    title: i.name,
    value: i.code,
  }));
};

const getSubDistrict = async () => {
  const response: MasterSubDistrict[] = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: dataProfilePendamping.value.kabKota,
    },
  });

  kecamatan.value = response.map((i) => ({
    title: i.name,
    value: i.code,
  }));
};

const dataRegistrasi = ref([
  { label: "No. Registrasi", value: "-" },
  { label: "Tanggal Berlaku", value: "-" },
  { label: "Status", value: "-" },
]);

const dokumenPersyaratan = ref([]);

const dialog = ref(false);

const loadProfil = async () => {
  try {
    const response = await $api("/lp3h/profil", {
      method: "get",
    });

    const data = response.data;

    // console.log("RESPONSE : ", response)

    const lp = data.lembaga_pendamping;

    dataProfilePendamping.value = [
      { label: "Nama Lembaga", value: lp.nama_lembaga },
      { label: "Jenis Lembaga", value: lp.jenis_lembaga },
      { label: "Alamat", value: lp.alamat },
      { label: "Kecamatan", value: lp.MKecamatan?.namakecamatan },
      { label: "Kode Pos", value: lp.kode_pos },
      { label: "Kota/Kab", value: lp.MKabupaten?.namakabupaten },
      { label: "Provinsi", value: lp.MProvinsi?.namaprovinsi },
      { label: "Email", value: lp.email },
    ];

    dataNamaPenanggungJawab.value = [
      { label: "Nama Pimpinan", value: lp.nama_pimpinan },
      { label: "No. HP Pimpinan", value: lp.no_hp },
    ];

    dataKontakPenanggungJawab.value = [
      { label: "Nama Kontak", value: lp.nama_kontak },
      { label: "No. HP Kontak", value: lp.no_hp_kontak_person },
    ];

    dataRegistrasi.value = [
      { label: "No. Registrasi", value: lp.no_register },
      { label: "Tanggal Berlaku", value: lp.tgl_berlaku },
      { label: "Status", value: lp.status },
    ];

    const lpd = data.lembaga_pendamping_doc;

    dokumenPersyaratan.value = lpd.map((i) => ({
      name: i.jenis,
      file: i.namafile,
    }));
    console.log("DOKUMEN PERSYARATAN ", dokumenPersyaratan);

    const rek = data.rekening;

    dataRekeningBankDanNpwp.value = {
      namaBank: rek.bank,
      noRekening: rek.no_rekening,
      atasNama: rek.nama,
      fotoRekening: rek.filefotorek,
      npwp: rek.nama_npwp,
      fotoNpwp: rek.filefotonpwp,
    };
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const dataRekeningBankDanNpwp = ref({});

const getColor = (status) => {
  return status.toUpperCase() === "Disetujui".toUpperCase()
    ? "success"
    : "error";
};

onMounted(async () => {
  await loadProfil();
});
</script>

<template>
  <VContainer>
    <VDialog v-model="dialog" max-width="700">
      <VCard class="pa-4">
        <VCardTitle>Pengajuan </VCardTitle>
        <VCardText>Ajukan sebagai lembaga Pendamping ?</VCardText>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <VBtn variant="outlined" color="primary" @click="dialog = false">
              Batal
            </VBtn>
            <VBtn variant="flat" color="primary" @click="ajukanHandler">
              Ya, Setuju
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
    <VRow>
      <KembaliButton />
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-8">
        <h3 class="text-h3">Lembaga Pendamping</h3>
      </VCol>
      <VCol cols="8">
        <VRow class="d-flex justify-end align-center ga-2">
          <VBtn
            variant="outlined"
            append-icon="ri-edit-line"
            @click="navigateTo(`/lp3h/profile/edit`)"
          >
            Ubah
          </VBtn>
          <!--          <VBtn append-icon="fa-paper-plane" @click="dialog = true"> -->
          <!--            Ajukan -->
          <!--          </VBtn> -->
        </VRow>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelProfile" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Profil Lembaga Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText v-if="!loading">
              <VRow v-for="(item, index) in dataProfilePendamping" :key="index">
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right"> : </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels v-model="panelPenanggungJawab" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Penanggung Jawab
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow
                v-for="(item, index) in dataNamaPenanggungJawab"
                :key="index"
              >
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right"> : </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
              <VDivider class="my-4" />
              <VRow
                v-for="(item, index) in dataKontakPenanggungJawab"
                :key="index"
              >
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right"> : </VCol>
                <VCol cols="6" class="pl-0">
                  {{ item.value }}
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <VExpansionPanels v-model="panelDataPendamping" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VDataTableServer
                disable-sort
                v-model:items-per-page="itemPerPage"
                v-model:page="page"
                :items-per-page-options="[10, 25, 50, 100]"
                :headers="dataPendampingHeader"
                :items="dataPendampingItem"
                :items-length="totalItems"
                loading-text="Loading..."
                @update:options="loadItem(page, itemPerPage)"
              >
                <template #item.no="{ index }">
                  {{ index + 1 }}
                </template>

                <template #item.ijazah="{ item }">
                  <VBtn
                    v-if="item.ijazah"
                    icon
                    variant="text"
                    @click="downloadDocument(item.ijazah, 'PENDAMPING_IJAZAH')"
                  >
                    <VIcon size="24" color="primary"> mdi-eye </VIcon>
                  </VBtn>
                </template>

                <template #item.ktp="{ item }">
                  <VBtn
                    v-if="item.ktp"
                    icon
                    variant="text"
                    @click="downloadDocument(item.ktp, 'PENDAMPING_KTP')"
                  >
                    <VIcon size="24" color="primary"> mdi-eye </VIcon>
                  </VBtn>
                </template>

                <template #item.status="{ item }">
                  <VChip
                    :color="getColor(item.status)"
                    variant="outlined"
                    label
                  >
                    {{ item.status }}
                  </VChip>
                </template>

                <template #item.tanggalBerlaku="{ item }">
                  {{ formatDateId(item.tanggalBerlaku) }}
                </template>

                <!--                <template #item.action="{ item }"> -->
                <!--                  <VBtn icon variant="text" @click="deleteItem(item)"> -->
                <!--                    <VIcon size="24" color="error">mdi-delete</VIcon> -->
                <!--                  </VBtn> -->
                <!--                </template> -->
              </VDataTableServer>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VExpansionPanels v-model="panelDataRegistrasi" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Registrasi
            </VExpansionPanelTitle>
            <VExpansionPanelText v-if="!loading">
              <VRow
                v-for="(item, index) in dataRegistrasi"
                :key="index"
                class="d-flex justify-center align-center"
              >
                <VCol cols="5" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="1" class="text-right"> : </VCol>
                <VCol cols="6" class="pl-0">
                  <VChip
                    v-if="item.label === 'Status'"
                    :color="getColor(item.value)"
                    variant="outlined"
                    label
                  >
                    {{ item.value }}
                  </VChip>
                  <span v-else>
                    {{ item.value }}
                  </span>
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelDokumenPersyaratan" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Persyaratan
            </VExpansionPanelTitle>
            <VExpansionPanelText v-if="dokumenPersyaratan.length > 0">
              <VList class="mb-4">
                <VListItem
                  v-for="(item, index) in dokumenPersyaratan"
                  :key="index"
                  class="pa-1"
                >
                  <VRow class="d-flex align-center">
                    <VCol cols="12" md="8">
                      <div class="text-body-1 font-weight-medium">
                        {{ index + 1 }}.{{ item.name }}
                      </div>
                    </VCol>
                    <VCol cols="12" md="4" class="squareBtnIcon">
                      <!--                      <VBtn  icon variant="outlined" color="error" @click="deleteDokumenPersyaratan(item)"> -->
                      <!--                        <VIcon >mdi-delete</VIcon> -->
                      <!--                      </VBtn> -->
                      <VBtn
                        icon
                        variant="outlined"
                        color="purple"
                        class="ml-2"
                        @click="downloadDocument(item.file, 'FILES')"
                      >
                        <VIcon color="primary"> mdi-download </VIcon>
                      </VBtn>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow>
                <VCol cols="2">
                  <span style="color: red">Info :</span>
                </VCol>
                <VCol cols="8">
                  <span>
                    File yang akan di upload dengan extension XLSX, PDF, dan JPG
                    dan kapasitas maksimal 50 Mb untuk sekali Upload.
                  </span>
                </VCol>
              </VRow>
              <!--              <VDivider class="my-4"/> -->
              <!--              <VRow class="d-flex justify-end ma-3"> -->
              <!--                <VBtn> -->
              <!--                  Simpan -->
              <!--                </VBtn> -->
              <!--              </VRow> -->
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <!--        <VExpansionPanels v-model="panelMelacak" class="mb-4"> -->
        <!--          <VExpansionPanel> -->
        <!--            <VExpansionPanelTitle class="text-h4 font-weight-bold"> -->
        <!--              Melacak -->
        <!--            </VExpansionPanelTitle> -->
        <!--            <VExpansionPanelText> -->
        <!--              <HalalTimeLine :event="[ -->
        <!--                { created_at: '09/09/2024', -->
        <!--                  id: '1', -->
        <!--                  status: 'Pengajuan', -->
        <!--                  username: 'Samsul', -->
        <!--                  comment: ''}, -->
        <!--              ]" /> -->
        <!--            </VExpansionPanelText> -->
        <!--          </VExpansionPanel> -->
        <!--        </VExpansionPanels> -->

        <VExpansionPanels v-model="panelDataRekeningBankDanNpwp" class="mb-8">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Rekening Bank & NPWP
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VLabel for="namaBank"> Nama Bank </VLabel>
              <VTextField
                id="namaBank"
                v-model="dataRekeningBankDanNpwp.namaBank"
                class="mb-4"
                disabled
              />

              <VLabel for="noRekening"> No. Rekening </VLabel>
              <VTextField
                id="noRekening"
                v-model="dataRekeningBankDanNpwp.noRekening"
                class="mb-4"
                disabled
              />

              <VLabel for="atasNama"> Atas Nama </VLabel>
              <VTextField
                id="atasNama"
                v-model="dataRekeningBankDanNpwp.atasNama"
                class="mb-4"
                disabled
              />

              <VRow class="d-flex align-center mb-2">
                <VCol cols="12" md="8">
                  <div class="text-body-1 font-weight-medium">
                    Foto Rekening
                  </div>
                </VCol>
                <VCol cols="12" md="4" class="squareBtnIcon">
                  <VBtn
                    icon
                    variant="outlined"
                    color="purple"
                    class="ml-2"
                    @click="
                      downloadDocument(
                        dataRekeningBankDanNpwp.fotoRekening,
                        'FILES'
                      )
                    "
                  >
                    <VIcon color="primary"> mdi-download </VIcon>
                  </VBtn>
                </VCol>
              </VRow>

              <!--              <VLabel for="fotoRekening"> -->
              <!--                Upload Foto Rekening -->
              <!--              </VLabel> -->
              <!--              <VBtn block variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)"> -->
              <!--                <VIcon color="primary">mdi-download</VIcon> -->
              <!--              </VBtn> -->
              <!--              <HalalFileInput -->
              <!--                class="mb-4" -->
              <!--                id="fotoRekening" -->
              <!--                v-model="dataRekeningBankDanNpwp.fotoRekening" -->
              <!--              /> -->

              <VLabel for="npwp"> NPWP </VLabel>
              <VTextField
                id="npwp"
                v-model="dataRekeningBankDanNpwp.npwp"
                class="mb-4"
                disabled
              />

              <VRow class="d-flex align-center">
                <VCol cols="12" md="8">
                  <div class="text-body-1 font-weight-medium">Foto NPWP</div>
                </VCol>
                <VCol cols="12" md="4" class="squareBtnIcon">
                  <VBtn
                    icon
                    variant="outlined"
                    color="purple"
                    class="ml-2"
                    @click="
                      downloadDocument(
                        dataRekeningBankDanNpwp.fotoNpwp,
                        'FILES'
                      )
                    "
                  >
                    <VIcon color="primary"> mdi-download </VIcon>
                  </VBtn>
                </VCol>
              </VRow>

              <!--              <VLabel for="fotoNpwp"> -->
              <!--                Upload Foto NPWP -->
              <!--              </VLabel> -->
              <!--              <VBtn block  variant="outlined" color="purple" class="ml-2" @click="downloadDokumenPersyaratan(item)"> -->
              <!--                <VIcon color="primary">mdi-download</VIcon> -->
              <!--              </VBtn> -->
              <!--              <HalalFileInput -->
              <!--                class="mb-4" -->
              <!--                id="fotoNpwp" -->
              <!--                v-model="dataRekeningBankDanNpwp.fotoNpwp" -->
              <!--              /> -->
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
    </VRow>
  </VContainer>
</template>

<style scoped lang="scss">
.squareBtnIcon button {
  border-radius: 8px;
}
</style>
