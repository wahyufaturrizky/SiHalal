<script setup lang="ts">
const router = useRouter();

const profileData = reactive({
  institutionName: "Lembaga AB761",
  institutionType: "Komisi Fatwa MUI Provinsi",
  address: "Jl. Jend. Sudirman No. 1",
  province: "Pusat",
  city: "Kab. Enrekang",
  district: null,
  email: "",
});
const responsiblerData = reactive({
  chairman: {
    name: "Albert Flores",
    phone: "082178958123",
    tteFile: {
      fileData: null,
      fileName: null,
    },
  },
  secretary: {
    name: "Robert Fox",
    phone: "082167247818",
    tteFile: {
      fileData: null,
      fileName: null,
    },
  },
  fatwaLead: {
    name: "Kathryn Murphy",
    phone: "082167126781",
    tteFile: {
      fileData: null,
      fileName: null,
    },
  },
  contact: {
    name: "Savannah Nguyen",
    phone: "082189897921",
  },
});

const handleSelectChairmanTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    responsiblerData.chairman.tteFile.fileName = fileData.name;
    responsiblerData.chairman.tteFile.fileData = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleSelectSecretaryTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    responsiblerData.secretary.tteFile.fileName = fileData.name;
    responsiblerData.secretary.tteFile.fileData = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleSelectFatwaLeadTTE = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    responsiblerData.fatwaLead.tteFile.fileName = fileData.name;
    responsiblerData.fatwaLead.tteFile.fileData = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveChaimanTTE = () => {
  responsiblerData.chairman.tteFile.fileName = null;
  responsiblerData.chairman.tteFile.fileData = null;
};
const handleRemoveSecretaryTTE = () => {
  responsiblerData.secretary.tteFile.fileName = null;
  responsiblerData.secretary.tteFile.fileData = null;
};
const handleRemoveFatwaLeadTTE = () => {
  responsiblerData.fatwaLead.tteFile.fileName = null;
  responsiblerData.fatwaLead.tteFile.fileData = null;
};

const accountData = reactive({
  bankName: "BRI",
  accountNumber: "1234-0008-7771-9871",
  accountName: "Lembaga ABX771",
  accountPhoto: "RekeningBRI.JPG",
  npwpNumber: "0198.6358.9912.8172.1",
  npwpPhoto: "NPWP.JPG",
});

const bankAccPhoto = reactive({
  name: null,
  file: null,
});
const handleSelectBankAccPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    bankAccPhoto.name = fileData.name;
    bankAccPhoto.file = fileData;
    // inputData.file = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveBankAccPhoto = () => {
  bankAccPhoto.name = null;
  bankAccPhoto.file = null;
  // inputData.file = null;
};

const npwpPhoto = reactive({
  name: null,
  file: null,
});
const handleSelectNpwpPhoto = async (event: any) => {
  const fileData = event.target.files[0];
  if (!fileData) return;

  try {
    npwpPhoto.name = fileData.name;
    npwpPhoto.file = fileData;
    // inputData.file = fileData;
  } catch (error) {
    useSnackbar().sendSnackbar("Upload Image Failed", "error");
    console.error(error);
  }
};
const handleRemoveNpwpPhoto = () => {
  npwpPhoto.name = null;
  npwpPhoto.file = null;
  // inputData.file = null;
};

const isOpenSaveModal = ref(false);
const handleOpenSaveModal = () => {
  isOpenSaveModal.value = !isOpenSaveModal.value;
};
const handleConfirmSave = async () => {
  useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
  router.push("/komisi-fatwa/profile");
  // try {
  // const response: any = await $api("/admin/users/remove", {
  //   method: "delete",
  //   query: {
  //     user_id: selectedUser.value,
  //   },
  // } as any);

  // if (response.code === 2000) {
  //   useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
  //   router.push("/komisi-fatwa/profile");
  // }
  // } catch (error) {
  //   useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
  //   console.error(error);
  // }
};
</script>

<template>
  <ConfirmModal
    dialog-title="Simpan Perubahan"
    :dialog-visible="isOpenSaveModal"
    @update:dialog-visible="isOpenSaveModal = $event"
  >
    <VCardText> Apakah yakin ingin menyimpan perubahan data ini? </VCardText>
    <VCardActions class="px-4">
      <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenSaveModal"
        >Batal</VBtn
      >
      <VBtn
        variant="flat"
        class="px-4"
        color="error"
        @click="[handleConfirmSave(), handleOpenSaveModal()]"
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
        @click="handleOpenSaveModal"
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
                v-model="profileData.institutionName"
                placeholder="Isi nama lembaga"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Jenis Lembaga</h4>
              <VSelect
                v-model="profileData.institutionType"
                placeholder="Pilih jenis lembaga"
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
                v-model="profileData.address"
                placeholder="Isi alamat"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Provinsi</h4>
              <VSelect
                v-model="profileData.province"
                placeholder="Pilih provinsi"
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
                v-model="profileData.city"
                placeholder="Pilih kota/kabupaten"
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
                v-model="profileData.district"
                placeholder="Pilih kecamatan"
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
                v-model="profileData.email"
                placeholder="Isi email"
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
                v-model="responsiblerData.chairman.name"
                placeholder="Isi nama pimpinan"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="responsiblerData.chairman.phone"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="responsiblerData.chairman.tteFile.fileData"
                :file-name="responsiblerData.chairman.tteFile.fileName"
                @on-select="handleSelectChairmanTTE"
                @on-remove="handleRemoveChaimanTTE"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Sekretaris</h4>
              <VTextField
                v-model="responsiblerData.secretary.name"
                placeholder="Isi nama sekretaris"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="responsiblerData.secretary.phone"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="responsiblerData.secretary.tteFile.fileData"
                :file-name="responsiblerData.secretary.tteFile.fileName"
                @on-select="handleSelectSecretaryTTE"
                @on-remove="handleRemoveSecretaryTTE"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Ketua Bidang Fatwa</h4>
              <VTextField
                v-model="responsiblerData.fatwaLead.name"
                placeholder="Isi nama ketua bidang fatwa"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="responsiblerData.fatwaLead.phone"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="responsiblerData.fatwaLead.tteFile.fileData"
                :file-name="responsiblerData.fatwaLead.tteFile.fileName"
                @on-select="handleSelectFatwaLeadTTE"
                @on-remove="handleRemoveFatwaLeadTTE"
              />
            </VCol>
          </VRow>
          <VDivider class="mt-5 mb-3" />
          <VRow>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Nama Kontak</h4>
              <VTextField
                v-model="responsiblerData.contact.name"
                placeholder="Isi nama kontak"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="responsiblerData.contact.phone"
                placeholder="Isi no. HP"
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
                v-model="accountData.bankName"
                placeholder="Isi nama bank"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">No. Rekening</h4>
              <VTextField
                v-model="accountData.accountNumber"
                placeholder="Isi no. rekening"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">Atas Nama</h4>
              <VTextField
                v-model="accountData.accountName"
                placeholder="Isi atas nama"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <h4 class="mb-1 font-weight-bold">Upload Foto Rekening</h4>
              <FileUploadField
                :file-data="bankAccPhoto.file"
                :file-name="bankAccPhoto.name"
                @on-select="handleSelectBankAccPhoto"
                @on-remove="handleRemoveBankAccPhoto"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">NPWP</h4>
              <VTextField
                v-model="accountData.npwpNumber"
                placeholder="Isi NPWP"
                density="compact"
                rounded="xl"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <h4 class="mb-1 font-weight-bold">Upload Foto NPWP</h4>
              <FileUploadField
                :file-data="npwpPhoto.file"
                :file-name="npwpPhoto.name"
                @on-select="handleSelectNpwpPhoto"
                @on-remove="handleRemoveNpwpPhoto"
              />
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped></style>
