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

const authUser = useMyAuthUserStore();

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
  { label: "Pekerjaan", value: "" },
  { label: "Pekerjaan_lain", value: "" },
  { label: "IDLembaga", value: "" },
  { label: "ID pendamping", value: "" },
]);

const dataBank = ref([
  { label: "Nama Bank", value: "" },
  { label: "No. Rekening", value: "" },
  { label: "Nama Rekening", value: "" },
  { label: "File Rekening", value: null },
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

const dataRegistrasi = ref([
  { label: "Status", value: "" },
  { label: "No. Registrasi", value: "" },
  { label: "Tanggal Terbit", value: "" },
]);

const documentLMS = ref([{ label: "Pendalaman LMS", value: "" }]);

const dokumenPersyaratan = ref([
  { label: "Ijazah", value: "" },
  { label: "KTP", value: "" },
  { label: "Sertifikat Pelatihan", value: "" },
]);

const getProfile = async () => {
  try {
    const response = await $api("/reguler/lph/detail-pendamping", {
      method: "get",
    });

    if (
      response.data.pendamping.provinsi &&
      response.data.pendamping.provinsi != "00"
    )
      await getDistrict(response.data.pendamping.provinsi);

    await getSubDistrict(response.data.pendamping.kabupaten);

    if (response.code != 4000) {
      dataProfilePendamping.value.forEach((el) => {
        if (el.label === "NIK") el.value = response.data.pendamping.nik;
        if (el.label === "Nama") el.value = response.data.pendamping.nama;
        if (el.label === "Alamat") el.value = response.data.pendamping.alamat;
        if (el.label === "Provinsi")
          el.value = response.data.pendamping.provinsi;
        if (el.label === "Kota/Kab")
          el.value = response.data.pendamping.kabupaten;
        if (el.label === "Kecamatan")
          el.value = `${Math.floor(response.data.pendamping.kecamatan)}`;
        if (el.label === "Kode Pos")
          el.value = response.data.pendamping.kode_pos;
        if (el.label === "Email") el.value = response.data.pendamping.email;
        if (el.label === "Telp /HP") el.value = response.data.pendamping.no_hp;

        if (el.label === "Tempat Lahir")
          el.value = response.data.pendamping.tempat_lahir;
        if (el.label === 'Tanggal Lahir') {
          const formatedDate = `${formatDateId(response.data.pendamping.tgl_lahir)}`
          const replacedDate = formatedDate.replaceAll('/', '-')

          el.value = replacedDate
        }
        if (el.label === "Pekerjaan")
          el.value = response.data.pendamping.pekerjaan;
        if (el.label === "IDLembaga")
          el.value = response.data.pendamping.id_lembaga;
        if (el.label === "ID pendamping")
          el.value = response.data.pendamping.id_pendamping;
      });

      dataPendidikan.value.forEach((el) => {
        if (el.label === "Pendidikan Terakhir")
          el.value = response.data.pendamping.pendidikan;
        if (el.label === "Nama Universitas")
          el.value = response.data.pendamping.universitas;
      });

      dataBank.value.forEach((el) => {
        if (el.label === "Nama Bank") el.value = response.data.rekening.bank;
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

      dataRegistrasi.value.forEach((el) => {
        if (el.label === "Status") el.value = response.data.pendamping.status;
        if (el.label === "No. Registrasi")
          el.value = `${Math.floor(response.data.pendamping.no_register)}`;
        if (el.label === 'Tanggal Terbit') {
          const formatedDate = `${formatDateId(response.data.pendamping.tgl_terbit)}`
          const replacedDate = formatedDate.replaceAll('/', '-')

          el.value = replacedDate
        }
      });

      documentLMS.value.forEach((el) => {
        if (el.label === "Pendalaman LMS") el.value = response.data.great_edu;
      });

      dokumenPersyaratan.value.forEach((el) => {
        if (el.label === "Ijazah")
          el.value = response.data.pendamping.fotoijazah;
        if (el.label === "KTP") el.value = response.data.pendamping.fotoktp;
        if (el.label === "Sertifikat Pelatihan") {
          const { file_sertifikat, fotosertifikat } =
            response.data.pendamping || {};

          el.value = file_sertifikat || fotosertifikat;
        }
      });
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};

const openLink = (url: string) => {
  if (url) window.open(url, "_blank");
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
const bankList = ref([])

const getListBank = async () => {
  try {
    const response = await $api('/reguler/lph/list-rekening', {
      method: 'get',
    })

    if (response.code === 2000)
      bankList.value = response?.data?.list?.map(e => (e?.bank_name))
  }
  catch (err) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
  }
}

onMounted(async () => {
  await Promise.allSettled([getProfile(), getProvince(), getListBank(),]);
});

const isEditing = ref(false);
const uploadFileButton = ref(false);

const uploadDocument = async (file) => {
  try {
    const formData = new FormData();

    formData.append("id", authUser.user.id);
    formData.append("file", file);
    formData.append("type", "docs");

    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });

    return response?.data?.file_url;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};

// {
//     "alamat": "Argapura RT 04 RW 01 ",
//     "tempat_lahir": "Kota Cirebon ",
//     "tgl_lahir": "1978-06-19T00:00:00Z",
//     "no_hp": "0895364357845",
//     "email": "sleha1768@gmail.com",
//     "pendidikan": "SMA/MA",
//     "universitas": "MA Salafiyah Cirebon",
//     "nik": "3274035906780009",
//     "pekerjaan": "Mahasiswa/i",
//     "provinsi": "32",
//     "kode_pos": "45145",
//     "nama": "Soleha",
//     "IDLembaga": "3ef9e029-5120-46e0-9693-0427a364b83e",
//     "rekening": {
//         "no_rekening": "1212121",
//         "nama": "test",
//         "bank": "BCA",
//         "npwp": "1221"
//     }
// }
const handleEdit = async () => {
  await getProfile();
  isEditing.value = true;
};

const dialog = ref(false);

const handleCancel = async () => {
  dialog.value = false;
  isEditing.value = false;
  await getProfile();
};

function convertToISOString(dateStr) {
  // Pecah format "DD-MM-YYYY" menjadi bagian-bagian
  const [day, month, year] = dateStr.split("-");

  // Buat objek Date dalam UTC
  const date = new Date(Date.UTC(year, month - 1, day));

  // Konversi ke ISO string
  return date.toISOString();
}

const options = [
  "Penyuluh agama",
  "Dosen",
  "Guru/tenaga kependidikan pada madrasah",
  "Mahasiswa/i",
  "Ibu rumah tangga",
  "Santri",
  "Lainnya",
];

const handleSave = async () => {
  dialog.value = false;
  isEditing.value = false;

  const body = {
    rekening: {
      no_rekening: "",
      nama: "",
      bank: "",
      npwp: "",
      nama_npwp: "",
      file_foto_rek: "",
      file_foto_npwp: "",
    },
  };

  let id_pendamping = "";
  dataProfilePendamping.value.forEach((el) => {
    if (el.label === "NIK") body.nik = el.value;
    if (el.label === "Nama") body.nama = el.value;
    if (el.label === "Alamat") body.alamat = el.value;
    if (el.label === "Provinsi") body.provinsi = el.value;
    if (el.label === "Kota/Kab") body.kabupaten = el.value;
    if (el.label === "Kecamatan") body.kecamatan = el.value;
    if (el.label === "Kode Pos") body.kode_pos = el.value;
    if (el.label === "Email") body.email = el.value;
    if (el.label === "Telp /HP") body.no_hp = el.value;
    if (el.label === "Tempat Lahir") body.tempat_lahir = el.value;

    if (el.label === "Tanggal Lahir")
      body.tgl_lahir = convertToISOString(el.value);
    if (el.label === "Pekerjaan") body.pekerjaan = el.value;
    if (el.label === "Pekerjaan_lain") body.pekerjaan_lain = el.value;
    if (el.label === "IDLembaga") body.IDLembaga = el.value;
    if (el.label === "ID pendamping") id_pendamping = el.value;
  });

  dataPendidikan.value.forEach((el) => {
    if (el.label === "Pendidikan Terakhir") body.pendidikan = el.value;
    if (el.label === "Nama Universitas") body.universitas = el.value;
  });

  dataBank.value.forEach((el) => {
    if (el.label === "Nama Bank") body.rekening.bank = el.value;
    if (el.label === "No. Rekening") body.rekening.no_rekening = el.value;
    if (el.label === "Nama Rekening") body.rekening.nama = el.value;
    if (el.label === "File Rekening") body.rekening.file_foto_rek = el.value;
  });

  dataBank2.value.forEach((el) => {
    if (el.label === "NPWP") body.rekening.npwp = el.value;
    if (el.label === "Nama pada NPWP") body.rekening.nama_npwp = el.value;
    if (el.label === "File NPWP") body.rekening.file_foto_npwp = el.value;
  });

  dokumenPersyaratan.value.forEach((el) => {
    if (el.label === "Ijazah") body.foto_ijazah = el.value;
    else body.foto_ijazah = "";

    if (el.label === "KTP") body.foto_ktp = el.value;
    else body.foto_ktp = "";

    if (el.label === "Sertifikat Pelatihan") body.fotosertifikat = el.value;
  });

  body.foto_ijazah = await uploadDocument(body.foto_ijazah);

  body.foto_ktp = await uploadDocument(body.foto_ktp);

  body.fotosertifikat = await uploadDocument(body.fotosertifikat);
  body.rekening.file_foto_npwp = await uploadDocument(
    body.rekening.file_foto_npwp
  );

  body.rekening.file_foto_rek = await uploadDocument(
    body.rekening.file_foto_rek
  );

  try {
    await $api(`/reguler/lph/update-profile/${id_pendamping}`, {
      method: "put",
      body,
    });

    useSnackbar().sendSnackbar("Berhasil menyimpan data ", "success");

    await getProfile();
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalaan ", "error");
  }

  // dokumenPersyaratan.value.forEach(async (el) => {
  //   if (el.label === "Ijazah") {
  //     if (el.value != null) {
  //       const response = await uploadDocument(el.value);
  //     }
  //   }
  //   if (el.label === "KTP") {
  //     if (el.value != null) {
  //       const response = await uploadDocument(el.value);
  //     }
  //   }
  //   if (el.label === "Sertifikat Pelatihan") {
  //     if (el.value != null) {
  //       const response = await uploadDocument(el.value);
  //     }
  //   }
  // });
};

const onlyNumbers = (event, item) => {
  // Mengganti semua karakter non-digit dengan string kosong
  item.value = item.value.replace(/\D/g, '');
}
</script>

<template>
  <VContainer>
    <VDialog v-model="dialog" max-width="700">
      <VCard class="pa-4">
        <VCardTitle>Simpan Perubahan </VCardTitle>
        <VCardText>Apakah yakin ingin menyimpan perubahan data ini ?</VCardText>
        <VRow>
          <VCol class="d-flex justify-end ga-4">
            <VBtn variant="outlined" color="primary" @click="handleCancel">
              Batal
            </VBtn>
            <VBtn variant="flat" color="primary" @click="handleSave">
              Ya, Setuju
            </VBtn>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
    <VRow>
      <VBtn
        v-if="isEditing"
        variant="text"
        prepend-icon="mdi-chevron-left"
        @click="handleCancel"
      >
        Kembali
      </VBtn>
    </VRow>
    <VRow class="d-flex justify-space-between align-center">
      <VCol class="mb-8">
        <h3 class="text-h3">Tenaga Pendamping</h3>
      </VCol>
      <VCol style="display: flex; justify-content: end; mr-2">
        <VBtn
          v-if="!isEditing"
          density="compact"
          variant="outlined"
          @click="handleEdit"
        >
          ubah
        </VBtn>
        <VBtn
          v-if="isEditing"
          append-icon="mdi-content-save"
          @click="dialog = true"
        >
          Simpan
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
                <VCol
                  v-if="
                    item.label !== 'IDLembaga' &&
                    item.label !== 'Pekerjaan_lain' &&
                    item.label !== 'ID pendamping'
                  "
                  cols="3"
                  class="text-left font-weight-medium"
                >
                  {{ item.label }}
                </VCol>
                <VCol
                  v-if="item.label !== 'Pekerjaan'"
                  cols="12"
                  class="font-weight-medium"
                >
                  <VTextField
                    v-if="
                      item.label !== 'Alamat' &&
                      item.label !== 'Provinsi' &&
                      item.label !== 'Kota/Kab' &&
                      item.label !== 'Kecamatan' &&
                      item.label !== 'IDLembaga' &&
                      item.label !== 'Pekerjaan' &&
                      item.label !== 'ID pendamping' &&
                      item.label !== 'Pekerjaan_lain' &&
                      item.label !== 'Tanggal Lahir'
                    "
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    disabled
                  />
                  <VTextarea
                    v-if="item.label === 'Alamat'"
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    disabled
                    rows="2"
                    auto-grow
                  />

                  <VSelect
                    v-if="item.label === 'Provinsi'"
                    v-model="item.value"
                    placeholder="Pilih provinsi"
                    :rules="[requiredValidator]"
                    :items="provinceList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    disabled
                    @update:model-value="getDistrict"
                  />

                  <VSelect
                    v-if="item.label === 'Kota/Kab'"
                    v-model="item.value"
                    placeholder="Pilih kota/kabupaten"
                    :rules="[requiredValidator]"
                    :items="districtList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    disabled
                    @update:model-value="getSubDistrict"
                  />

                  <VSelect
                    v-if="item.label === 'Kecamatan'"
                    v-model="item.value"
                    placeholder="Pilih kecamatan"
                    :rules="[requiredValidator]"
                    :items="subDistrictList"
                    item-title="name"
                    item-value="code"
                    density="compact"
                    rounded="xl"
                    disabled
                  />
                  <Vuepicdatepicker v-if="item.label === 'Tanggal Lahir'">
                    <template #trigger>
                      <Vuepicdatepicker
                        v-model:model-value="item.value"
                        auto-apply
                        model-type="dd-MM-yyyy"
                        :enable-time-picker="false"
                        :rules="[requiredValidator]"
                        teleport
                        clearable
                        disabled
                      >
                        <template #trigger>
                          <VTextField
                            v-if="item.label === 'Tanggal Lahir'"
                            placeholder="Pilih Tanggal Lahir"
                            :rules="[requiredValidator]"
                            append-inner-icon="fa-calendar"
                            :model-value="item.value"
                            color="#757575"
                            disabled
                          />
                        </template>
                      </Vuepicdatepicker>
                    </template>
                  </Vuepicdatepicker>

                  <!--
                    <VTextField
                    v-if="item.label === 'Tanggal Lahir'"
                    placeholder="Pilih Tanggal Lahir"
                    :rules="[requiredValidator]"
                    append-inner-icon="fa-calendar"
                    :model-value="item.value"
                    color="#757575"
                    disabled
                    />
                  -->
                </VCol>

                <VCol cols="12" class="font-weight-medium">
                  <VSelect
                    v-if="
                      item.label === 'Pekerjaan' && item.value !== 'Lainnya'
                    "
                    v-model="item.value"
                    :items="options"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="Pilih Pekerjaan"
                    disabled
                  />

                  <VSelect
                    v-if="
                      item.label === 'Pekerjaan' && item.value === 'Lainnya'
                    "
                    v-model="item.value"
                    :items="options"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="Pilih Pekerjaan"
                    disabled
                  />

                  <VTextField
                    v-if="
                      item.label === 'Pekerjaan_lain' &&
                      dataProfilePendamping.find(
                        (el) => el.label === 'Pekerjaan'
                      )?.value === 'Lainnya'
                    "
                    v-model="item.value"
                    label="Sebutkan pekerjaan"
                    variant="outlined"
                    density="compact"
                    hide-details
                    disabled
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

                <VCol v-if="item.label === 'Pendidikan Terakhir'" cols="12">
                  <VSelect
                    v-model="item.value"
                    :items="['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3']"
                    variant="outlined"
                    density="compact"
                    hide-details
                    disabled
                  />
                </VCol>

                <!-- Input untuk Nama Universitas -->
                <VCol v-if="item.label === 'Nama Universitas'" cols="12">
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    disabled
                  />
                </VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>

        <VExpansionPanels v-if="false" v-model="panelMelacak" class="mb-4">
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
                  <!--
                    <VBtn variant="flat" class="px-3 ms-2">
                    <VIcon
                    icon="fa-download"
                    @click="handleDownload(item.file_name)"
                    ></VIcon>
                    </VBtn>
                  -->
                  <VCol cols="12" md="4" class="squareBtnIcon" disabled="true">
                    :
                    <VBtn
                      variant="flat"
                      class="px-3 ms-2"
                      @click="openLink(item.value)"
                    >
                      <VIcon icon="fa-download" />
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
                    :color="item.value === 'DISETUJUI' ? 'success' : 'error'"
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
                <VCol v-if="item.label !== 'File Rekening'" cols="12">
                  <span class="font-weight-medium">{{ item.label }}</span>
                </VCol>
                <VCol v-if="item.label === 'File Rekening'" cols="2">
                  <span class="font-weight-medium">{{ item.label }} </span>
                </VCol>
                <VCol v-if="item.label === 'File Rekening'" cols="1"> : </VCol>

                <VCol v-if="item.label === 'Nama Bank'" cols="12">
                  <VSelect
                    v-model="item.value"
                    :items="bankList"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :disabled="!isEditing"
                  />
                </VCol>

                <VCol v-if="item.label !== 'File Rekening' && item.label !== 'Nama Bank'" cols="12">
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :disabled="!isEditing"
                    :maxlength="item.label === 'No. Rekening' ? 16 : undefined"
                    @input="item.label === 'No. Rekening' ? onlyNumbers($event, item) : null"
                  />
                </VCol>

                <VCol
                  v-if="item.label === 'File Rekening'"
                  :cols="isEditing ? 2 : 6"
                  :md="isEditing ? 2 : 6"
                >
                  <VBtn
                    variant="flat"
                    class="px-3 ms-2"
                    color="primary"
                    :disabled="!item.value"
                  >
                    <VIcon
                      icon="fa-download"
                      @click="
                        downloadDocument(item.value, 'PENDAMPING_REKENING')
                      "
                    />
                  </VBtn>
                </VCol>
                <VCol
                  v-if="isEditing && item.label === 'File Rekening'"
                  cols="6"
                  md="6"
                >
                  <HalalFileInput2 v-model="item.value" label="Pilih File" />
                </VCol>
              </VRow>
              <VDivider class="my-3" />
              <VRow
                v-for="(item, index) in dataBank2"
                :key="index"
                class="my-2"
              >
                <VCol v-if="item.label !== 'File NPWP'" cols="12">
                  <span class="font-weight-medium">{{ item.label }}</span>
                </VCol>
                <VCol v-if="item.label === 'File NPWP'" cols="2">
                  <span class="font-weight-medium">{{ item.label }} </span>
                </VCol>
                <VCol v-if="item.label === 'File NPWP'" cols="1"> : </VCol>

                <VCol v-if="item.label !== 'File NPWP'" cols="12">
                  <VTextField
                    v-model="item.value"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :disabled="!isEditing"
                  />
                </VCol>

                <VCol
                  v-if="item.label === 'File NPWP'"
                  :cols="isEditing ? 2 : 6"
                  :md="isEditing ? 2 : 6"
                >
                  <VBtn
                    variant="flat"
                    class="px-3 ms-2"
                    color="primary"
                    :disabled="!item.value"
                  >
                    <VIcon
                      icon="fa-download"
                      @click="downloadDocument(item.value, 'PENDAMPING_NPWP')"
                    />
                  </VBtn>
                </VCol>
                <VCol
                  v-if="isEditing && item.label === 'File NPWP'"
                  cols="8"
                  md="6"
                >
                  <HalalFileInput2 v-model="item.value" label="Pilih File" />
                </VCol>

                <VCol v-if="isEditing && item.label === 'KTP'" cols="6" md="6">
                  <HalalFileInput2 v-model="item.value" label="Pilih File" />
                </VCol>
              </VRow>
              <VDivider class="my-3" />
              Rekening dalam proses verifikasi oleh LP3H
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
                  <VRow>
                    <VCol cols="6" md="6" class="d-flex align-center">
                      <div class="text-body-1 font-weight-medium">
                        {{ item.label }}
                      </div>
                    </VCol>

                    <VCol
                      v-if="item.label === 'Ijazah'"
                      cols="6"
                      md="6"
                      class="d-flex align-center"
                    >
                      <span>:</span>
                      <VBtn
                        variant="flat"
                        class="px-3 ms-2"
                        :disabled="!item.value"
                        @click="
                          downloadDocument(item.value, 'PENDAMPING_IJAZAH')
                        "
                      >
                        <VIcon icon="fa-download" />
                      </VBtn>
                    </VCol>

                    <!--
                      <VCol
                      cols="8"
                      md="6"
                      v-if="isEditing && item.label === 'Ijazah'"
                      >
                      <HalalFileInput2
                      v-model="item.value"
                      label="Pilih File"
                      />
                      </VCol>
                    -->

                    <VCol
                      v-if="item.label === 'KTP'"
                      :cols="isEditing ? 6 : 6"
                      :md="isEditing ? 6 : 6"
                      class="d-flex align-center"
                    >
                      :
                      <VBtn
                        variant="flat"
                        class="px-3 ms-2"
                        :disabled="!item.value"
                      >
                        <VIcon
                          icon="fa-download"
                          @click="
                            downloadDocument(item.value, 'PENDAMPING_KTP')
                          "
                        />
                      </VBtn>
                    </VCol>

                    <!--
                      <VCol
                      cols="8"
                      md="6"
                      v-if="isEditing && item.label === 'KTP'"
                      >
                      <HalalFileInput2
                      v-model="item.value"
                      label="Pilih File"
                      />
                      </VCol>
                    -->

                    <VCol
                      v-if="item.label === 'Sertifikat Pelatihan'"
                      :cols="isEditing ? 6 : 6"
                      :md="isEditing ? 6 : 6"
                      class="d-flex align-center"
                    >
                      :
                      <VBtn
                        variant="flat"
                        class="px-3 ms-2"
                        :disabled="!item.value"
                      >
                        <VIcon
                          icon="fa-download"
                          @click="
                            downloadDocument(
                              item.value,
                              'PENDAMPING_SERT_UPLOAD'
                            )
                          "
                        />
                      </VBtn>
                    </VCol>
                    <!--
                      <VCol
                      cols="8"
                      md="6"
                      v-if="isEditing && item.label === 'Sertifikat Pelatihan'"
                      >
                      <HalalFileInput2
                      v-model="item.value"
                      label="Pilih File"
                      />
                      </VCol>
                    -->
                  </VRow>
                </VListItem>
              </VList>
              <VDivider class="my-4" />
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
