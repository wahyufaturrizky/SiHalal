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

const handleLoadProfile = async () => {
  try {
    const response: any = await $api("/komisi-fatwa/profile", {
      method: "get",
    } as any);
    if (response.code === 2000) {
      Object.assign(profileData, response.data);
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

const updatePayload: Record<string, any> = {
  nama_mui: profileData.nama_mui,
  jenis: profileData.jenis,
  alamat: profileData.alamat,
  provinsi: profileData.provinsi,
  kd_prov: profileData.kd_prov,
  kota: profileData.kota,
  kd_kab: profileData.kd_kab,
  wilayah_id: profileData.wilayah_id,
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
const handleConfirmUpdate = async () => {
  try {
    const payloadData = new FormData();
    if (selectedTteFile.pimpinan)
      payloadData.append("pimpinan_tte", selectedTteFile.pimpinan);
    if (selectedTteFile.sekretaris)
      payloadData.append("sekretaris_tte", selectedTteFile.sekretaris);
    if (selectedTteFile.ketuaBidang)
      payloadData.append("bidang_fatwa_tte", selectedTteFile.ketuaBidang);
    if (bankAccPhoto.value)
      payloadData.append("filefotorek", bankAccPhoto.value);
    if (npwpPhoto.value) payloadData.append("filefotonpwp", npwpPhoto.value);

    for (const key in updatePayload) {
      const value = updatePayload[key];
      payloadData.append(key, value);
    }
    const response: any = await $api("/admin/users/remove", {
      method: "delete",
      body: payloadData,
    } as any);

    if (response.code === 2000) {
      useSnackbar().sendSnackbar("Berhasil menyimpan data", "success");
      router.push("/komisi-fatwa/profile");
    }
  } catch (error) {
    useSnackbar().sendSnackbar("Gagal menyimpan data", "error");
    console.error(error);
  }
};

onMounted(() => {
  handleLoadProfile();
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
                v-model="profileData.nama_mui"
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
                v-model="profileData.jenis"
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
                v-model="profileData.alamat"
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
                v-model="profileData.provinsi"
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
                v-model="profileData.kota"
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
                v-model="profileData.wilayah_id"
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
                v-model="profileData.nama_pimpinan"
                placeholder="Isi nama pimpinan"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="profileData.no_hp_pimpinan"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="selectedTteFile.pimpinan"
                :file-name="profileData.pimpinan_tte"
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
                v-model="profileData.nama_sekretaris"
                placeholder="Isi nama sekretaris"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="profileData.no_hp_sekretaris"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="selectedTteFile.sekretaris"
                :file-name="profileData.sekretaris_tte"
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
                v-model="profileData.nama_bidang_fatwa"
                placeholder="Isi nama ketua bidang fatwa"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="profileData.no_hp_bidang_fatwa"
                placeholder="Isi no. HP"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">Upload TTE</h4>
              <FileUploadField
                :file-data="selectedTteFile.ketuaBidang"
                :file-name="profileData.bidang_fatwa_tte"
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
                v-model="profileData.nama_kontak"
                placeholder="Isi nama kontak"
                density="compact"
                rounded="xl"
              />
            </VCol>
            <VCol cols="4">
              <h4 class="mb-1 font-weight-bold">No. HP</h4>
              <VTextField
                v-model="profileData.no_hp_kontak"
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
                v-model="profileData.rekening.bank"
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
                v-model="profileData.rekening.no_rekening"
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
                v-model="profileData.rekening.nama"
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
                :file-data="bankAccPhoto"
                :file-name="profileData.rekening.filefotorek"
                @on-select="handleSelectBankAccPhoto"
                @on-remove="handleRemoveBankAccPhoto"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12">
              <h4 class="mb-1 font-weight-bold">NPWP</h4>
              <VTextField
                v-model="profileData.rekening.npwp"
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
                :file-data="npwpPhoto"
                :file-name="profileData.rekening.filefotonpwp"
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
