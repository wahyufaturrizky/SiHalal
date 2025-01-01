<script setup lang="ts">
import LPHDetailLayout from '@/layouts/LPHDetailLayout.vue';

const route = useRoute();
const id = (route?.params as any).id;

const openedLeftPanels = ref([0, 1, 2, 3, 4, 5]);
const openedRightPanels = ref([0, 1, 2]);
const loadingAll = ref(true);
const dataPengajuan = ref<any>({});
const dataProduk = ref<any>();
const dataPemeriksaanProduk = ref<any>(null);
const fileLaporanLPH = ref<any>(null);
const fileKH = ref<any>(null);
const fileHasilAudit = ref<any>(null);
const fileLihatDraft = ref<any>(null);
const isSendModalOpen = ref(false);
const showReturn = ref(false);
const returnNote = ref("");

const assignAuditorHeader: any[] = [
  { title: 'No', key: 'index' },
  { title: 'Nama', key: 'name' },
  { title: 'Tanggal Lahir', key: 'birthDate' },
  { title: 'No Reg', key: 'regisNumber' },
  { title: 'Action', key: 'actions', align: 'center', sortable: false },
];

const assignAuditorData = ref([
  { name: 'Idris', birthDate: '02/10/2000', regisNumber: 'SK-896376-3028' },
]);

const newAuditorData = {
  name: 'Aliando Syakir',
  birthDate: '02/10/2000',
  regisNumber: 'SK-896376-3028',
};

const assignedAuditor = ref(null);
const isAssignModalOpen = ref(false);
const isUpdateModalOpen = ref(false);

const openReturn = () => (showReturn.value = true);
const closeReturn = () => (showReturn.value = false);

const handleOpenAssignModal = () => {
  isAssignModalOpen.value = !isAssignModalOpen.value;
};

const handleOpenUpdateModal = () => {
  isUpdateModalOpen.value = !isUpdateModalOpen.value;
};

const handleAddAuditor = () => {
  assignAuditorData.value.push(newAuditorData);
};

const handleDeleteAuditor = (index: number) => {
  assignAuditorData.value.splice(index, 1);
};

const handleSaveAuditor = () => {
  useSnackbar().sendSnackbar('Berhasil mengirim pengajuan data', 'success');
};

const refVForm = ref<VForm>()

const returnDocument = async () => {
  try {
    const response = await $api("/reguler/verifikator/detail/decline", {
      method: "post",
      body: {
        id_reg: route.params.id,
        keterangan: returnNote.value,
      },
    });
    if (response.code != 2000) {
      useSnackbar().sendSnackbar("Ada kesalahan", "error");
      return;
    }
    closeReturn();
    useSnackbar().sendSnackbar("Berhasil mengembalikan data", "success");
  } catch (error) {
    useSnackbar().sendSnackbar("Ada kesalahan", "error");
  }
};

const rejectSubmission = async () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) returnDocument();
  });
}

const getDownloadForm = async (docName: string) => {
  const result: any = await $api(`/self-declare/submission/${id}/file`, {
    method: 'get',
    query: {
      document: docName,
    },
  });

  if (result.code === 2000) {
    switch (docName) {
      case 'laporan':
        fileLaporanLPH.value = result.data.file;
        return result;
      case 'setifikasi-halal':
        fileKH.value = result.data.file;
        return result;
      case 'rekomendasi':
        fileHasilAudit.value = result.data.file;
        return result;
      case 'surat-permohonan':
        fileLihatDraft.value = result.data.file;
        return result;
      default:
        break;
    }
  }
};

const getDetailData = async (type: string) => {
  try {
    const response: any = await $api('/reguler/lph/detail-payment', {
      method: 'get',
      params: { url: `${POST_AUDIT_DETAIL}/${id}/${type}` },
    });

    if (response?.code === 2000) return response?.data;
    else
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
};

const handleOpenSendModal = () => {
  isSendModalOpen.value = false
}

const handleUpdateStatus = async () => {
  try {
    const response: any = await $api('/reguler/lph/post-audit/kirim', {
      method: 'put',
      body: {
        id_reg: id,
        keterangan: 'update',
      },
    });

    if (response?.code === 2000) return response?.data;
    else
      useSnackbar().sendSnackbar(
        response.errors.list_error.join(', '),
        'error'
      );
  } catch (error) {
    useSnackbar().sendSnackbar('Ada Kesalahan', 'error');
  }
}

onMounted(async () => {
  const responseData: any = await Promise.allSettled([
    getDetailData('pengajuan'),
    getDetailData('produk'),
    getDetailData('pemeriksaanproduk'),
    getDownloadForm('laporan'),
    getDownloadForm('setifikasi-halal'),
    getDownloadForm('surat-pernyataan'),
    getDownloadForm('surat-permohonan'),
  ]);

  if (dataPengajuan) {
    dataPengajuan.value = responseData?.[0]?.value || {};
    dataPemeriksaanProduk.value = responseData?.[1]?.value || [];
    dataProduk.value = responseData?.[2]?.value || {};
    loadingAll.value = false;
  }
});
</script>

<template>
  <div v-if="!loadingAll">
    <VDialog v-model="isSendModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Kirim Pengajuan</div>
          <VIcon @click="handleOpenSendModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol>
              Pastikan dokumen persyaratan lengkap dan semua biaya pemeriksaan
              sudah dimasukkan. Invoice akan diterbitkan saat Anda klik tombol
              ”kirim” dan invoice tidak dapat diedit kembali
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn variant="outlined" class="px-4 me-3" @click="handleOpenSendModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenSendModal()]"
          >
            Ya, Kirim
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="showReturn" max-width="600px">
      <VForm ref="refVForm" @submit.prevent="rejectSubmission">
        <VCard>
          <VCardTitle class="font-weight-bold d-flex justify-space-between"
            ><h3>Pengembalian Dokumen</h3>
            <VBtn icon variant="plain" @click="closeReturn">
              <VIcon style="color: black">mdi-close</VIcon>
            </VBtn>
          </VCardTitle>
          <VCardText>
            <div class="mb-3 font-weight-medium text-caption text-grey">
              <span style="color: black"
                ><b>Masukan Keterangan Pengembalian</b></span
              >(Max. 1000 Karakter)
            </div>
            <VTextarea
              label="Masukan Keterangan Pengembalian (Max. 1000 Karakter)"
              v-model="returnNote"
              :rules="[requiredValidator]"
              rows="4"
              outlined
            />
          </VCardText>
          <VCardActions class="d-flex justify-end">
            <VBtn color="primary" variant="outlined" @click="closeReturn"
              >Batal</VBtn
            >
            <VBtn type="submit" color="primary" variant="flat">Kembalikan</VBtn>
          </VCardActions>
        </VCard>
      </VForm>
    </VDialog>
    <LPHDetailLayout>
      <template #page-title>
        <VRow no-gutters>
          <VCol>
            <h1>Detail Post Audit</h1>
          </VCol>
          <VCol cols="8">
            <VRow class="d-flex justify-end align-center ga-2">
              <VBtn
                variant="outlined"
                color="#E1442E"
                style="border-color: #e1442e"
                @click="() => openReturn()"
              >
                Pengembalian
              </VBtn>
              <VBtn
                @click="downloadDocument(fileLihatDraft)"
                variant="outlined"
              >
                Lihat Draft Sertif
              </VBtn>
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
              <VBtn @click="() => isSendModalOpen = true"> Kirim </VBtn>
            </VRow>
          </VCol>
        </VRow>
      </template>
      <template #left-content>
        <VExpansionPanels
          v-model="openedLeftPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Pengajuan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarPengajuan
                type="READ"
                :data-pengajuan="dataPengajuan"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Pengajuan Sertifikasi
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelPengajuanSertifikasi :data-pengajuan="dataPengajuan" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Daftar Nama Produk
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelDaftarProduk :data="dataPemeriksaanProduk" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="3" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Jadwal Audit
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelJadwalAudit :data="dataProduk?.jadwal_audit" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="4" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Auditor
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelAuditorTable :data="dataProduk?.auditor" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="5" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Hasil Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelHasilPemeriksaan
                type="EDIT"
                :data="dataProduk?.hasil_pemeriksaan"
                from="post-audit"
              />
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
      </template>
      <template #right-content>
        <VExpansionPanels
          v-model="openedRightPanels"
          expand-icon="fa-chevron-down"
          collapse-icon="fa-chevron-up"
          multiple
        >
          <VExpansionPanel :value="0" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Dokumen Unduhan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow align="center">
                <VCol cols="5" class="text-h6"> Hasil Audit </VCol>
                <VCol class="d-flex align-center">
                  <div class="me-1">:</div>
                  <VBtn
                    @click="downloadDocument(dataProduk?.file_laporan)"
                    rounded="xl"
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
          <VExpansionPanel :value="1" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              No. Pendaftaran
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <PanelNoPendaftaran :data="dataProduk?.no_pendaftaran" />
            </VExpansionPanelText>
          </VExpansionPanel>
          <VExpansionPanel :value="2" class="pt-3">
            <VExpansionPanelTitle class="font-weight-bold text-h4">
              Biaya Pemeriksaan
            </VExpansionPanelTitle>
            <VExpansionPanelText class="mt-5">
              <VRow>
                <VCol>{{ formatToIDR(dataProduk?.total_biaya) }}</VCol>
              </VRow>
            </VExpansionPanelText>
          </VExpansionPanel>
        </VExpansionPanels>
        <div class="mt-10">
          <PanelTracking :data="dataProduk?.tracking" />
        </div>
      </template>
    </LPHDetailLayout>
    <VDialog v-model="isAssignModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Status</div>
          <VIcon @click="handleOpenAssignModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow class="mb-1">
            <VCol>
              <div class="text-h6 mb-1">Auditor</div>
              <VSelect
                placeholder="Masukkan Auditor"
                density="compact"
                class="mb-3"
                :items="[{ title: 'Aliando Syakir', value: 'Aliando Syakir' }]"
                @update:model-value="(v) => (assignedAuditor = v)"
                menu-icon="fa-chevron-down"
              />
              <div class="d-flex justify-end">
                <VBtn
                  :disabled="!assignedAuditor"
                  text="Tambah"
                  @click="handleAddAuditor"
                />
              </div>
            </VCol>
          </VRow>
          <VRow class="mb-5">
            <VCol>
              <VDataTable
                class="auditor-table"
                :headers="assignAuditorHeader"
                :items="assignAuditorData"
                hide-default-footer
              >
                <template #item.index="{ index }">
                  {{ index + 1 }}
                </template>
                <template #item.actions>
                  <VIcon
                    icon="mdi-delete"
                    color="error"
                    @click="handleDeleteAuditor"
                  />
                </template>
              </VDataTable>
            </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenAssignModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleSaveAuditor(), handleOpenAssignModal()]"
          >
            Simpan
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VDialog v-model="isUpdateModalOpen" max-width="840px" persistent>
      <VCard class="pa-4">
        <VCardTitle class="d-flex justify-space-between align-center">
          <div class="text-h3 font-weight-bold">Update Status</div>
          <VIcon @click="handleOpenUpdateModal"> fa-times </VIcon>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol> Pastikan sudah memilih auditor untuk pengajuan ini. </VCol>
          </VRow>
        </VCardText>
        <VCardActions class="px-4">
          <VBtn
            variant="outlined"
            class="px-4 me-3"
            @click="handleOpenUpdateModal"
            >Batal</VBtn
          >
          <VBtn
            variant="flat"
            class="px-4"
            color="primary"
            @click="[handleUpdateStatus(), handleOpenUpdateModal()]"
          >
            Ya, Update
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
  <VSkeletonLoader
    type="table-heading, list-item-two-line, image, table-tfoot"
    v-else
  />
</template>

<style scoped lang="scss">
:deep(
    .v-expansion-panel--active:not(:first-child),
    .v-expansion-panel--active + .v-expansion-panel
  ) {
  margin-top: 40px !important;
}

:deep(.v-data-table.auditor-table > .v-table__wrapper) {
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
