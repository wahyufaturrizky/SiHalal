<script setup lang="ts">
const route = useRoute<"">();
const submissionId = route.params?.id;

const snackbar = useSnackbar();
const isDeleteModalOpen = ref(false);

const submissionDetail = reactive({
  nama_pu: null,
  alamat_pu: null,
  jenis_badan_usaha: null,
  skala_usaha: null,
  nama_pj: null,
});
const picDetail = reactive({
  nama_pj: null,
  nomor_kontak_pj: null,
  email_pj: null,
});

const legalHeader: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "Jenis", key: "jenis_surat" },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tgl_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const legalData = ref([]);

const halalSupervisorHeader: any[] = [
  { title: "No", key: "no", sortable: false },
  { title: "Nama", key: "penyelia_nama", nowrap: true },
  { title: "No. KTP", key: "no_ktp", nowrap: true },
  { title: "No. Kontak", key: "no_kontak", nowrap: true },
  {
    title: "No/Tgl Sertif Penyelia Halal",
    key: "no_penyelia_halal",
    nowrap: true,
  },
  { title: "No/Tanggal SK", key: "no_sk", nowrap: true },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const halalSupervisorData = ref([]);

const { refresh } = await useAsyncData("data-pelaku-usaha", async () => {
  return await handleDetailPelakuUsaha();
});

const handleDetailPelakuUsaha = async () => {
  try {
    const response: any = await $api(
      `/self-declare/submission/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      submissionDetail.nama_pj = response.data.penanggung_jawab.nama_pj;
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(picDetail, response.data.penanggung_jawab);
      legalData.value = response.data.aspek_legal;
      halalSupervisorData.value = response.data.penyelia_halal;
    }
    return response;
  } catch (error) {
    console.log(error);
  }
};

const handleUpdatePIC = async () => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/pic/update`,
      {
        method: "put",
        body: {
          id_reg: submissionId,
          nama_pj: picDetail.nama_pj,
          no_kontak_pj: picDetail.nomor_kontak_pj,
          email_pj: picDetail.email_pj,
        },
      }
    );
    if (response.code !== 2000) {
      useSnackbar().sendSnackbar("Ada Kesalahan", "error");
      return;
    }
    useSnackbar().sendSnackbar("Berhasil Simpan Penanggung Jawab", "success");
    refresh();
  } catch (error) {
    useSnackbar().sendSnackbar("Ada Kesalahan", "error");
  }
};
const refVForm = ref<VForm>();
const submitPIC = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) handleUpdatePIC();
  });
};

const handleAddLegal = async (selectedLegal: string[]) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/legal/create`,
      {
        method: "post",
        body: {
          id_reg: submissionId,
          id_legal: selectedLegal,
        },
      }
    );
    if (response.code === 2000) {
      refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

const handleAddSupervisor = async (selectedSupervisor: string[]) => {
  try {
    const response: any = await $api(
      `/self-declare/business-actor/supervisor/create`,
      {
        method: "post",
        body: {
          id_reg: submissionId,
          id_penyelia: selectedSupervisor,
        },
      }
    );
    if (response.code === 2000) {
      refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteType = ref("");
const selectedDelete = ref("");
const handleOpenDelete = (type: string, id: string) => {
  deleteType.value = type;
  selectedDelete.value = id;
  isDeleteModalOpen.value = !isDeleteModalOpen.value;
};

const confirmDeleteItem = async () => {
  return deleteType.value === "LEGAL"
    ? await confirmDeleteLegal()
    : await confirmDeleteSupervisor();
};

const confirmDeleteLegal = async () => {
  try {
    const result: any = await $api(
      `/self-declare/business-actor/legal/remove`,
      {
        method: "delete",
        query: {
          legal_id: selectedDelete.value,
        },
      }
    );
    if (result.code === 2000) {
      refresh();
      snackbar.sendSnackbar("Berhasil menghapus data", "success");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal menghapus data", "error");
  }
};
const confirmDeleteSupervisor = async () => {
  try {
    const result: any = await $api(
      `/self-declare/business-actor/supervisor/remove`,
      {
        method: "delete",
        query: {
          supervisor_id: selectedDelete.value,
        },
      }
    );
    if (result.code === 2000) {
      refresh();
      snackbar.sendSnackbar("Berhasil menghapus data", "success");
    }
  } catch (error) {
    snackbar.sendSnackbar("Gagal menghapus data", "error");
  }
};

onMounted(() => {
  handleDetailPelakuUsaha();
});
</script>

<template>
  <VRow>
    <VCol :cols="12" class="mb-3">
      <VCard class="py-3 px-2">
        <VCardTitle class="font-weight-bold text-h4 mb-5">
          Data Pelaku Usaha
        </VCardTitle>
        <VCardText>
          <DataPelakuUsaha :data="submissionDetail" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol :cols="12" class="mb-3">
      <VCard class="py-3 px-2">
        <v-form ref="refVForm" @submit.prevent="handleUpdatePIC">
          <VCardTitle
            class="d-flex justify-space-between align-center font-weight-bold text-h4 mb-5"
          >
            <div>Penanggung Jawab</div>
            <VBtn
              type="submit"
              color="primary"
              variant="flat"
              text="Simpan Perubahan"
            />
          </VCardTitle>
          <VCardText>
            <VRow>
              <VCol cols="12">
                <VItemGroup>
                  <VLabel class="text-h6 font-weight-bold">Nama</VLabel>
                  <VTextField
                    :rules="[requiredValidator]"
                    density="compact"
                    v-model="picDetail.nama_pj"
                  />
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel class="text-h6 font-weight-bold"
                    >Nomor Handphone</VLabel
                  >
                  <VTextField
                    density="compact"
                    @input="onlyAcceptNumber"
                    :rules="[requiredValidator, phoneNumberIdValidator]"
                    v-model="picDetail.nomor_kontak_pj"
                  />
                </VItemGroup>
                <br />
                <VItemGroup>
                  <VLabel class="text-h6 font-weight-bold">Email</VLabel>
                  <VTextField
                    :rules="[requiredValidator, emailValidator]"
                    density="compact"
                    v-model="picDetail.email_pj"
                  />
                </VItemGroup>
              </VCol>
            </VRow>
          </VCardText>
        </v-form>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol :cols="12" class="mb-3">
      <VCard class="pa-3">
        <VCardTitle class="mb-4">
          <VRow align="center">
            <VCol class="font-weight-bold text-h4"> Aspek Legal </VCol>
            <VCol justify="end" class="d-flex justify-end">
              <TambahAspekLegalByTable @submit="handleAddLegal" />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="custom-table"
            :headers="legalHeader"
            :items="legalData"
          >
            <template #item.no="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.tgl_surat="{ item }: any">
              {{ item.tgl_surat ? item.tgl_surat : "-" }}
            </template>
            <template #item.masa_berlaku="{ item }: any">
              {{ item.masa_berlaku ? item.masa_berlaku : "-" }}
            </template>
            <template #item.action="{ item }: any">
              <div>
                <VIcon
                  icon="mdi-delete"
                  color="error"
                  class="cursor-pointer"
                  @click="handleOpenDelete('LEGAL', item.id_reg_legal)"
                />
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol :cols="12">
      <VCard class="pa-3">
        <VCardTitle class="mb-4">
          <VRow align="center">
            <VCol class="font-weight-bold text-h4"> Penyelia Halal </VCol>
            <VCol class="d-flex justify-end">
              <TambahPenyeliaByTable @submit="handleAddSupervisor" />
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VDataTable
            class="custom-table"
            :headers="halalSupervisorHeader"
            :items="halalSupervisorData"
          >
            <template #item.no="{ index }">
              {{ index + 1 }}
            </template>
            <template #item.no_penyelia_halal="{ item }: any">
              {{ `${item.no_penyelia_halal}/${item.tgl_penyelia_halal}` }}
            </template>
            <template #item.no_sk="{ item }: any">
              {{ `${item.no_sk}/${item.tanggal_sk}` }}
            </template>
            <template #item.action="{ item }: any">
              <div>
                <VIcon
                  icon="mdi-delete"
                  color="error"
                  class="cursor-pointer"
                  @click="handleOpenDelete('SUPERVISOR', item.penyelia_id)"
                />
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <!-- <VRow>
    <VCol :cols="12">
      <VCard>
        <VCardTitle><h3>Dokumen Persyaratan</h3></VCardTitle>
        <VCardItem>
          <VRow>
            <VCol cols="1">1.</VCol>
            <VCol cols="7"
              ><b
                >Izin Edar (PIRT/MD/ML/ULOT/UKOT) atau Izin Industri lainnya
                atas produk yang dihasilkan dari dinas/ instansi terkait.</b
              ></VCol
            >
            <VCol cols="4">
              <VFileInput prepend-icon="" density="compact" hide-details>
                <template #append>
                  <VBtn>Upload</VBtn>
                </template>
              </VFileInput>
            </VCol>
          </VRow>
        </VCardItem>
      </VCard>
    </VCol>
  </VRow> -->
  <ShSubmissionDetailFormModal
    dialog-title="Menghapus Data"
    :dialog-visible="isDeleteModalOpen"
    dialog-use="DELETE"
    @update:dialog-visible="isDeleteModalOpen = $event"
    @submit:commit-action="confirmDeleteItem"
  >
    <VCardText>
      <div>Apakah yakin ingin menghapus data pengajuan ini</div>
    </VCardText>
  </ShSubmissionDetailFormModal>
</template>

<style scoped lang="scss">
:deep(.v-data-table.custom-table > .v-table__wrapper) {
  table {
    thead > tr > th:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
    }

    tbody > tr > td:last-of-type {
      right: 0;
      position: sticky;
      border-left: 1px solid rgba(#000000, 0.12);
      background: white;
    }
  }
}
</style>
