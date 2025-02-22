<script setup lang="ts">
const panelProfile = ref([0, 1]);
const panelBank = ref([0, 1]);
const panelPendidikan = ref([0, 1]);

const panelDataRegistrasi = ref([0, 1]);
const panelDokumenPersyaratan = ref([0, 1]);
const panelMelacak = ref([0, 1]);

// let dataProfilePendamping = [
//   { label: "NIK", value: "322323232332" },
//   { label: "Nama", value: "John Fren" },
//   {
//     label: "Alamat",
//     value:
//       "Sumbawa Banget, RT002/RW002, Sumbang, Curio Sumbawa Banget, RT002/RW002, Sumbang, Curio",
//   },
//   { label: "Provinsi", value: "Jawa Tengah" },
//   { label: "Kota/Kab", value: "Kota Semarang" },
//   { label: "Kecamatan", value: "Ngaliyan" },
//   { label: "Kode Pos", value: "14045" },
//   { label: "Email", value: "LPHLPPOM@gmail.com" },
//   { label: "Telp /HP", value: "0812345678978" },
//   { label: "Tempat Lahir", value: "Surabaya" },
//   { label: "Pekerjaaan", value: "Lainnya" },
// ];

const dataProfilePendamping = ref([
  { label: "NIK", value: "" },
  { label: "Nama", value: "" },
  { label: "Alamat", value: "" },
  { label: "Provinsi", value: "" },
  { label: "Kota/Kab", value: "" },
  { label: "Kecamatan", value: "" },
  { label: "Kode Pos", value: "" },
  { label: "Email", value: "" },
  { label: "Telp /HP", value: "" },
  { label: "Tempat Lahir", value: "" },
  { label: "Tanggal Lahir", value: "" },
  { label: "Pekerjaaan", value: "" },
]);

const dataBank = ref([
  { label: "Nama Bank", value: "" },
  { label: "No. Rekening", value: "" },
  { label: "Nama Rekening", value: "" },
  { label: "File Rekening", value: "" },
]);

const dataBank2 = ref([
  { label: "NPWP", value: "" },
  { label: "Nama pada NPWP", value: "" },
  { label: "File NPWP", value: "" },
]);

const dataPendidikan = ref([
  { label: "Pendidikan Terakhir", value: "" },
  { label: "Nama Universitas", value: "" },
]);

const deleteItem = (item) => {
  console.log("ITEM DELETE : ", item);
};

const previewIjazah = (item) => {
  console.log("PREVIEW IJAZAH : ", item);
};

const previewKtp = (item) => {
  console.log("PREVIEW KTP : ", item);
};

const dataRegistrasi = [
  { label: "Status", value: "Disetujui" },
  { label: "No. Registrasi", value: "1234567890789" },
  { label: "Tanggal Berlaku", value: "-" },
];

const documentLMS = ref([{ label: "Pendalaman LMS", value: "" }]);

const dokumenPersyaratan = ref([
  { label: "Ijazah", value: "" },
  { label: "KTP", value: "" },
  { label: "Sertifikat Pelatihan", value: "" },
]);

const deleteDokumenPersyaratan = (item) => {
  console.log("DELETE DOKUMEN PERSYARATAN : ", item);
};

const downloadDokumenPersyaratan = (item) => {
  console.log("Download Dokumen Peryaratan : ", item);
};

const dialog = ref(false);

const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const handleDownloadV2 = async (filename) => {
  try {
    console.log(filename, "ini value");
    const response: any = await $api("/shln/submission/document/download", {
      method: "post",
      body: {
        filename: filename,
      },
    });

    if (response.url)
      window.open(response.url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async () => {
  try {
    const response = await $api("/reguler/lph/detail-pendamping", {
      method: "get",
    });
    if (
      response.data.pendamping.provinsi &&
      response.data.pendamping.provinsi != "00"
    ) {
      await getDistrict(response.data.pendamping.provinsi);
    }
    await getSubDistrict(response.data.pendamping.kabupaten);

    if (response.code != 4000) {
      console.log(response.data, "ini masuk kode");
      dataProfilePendamping.value.forEach((el) => {
        if (el.label === "NIK") el.value = response.data.pendamping.nik;
        if (el.label === "Nama") el.value = response.data.pendamping.nama;
        if (el.label === "Alamat") el.value = response.data.pendamping.alamat;
        if (el.label === "Provinsi")
          el.value = response.data.pendamping.provinsi;
        if (el.label === "Kota/Kab")
          el.value = response.data.pendamping.kabupaten;
        if (el.label === "Kecamatan")
          el.value = Math.floor(response.data.pendamping.kecamatan) + "";
        if (el.label === "Kode Pos")
          el.value = response.data.pendamping.kode_pos;
        if (el.label === "Email") el.value = response.data.pendamping.email;
        if (el.label === "Telp /HP") el.value = response.data.pendamping.no_hp;

        if (el.label === "Tempat Lahir")
          el.value = response.data.pendamping.tempat_lahir;
        if (el.label === "Tanggal Lahir")
          el.value = formatDate(response.data.pendamping.tgl_lahir);
        if (el.label === "Pekerjaaan")
          el.value = response.data.pendamping.pekerjaan;
      });

      dataBank.value.forEach((el) => {
        if (el.label === "Nama Bank")
          el.value = response.data.rekening.kode_bank;
        if (el.label === "No. Rekening")
          el.value = response.data.rekening.no_rekening;
        if (el.label === "Nama Rekening")
          el.value = response.data.rekening.nama;
        if (el.label === "File Rekening")
          el.value = response.data.rekening.filefotorek;
      });

      dataBank2.value.forEach((el) => {
        if (el.label === "NPWP") el.value = response.data.rekening.npwp;
        if (el.label === "Nama pada NPWP")
          el.value = response.data.rekening.nama_npwp;
        if (el.label === "File NPWP")
          el.value = response.data.rekening.filefotonpwp;
      });
      dataPendidikan.value.forEach((el) => {
        if (el.label === "Pendidikan Terakhir")
          el.value = response.data.pendamping.pendidikan;
        if (el.label === "Nama Universitas")
          el.value = response.data.pendamping.universitas;
      });

      documentLMS.value.forEach((el) => {
        if (el.label === "Pendalaman LMS") el.value = response.data.great_edu;
      });

      dokumenPersyaratan.value.forEach((el) => {
        if (el.label === "Ijazah")
          el.value = response.data.pendamping.fotoijazah;
        if (el.label === "KTP") el.value = response.data.pendamping.fotoktp;
        if (el.label === "Sertifikat Pelatihan")
          el.value = response.data.pendamping.file_sertifikat;
      });

      return;
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const openLink = (url: string) => {
  console.log(url, "ini tetst");
  if (url) {
    window.open(url, "_blank");
  }
};

const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  } as any);
  provinceList.value = response;
};
const getDistrict = async (kode: string) => {
  const response: MasterDistrict[] = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  });
  districtList.value = response;
};
const getSubDistrict = async (kode: string) => {
  const response = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: kode,
    },
  } as any);
  subDistrictList.value = response;
};
const provinceList = ref();
const districtList = ref();
const subDistrictList = ref();

onMounted(async () => {
  await Promise.allSettled([getProfile(), getProvince()]);
});

const isEditing = ref(false);

const toggleEdit = async () => {
  if (!isEditing.value) {
    await getProfile();
  }
  isEditing.value = !isEditing.value;
};

const cancelEdit = async () => {
  await getProfile();
  isEditing.value = false;
};
</script>

<template>
  <VContainer>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-8">
        <h3 class="text-h3">Tenaga Pendamping</h3>
      </VCol>
      <VCol style="display: flex; justify-content: end; mr-2">
        <VBtn
          density="compact"
          variant="outlined"
          :color="isEditing ? 'green' : 'primary'"
          @click="toggleEdit"
        >
          {{ isEditing ? "Simpan" : "Ubah" }}
        </VBtn>
        <VBtn
          v-if="isEditing"
          density="compact"
          variant="outlined"
          color="red"
          class="ml-2"
          @click="cancelEdit"
        >
          Batal
        </VBtn>
      </VCol>
    </VRow>

    <VRow class="d-flex justify-space-between">
      <VCol cols="8">
        <VExpansionPanels v-model="panelProfile" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Profil Tenaga Pendamping
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow v-for="(item, index) in dataProfilePendamping" :key="index">
                <VCol cols="3" class="text-left font-weight-medium">
                  {{ item.label }}
                </VCol>
                <VCol cols="12" class="font-weight-medium">
                  <VTextField
                    v-if="
                      item.label !== 'Alamat' &&
                      item.label !== 'Provinsi' &&
                      item.label !== 'Kota/Kab' &&
                      item.label !== 'Kecamatan'
                    "
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                  />
                  <VTextarea
                    v-if="
                      item.label === 'Alamat' &&
                      item.label !== 'Provinsi' &&
                      item.label !== 'Kota/Kab' &&
                      item.label !== 'Kecamatan'
                    "
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                    rows="2"
                    auto-grow
                  />

                  <VSelect
                    v-if="item.label === 'Provinsi'"
                    placeholder="Pilih provinsi"
                    v-model="item.value"
                    :rules="[requiredValidator]"
                    @update:model-value="getDistrict"
                    :items="provinceList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    :readonly="!isEditing"
                  />

                  <VSelect
                    v-if="item.label === 'Kota/Kab'"
                    placeholder="Pilih kota/kabupaten"
                    :rules="[requiredValidator]"
                    v-model="item.value"
                    @update:model-value="getSubDistrict"
                    :items="districtList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    :readonly="!isEditing"
                  />

                  <VSelect
                    v-if="item.label === 'Kecamatan'"
                    placeholder="Pilih kecamatan"
                    :rules="[requiredValidator]"
                    v-model="item.value"
                    :items="subDistrictList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    :readonly="!isEditing"
                  />
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelPendidikan" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Pendidikan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow
                v-for="(item, index) in dataPendidikan"
                :key="index"
                class="my-2"
              >
                <VCol cols="12">
                  <span class="font-weight-medium">{{ item.label }}</span>
                </VCol>

                <VCol cols="12" v-if="item.label === 'Pendidikan Terakhir'">
                  <VSelect
                    v-model="item.value"
                    :items="['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                  />
                </VCol>

                <!-- Input untuk Nama Universitas -->
                <VCol cols="12" v-if="item.label === 'Nama Universitas'">
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                  />
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelMelacak" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Melacak
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <HalalTimeLine
                :event="[
                  {
                    created_at: '09/09/2024',
                    id: '1',
                    status: 'Pengajuan',
                    username: 'Samsul',
                    comment: '',
                  },
                ]"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </VCol>
      <VCol cols="4">
        <VCard class="mb-4">
          <VCardTitle class="text-h4 font-weight-bold">
            LMS GreatEdu
          </VCardTitle>
          <VCardText>
            <VList class="mb-4">
              <VListItem
                v-for="(item, index) in documentLMS"
                :key="index"
                class="pa-1"
              >
                <VRow class="d-flex align-center">
                  <VCol cols="12" md="8">
                    <div class="text-body-1 font-weight-medium">
                      {{ item.label }}
                    </div>
                  </VCol>
                  <!-- <VBtn variant="flat" class="px-3 ms-2">
                    <VIcon
                      icon="fa-download"
                      @click="handleDownload(item.file_name)"
                    ></VIcon>
                  </VBtn> -->
                  <VCol cols="12" md="4" class="squareBtnIcon" disabled="true">
                    :
                    <VBtn
                      variant="flat"
                      class="px-3 ms-2"
                      @click="openLink(item.value)"
                    >
                      <VIcon icon="fa-download"></VIcon>
                    </VBtn>
                  </VCol>
                </VRow>
              </VListItem>
            </VList>
          </VCardText>
        </VCard>

        <VExpansionPanels v-model="panelDataRegistrasi" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Status Registrasi
            </VExpansionPanelTitle>
            <VExpansionPanelText>
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
                    :color="item.value === 'Disetujui' ? 'success' : 'error'"
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

        <VExpansionPanels v-model="panelBank" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Data Bank
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VRow v-for="(item, index) in dataBank" :key="index" class="my-2">
                <VCol cols="12" v-if="item.label !== 'File Rekening'">
                  <span class="font-weight-medium">{{ item.label }}</span>
                </VCol>
                <VCol cols="4" v-if="item.label === 'File Rekening'">
                  <span class="font-weight-medium">{{ item.label }} </span>
                </VCol>
                <VCol cols="1" v-if="item.label === 'File Rekening'"> : </VCol>

                <VCol v-if="item.label === 'Nama Bank'" cols="12">
                  <VSelect
                    v-model="item.value"
                    :items="[
                      'Bank Syariah Indonesia',
                      'BCA',
                      'Mandiri',
                      'BNI',
                      'BRI',
                    ]"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                  />
                </VCol>

                <VCol
                  v-if="
                    item.label !== 'File Rekening' && item.label !== 'Nama Bank'
                  "
                  cols="12"
                >
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :readonly="!isEditing"
                  />
                </VCol>

                <VCol v-if="item.label === 'File Rekening'" cols="7">
                  <VBtn variant="flat" class="px-3 ms-2" color="primary">
                    <VIcon
                      icon="fa-download"
                      @click="downloadDocument(item.value)"
                    ></VIcon>
                  </VBtn>
                </VCol>
              </VRow>
              <VDivider class="my-3" />
              <VRow
                v-for="(item, index) in dataBank2"
                :key="index"
                class="my-2"
              >
                <VCol cols="12" v-if="item.label !== 'File NPWP'">
                  <span class="font-weight-medium">{{ item.label }}</span>
                </VCol>
                <VCol cols="4" v-if="item.label === 'File NPWP'">
                  <span class="font-weight-medium">{{ item.label }} </span>
                </VCol>
                <VCol cols="1" v-if="item.label === 'File NPWP'"> : </VCol>

                <VCol cols="12" v-if="item.label !== 'File NPWP'">
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    readonly
                  />
                </VCol>

                <VCol v-if="item.label === 'File NPWP'" cols="7">
                  <VBtn variant="flat" class="px-3 ms-2" color="primary">
                    <VIcon
                      icon="fa-download"
                      @click="downloadDocument(item.value)"
                    ></VIcon>
                  </VBtn>
                </VCol>
              </VRow>
              <VDivider class="my-3" />
              Rekening dalam proses verifiaksi oleh LP3H
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-model="panelDokumenPersyaratan" class="mb-4">
          <VExpansionPanel>
            <VExpansionPanelTitle class="text-h4 font-weight-bold">
              Dokumen Persyaratan
            </VExpansionPanelTitle>
            <VExpansionPanelText>
              <VList class="mb-4">
                <VListItem
                  v-for="(item, index) in dokumenPersyaratan"
                  :key="index"
                  class="pa-1"
                >
                  <VRow class="d-flex align-center">
                    <VCol cols="12" md="8">
                      <div class="text-body-1 font-weight-medium">
                        {{ item.label }}
                      </div>
                    </VCol>
                    <VCol
                      cols="12"
                      md="4"
                      class="squareBtnIcon"
                      v-if="item.label === 'Ijazah'"
                    >
                      :
                      <VBtn variant="flat" class="px-3 ms-2">
                        <VIcon
                          icon="fa-download"
                          @click="
                            downloadDocument(item.value, 'PENDAMPING_IJAZAH')
                          "
                        ></VIcon>
                      </VBtn>
                    </VCol>

                    <VCol
                      cols="12"
                      md="4"
                      class="squareBtnIcon"
                      v-if="item.label === 'KTP'"
                    >
                      :
                      <VBtn variant="flat" class="px-3 ms-2">
                        <VIcon
                          icon="fa-download"
                          @click="
                            downloadDocument(item.value, 'PENDAMPING_KTP')
                          "
                        ></VIcon>
                      </VBtn>
                    </VCol>

                    <VCol
                      cols="12"
                      md="4"
                      class="squareBtnIcon"
                      v-if="item.label === 'Sertifikat Pelatihan'"
                    >
                      :
                      <VBtn variant="flat" class="px-3 ms-2">
                        <VIcon
                          icon="fa-download"
                          @click="
                            downloadDocument(
                              item.value,
                              'PENDAMPING_SERT_PELATIHAN'
                            )
                          "
                        ></VIcon>
                      </VBtn>
                    </VCol>
                  </VRow>
                </VListItem>
              </VList>
              <VRow> </VRow>
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
