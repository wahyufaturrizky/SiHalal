<script setup lang="ts">
const router = useRouter();

const profileData = reactive({
  // Data -> Profil Komisi Fatwa
  id: null,
  nama_mui: null,
  jenis: null,
  alamat: null,
  kd_prov: null,
  provinsi: null,
  kd_kab: null,
  kota: null,
  kd_kec: null,
  wilayah_id: null,
  email: null,
  // Data -> Penanggung Jawab
  nama_pimpinan: null,
  no_hp_pimpinan: null,
  pimpinan_tte: null,
  nama_sekretaris: null,
  no_hp_sekretaris: null,
  sekretaris_tte: null,
  nama_bidang_fatwa: null,
  no_hp_bidang_fatwa: null,
  bidang_fatwa_tte: null,
  nama_kontak: null,
  no_hp_kontak: null,
  // Data -> Rekening Bank & NPWP
  rekening: {
    unik_id: null,
    bank: null,
    no_rekening: null,
    nama: null,
    filefotorek: null,
    npwp: null,
    nama_npwp: null,
    filefotonpwp: null,
    terverifikasi: 0,
    verfikasi_bpjph: 0,
  },
});

const provinceList = ref();
const districtList = ref();
const subDistrictList = ref();
const lembagaList = [
  "MUI Pusat",
  "Komisi Fatwa MUI Provinsi",
  "Majekis Permusyawaratan Ulama Aceh",
];
const getProvince = async () => {
  const response = await $api("/master/province", {
    method: "get",
  } as any);
  provinceList.value = response;
};
const getDistrict = async (kode: string) => {
  const response = await $api("/master/district", {
    method: "post",
    body: {
      province: kode,
    },
  } as any);
  districtList.value = response;
  profileData.kd_kab = null;
  profileData.kd_kec = null;
};
const getSubDistrict = async (kode: string) => {
  const response = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: kode,
    },
  } as any);
  subDistrictList.value = response;
  profileData.kd_kec = null;
};

const handleLoadProfile = async () => {
  try {
    const response: any = await $api("/komisi-fatwa/profile", {
      method: "get",
    } as any);
    if (response.code === 2000) {
      Object.assign(profileData, response.data);
      if (profileData.jenis == "") profileData.jenis = null;
      if (profileData.kd_prov == "") profileData.kd_prov = null;
      if (profileData.kd_kab == "") profileData.kd_kab = null;
      if (profileData.kd_kec == "") profileData.kd_kec = null;

      if (profileData.kd_prov && profileData.kd_prov != "00") {
        await getDistrict(profileData.kd_prov);
      }
      if (profileData.kd_kab) await getSubDistrict(profileData.kd_kab);

      fileFromDb.value.chairmanTte = response.data.pimpinan_tte
        ? profileData.pimpinan_tte
        : "";
      fileFromDb.value.secretaryTte = response.data.sekretaris_tte
        ? profileData.sekretaris_tte
        : "";
      fileFromDb.value.fatwaLeadTte = response.data.bidang_fatwa_tte
        ? profileData.bidang_fatwa_tte
        : "";
      fileFromDb.value.bankAcc = response.data.rekening.filefotorek
        ? profileData.rekening.filefotorek
        : "";
      fileFromDb.value.npwpPhoto = response.data.rekening.filefotonpwp
        ? profileData.rekening.filefotonpwp
        : "";

      console.log("file db = ", fileFromDb);
    }
  } catch (error) {
    console.error(error);
  }
};

const selectedTteFile = reactive<any>({
  pimpinan: null,
  sekretaris: null,
  ketuaBidang: null,
});

const uploadDocument = async (file: any, type: any) => {
  try {
    const formData = new FormData();
    formData.append("id", String(profileData.id));
    formData.append("file", file);
    formData.append("type", type);
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    });
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};
const validationImage = ref({
  chairmanIsValid: false,
  secretaryIsValid: false,
  fatwaLeadIsValid: false,
  bankAccPhotoIsValid: false,
  npwpPhotoIsValid: false,
  chairmanMsgNotValid: "",
  secretaryMsgNotValid: "",
  fatwaLeadMsgNotValid: "",
  bankAccMsgNotValid: "",
  npwpMsgNotValid: "",
});
const chairmanTteRef = ref();
const sekretarisTteRef = ref();
const kabidTteRef = ref();
const fotoRekRef = ref();
const fotoNpwpRef = ref();

const fileFromDb = ref({
  chairmanTte: "",
  secretaryTte: "",
  fatwaLeadTte: "",
  bankAcc: "",
  npwpPhoto: "",
});

const handleSelectChairmanTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    profileData.pimpinan_tte = fileData.name;
    selectedTteFile.pimpinan = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleSelectSecretaryTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    profileData.sekretaris_tte = fileData.name;
    selectedTteFile.sekretaris = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleSelectFatwaLeadTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    profileData.bidang_fatwa_tte = fileData.name;
    selectedTteFile.ketuaBidang = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveChaimanTTE = () => {
  selectedTteFile.pimpinan = null;
  profileData.pimpinan_tte = null;
};
const handleRemoveSecretaryTTE = () => {
  selectedTteFile.sekretaris = null;
  profileData.sekretaris_tte = null;
};
const handleRemoveFatwaLeadTTE = () => {
  selectedTteFile.ketuaBidang = null;
  profileData.bidang_fatwa_tte = null;
};
const handleEmitValidationChairmanTTE = async (
  isValid: boolean,
  event: any
) => {
  validationImage.value.chairmanIsValid = isValid;
  validationImage.value.chairmanMsgNotValid = event;
  try {
    if (isValid) {
      const response = await uploadDocument(selectedTteFile.pimpinan, "no_rek");
      if (response.code === 2000) {
        chairmanTteRef.value.setPrependFileName(null);
        profileData.pimpinan_tte = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleEmitValidationSecretaryTTE = async (
  isValid: boolean,
  event: any
) => {
  validationImage.value.secretaryIsValid = isValid;
  validationImage.value.secretaryMsgNotValid = event;
  try {
    if (isValid) {
      const response = await uploadDocument(
        selectedTteFile.sekretaris,
        "no_rek"
      );
      if (response.code === 2000) {
        sekretarisTteRef.value.setPrependFileName(null);
        profileData.sekretaris_tte = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleEmitValidationFatwaLeadTTE = async (
  isValid: boolean,
  event: any
) => {
  validationImage.value.fatwaLeadIsValid = isValid;
  validationImage.value.fatwaLeadMsgNotValid = event;
  try {
    if (isValid) {
      const response = await uploadDocument(
        selectedTteFile.ketuaBidang,
        "no_rek"
      );
      if (response.code === 2000) {
        kabidTteRef.value.setPrependFileName(null);
        profileData.bidang_fatwa_tte = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleEmitValidationBankAccPhoto = async (
  isValid: boolean,
  event: any
) => {
  validationImage.value.bankAccPhotoIsValid = isValid;
  validationImage.value.bankAccMsgNotValid = event;

  try {
    if (isValid) {
      const response = await uploadDocument(bankAccPhoto.value, "no_rek");
      if (response.code === 2000) {
        fotoRekRef.value.setPrependFileName(null);
        profileData.rekening.filefotorek = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleEmitValidationNpwpPhoto = async (isValid: boolean, event: any) => {
  validationImage.value.npwpPhotoIsValid = isValid;
  validationImage.value.npwpMsgNotValid = event;
  console.log("npwp msg = ", event);
  try {
    if (isValid) {
      const response = await uploadDocument(npwpPhoto.value, "no_npwp");
      if (response.code === 2000) {
        fotoNpwpRef.value.setPrependFileName(null);
        profileData.rekening.filefotonpwp = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};

const bankAccPhoto = ref(null);
const handleSelectBankAccPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    profileData.rekening.filefotorek = fileData.name;
    bankAccPhoto.value = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveBankAccPhoto = () => {
  profileData.rekening.filefotorek = null;
  bankAccPhoto.value = null;
};

const npwpPhoto = ref(null);
const handleSelectNpwpPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    profileData.rekening.filefotonpwp = fileData.name;
    npwpPhoto.value = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveNpwpPhoto = () => {
  profileData.rekening.filefotonpwp = null;
  npwpPhoto.value = null;
};

const isOpenUpdateModal = ref(false);
const handleOpenUpdateModal = () => {
  isOpenUpdateModal.value = !isOpenUpdateModal.value;
};

let updatePayload: Record<string, any> = {
  nama_mui: profileData.nama_mui,
  jenis: profileData.jenis,
  alamat: profileData.alamat,
  provinsi: profileData.provinsi,
  kota: profileData.kota,
  wilayah_id: profileData.wilayah_id,
  kd_prov: profileData.kd_prov,
  kd_kab: profileData.kd_kab,
  kd_kec: profileData.kd_kec,
  email: profileData.email,
  nama_pimpinan: profileData.nama_pimpinan,
  no_hp_pimpinan: profileData.no_hp_pimpinan,
  nama_sekretaris: profileData.nama_sekretaris,
  no_hp_sekretaris: profileData.no_hp_sekretaris,
  nama_bidang_fatwa: profileData.nama_bidang_fatwa,
  no_hp_bidang_fatwa: profileData.no_hp_bidang_fatwa,
  nama_kontak: profileData.nama_kontak,
  no_hp_kontak: profileData.no_hp_kontak,
  bank: profileData.rekening.bank,
  no_rekening: profileData.rekening.no_rekening,
  nama: profileData.rekening.nama,
  npwp: profileData.rekening.npwp,
  nama_npwp: profileData.rekening.nama_npwp,
};

const findDistrictNameByCode = (code: String) => {
  if (code)
    return districtList.value?.filter((val) => val.code === code)[0]?.name;
};

const updatePayloadMapper = () => {
  updatePayload = {
    nama_mui: profileData.nama_mui,
    jenis: profileData.jenis,
    alamat: profileData.alamat,
    provinsi: profileData.provinsi,
    kota: profileData.kota || findDistrictNameByCode(profileData?.kd_kab),
    wilayah_id: profileData.wilayah_id,
    kd_prov: profileData.kd_prov !== null ? profileData.kd_prov  : "",
    kd_kab: profileData.kd_kab !== null ? profileData.kd_kab : "",
    kd_kec: profileData.kd_kec !== null ? profileData.kd_kec: "",
    email: profileData.email,
    nama_pimpinan: profileData.nama_pimpinan,
    no_hp_pimpinan: profileData.no_hp_pimpinan,
    nama_sekretaris: profileData.nama_sekretaris,
    no_hp_sekretaris: profileData.no_hp_sekretaris,
    nama_bidang_fatwa: profileData.nama_bidang_fatwa,
    no_hp_bidang_fatwa: profileData.no_hp_bidang_fatwa,
    nama_kontak: profileData.nama_kontak,
    no_hp_kontak: profileData.no_hp_kontak,
    bank: profileData.rekening.bank,
    no_rekening: profileData.rekening.no_rekening,
    nama: profileData.rekening.nama,
    npwp: profileData.rekening.npwp,
    nama_npwp: profileData.rekening.nama_npwp,
  };

  updatePayload["sekretaris_tte"] = profileData.sekretaris_tte;
  updatePayload["pimpinan_tte"] = profileData.pimpinan_tte;
  updatePayload["bidang_fatwa_tte"] = profileData.bidang_fatwa_tte;
  updatePayload["filefotorek"] = profileData.rekening.filefotorek;
  updatePayload["filefotonpwp"] = profileData.rekening.filefotonpwp;
};

const handleConfirmUpdate = async () => {
  try {
    updatePayloadMapper();

    // for (const key in updatePayload) {
    //   const value = updatePayload[key];
    //   console.log(`${key} = ${value}`);
    //   payloadData.append(key, value);
    // }
    const response: any = await $api("/komisi-fatwa/update-profile", {
      method: "post",
      body: updatePayload,
    } as any);

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
      router.push("/komisi-fatwa/profile");
    } else {
      useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
    console.error(error);
  }
};

onMounted(async () => {
  handleLoadProfile();
  getProvince();
});
</script>

<template>
  <ConfirmModal
    dialog-title="Simpan Perubahan"
    :dialog-visible="isOpenUpdateModal"
    @update:dialog-visible="isOpenUpdateModal = $event"
  >
    <VCardText> Apakah yakin ingin menyimpan perubahan data ini? </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenUpdateModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmUpdate(), handleOpenUpdateModal()]"
      >
        Ya, Simpan
      </VBtn>
    </VCardActions>
  </ConfirmModal>
  <div
    class="d-flex align-center cursor-pointer"
    @click="router.push('/komisi-fatwa/profile')"
  >
    <VIcon icon="mdi-chevron-left" size="40px" color="primary" />
    <div class="text-primary">Kembali</div>
  </div>
  <VRow align="center">
    <VCol>
      <h1 style="font-size: 32px">Ubah Profil Komisi Fatwa</h1>
    </VCol>
    <VCol align="end">
      <VBtn
        color="primary"
        text="Simpan"
        class="px-3"
        @click="handleOpenUpdateModal"
      />
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Profil Komisi Fatwa</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Nama Lembaga</h4>
              <VTextField
                placeholder="Isi nama lembaga"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.nama_mui,
                    /^(?!.*\s\s)(?!.*'')(?!.*\-\-)[a-zA-Z\s'\-]+$/,
                    'Format nama lembaga tidak sesuai'
                  ),
                ]"
                v-model="profileData.nama_mui"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Jenis Lembaga</h4>
              <VSelect
                placeholder="Pilih jenis lembaga"
                :items="lembagaList"
                :rules="[requiredValidator]"
                v-model="profileData.jenis"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Alamat</h4>
              <VTextField
                placeholder="Isi alamat"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.alamat,
                    /^(?!.*\s\s)(?!.*'')(?!.*\-\-)(?!.*\.\.)(?!.*,,)(?!.*[0-9]{6,})(?=.*[a-zA-Z]{5,})[a-zA-Z0-9\s'\.\,\-]+$/,
                    'Format alamat lembaga tidak sesuai'
                  ),
                ]"
                v-model="profileData.alamat"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Provinsi</h4>
              <VSelect
                placeholder="Pilih provinsi"
                :rules="[requiredValidator]"
                v-model="profileData.kd_prov"
                @update:model-value="getDistrict"
                :items="provinceList"
                item-title="name"
                item-value="code"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Kota/Kab</h4>
              <VSelect
                placeholder="Pilih kota/kabupaten"
                :rules="[requiredValidator]"
                v-model="profileData.kd_kab"
                @update:model-value="getSubDistrict"
                :items="districtList"
                item-title="name"
                item-value="code"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Kecamatan</h4>
              <VSelect
                placeholder="Pilih kecamatan"
                :rules="[requiredValidator]"
                v-model="profileData.kd_kec"
                :items="subDistrictList"
                item-title="name"
                item-value="code"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Email</h4>
              <VTextField
                placeholder="Isi email"
                :rules="[requiredValidator, emailValidator]"
                v-model="profileData.email"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Penanggung Jawab</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Pimpinan</h4>
              <VTextField
                placeholder="Isi nama pimpinan"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.nama_pimpinan,
                    /^[a-zA-Z\s',.]+$/,
                    'Format nama pimpinan tidak sesuai'
                  ),
                ]"
                v-model="profileData.nama_pimpinan"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                placeholder="Isi no. HP"
                :rules="[requiredValidator, phoneNumberIdValidator]"
                v-model="profileData.no_hp_pimpinan"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                ref="chairmanTteRef"
                @validation-is-valid="handleEmitValidationChairmanTTE"
                :file-data="selectedTteFile.pimpinan"
                :file-name="profileData.pimpinan_tte"
                :initial-file-name="fileFromDb.chairmanTte"
                @on-select="handleSelectChairmanTTE"
                @on-remove="handleRemoveChaimanTTE"
                :validation-list="[
                  ...(selectedTteFile.pimpinan ? [fileExtensionValidator] : []),
                  fileSizeValidator,
                  fileNameLengthValidator,
                ]"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Sekretaris</h4>
              <VTextField
                placeholder="Isi nama sekretaris"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.nama_sekretaris,
                    /^[a-zA-Z\s',.]+$/,
                    'Format nama sekretaris tidak sesuai'
                  ),
                ]"
                v-model="profileData.nama_sekretaris"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                placeholder="Isi no. HP"
                :rules="[requiredValidator, phoneNumberIdValidator]"
                v-model="profileData.no_hp_sekretaris"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                ref="sekretarisTteRef"
                @validation-is-valid="handleEmitValidationSecretaryTTE"
                :file-data="selectedTteFile.sekretaris"
                :file-name="profileData.sekretaris_tte"
                :initial-file-name="fileFromDb.secretaryTte"
                @on-select="handleSelectSecretaryTTE"
                @on-remove="handleRemoveSecretaryTTE"
                :validation-list="[
                   ...(selectedTteFile.sekretaris ? [fileExtensionValidator] : []),
                  fileSizeValidator,
                  fileNameLengthValidator,
                ]"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Ketua Bidang Fatwa</h4>
              <VTextField
                placeholder="Isi nama ketua bidang fatwa"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.nama_bidang_fatwa,
                    /^[a-zA-Z\s',.]+$/,
                    'Format nama ketua bidang fatwa tidak sesuai'
                  ),
                ]"
                v-model="profileData.nama_bidang_fatwa"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                placeholder="Isi no. HP"
                :rules="[requiredValidator, phoneNumberIdValidator]"
                v-model="profileData.no_hp_bidang_fatwa"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                ref="kabidTteRef"
                @validation-is-valid="handleEmitValidationFatwaLeadTTE"
                :file-data="selectedTteFile.ketuaBidang"
                :file-name="profileData.bidang_fatwa_tte"
                :initial-file-name="fileFromDb.fatwaLeadTte"
                @on-select="handleSelectFatwaLeadTTE"
                @on-remove="handleRemoveFatwaLeadTTE"
                :validation-list="[
                   ...(selectedTteFile.ketuaBidang ? [fileExtensionValidator] : []),
                  fileSizeValidator,
                  fileNameLengthValidator,
                ]"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Kontak</h4>
              <VTextField
                placeholder="Isi nama kontak"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.nama_kontak,
                    /^[a-zA-Z\s',.]+$/,
                    'Format nama kontak tidak sesuai'
                  ),
                ]"
                v-model="profileData.nama_kontak"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                placeholder="Isi no. HP"
                :rules="[requiredValidator, phoneNumberIdValidator]"
                v-model="profileData.no_hp_kontak"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <h3 class="text-h4 font-weight-bold">Data Rekening Bank & NPWP</h3>
        </VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Nama Bank</h4>
              <VTextField
                placeholder="Isi nama bank"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.rekening.bank,
                    /^[a-zA-Z\s',.()]+$/,
                    'Format nama bank tidak sesuai'
                  ),
                ]"
                v-model="profileData.rekening.bank"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">No. Rekening</h4>
              <VTextField
                placeholder="Isi no. rekening"
                :rules="[requiredValidator, integerValidator]"
                v-model="profileData.rekening.no_rekening"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Atas Nama</h4>
              <VTextField
                placeholder="Isi atas nama"
                :rules="[
                  requiredValidator,
                  regexValidator(
                    profileData.rekening.nama,
                    /^[a-zA-Z\s',.]+$/,
                    'Format nama pemegang rekening tidak sesuai'
                  ),
                ]"
                v-model="profileData.rekening.nama"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <h4 class="mb-1 font-weight-bold">Upload Foto Rekening</h4>
              <FileUploadField
                ref="fotoRekRef"
                @validation-is-valid="handleEmitValidationBankAccPhoto"
                :file-data="bankAccPhoto"
                :file-name="profileData.rekening.filefotorek"
                :initial-file-name="fileFromDb.bankAcc"
                @on-select="handleSelectBankAccPhoto"
                @on-remove="handleRemoveBankAccPhoto"
                :validation-list="[
                   ...(bankAccPhoto ? [fileExtensionValidator] : []),
                  fileSizeValidator,
                  fileNameLengthValidator,
                ]"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">NPWP</h4>
              <VTextField
                placeholder="Isi NPWP"
                :rules="[requiredValidator, integerValidator]"
                v-model="profileData.rekening.npwp"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <h4 class="mb-1 font-weight-bold">Upload Foto NPWP</h4>
              <FileUploadField
                ref="fotoNpwpRef"
                @validation-is-valid="handleEmitValidationNpwpPhoto"
                :file-data="npwpPhoto"
                :file-name="profileData.rekening.filefotonpwp"
                :initial-file-name="fileFromDb.npwpPhoto"
                @on-select="handleSelectNpwpPhoto"
                @on-remove="handleRemoveNpwpPhoto"
                :validation-list="[
                  ...(npwpPhoto ? [fileExtensionValidator] : []),
                  fileSizeValidator,
                  fileNameLengthValidator,
                ]"
              />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
/* .v-field--appended {
  padding-inline-end: 0;
} */
</style>
