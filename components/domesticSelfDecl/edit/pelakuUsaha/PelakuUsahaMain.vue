<script setup lang="ts">
const route = useRoute();
const submissionId = route.params?.id;

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

const legalHeader = [
  { title: "No", key: "no", sortable: false },
  { title: "Jenis", key: "jenis_surat" },
  { title: "No. Dokumen", key: "no_surat", nowrap: true },
  { title: "Tanggal", key: "tgl_surat", nowrap: true },
  { title: "Masa Berlaku", key: "masa_berlaku", nowrap: true },
  { title: "Instansi Penerbit", key: "instansi_penerbit", nowrap: true },
  { title: "Action", key: "action", align: "center", sortable: false },
];
const legalData = ref([]);

const halalSupervisorHeader = [
  { title: "No", key: "no" },
  { title: "Nama", key: "nama" },
  { title: "No. KTP", key: "no_ktp" },
  { title: "No. Kontak", key: "no_kontak" },
  { title: "No/Tgl Sertif Penyelia Halal", key: "no_sertifikat" },
  { title: "No/Tanggal SK", key: "no_sk" },
  { title: "Action", key: "action" },
];
const halalSupervisorData = ref([]);

const getSubmissionDetail = async () => {
  try {
    const response: Promise<any> = await $api(
      `/self-declare/${submissionId}/detail`,
      {
        method: "get",
      }
    );

    if (response.code === 2000) {
      submissionDetail.nama_pj = response.data.penanggung_jawab.nama_pj;
      Object.assign(submissionDetail, response.data.certificate_halal);
      Object.assign(picDetail, response.data.penanggung_jawab);
    }
  } catch (error) {
    console.log(error);
  }
};
const getLegalList = async () => {
  try {
    const response: Promise<any> = await $api(
      `/self-declare/business-actor/list-legal`,
      {
        method: "get",
        params: {
          page: 1,
          size: 10,
          id_reg: submissionId,
        },
      }
    );

    if (response.code === 2000) {
      legalData.value = response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await Promise.all([getSubmissionDetail(), getLegalList()]);
});
</script>

<template>
  <VRow>
    <VCol :cols="12">
      <VCard>
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
    <VCol :cols="12">
      <VCard title="Penanggung Jawab">
        <VCardText>
          <PenanggungJawab :data="picDetail" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol :cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="5">
              <p>Aspek Legal</p>
            </VCol>
            <VCol cols="7" style="display: flex; justify-content: end">
              <TambahAspekLegalByTable />
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
            <template #item.action="{ index }">
              <div>
                <VIcon icon="mdi-delete" color="error" class="cursor-pointer" />
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
    <VCol :cols="12">
      <VCard>
        <VCardTitle>
          <VRow>
            <VCol cols="5">
              <p>Penyelia Halal</p>
            </VCol>
            <VCol cols="7" style="display: flex; justify-content: end">
              <TambahPenyeliaByTable></TambahPenyeliaByTable>
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
            <template #item.action="{ index }">
              <div>
                <VIcon icon="mdi-delete" color="error" class="cursor-pointer" />
              </div>
            </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
  <VRow>
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
  </VRow>
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
