<script setup lang="ts">

const panelRegistration = ref([0, 1]);

const isLoading = ref<boolean>(false)
const profileData = reactive({
  id: null,
  nama: null,
  jenis_lembaga: null,
  alamat: null,
  provinsi_id: null,
  provinsi: null,
  kota_id: null,
  kota: null,
  kecamatan_id: null,
  kecamatan: null,
  email: null,
  bangunan: null,
  jumlah_auditor: 0,
  jumlah_cabang: 0,
  lab: null,
  // Data PIC
  pic_nama_pimpinan: null,
  pic_nohp_pimpinan: null,
  pic_nama_kontak: null,
  pic_nohp_kontak: null,
  // Data Rekening & NPWP
  rekening: {
    bank: null,
    no_rekening: null,
    nama: null,
    foto_rekening: null,
    npwp: null,
    foto_npwp: null,
  },
  // Data Registrasi
  reg_status: null,
  reg_nomor: null,
  reg_tgl_berlaku: null,
  file_sertifikat: null,
})
const updateData = reactive({
  id: null,
  nama: null,
  jenis_lembaga: null,
  alamat: null,
  provinsi_id: null,
  provinsi: null,
  kota_id: null,
  kota: null,
  kecamatan_id: null,
  kecamatan: null,
  email: null,
  bangunan: null,
  jumlah_auditor: 0,
  jumlah_cabang: 0,
  lab: null,
  // Data PIC
  pic_nama_pimpinan: null,
  pic_nohp_pimpinan: null,
  pic_nama_kontak: null,
  pic_nohp_kontak: null,
  // Data Rekening & NPWP
  rekening: {
    bank: null,
    no_rekening: null,
    nama: null,
    foto_rekening: null,
    npwp: null,
    foto_npwp: null,
  },
  // Data Registrasi
  reg_status: null,
  reg_nomor: null,
  reg_tgl_berlaku: null,
  file_sertifikat: null,
})
// const trackingDetail = ref([]);

const { refresh } = await useAsyncData('profile-lph', async () => {
  await loadProfile()
})
const loadProfile = async () => {
  isLoading.value = true
  try {
    const response: any = await $api('/reguler/lph/profile', {
      method: 'get',
    } as any)

    if (response?.code === 2000) {
      Object.assign(profileData, response?.data)
      if (profileData.provinsi_id) await getDistrict(profileData.provinsi_id)
      if (profileData.kota_id) await getSubDistrict(profileData.kota_id)
    }
    isLoading.value = false
    return response
  }
  catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error')
    isLoading.value = false
  }
}

const provinceList = ref();
const districtList = ref();
const subDistrictList = ref();
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
  if (isEdit.value) {
    updateData.kota_id = null;
    updateData.kecamatan_id = null;
  }
};
const getSubDistrict = async (kode: string) => {
  const response = await $api("/master/subdistrict", {
    method: "post",
    body: {
      district: kode,
    },
  } as any);
  subDistrictList.value = response;
  if (isEdit.value) updateData.kecamatan_id = null;
};

const fotoRekRef = ref();
const fotoNpwpRef = ref();
const bankAccPhoto = ref(null);
const npwpPhoto = ref(null);
const uploadedBankAccFilename = ref(null)
const uploadedNpwpFilename = ref(null)

const handleSelectBankAccPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    uploadedBankAccFilename.value = fileData.name
    bankAccPhoto.value = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveBankAccPhoto = () => {
  uploadedBankAccFilename.value = null;
  bankAccPhoto.value = null;
};

const handleSelectNpwpPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    uploadedNpwpFilename.value = fileData.name;
    npwpPhoto.value = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveNpwpPhoto = () => {
  uploadedNpwpFilename.value = null;
  npwpPhoto.value = null;
};

const validationImage = ref({
  bankAccPhotoIsValid: false,
  npwpPhotoIsValid: false,
  bankAccMsgNotValid: "",
  npwpMsgNotValid: "",
});
const handleEmitValidationBankAccPhoto = async (isValid: boolean, event: any) => {
  validationImage.value.bankAccPhotoIsValid = isValid;
  validationImage.value.bankAccMsgNotValid = event;

  try {
    if (isValid) {
      const response: any = await handleUpload(bankAccPhoto.value, "rekening");
      if (response.code === 2000) {
        fotoRekRef.value.setPrependFileName(null);
        uploadedBankAccFilename.value = response.data.file_url
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

  try {
    if (isValid) {
      const response: any = await handleUpload(npwpPhoto.value, "npwp");
      if (response.code === 2000) {
        fotoNpwpRef.value.setPrependFileName(null);
        uploadedNpwpFilename.value = response.data.file_url;
      }
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};

const handleUpload = async (file: any, type: any) => {
  try {
    const formData = new FormData();
    formData.append("id", String(updateData.id));
    formData.append("file", file);
    formData.append("type", type);
    const response = await $api("/shln/submission/document/upload", {
      method: "post",
      body: formData,
    } as any);
    return response;
  } catch (error) {
    useSnackbar().sendSnackbar(
      "ada kesalahan saat upload file, gagal menyimpan!",
      "error"
    );
  }
};
const handleDownload = async (filename: string, param: string) => {
  return await downloadDocument(filename, param);
};

const isOpenModal = ref(false);
const handleOpenModal = () => {
  isOpenModal.value = !isOpenModal.value;
};

const setUpdatePayload = () => {
  return {
    nama: updateData.nama,
    jenis_lembaga: updateData.jenis_lembaga,
    alamat: updateData.alamat,
    provinsi_id: updateData.provinsi_id,
    kota_id: updateData.kota_id,
    kecamatan_id: updateData.kecamatan_id,
    email: updateData.email,
    bangunan: updateData.bangunan,
    jumlah_auditor: +updateData.jumlah_auditor,
    jumlah_cabang: +updateData.jumlah_cabang,
    lab: updateData.lab,
    pic_nama_pimpinan: updateData.pic_nama_pimpinan,
    pic_nohp_pimpinan: updateData.pic_nohp_pimpinan,
    pic_nama_kontak: updateData.pic_nama_kontak,
    pic_nohp_kontak: updateData.pic_nohp_kontak,
    rekening: {
      bank: updateData.rekening.bank,
      no_rekening: updateData.rekening.no_rekening,
      nama: updateData.rekening.nama,
      foto_rekening: uploadedBankAccFilename.value
        ? uploadedBankAccFilename.value
        : updateData.rekening.foto_rekening,
      npwp: updateData.rekening.npwp,
      foto_npwp: uploadedNpwpFilename.value
        ? uploadedNpwpFilename.value
        : updateData.rekening.foto_npwp,
    },
  };
};

const updateForm = ref()
const handleConfirmUpdate = async () => {
  const status = await updateForm.value.validate();

  if (status.valid) {
    try {
      const payload = setUpdatePayload()
      const response: any = await $api("/reguler/lph/profile-update", {
        method: "put",
        body: payload,
      } as any);

      if (response.code === 2000) {
        useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
        refresh()
        handleCloseEdit(true)
      } else {
        useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
      }
    } catch (error) {
      useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
      console.error(error);
    }
  } else {
    useSnackbar().sendSnackbar("Mohon cek kembali kelengkapan data Anda", "error");
  }
}

onMounted(() => {
  loadProfile()
  getProvince()
})

const isEdit = ref(false)
const handleEdit = () => {
  Object.assign(updateData, profileData)
  isEdit.value = !isEdit.value
}
const handleCloseEdit = async (isUpdate: boolean) => {
  Object.assign(updateData, profileData)
  uploadedBankAccFilename.value = null
  uploadedNpwpFilename.value = null
  bankAccPhoto.value = null
  npwpPhoto.value = null
  isEdit.value = !isEdit.value
  if (!isUpdate) {
    if (profileData.provinsi_id) await getDistrict(profileData.provinsi_id)
    if (profileData.kota_id) await getSubDistrict(profileData.kota_id)
  }
}
</script>

<template>
  <VRow no-gutters>
    <VCol class="d-flex align-center justify-space-between">
      <h1 style="font-size: 32px">
        Lembaga Pemeriksa Halal
      </h1>
      <div>
        <VBtn v-if="isEdit" variant="outlined" text="Batal" @click="handleCloseEdit(false)"/>
        <VBtn v-if="isEdit" text="Simpan" class="ms-3" @click="handleOpenModal"/>
        <VBtn v-if="!isEdit" variant="outlined" text="Ubah" append-icon="mdi-pencil" @click="handleEdit"/>
      </div>
    </VCol>
  </VRow>
  <VRow>
    <VCol cols="8">
      <VForm ref="updateForm">
        <VCard class="mb-10 pt-3">
          <VCardTitle class="mb-5">
            <div class="font-weight-bold text-h4">
              Profil Lembaga Pemeriksa Halal
            </div>
          </VCardTitle>
          <VCardText>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Nama Lembaga</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.nama ? profileData.nama : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.nama"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Jenis Lembaga</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.jenis_lembaga ? profileData.jenis_lembaga : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.jenis_lembaga"
                :items="['LPH Masyarakat', 'LPH Pemerintah']"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Alamat</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.alamat ? profileData.alamat : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.alamat"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Provinsi</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.provinsi ? profileData.provinsi : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                placeholder="Pilih provinsi"
                :rules="[requiredValidator]"
                v-model="updateData.provinsi_id"
                @update:model-value="getDistrict"
                :items="provinceList"
                item-title="name"
                item-value="code"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Kab/Kota</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.kota ? profileData.kota : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                placeholder="Pilih kabupaten/kota"
                :rules="[requiredValidator]"
                v-model="updateData.kota_id"
                @update:model-value="getSubDistrict"
                :items="districtList"
                item-title="name"
                item-value="code"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Kecamatan</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.kecamatan ? profileData.kecamatan : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                placeholder="Pilih kecamatan"
                :rules="[requiredValidator]"
                v-model="updateData.kecamatan_id"
                :items="subDistrictList"
                item-title="name"
                item-value="code"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Email</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.email ? profileData.email : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator, emailValidator]"
                v-model="updateData.email"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Bangunan LPH</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.bangunan ? profileData.bangunan : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.bangunan"
                :items="['Sewa', 'Milik Sendiri']"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Jumlah Auditor Halal</div>
              <VTextField
                :model-value="profileData.jumlah_auditor ? profileData.jumlah_auditor : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <!-- <VTextField
                v-else
                :rules="[requiredValidator, integerValidator]"
                v-model="updateData.jumlah_auditor"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              /> -->
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Jumlah Kantor Cabang</div>
              <VTextField
                :model-value="profileData.jumlah_cabang ? profileData.jumlah_cabang : '0'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <!-- <VTextField
                v-else
                :rules="[requiredValidator, integerValidator]"
                v-model="updateData.jumlah_cabang"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              /> -->
            </div>
            <div>
              <div class="font-weight-bold mb-1">Memiliki Lab</div>
              <VSelect
                v-if="!isEdit"
                :model-value="profileData.lab ? profileData.lab : 'Tidak'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
                menu-icon="fa-chevron-down"
              />
              <VSelect
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.lab"
                :items="['Tidak', 'Ya', 'Kerjasama dengan lembaga yang memiliki lab terakreditasi ISO 17025']"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                menu-icon="fa-chevron-down"
              />
            </div>
          </VCardText>
        </VCard>
        <VCard class="mb-10 pt-3">
          <VCardTitle class="mb-5">
            <div class="font-weight-bold text-h4">
              Penanggung Jawab
            </div>
          </VCardTitle>
          <VCardText>
            <VRow>
              <VCol cols="6">
                <div class="font-weight-bold mb-1">Nama Pimpinan</div>
                <VTextField
                  v-if="!isEdit"
                  :model-value="profileData.pic_nama_pimpinan ? profileData.pic_nama_pimpinan : '-'"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                  disabled
                />
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  v-model="updateData.pic_nama_pimpinan"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                />
              </VCol>
              <VCol cols="6">
                <div class="font-weight-bold mb-1">No. HP</div>
                <VTextField
                  v-if="!isEdit"
                  :model-value="profileData.pic_nohp_pimpinan ? profileData.pic_nohp_pimpinan : '-'"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                  disabled
                />
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  v-model="updateData.pic_nohp_pimpinan"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                />
              </VCol>
            </VRow>
            <VDivider class="mt-4 mb-3"/>
            <VRow>
              <VCol cols="6">
                <div class="font-weight-bold mb-1">Nama Kontak</div>
                <VTextField
                  v-if="!isEdit"
                  :model-value="profileData.pic_nama_kontak ? profileData.pic_nama_kontak : '-'"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                  disabled
                />
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  v-model="updateData.pic_nama_kontak"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                />
              </VCol>
              <VCol cols="6">
                <div class="font-weight-bold mb-1">No. HP</div>
                <VTextField
                  v-if="!isEdit"
                  :model-value="profileData.pic_nohp_kontak ? profileData.pic_nohp_kontak : '-'"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                  disabled
                />
                <VTextField
                  v-else
                  :rules="[requiredValidator]"
                  v-model="updateData.pic_nohp_kontak"
                  :bg-color="!isEdit ? '#F6F6F6' : ''"
                  density="compact"
                  rounded="xl"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
        <VCard class="mb-10 pt-3">
          <VCardTitle class="mb-5">
            <div class="font-weight-bold text-h4">
              Data Rekening Bank & NPWP
            </div>
          </VCardTitle>
          <VCardText>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Nama Bank</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.rekening.bank ? profileData.rekening.bank : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.rekening.bank"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">No. Rekening</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.rekening.no_rekening ? profileData.rekening.no_rekening : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator, integerValidator]"
                v-model="updateData.rekening.no_rekening"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Atas Nama</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.rekening.nama ? profileData.rekening.nama  : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.rekening.nama"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">Upload Foto Rekening</div>
              <div class="d-flex align-start">
                <div class="w-100 w-lg-50">
                  <VTextField
                    v-if="!isEdit"
                    class="custom-file-input"
                    :bg-color="!isEdit ? '#F6F6F6' : ''"
                    density="compact"
                    rounded="xl"
                    disabled
                    placeholder="No file choosen"
                    :model-value="profileData.rekening.foto_rekening"
                  >
                    <template #append-inner>
                      <VBtn v-if="!profileData.rekening.foto_rekening" rounded="s-0 e-xl" color="#A09BA1" text="Choose File" />
                    </template>
                  </VTextField>
                  <FileUploadField
                    v-else
                    ref="fotoRekRef"
                    @validation-is-valid="handleEmitValidationBankAccPhoto"
                    :file-data="bankAccPhoto"
                    :file-name="uploadedBankAccFilename ? uploadedBankAccFilename : updateData.rekening.foto_rekening"
                    :initial-file-name="updateData.rekening.foto_rekening"
                    @on-select="handleSelectBankAccPhoto"
                    @on-remove="handleRemoveBankAccPhoto"
                    :validation-list="uploadedBankAccFilename ? [
                      fileExtensionValidator,
                      fileSizeValidator,
                      fileNameLengthValidator,
                    ] : []"
                  />
                </div>
                <VBtn
                  @click="profileData.rekening.foto_rekening ? handleDownload(profileData.rekening.foto_rekening, 'FILES') : null"
                  :color="profileData.rekening.foto_rekening ? 'primary' : '#A09BA1'"
                  class="px-4 ms-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </div>
            </div>
            <div class="mb-3">
              <div class="font-weight-bold mb-1">NPWP</div>
              <VTextField
                v-if="!isEdit"
                :model-value="profileData.rekening.npwp ? profileData.rekening.npwp : '-'"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
                disabled
              />
              <VTextField
                v-else
                :rules="[requiredValidator]"
                v-model="updateData.rekening.npwp"
                :bg-color="!isEdit ? '#F6F6F6' : ''"
                density="compact"
                rounded="xl"
              />
            </div>
            <div>
              <div class="font-weight-bold mb-1">Upload Foto NPWP</div>
              <div class="d-flex align-start">
                <div class="w-100 w-lg-50">
                  <VTextField
                    v-if="!isEdit"
                    class="custom-file-input"
                    :bg-color="!isEdit ? '#F6F6F6' : ''"
                    density="compact"
                    rounded="xl"
                    disabled
                    placeholder="No file choosen"
                    :model-value="profileData.rekening.foto_npwp"
                  >
                    <template #append-inner>
                      <VBtn v-if="!profileData.rekening.foto_npwp" rounded="s-0 e-xl" color="#A09BA1" text="Choose File" />
                    </template>
                  </VTextField>
                  <FileUploadField
                    v-else
                    ref="fotoNpwpRef"
                    @validation-is-valid="handleEmitValidationNpwpPhoto"
                    :file-data="npwpPhoto"
                    :file-name="uploadedNpwpFilename ? uploadedNpwpFilename : updateData.rekening.foto_npwp"
                    :initial-file-name="updateData.rekening.foto_npwp"
                    @on-select="handleSelectNpwpPhoto"
                    @on-remove="handleRemoveNpwpPhoto"
                    :validation-list="uploadedNpwpFilename ? [
                      fileExtensionValidator,
                      fileSizeValidator,
                      fileNameLengthValidator,
                    ] : []"
                  />
                </div>
                <VBtn
                  @click="profileData.rekening.foto_npwp ? handleDownload(profileData.rekening.foto_npwp, 'FILES') : null"
                  :color="profileData.rekening.foto_npwp ? 'primary' : '#A09BA1'"
                  class="px-4 ms-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VForm>
    </VCol>
    <VCol cols="4">
      <VExpansionPanels
        v-model="panelRegistration"
        expand-icon="fa-chevron-down"
        collapse-icon="fa-chevron-up"
        class="mb-4"
      >
        <VExpansionPanel class="py-2">
          <VExpansionPanelTitle class="text-h4 font-weight-bold">
            Data Registrasi
          </VExpansionPanelTitle>
          <VExpansionPanelText class="d-flex align-center">
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Status
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                <v-chip
                  v-if="profileData.reg_status"
                  style="background: #EDF6ED"
                  color="#49A84C"
                  variant="outlined"
                  rounded="xl"
                >
                  {{ profileData.reg_status }}
                </v-chip>
                <div v-else>
                  -
                </div>
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                No. Registrasi
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5" style="overflow-wrap: anywhere; ">
                {{ profileData.reg_nomor ? profileData.reg_nomor : "-" }}
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Tanggal Berlaku
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                {{ profileData.reg_tgl_berlaku ? profileData.reg_tgl_berlaku : "-" }}
              </VCol>
            </VRow>
            <VRow no-gutters class="my-2 text-body-1 d-flex align-center" style="font-weight: 600;">
              <VCol cols="6" >
                Download Sertifikat
              </VCol>
              <VCol cols="1" class="text-right px-2">
                :
              </VCol>
              <VCol cols="5">
                <VBtn
                  @click="profileData.file_sertifikat ? handleDownload(profileData.file_sertifikat, 'SERT_LPH') : null"
                  :color="profileData.file_sertifikat ? 'primary' : '#A09BA1'"
                  density="compact"
                  class="px-2"
                >
                  <template #default>
                    <VIcon icon="fa-download" />
                  </template>
                </VBtn>
              </VCol>
            </VRow>
          </VExpansionPanelText>
        </VExpansionPanel>
      </VExpansionPanels>
    </VCol>
  </VRow>
  <ConfirmModal
    dialog-title="Simpan Perubahan"
    :dialog-visible="isOpenModal"
    @update:dialog-visible="isOpenModal = $event"
  >
    <VCardText>
      Apakah yakin ingin menyimpan perubahan data ini ?
    </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmUpdate(), handleOpenModal()]"
      >
        Simpan
      </VBtn>
    </VCardActions>
  </ConfirmModal>
</template>

<style lang="scss">
.custom-file-input {
  .v-field--appended {
    padding-inline-end: 0 !important;
  }
}
</style>
